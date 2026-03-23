import { useState } from 'react';
import { C, inputS } from '../styles';
import { Stars, Badge } from './Utilities';
import { getEquipImage, EQUIP_DESC, LOCATIONS, TYPES } from '../data';

const EquipmentModal = ({ eq, onClose, onBook, user }) => {
    if (!eq) return null;
    const age = new Date().getFullYear() - eq.yearOfMfg;
    return (
        <div onClick={onClose} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,.55)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <div onClick={e => e.stopPropagation()} style={{ background: C.white, borderRadius: 20, maxWidth: 640, width: '100%', maxHeight: '90vh', overflow: 'auto', animation: 'modalIn .3s ease', boxShadow: '0 16px 48px rgba(0,0,0,.25)' }}>
                <img src={getEquipImage(eq.type, eq.name, eq.photos)} alt={eq.name} style={{ width: '100%', height: 240, objectFit: 'cover', borderRadius: '20px 20px 0 0' }} />
                <div style={{ padding: '24px 28px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                        <div>
                            <h3 style={{ color: C.greenDark, fontSize: 22, marginBottom: 4 }}>{eq.name}</h3>
                            <Badge text={eq.type} color={C.brown} />
                            <span style={{ marginLeft: 8 }}><Badge text={'\u2713 Verified'} color={C.green} /></span>
                            {eq.brand && <span style={{ marginLeft: 8 }}><Badge text={eq.brand} color={C.blue} /></span>}
                        </div>
                        <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: C.gray }}>{'\u00D7'}</button>
                    </div>
                    <Stars rating={eq.rating} />
                    <p style={{ color: C.gray, fontSize: 14, lineHeight: 1.7, margin: '14px 0' }}>{EQUIP_DESC[eq.name] || 'High-quality farm equipment, well-maintained and ready for use.'}</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, margin: '16px 0' }}>
                        <div style={{ background: C.cream, borderRadius: 10, padding: '10px 12px' }}><p style={{ fontSize: 10, color: C.gray }}>Price/Day</p><p style={{ fontWeight: 700, color: C.green, fontSize: 16 }}>{'\u20B9'}{eq.pricePerDay?.toLocaleString()}</p></div>
                        <div style={{ background: C.cream, borderRadius: 10, padding: '10px 12px' }}><p style={{ fontSize: 10, color: C.gray }}>Price/Hour</p><p style={{ fontWeight: 700, color: C.brown, fontSize: 16 }}>{'\u20B9'}{eq.pricePerHour?.toLocaleString()}</p></div>
                        <div style={{ background: C.cream, borderRadius: 10, padding: '10px 12px' }}><p style={{ fontSize: 10, color: C.gray }}>Location</p><p style={{ fontWeight: 600, color: C.dark, fontSize: 13 }}>{'\u{1F4CD}'} {eq.district}</p></div>
                        <div style={{ background: C.cream, borderRadius: 10, padding: '10px 12px' }}><p style={{ fontSize: 10, color: C.gray }}>Age</p><p style={{ fontWeight: 600, fontSize: 13 }}>{age} years old</p></div>
                        <div style={{ background: C.cream, borderRadius: 10, padding: '10px 12px' }}><p style={{ fontSize: 10, color: C.gray }}>Condition</p><p style={{ fontWeight: 600, fontSize: 13, color: eq.condition === 'Excellent' ? C.green : eq.condition === 'Good' ? C.blue : C.orange }}>{eq.condition}</p></div>
                        <div style={{ background: C.cream, borderRadius: 10, padding: '10px 12px' }}><p style={{ fontSize: 10, color: C.gray }}>Engine Hours</p><p style={{ fontWeight: 600, fontSize: 13 }}>{eq.engineHours?.toLocaleString()} hrs</p></div>
                        {eq.hp > 0 && <div style={{ background: C.cream, borderRadius: 10, padding: '10px 12px' }}><p style={{ fontSize: 10, color: C.gray }}>Horsepower</p><p style={{ fontWeight: 700, fontSize: 13, color: C.greenDark }}>{eq.hp} HP</p></div>}
                        <div style={{ background: C.cream, borderRadius: 10, padding: '10px 12px' }}><p style={{ fontSize: 10, color: C.gray }}>Fuel Type</p><p style={{ fontWeight: 600, fontSize: 13 }}>{eq.fuelType}</p></div>
                        <div style={{ background: C.cream, borderRadius: 10, padding: '10px 12px' }}><p style={{ fontSize: 10, color: C.gray }}>Delivery</p><p style={{ fontWeight: 600, fontSize: 13, color: eq.deliveryAvailable ? C.green : C.red }}>{eq.deliveryAvailable ? 'Yes' : 'No'}</p></div>
                    </div>
                    {eq.attachments?.length > 0 && (
                        <div style={{ marginBottom: 14 }}>
                            <p style={{ fontSize: 12, fontWeight: 600, color: C.greenDark, marginBottom: 6 }}>Attachments Included:</p>
                            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{eq.attachments.map(a => <Badge key={a} text={a} color={C.brown} />)}</div>
                        </div>
                    )}
                    <p style={{ fontSize: 12, color: C.gray, marginBottom: 14 }}>Last Serviced: {eq.lastServiced || 'N/A'} {'\u00B7'} Full Location: {eq.village}, {eq.taluka}, {eq.district}, {eq.state}</p>
                    {eq.available && (
                        <button className="btn-pop" onClick={() => onBook(eq)} style={{ width: '100%', padding: '14px', background: `linear-gradient(135deg,${C.green},${C.greenLight})`, color: C.white, border: 'none', borderRadius: 12, fontWeight: 700, fontSize: 16, cursor: 'pointer', boxShadow: '0 4px 16px rgba(45,106,79,.3)', transition: 'all .2s', marginTop: 8 }}>
                            {user ? '\u{1F4C5} Book Now' : '\u{1F513} Login to Book'}
                        </button>
                    )}
                    {!eq.available && <p style={{ textAlign: 'center', color: C.gray, marginTop: 12, fontSize: 14 }}>This equipment is currently booked. Check back later.</p>}
                </div>
            </div>
        </div>
    );
};

const EquipmentPage = ({ setPage, setSelectedEquip, addToast, equipmentData, user }) => {
    const [search, setSearch] = useState('');
    const [typeF, setTypeF] = useState('All Types');
    const [locF, setLocF] = useState('All Locations');
    const [priceF, setPriceF] = useState(5000);
    const [modalEq, setModalEq] = useState(null);
    const filtered = equipmentData.filter(e => {
        // Only show admin-approved equipment on public browse page
        if (!['Available', 'Approved & Ready'].includes(e.adminStatus)) return false;
        if (search && !e.name.toLowerCase().includes(search.toLowerCase())) return false;
        if (typeF !== 'All Types' && e.type !== typeF) return false;
        if (locF !== 'All Locations' && e.location !== locF) return false;
        if ((e.pricePerDay || e.price) > priceF) return false;
        return true;
    });
    const handleBook = (eq) => {
        if (!user) { addToast('Please login to book equipment', 'error'); setPage('Login'); return; }
        setSelectedEquip(eq); setModalEq(null); setPage('Booking');
    };
    return (
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '36px 24px', animation: 'fadeIn .5s ease' }}>
            <h2 style={{ fontSize: '2rem', color: C.greenDark, marginBottom: 6 }}>Browse Equipment</h2>
            <p style={{ color: C.gray, marginBottom: 28, fontSize: 15 }}>Find verified farm machinery near you at fair prices</p>
            <div className="filter-bar" style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap', alignItems: 'center', background: C.white, padding: '18px 20px', borderRadius: 14, boxShadow: '0 2px 10px rgba(0,0,0,.05)' }}>
                <input placeholder={'\u{1F50D} Search equipment\u2026'} value={search} onChange={e => setSearch(e.target.value)} style={{ ...inputS, flex: '1 1 200px', minWidth: 160 }} />
                <select value={typeF} onChange={e => setTypeF(e.target.value)} style={{ ...inputS, cursor: 'pointer', width: 'auto' }}>{TYPES.map(t => <option key={t}>{t}</option>)}</select>
                <select value={locF} onChange={e => setLocF(e.target.value)} style={{ ...inputS, cursor: 'pointer', width: 'auto' }}>{LOCATIONS.map(l => <option key={l}>{l}</option>)}</select>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 13, color: C.gray, whiteSpace: 'nowrap' }}>Max {'\u20B9'}{priceF}/day</span>
                    <input type="range" min={300} max={5000} step={100} value={priceF} onChange={e => setPriceF(Number(e.target.value))} style={{ width: 120, accentColor: C.green }} />
                </div>
            </div>
            <div className="resp-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }}>
                {filtered.map((eq, i) => {
                    const age = new Date().getFullYear() - (eq.yearOfMfg || 2020);
                    return (
                        <div key={eq.id} className="card-hover" onClick={() => setModalEq(eq)} style={{ background: C.white, borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 14px rgba(0,0,0,.06)', transition: 'all .3s', animation: `fadeIn .4s ease ${i * .07}s both`, cursor: 'pointer' }}>
                            <img src={getEquipImage(eq.type, eq.name, eq.photos)} alt={eq.name} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
                            <div style={{ padding: '16px 20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                                    <h4 style={{ color: C.greenDark, fontSize: 15 }}>{eq.name}</h4>
                                    <Badge text={'\u2713 Verified'} color={C.green} />
                                </div>
                                <Stars rating={eq.rating} />
                                <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
                                    <Badge text={eq.type} color={C.brown} />
                                    <Badge text={eq.condition || 'Good'} color={eq.condition === 'Excellent' ? C.green : C.blue} />
                                    {eq.hp > 0 && <Badge text={`${eq.hp} HP`} color={C.purple} />}
                                    <Badge text={`${age}y old`} color={C.gray} />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, marginBottom: 6 }}>
                                    <span style={{ fontSize: 13, color: C.gray }}>{'\u{1F4CD}'} {eq.location}</span>
                                    {eq.available ? <Badge text="Available" color={C.green} /> : <Badge text="Booked" color={C.red} />}
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                                    <span style={{ fontSize: 20, fontWeight: 800, color: C.green }}>{'\u20B9'}{(eq.pricePerDay || eq.price || 0).toLocaleString()}<span style={{ fontSize: 12, fontWeight: 400, color: C.gray }}>/day</span></span>
                                    <button className="btn-pop" onClick={e => { e.stopPropagation(); handleBook(eq) }} disabled={!eq.available} style={{ background: eq.available ? C.green : C.lightGray, color: eq.available ? C.white : C.gray, border: 'none', padding: '8px 18px', borderRadius: 10, fontWeight: 700, fontSize: 12, cursor: eq.available ? 'pointer' : 'not-allowed', transition: 'all .2s' }}>
                                        {eq.available ? 'Book Now \u2192' : 'Unavailable'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            {filtered.length === 0 && <div style={{ textAlign: 'center', padding: 60, color: C.gray }}><span style={{ fontSize: 48, display: 'block', marginBottom: 12 }}>{'\u{1F50D}'}</span>No equipment matches your filters.</div>}
            {modalEq && <EquipmentModal eq={modalEq} onClose={() => setModalEq(null)} onBook={handleBook} user={user} />}
        </div>
    );
};

export default EquipmentPage;
