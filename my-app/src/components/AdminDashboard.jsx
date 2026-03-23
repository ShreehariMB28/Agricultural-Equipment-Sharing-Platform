import { useState } from 'react';
import { C, inputS, labelS, API_URL } from '../styles';
import { StatusBadge, Badge, TrustScoreBadge } from './Utilities';
import { getEquipImage, ADMIN_STATUSES, SAMPLE_USERS, SAMPLE_CLAIMS } from '../data';

const AdminDashboard = ({ bookings, setBookings, addToast, equipmentData, setEquipmentData, user }) => {
    const [tab, setTab] = useState('users');
    const [statusFilter, setStatusFilter] = useState('All');
    const [editingStatus, setEditingStatus] = useState(null);
    const [statusNote, setStatusNote] = useState('');
    const [newStatus, setNewStatus] = useState('');
    const [users, setUsers] = useState(SAMPLE_USERS);
    const [expandedUser, setExpandedUser] = useState(null);

    const changeAdminStatus = async (eqId) => {
        if (!newStatus) return;
        
        const isAvailable = ['Available', 'Approved & Ready'].includes(newStatus);
        const updateData = { adminStatus: newStatus, adminNote: statusNote, available: isAvailable };
        
        try {
            const res = await fetch(`${API_URL}/equipment/${eqId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateData)
            });
            
            if (res.ok) {
                setEquipmentData(equipmentData.map(e => e.id === eqId ? { ...e, ...updateData } : e));
                addToast(`Status updated to "${newStatus}"`, 'success');
                setEditingStatus(null); setStatusNote(''); setNewStatus('');
            } else {
                addToast('Failed to update equipment status in database', 'error');
            }
        } catch (err) {
            console.error(err);
            addToast('Server error during status update', 'error');
        }
    };
    const toggleSuspend = (userId) => {
        setUsers(users.map(u => u.id === userId ? { ...u, status: u.status === 'Suspended' ? 'Active' : 'Suspended' } : u));
        const u = users.find(x => x.id === userId);
        addToast(`${u.name} ${u.status === 'Suspended' ? 'reinstated' : 'suspended'}`, 'info');
    };
    const filteredBookings = statusFilter === 'All' ? bookings : bookings.filter(b => b.status === statusFilter);
    const tabS = (active) => ({ padding: '8px 20px', borderRadius: 10, border: 'none', fontWeight: 600, fontSize: 14, cursor: 'pointer', transition: 'all .2s', background: active ? C.dark : C.white, color: active ? C.white : C.gray, boxShadow: active ? '0 2px 8px rgba(0,0,0,.15)' : 'none' });

    return (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '36px 24px', animation: 'fadeIn .5s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
                <div>
                    <h2 style={{ fontSize: '1.8rem', color: C.greenDark }}>{'\u{1F6E1}\uFE0F'} Admin Dashboard</h2>
                    <p style={{ color: C.gray, fontSize: 13 }}>KrishiYantra Administration Panel</p>
                </div>
                <Badge text={`Logged in as ${user.name}`} color={C.dark} />
            </div>
            {/* Stats */}
            <div className="dash-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 28 }}>
                {[
                    { label: 'Total Users', val: users.length, icon: '\u{1F465}', color: C.green },
                    { label: 'Active Listings', val: equipmentData.filter(e => e.available).length, icon: '\u{1F69C}', color: '#2196F3' },
                    { label: 'Claims This Month', val: SAMPLE_CLAIMS.filter(c => c.status !== 'Settled').length, icon: '\u{1F4CB}', color: C.gold },
                    { label: 'Suspended', val: users.filter(u => u.status === 'Suspended').length, icon: '\u26A0\uFE0F', color: C.red },
                ].map((c, i) => (
                    <div key={i} className="card-hover" style={{ background: C.white, borderRadius: 14, padding: '22px 18px', boxShadow: '0 2px 10px rgba(0,0,0,.05)', borderLeft: `4px solid ${c.color}`, transition: 'all .3s' }}>
                        <span style={{ fontSize: 24 }}>{c.icon}</span>
                        <h3 style={{ color: C.greenDark, fontSize: 24, marginTop: 6 }}>{c.val}</h3>
                        <p style={{ color: C.gray, fontSize: 12, marginTop: 2 }}>{c.label}</p>
                    </div>
                ))}
            </div>
            {/* Tabs */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 24, background: C.white, padding: 4, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,.05)', flexWrap: 'wrap' }}>
                {[['users', 'All Users'], ['equipment', 'Equipment'], ['claims', 'Insurance Claims'], ['bookings', 'Bookings']].map(([key, label]) => (
                    <button key={key} style={tabS(tab === key)} onClick={() => setTab(key)}>{label}</button>
                ))}
            </div>
            {/* Users Tab */}
            {tab === 'users' && (
                <div style={{ background: C.white, borderRadius: 14, padding: 22, boxShadow: '0 2px 10px rgba(0,0,0,.05)' }}>
                    <h3 style={{ color: C.greenDark, marginBottom: 16 }}>All Registered Farmers</h3>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                            <thead><tr style={{ borderBottom: `2px solid ${C.lightGray}` }}>
                                {['Name', 'Email', 'Phone', 'Type', 'District', 'Land', 'Trust', 'Status', 'Actions'].map(h => <th key={h} style={{ textAlign: 'left', padding: '10px 8px', color: C.gray, fontWeight: 600, fontSize: 11, textTransform: 'uppercase' }}>{h}</th>)}
                            </tr></thead>
                            <tbody>{users.map(u => (
                                <tr key={u.id} style={{ borderBottom: `1px solid ${C.lightGray}15` }}>
                                    <td style={{ padding: '10px 8px', fontWeight: 600 }}>{u.name}</td>
                                    <td style={{ padding: '10px 8px', color: C.gray, fontSize: 12 }}>{u.email}</td>
                                    <td style={{ padding: '10px 8px', fontSize: 12 }}>{u.phone}</td>
                                    <td style={{ padding: '10px 8px' }}><Badge text={u.farmerType} color={C.brown} /></td>
                                    <td style={{ padding: '10px 8px', color: C.gray }}>{u.district}</td>
                                    <td style={{ padding: '10px 8px' }}>{u.landSize} ac</td>
                                    <td style={{ padding: '10px 8px' }}><TrustScoreBadge score={u.trustScore} /></td>
                                    <td style={{ padding: '10px 8px' }}><Badge text={u.status} color={u.status === 'Suspended' ? C.red : C.green} /></td>
                                    <td style={{ padding: '10px 8px' }}>
                                        <div style={{ display: 'flex', gap: 6 }}>
                                            <button onClick={() => toggleSuspend(u.id)} style={{ background: u.status === 'Suspended' ? C.green + '15' : C.red + '15', color: u.status === 'Suspended' ? C.green : C.red, border: 'none', padding: '4px 10px', borderRadius: 6, cursor: 'pointer', fontSize: 11, fontWeight: 600 }}>{u.status === 'Suspended' ? 'Reinstate' : 'Suspend'}</button>
                                            <button onClick={() => setExpandedUser(expandedUser === u.id ? null : u.id)} style={{ background: C.blue + '15', color: C.blue, border: 'none', padding: '4px 10px', borderRadius: 6, cursor: 'pointer', fontSize: 11, fontWeight: 600 }}>Damage History</button>
                                        </div>
                                        {expandedUser === u.id && u.damageHistory.length > 0 && (
                                            <div style={{ marginTop: 8, background: C.cream, borderRadius: 8, padding: 10 }}>
                                                {u.damageHistory.map((d, i) => (
                                                    <div key={i} style={{ fontSize: 11, color: C.gray, marginBottom: 4, display: 'flex', gap: 8 }}>
                                                        <Badge text={d.type} color={d.type === 'Major' ? C.red : C.orange} />
                                                        <span>{d.equip} — {d.desc} ({d.date})</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {expandedUser === u.id && u.damageHistory.length === 0 && <p style={{ fontSize: 11, color: C.green, marginTop: 6 }}>{'\u2705'} No damage history</p>}
                                    </td>
                                </tr>
                            ))}</tbody>
                        </table>
                    </div>
                </div>
            )}
            {/* Equipment Tab */}
            {tab === 'equipment' && (
                <div style={{ background: C.white, borderRadius: 14, padding: 22, boxShadow: '0 2px 10px rgba(0,0,0,.05)' }}>
                    <h3 style={{ color: C.greenDark, marginBottom: 20 }}>All Machines {'\u2014'} Approve & Manage</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {equipmentData.map(eq => (
                            <div key={eq.id} style={{ border: `1.5px solid ${C.lightGray}`, borderRadius: 12, padding: '16px 20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                                    <img src={getEquipImage(eq.type, eq.name)} alt={eq.name} style={{ width: 64, height: 44, objectFit: 'cover', borderRadius: 8 }} />
                                    <div style={{ flex: 1, minWidth: 140 }}>
                                        <h4 style={{ fontSize: 14, color: C.greenDark }}>{eq.name}</h4>
                                        <p style={{ fontSize: 12, color: C.gray }}>{eq.type} {'\u00B7'} {eq.location} {'\u00B7'} {'\u20B9'}{eq.pricePerDay || eq.price}/day {'\u00B7'} {eq.condition || 'Good'}</p>
                                    </div>
                                    <StatusBadge status={eq.adminStatus} />
                                    <button onClick={() => { setEditingStatus(editingStatus === eq.id ? null : eq.id); setNewStatus(eq.adminStatus); setStatusNote(eq.adminNote) }} style={{ background: C.green + '15', color: C.green, border: 'none', padding: '6px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>
                                        {editingStatus === eq.id ? 'Cancel' : 'Change Status'}
                                    </button>
                                </div>
                                {eq.adminNote && editingStatus !== eq.id && <p style={{ fontSize: 12, color: C.brown, marginTop: 6, marginLeft: 78 }}>{'\u{1F4DD}'} {eq.adminNote}</p>}
                                {editingStatus === eq.id && (
                                    <div style={{ marginTop: 12, background: C.cream, borderRadius: 10, padding: 16, display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'flex-end' }}>
                                        <div style={{ flex: '1 1 200px' }}><label style={labelS}>New Status</label><select value={newStatus} onChange={e => setNewStatus(e.target.value)} style={inputS}>{ADMIN_STATUSES.map(s => <option key={s}>{s}</option>)}</select></div>
                                        <div style={{ flex: '1 1 200px' }}><label style={labelS}>Note/Comment</label><input value={statusNote} onChange={e => setStatusNote(e.target.value)} placeholder="e.g. Mechanic assigned: Rajan Patil" style={inputS} /></div>
                                        <button className="btn-pop" onClick={() => changeAdminStatus(eq.id)} style={{ background: C.green, color: C.white, border: 'none', padding: '10px 20px', borderRadius: 10, cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>Update</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {/* Claims Tab */}
            {tab === 'claims' && (
                <div style={{ background: C.white, borderRadius: 14, padding: 22, boxShadow: '0 2px 10px rgba(0,0,0,.05)' }}>
                    <h3 style={{ color: C.greenDark, marginBottom: 16 }}>Insurance Claims</h3>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                            <thead><tr style={{ borderBottom: `2px solid ${C.lightGray}` }}>
                                {['ID', 'Claimant', 'Equipment', 'Date', 'Type', 'Amount', 'Photos', 'Status'].map(h => <th key={h} style={{ textAlign: 'left', padding: '10px 8px', color: C.gray, fontWeight: 600, fontSize: 11, textTransform: 'uppercase' }}>{h}</th>)}
                            </tr></thead>
                            <tbody>{SAMPLE_CLAIMS.map(c => (
                                <tr key={c.id} style={{ borderBottom: `1px solid ${C.lightGray}15` }}>
                                    <td style={{ padding: '10px 8px', fontWeight: 600 }}>#{c.id}</td>
                                    <td style={{ padding: '10px 8px' }}>{c.claimant}</td>
                                    <td style={{ padding: '10px 8px', color: C.gray }}>{c.equipment}</td>
                                    <td style={{ padding: '10px 8px', fontSize: 12 }}>{c.date}</td>
                                    <td style={{ padding: '10px 8px' }}><Badge text={c.type} color={c.type.includes('Major') ? C.red : C.orange} /></td>
                                    <td style={{ padding: '10px 8px', fontWeight: 600, color: C.green }}>{'\u20B9'}{c.amount.toLocaleString()}</td>
                                    <td style={{ padding: '10px 8px' }}>{c.photos} files</td>
                                    <td style={{ padding: '10px 8px' }}><StatusBadge status={c.status} /></td>
                                </tr>
                            ))}</tbody>
                        </table>
                    </div>
                </div>
            )}
            {/* Bookings Tab */}
            {tab === 'bookings' && (
                <div style={{ background: C.white, borderRadius: 14, padding: 22, boxShadow: '0 2px 10px rgba(0,0,0,.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
                        <h3 style={{ color: C.greenDark }}>All Bookings</h3>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                            {['All', 'Pending', 'Confirmed', 'In Use', 'Completed', 'Cancelled'].map(s => (
                                <button key={s} onClick={() => setStatusFilter(s)} style={{ padding: '5px 14px', borderRadius: 8, border: 'none', fontSize: 12, fontWeight: 600, cursor: 'pointer', background: statusFilter === s ? C.dark : C.lightGray, color: statusFilter === s ? C.white : C.gray }}>{s}</button>
                            ))}
                        </div>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                            <thead><tr style={{ borderBottom: `2px solid ${C.lightGray}` }}>
                                {['Equipment', 'Farmer', 'Location', 'Dates', 'Total', 'Status'].map(h => <th key={h} style={{ textAlign: 'left', padding: '10px 12px', color: C.gray, fontWeight: 600, fontSize: 12, textTransform: 'uppercase' }}>{h}</th>)}
                            </tr></thead>
                            <tbody>{filteredBookings.map(b => (
                                <tr key={b.id} style={{ borderBottom: `1px solid ${C.lightGray}15` }}>
                                    <td style={{ padding: '12px' }}>{b.equipment}</td>
                                    <td style={{ padding: '12px' }}>{b.farmer}</td>
                                    <td style={{ padding: '12px', color: C.gray }}>{b.location}</td>
                                    <td style={{ padding: '12px', fontSize: 13 }}>{b.dates}</td>
                                    <td style={{ padding: '12px', fontWeight: 600, color: C.green }}>{'\u20B9'}{b.total.toLocaleString()}</td>
                                    <td style={{ padding: '12px' }}><StatusBadge status={b.status} /></td>
                                </tr>
                            ))}</tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
