import { useState } from 'react';
import { C, inputS, labelS } from '../styles';
import { Stars } from './Utilities';
import { getEquipImage, CROPS } from '../data';

const BookingPage = ({ selectedEquip, setPage, addToast, bookings, setBookings, user }) => {
    const today = new Date();
    const [month, setMonth] = useState(today.getMonth());
    const [year] = useState(today.getFullYear());
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [form, setForm] = useState({ name: user?.name || '', landSize: user?.landSize || '', crop: CROPS[0] });
    if (!user) { return <div style={{ textAlign: 'center', padding: 80 }}><h3 style={{ color: C.gray }}>Please login to book equipment</h3><button className="btn-pop" onClick={() => setPage('Login')} style={{ marginTop: 16, background: C.green, color: C.white, border: 'none', padding: '10px 28px', borderRadius: 10, cursor: 'pointer', fontWeight: 600 }}>Login</button></div>; }
    if (!selectedEquip) return <div style={{ textAlign: 'center', padding: 80 }}><h3 style={{ color: C.gray }}>No equipment selected</h3><button className="btn-pop" onClick={() => setPage('Equipment')} style={{ marginTop: 16, background: C.green, color: C.white, border: 'none', padding: '10px 28px', borderRadius: 10, cursor: 'pointer', fontWeight: 600 }}>Browse Equipment</button></div>;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const isSelected = (d) => { if (!startDate) return false; const dt = new Date(year, month, d).getTime(); if (!endDate) return dt === startDate.getTime(); return dt >= startDate.getTime() && dt <= endDate.getTime(); };
    const isStart = (d) => startDate && new Date(year, month, d).getTime() === startDate.getTime();
    const isEnd = (d) => endDate && new Date(year, month, d).getTime() === endDate.getTime();
    const handleDay = (d) => { const dt = new Date(year, month, d); if (!startDate || (startDate && endDate)) { setStartDate(dt); setEndDate(null); } else if (dt > startDate) { setEndDate(dt); } else { setStartDate(dt); setEndDate(null); } };
    const days = Math.max(1, startDate && endDate ? Math.round((endDate - startDate) / 86400000) + 1 : 1);
    const price = selectedEquip.pricePerDay || selectedEquip.price || 0;
    const rental = price * days;
    const deposit = Math.round(price * 0.5);
    const platformFee = Math.round(rental * 0.06);
    const total = rental + deposit + platformFee;
    const handleBook = () => {
        if (!form.landSize || !startDate) { addToast('Please select dates and fill land size', 'error'); return; }
        const newB = { id: Date.now(), equipment: selectedEquip.name, farmer: user.name, location: selectedEquip.location, dates: `${startDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })} \u2013 ${(endDate || startDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}`, days, total, status: 'Pending', crop: form.crop, landSize: Number(form.landSize) };
        setBookings([newB, ...bookings]);
        addToast(`Booking confirmed for ${selectedEquip.name}! Total: \u20B9${total.toLocaleString()}`, 'success');
        setPage('Dashboard');
    };
    return (
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '36px 24px', animation: 'fadeIn .5s ease' }}>
            <button onClick={() => setPage('Equipment')} style={{ background: 'none', border: 'none', color: C.green, cursor: 'pointer', fontSize: 14, fontWeight: 600, marginBottom: 18 }}>{'\u2190'} Back to Equipment</button>
            <h2 style={{ fontSize: '1.8rem', color: C.greenDark, marginBottom: 28 }}>Book Equipment</h2>
            <div className="resp-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
                <div>
                    <div style={{ background: C.white, borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,.05)', marginBottom: 22 }}>
                        <img src={getEquipImage(selectedEquip.type, selectedEquip.name)} alt={selectedEquip.name} style={{ width: '100%', height: 160, objectFit: 'cover' }} />
                        <div style={{ padding: '16px 20px', display: 'flex', gap: 14, alignItems: 'center' }}>
                            <div>
                                <h4 style={{ color: C.greenDark }}>{selectedEquip.name}</h4>
                                <Stars rating={selectedEquip.rating} />
                                <p style={{ color: C.green, fontWeight: 700, fontSize: 18, marginTop: 4 }}>{'\u20B9'}{price.toLocaleString()}/day</p>
                            </div>
                        </div>
                    </div>
                    <div style={{ background: C.white, borderRadius: 14, padding: 20, boxShadow: '0 2px 10px rgba(0,0,0,.05)', marginBottom: 22 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <button onClick={() => setMonth(m => Math.max(today.getMonth(), m - 1))} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: C.green }}>{'\u2039'}</button>
                            <h4 style={{ color: C.greenDark }}>{monthNames[month]} {year}</h4>
                            <button onClick={() => setMonth(m => Math.min(11, m + 1))} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: C.green }}>{'\u203A'}</button>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4, textAlign: 'center' }}>
                            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <span key={d} style={{ fontSize: 11, fontWeight: 700, color: C.gray, padding: 6 }}>{d}</span>)}
                            {Array.from({ length: firstDay }).map((_, i) => <span key={'e' + i} />)}
                            {Array.from({ length: daysInMonth }).map((_, i) => {
                                const d = i + 1; const past = new Date(year, month, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate()); const sel = isSelected(d); const st = isStart(d); const en = isEnd(d); return (
                                    <button key={d} disabled={past} onClick={() => handleDay(d)} style={{ width: 36, height: 36, borderRadius: st || en ? '50%' : sel ? 4 : '50%', border: 'none', background: sel ? (st || en ? C.green : C.green + '22') : 'transparent', color: past ? C.lightGray : sel ? (st || en ? C.white : C.green) : C.dark, fontWeight: sel ? 700 : 400, fontSize: 13, cursor: past ? 'not-allowed' : 'pointer', transition: 'all .15s', margin: '0 auto' }}>{d}</button>
                                );
                            })}
                        </div>
                        {startDate && <p style={{ marginTop: 12, fontSize: 13, color: C.green, fontWeight: 600, textAlign: 'center' }}>{startDate.toLocaleDateString('en-IN')} {endDate ? `\u2192 ${endDate.toLocaleDateString('en-IN')} (${days} days)` : '(select end date)'}</p>}
                    </div>
                    <div style={{ background: C.white, borderRadius: 14, padding: 20, boxShadow: '0 2px 10px rgba(0,0,0,.05)' }}>
                        <div style={{ background: C.cream, borderRadius: 10, padding: '12px 14px', marginBottom: 14 }}>
                            <p style={{ fontSize: 12, color: C.gray }}>Booking as</p>
                            <p style={{ fontWeight: 700, color: C.greenDark }}>{user.name} {'\u00B7'} {user.district || ''} {'\u00B7'} {user.phone || ''}</p>
                        </div>
                        <label style={labelS}>Land Size (acres) *</label>
                        <input type="number" value={form.landSize} onChange={e => setForm({ ...form, landSize: e.target.value })} placeholder="e.g. 5" style={{ ...inputS, marginBottom: 14 }} />
                        <label style={labelS}>Crop Type</label>
                        <select value={form.crop} onChange={e => setForm({ ...form, crop: e.target.value })} style={{ ...inputS }}>{CROPS.map(c => <option key={c}>{c}</option>)}</select>
                    </div>
                </div>
                <div>
                    <div style={{ background: C.white, borderRadius: 14, padding: 24, boxShadow: '0 2px 10px rgba(0,0,0,.05)', position: 'sticky', top: 80 }}>
                        <h3 style={{ color: C.greenDark, marginBottom: 20, fontSize: 18 }}>{'\u{1F4B0}'} Price Breakdown</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: C.gray }}>Rental Fee ({days} day{days > 1 ? 's' : ''} {'\u00D7'} {'\u20B9'}{price.toLocaleString()})</span><span style={{ fontWeight: 600 }}>{'\u20B9'}{rental.toLocaleString()}</span></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: C.gray }}>Security Deposit (refundable)</span><span style={{ fontWeight: 600 }}>{'\u20B9'}{deposit.toLocaleString()}</span></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: C.gray }}>Platform Fee (6%)</span><span style={{ fontWeight: 600 }}>{'\u20B9'}{platformFee.toLocaleString()}</span></div>
                            <hr style={{ border: 'none', borderTop: `1px dashed ${C.lightGray}` }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ fontWeight: 700, fontSize: 17, color: C.greenDark }}>Total</span><span style={{ fontWeight: 800, fontSize: 24, color: C.green }}>{'\u20B9'}{total.toLocaleString()}</span></div>
                        </div>
                        <button className="btn-pop" onClick={handleBook} style={{ width: '100%', marginTop: 24, background: `linear-gradient(135deg,${C.green},${C.greenLight})`, color: C.white, border: 'none', padding: '14px', borderRadius: 12, fontWeight: 700, fontSize: 16, cursor: 'pointer', boxShadow: '0 4px 16px rgba(45,106,79,.3)', transition: 'all .2s' }}>{'\u2705'} Confirm Booking</button>
                        <p style={{ textAlign: 'center', fontSize: 12, color: C.gray, marginTop: 12 }}>By confirming, you agree to the terms of rental</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
