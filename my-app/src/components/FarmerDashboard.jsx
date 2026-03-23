import { useState } from 'react';
import { C, inputS, labelS, API_URL } from '../styles';
import { StatusBadge, TrustScoreBadge } from './Utilities';
import { getEquipImage, TYPES, LOCATIONS, ADMIN_STATUSES, CONDITIONS, FUEL_TYPES, ATTACHMENTS } from '../data';

const FarmerDashboard = ({ bookings, setBookings, addToast, equipmentData, setEquipmentData, user, setPage }) => {
    const [tab, setTab] = useState('bookings');
    const [showAddForm, setShowAddForm] = useState(false);
    const [newEquip, setNewEquip] = useState({ name: '', type: 'Tractor', brand: '', yearOfMfg: 2022, condition: 'Good', engineHours: 0, fuelType: 'Diesel', hp: 0, pricePerDay: '', pricePerHour: '', location: 'Pune', deliveryAvailable: true, attachments: [] });
    const [showClaimForm, setShowClaimForm] = useState(false);
    const [claimForm, setClaimForm] = useState({ equipment: '', description: '', photos: '' });

    const cancelBooking = (id) => { setBookings(bookings.map(b => b.id === id ? { ...b, status: 'Cancelled' } : b)); addToast('Booking cancelled.', 'info'); };
    const addEquipment = async () => {
        if (!newEquip.name || !newEquip.pricePerDay) { addToast('Please fill equipment name and price', 'error'); return; }
        
        const eqData = { 
            name: newEquip.name, type: newEquip.type, brand: newEquip.brand, yearOfMfg: newEquip.yearOfMfg, 
            condition: newEquip.condition, engineHours: newEquip.engineHours, fuelType: newEquip.fuelType, 
            hp: Number(newEquip.hp) || 0, attachments: newEquip.attachments, pricePerHour: Number(newEquip.pricePerHour) || 0, 
            pricePerDay: Number(newEquip.pricePerDay) || 0, location: newEquip.location, village: '', taluka: '', 
            district: newEquip.location, state: 'Maharashtra', deliveryAvailable: newEquip.deliveryAvailable, 
            rating: 4.0, available: true, icon: '\u{1F69C}', totalRentals: 0, 
            adminStatus: 'Inspection Pending', adminNote: 'Awaiting admin approval', 
            bookedFrom: '', bookedTo: '', photos: [], ownerId: user.id 
        };

        try {
            const res = await fetch(`${API_URL}/equipment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(eqData)
            });
            
            if (res.ok) {
                const addedEq = await res.json();
                setEquipmentData([...equipmentData, addedEq]);
                setShowAddForm(false);
                addToast(`${addedEq.name} listed! Awaiting admin approval.`, 'success');
                setNewEquip({ name: '', type: 'Tractor', brand: '', yearOfMfg: 2022, condition: 'Good', engineHours: 0, fuelType: 'Diesel', hp: 0, pricePerDay: '', pricePerHour: '', location: 'Pune', deliveryAvailable: true, attachments: [] });
            } else {
                addToast('Failed to save equipment to database', 'error');
            }
        } catch (err) {
            console.error(err);
            addToast('Server error while saving equipment', 'error');
        }
    };
    const submitClaim = () => {
        if (!claimForm.equipment || !claimForm.description) { addToast('Please fill all claim fields', 'error'); return; }
        addToast('Damage claim filed successfully! Our team will review it.', 'success'); setShowClaimForm(false); setClaimForm({ equipment: '', description: '', photos: '' });
    };

    const tabS = (active) => ({ padding: '8px 20px', borderRadius: 10, border: 'none', fontWeight: 600, fontSize: 14, cursor: 'pointer', transition: 'all .2s', background: active ? C.green : C.white, color: active ? C.white : C.gray, boxShadow: active ? '0 2px 8px rgba(45,106,79,.25)' : 'none' });
    const monthlyIncome = bookings.filter(b => b.status !== 'Cancelled').reduce((s, b) => s + b.total, 0);

    return (
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '36px 24px', animation: 'fadeIn .5s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
                <div>
                    <h2 style={{ fontSize: '1.8rem', color: C.greenDark }}>Farmer Dashboard</h2>
                    <p style={{ color: C.gray, fontSize: 13 }}>Welcome back, {user.name} {'\u00B7'} {user.farmerType || 'Farmer'}</p>
                </div>
                <TrustScoreBadge score={user.trustScore || 100} />
            </div>
            {/* Stats */}
            <div className="dash-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 28 }}>
                {[
                    { label: 'Active Bookings', val: bookings.filter(b => ['Pending', 'Confirmed', 'In Use'].includes(b.status)).length, icon: '\u{1F4C5}', color: C.green },
                    { label: 'Completed', val: bookings.filter(b => b.status === 'Completed').length, icon: '\u2705', color: '#2196F3' },
                    { label: 'Equipment Listed', val: equipmentData.length, icon: '\u{1F69C}', color: C.gold },
                    { label: 'Total Spent', val: `\u20B9${monthlyIncome.toLocaleString()}`, icon: '\u{1F4B0}', color: C.brown },
                ].map((c, i) => (
                    <div key={i} style={{ background: C.white, borderRadius: 14, padding: '22px 18px', boxShadow: '0 2px 10px rgba(0,0,0,.05)', borderLeft: `4px solid ${c.color}` }}>
                        <span style={{ fontSize: 24 }}>{c.icon}</span>
                        <h3 style={{ color: C.greenDark, fontSize: 22, marginTop: 6 }}>{c.val}</h3>
                        <p style={{ color: C.gray, fontSize: 12, marginTop: 2 }}>{c.label}</p>
                    </div>
                ))}
            </div>
            {/* Tabs */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 24, background: C.white, padding: 4, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,.05)', flexWrap: 'wrap' }}>
                {[['bookings', 'Booking History'], ['equipment', 'My Equipment'], ['insurance', 'Insurance & Trust'], ['claim', 'File Claim']].map(([key, label]) => (
                    <button key={key} style={tabS(tab === key)} onClick={() => setTab(key)}>{label}</button>
                ))}
            </div>
            {/* Bookings */}
            {tab === 'bookings' && (
                <div style={{ background: C.white, borderRadius: 14, padding: 22, boxShadow: '0 2px 10px rgba(0,0,0,.05)' }}>
                    <h3 style={{ color: C.greenDark, marginBottom: 16 }}>Booking History</h3>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                            <thead><tr style={{ borderBottom: `2px solid ${C.lightGray}` }}>
                                {['Equipment', 'Location', 'Dates', 'Days', 'Total', 'Status', 'Action'].map(h => <th key={h} style={{ textAlign: 'left', padding: '10px 12px', color: C.gray, fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: .5 }}>{h}</th>)}
                            </tr></thead>
                            <tbody>{bookings.map(b => (
                                <tr key={b.id} style={{ borderBottom: `1px solid ${C.lightGray}15` }}>
                                    <td style={{ padding: '12px' }}>{b.equipment}</td>
                                    <td style={{ padding: '12px', color: C.gray }}>{b.location}</td>
                                    <td style={{ padding: '12px', fontSize: 13 }}>{b.dates}</td>
                                    <td style={{ padding: '12px' }}>{b.days}</td>
                                    <td style={{ padding: '12px', fontWeight: 600, color: C.green }}>{'\u20B9'}{b.total.toLocaleString()}</td>
                                    <td style={{ padding: '12px' }}><StatusBadge status={b.status} /></td>
                                    <td style={{ padding: '12px' }}>{['Pending', 'Confirmed'].includes(b.status) && <button onClick={() => cancelBooking(b.id)} style={{ background: C.red + '15', color: C.red, border: 'none', padding: '5px 12px', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>Cancel</button>}</td>
                                </tr>
                            ))}</tbody>
                        </table>
                    </div>
                </div>
            )}
            {/* Equipment */}
            {tab === 'equipment' && (
                <div style={{ background: C.white, borderRadius: 14, padding: 22, boxShadow: '0 2px 10px rgba(0,0,0,.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <h3 style={{ color: C.greenDark }}>Your Equipment</h3>
                        <button className="btn-pop" onClick={() => setShowAddForm(!showAddForm)} style={{ background: C.green, color: C.white, border: 'none', padding: '9px 20px', borderRadius: 10, fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>+ List Equipment</button>
                    </div>
                    {showAddForm && (
                        <div style={{ background: C.cream, borderRadius: 12, padding: 20, marginBottom: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                            <div><label style={labelS}>Equipment Name *</label><input value={newEquip.name} onChange={e => setNewEquip({ ...newEquip, name: e.target.value })} placeholder="e.g. Mahindra 575 DI" style={inputS} /></div>
                            <div><label style={labelS}>Type</label><select value={newEquip.type} onChange={e => setNewEquip({ ...newEquip, type: e.target.value })} style={inputS}>{TYPES.slice(1).map(t => <option key={t}>{t}</option>)}</select></div>
                            <div><label style={labelS}>Brand</label><input value={newEquip.brand} onChange={e => setNewEquip({ ...newEquip, brand: e.target.value })} placeholder="e.g. Mahindra" style={inputS} /></div>
                            <div><label style={labelS}>Year of Manufacture</label><input type="number" value={newEquip.yearOfMfg} onChange={e => setNewEquip({ ...newEquip, yearOfMfg: Number(e.target.value) })} style={inputS} /></div>
                            <div><label style={labelS}>Condition</label><select value={newEquip.condition} onChange={e => setNewEquip({ ...newEquip, condition: e.target.value })} style={inputS}>{CONDITIONS.map(c => <option key={c}>{c}</option>)}</select></div>
                            <div><label style={labelS}>Engine Hours</label><input type="number" value={newEquip.engineHours} onChange={e => setNewEquip({ ...newEquip, engineHours: Number(e.target.value) })} style={inputS} /></div>
                            <div><label style={labelS}>Fuel Type</label><select value={newEquip.fuelType} onChange={e => setNewEquip({ ...newEquip, fuelType: e.target.value })} style={inputS}>{FUEL_TYPES.map(f => <option key={f}>{f}</option>)}</select></div>
                            <div><label style={labelS}>Horsepower (HP)</label><input type="number" value={newEquip.hp} onChange={e => setNewEquip({ ...newEquip, hp: e.target.value })} style={inputS} /></div>
                            <div><label style={labelS}>Price/Day (\u20B9) *</label><input type="number" value={newEquip.pricePerDay} onChange={e => setNewEquip({ ...newEquip, pricePerDay: e.target.value })} style={inputS} /></div>
                            <div><label style={labelS}>Price/Hour (\u20B9)</label><input type="number" value={newEquip.pricePerHour} onChange={e => setNewEquip({ ...newEquip, pricePerHour: e.target.value })} style={inputS} /></div>
                            <div><label style={labelS}>Location</label><select value={newEquip.location} onChange={e => setNewEquip({ ...newEquip, location: e.target.value })} style={inputS}>{LOCATIONS.slice(1).map(l => <option key={l}>{l}</option>)}</select></div>
                            <div><label style={labelS}>Delivery Available</label><select value={newEquip.deliveryAvailable} onChange={e => setNewEquip({ ...newEquip, deliveryAvailable: e.target.value === 'true' })} style={inputS}><option value="true">Yes</option><option value="false">No</option></select></div>
                            <div style={{ gridColumn: '1/-1' }}><label style={labelS}>Attachments</label>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{ATTACHMENTS.map(a => (
                                    <label key={a} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, cursor: 'pointer', background: newEquip.attachments.includes(a) ? C.green + '22' : C.cream, padding: '4px 10px', borderRadius: 8 }}>
                                        <input type="checkbox" checked={newEquip.attachments.includes(a)} onChange={() => setNewEquip({ ...newEquip, attachments: newEquip.attachments.includes(a) ? newEquip.attachments.filter(x => x !== a) : [...newEquip.attachments, a] })} style={{ accentColor: C.green }} />{a}
                                    </label>
                                ))}</div>
                            </div>
                            <div style={{ gridColumn: '1/-1' }}><label style={labelS}>Photos (min 3 — front, side, engine)</label><input type="file" multiple accept="image/*" style={inputS} /><p style={{ fontSize: 11, color: C.gray, marginTop: 4 }}>Upload at least 3 photos. All media will be timestamped.</p></div>
                            <div style={{ gridColumn: '1/-1' }}><label style={labelS}>Pre-rental Video</label><input type="file" accept="video/*" style={inputS} /><p style={{ fontSize: 11, color: C.gray, marginTop: 4 }}>Upload a short video showing equipment condition (stored as evidence).</p></div>
                            <div style={{ gridColumn: '1/-1', display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                                <button onClick={() => setShowAddForm(false)} style={{ background: C.lightGray, color: C.gray, border: 'none', padding: '9px 20px', borderRadius: 10, cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
                                <button className="btn-pop" onClick={addEquipment} style={{ background: C.green, color: C.white, border: 'none', padding: '9px 24px', borderRadius: 10, cursor: 'pointer', fontWeight: 600 }}>List Equipment</button>
                            </div>
                        </div>
                    )}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {equipmentData.map(eq => (
                            <div key={eq.id} style={{ border: `1.5px solid ${C.lightGray}`, borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                                <img src={getEquipImage(eq.type, eq.name)} alt={eq.name} style={{ width: 80, height: 56, objectFit: 'cover', borderRadius: 8 }} />
                                <div style={{ flex: 1, minWidth: 150 }}>
                                    <h4 style={{ fontSize: 15, color: C.greenDark }}>{eq.name}</h4>
                                    <p style={{ fontSize: 12, color: C.gray }}>{eq.type} {'\u00B7'} {'\u20B9'}{eq.pricePerDay || eq.price}/day {'\u00B7'} {eq.location} {'\u00B7'} {eq.condition}</p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <StatusBadge status={eq.adminStatus} />
                                    {eq.adminNote && <p style={{ fontSize: 11, color: C.brown, marginTop: 4 }}>{eq.adminNote}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {/* Insurance & Trust */}
            {tab === 'insurance' && (
                <div style={{ background: C.white, borderRadius: 14, padding: 22, boxShadow: '0 2px 10px rgba(0,0,0,.05)' }}>
                    <h3 style={{ color: C.greenDark, marginBottom: 16 }}>Insurance & Trust Score</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="resp-grid">
                        <div style={{ background: C.cream, borderRadius: 14, padding: 20 }}>
                            <h4 style={{ color: C.greenDark, marginBottom: 12 }}>Current Plan</h4>
                            <div style={{ background: C.white, borderRadius: 12, padding: 16, textAlign: 'center' }}>
                                <span style={{ fontSize: 36, display: 'block', marginBottom: 8 }}>{'\u{1F6E1}\uFE0F'}</span>
                                <h3 style={{ color: C.green }}>Basic Plan</h3>
                                <p style={{ fontSize: 24, fontWeight: 800, color: C.greenDark, margin: '8px 0' }}>{'\u20B9'}1,000<span style={{ fontSize: 12, fontWeight: 400, color: C.gray }}>/month</span></p>
                                <p style={{ fontSize: 13, color: C.gray }}>Coverage up to {'\u20B9'}50,000</p>
                            </div>
                            <button className="btn-pop" onClick={() => setPage('Insurance')} style={{ width: '100%', marginTop: 12, background: C.green, color: C.white, border: 'none', padding: '10px', borderRadius: 10, fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>Upgrade Plan</button>
                        </div>
                        <div style={{ background: C.cream, borderRadius: 14, padding: 20 }}>
                            <h4 style={{ color: C.greenDark, marginBottom: 12 }}>Trust Score</h4>
                            <div style={{ textAlign: 'center', marginBottom: 16 }}>
                                <TrustScoreBadge score={user.trustScore || 100} />
                            </div>
                            <div style={{ fontSize: 12, color: C.gray, lineHeight: 1.8 }}>
                                <p>{'\u2705'} On-time returns: 12</p>
                                <p>{'\u2705'} Premium payments: 6</p>
                                <p>{'\u2705'} Positive reviews: 8</p>
                                <p>{'\u274C'} Late returns: 0</p>
                                <p>{'\u274C'} Damage incidents: 0</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* File Claim */}
            {tab === 'claim' && (
                <div style={{ background: C.white, borderRadius: 14, padding: 22, boxShadow: '0 2px 10px rgba(0,0,0,.05)' }}>
                    <h3 style={{ color: C.greenDark, marginBottom: 16 }}>{'\u{1F4CB}'} File a Damage Claim</h3>
                    {!showClaimForm ? (
                        <div style={{ textAlign: 'center', padding: 40 }}>
                            <span style={{ fontSize: 48, display: 'block', marginBottom: 12 }}>{'\u{1F4E4}'}</span>
                            <p style={{ color: C.gray, marginBottom: 16 }}>Report equipment damage and file an insurance claim</p>
                            <button className="btn-pop" onClick={() => setShowClaimForm(true)} style={{ background: C.green, color: C.white, border: 'none', padding: '12px 28px', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>File New Claim</button>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="resp-grid">
                            <div><label style={labelS}>Equipment *</label><select value={claimForm.equipment} onChange={e => setClaimForm({ ...claimForm, equipment: e.target.value })} style={inputS}><option value="">Select equipment</option>{equipmentData.map(eq => <option key={eq.id} value={eq.name}>{eq.name}</option>)}</select></div>
                            <div><label style={labelS}>Damage Type</label><select style={inputS}><option>Minor Damage</option><option>Major Damage</option><option>Total Loss</option></select></div>
                            <div style={{ gridColumn: '1/-1' }}><label style={labelS}>Description *</label><textarea value={claimForm.description} onChange={e => setClaimForm({ ...claimForm, description: e.target.value })} rows={3} placeholder="Describe the damage in detail..." style={{ ...inputS, resize: 'vertical' }} /></div>
                            <div style={{ gridColumn: '1/-1' }}><label style={labelS}>Upload Photos (evidence)</label><input type="file" multiple accept="image/*" style={inputS} /><p style={{ fontSize: 11, color: C.gray, marginTop: 4 }}>Upload timestamped photos of damage</p></div>
                            <div style={{ gridColumn: '1/-1', display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                                <button onClick={() => setShowClaimForm(false)} style={{ background: C.lightGray, color: C.gray, border: 'none', padding: '9px 20px', borderRadius: 10, cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
                                <button className="btn-pop" onClick={submitClaim} style={{ background: C.green, color: C.white, border: 'none', padding: '9px 24px', borderRadius: 10, cursor: 'pointer', fontWeight: 600 }}>Submit Claim</button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default FarmerDashboard;
