import { useState, useEffect } from 'react';

/* ── GLOBAL STYLES ── */
const GlobalStyles = () => (
    <style>{`
    *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
    html { scroll-behavior:smooth; }
    body { font-family:'Lato',sans-serif; background:#FAF3E0; color:#2D3436; overflow-x:hidden; }
    h1,h2,h3,h4,h5 { font-family:'Playfair Display',serif; }
    input,select,textarea,button { font-family:'Lato',sans-serif; }
    @keyframes fadeIn { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
    @keyframes slideIn { from{transform:translateX(100%);opacity:0} to{transform:translateX(0);opacity:1} }
    @keyframes slideOut { from{transform:translateX(0);opacity:1} to{transform:translateX(100%);opacity:0} }
    @keyframes barGrow { from{height:0} to{height:var(--bar-h)} }
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
    .card-hover:hover { transform:translateY(-6px); box-shadow:0 12px 32px rgba(45,106,79,.18)!important; }
    .btn-pop:hover { transform:scale(1.04); }
    .btn-pop:active { transform:scale(.97); }
    @media(max-width:768px){
      .resp-grid { grid-template-columns:1fr!important; }
      .hero-title { font-size:2rem!important; }
      .nav-links { display:none!important; }
      .mobile-menu { display:flex!important; }
      .stat-grid { grid-template-columns:1fr!important; }
      .step-grid { grid-template-columns:1fr 1fr!important; }
      .filter-bar { flex-direction:column!important; }
      .dash-grid { grid-template-columns:1fr!important; }
    }
  `}</style>
);

/* ── COLORS ── */
const C = { green: '#2D6A4F', greenLight: '#40916C', greenDark: '#1B4332', cream: '#FAF3E0', brown: '#8B5E3C', gold: '#C9A97A', goldLight: '#E8D5B0', white: '#FFFFFF', dark: '#1A1A2E', gray: '#6B7280', lightGray: '#E5E7EB', red: '#E63946', orange: '#F4845F' };

/* ── SAMPLE DATA ── */
const EQUIPMENT = [
    { id: 1, name: 'Mahindra Tractor 575 DI', type: 'Tractor', price: 1200, location: 'Pune', rating: 4.2, available: true, icon: '\u{1F69C}', utilization: 78, totalRentals: 34 },
    { id: 2, name: 'John Deere 5310', type: 'Tractor', price: 1500, location: 'Nashik', rating: 4.5, available: true, icon: '\u{1F69C}', utilization: 85, totalRentals: 42 },
    { id: 3, name: 'Kubota Harvester DC-93', type: 'Harvester', price: 2800, location: 'Aurangabad', rating: 3.8, available: false, icon: '\u{1F33E}', utilization: 62, totalRentals: 19 },
    { id: 4, name: 'Shaktiman Rotavator', type: 'Tiller', price: 800, location: 'Nagpur', rating: 4.7, available: true, icon: '\u2699\uFE0F', utilization: 91, totalRentals: 56 },
    { id: 5, name: 'Honda Power Tiller FJ500', type: 'Tiller', price: 600, location: 'Kolhapur', rating: 4.0, available: true, icon: '\u{1F527}', utilization: 70, totalRentals: 28 },
    { id: 6, name: 'Paddy Thresher PT-200', type: 'Thresher', price: 900, location: 'Pune', rating: 4.3, available: true, icon: '\u{1F33F}', utilization: 55, totalRentals: 15 },
];
const LOCATIONS = ['All Locations', 'Pune', 'Nashik', 'Aurangabad', 'Nagpur', 'Kolhapur'];
const TYPES = ['All Types', 'Tractor', 'Harvester', 'Tiller', 'Thresher'];
const CROPS = ['Rice', 'Wheat', 'Sugarcane', 'Cotton', 'Soybean', 'Jowar', 'Bajra', 'Groundnut'];

const initBookings = [
    { id: 1, equipment: 'Mahindra Tractor 575 DI', farmer: 'Rajesh Patil', location: 'Pune', dates: 'Mar 5 \u2013 Mar 8', days: 3, total: 4158, status: 'Confirmed', crop: 'Wheat', landSize: 5 },
    { id: 2, equipment: 'Kubota Harvester DC-93', farmer: 'Sunil Jadhav', location: 'Aurangabad', dates: 'Mar 10 \u2013 Mar 12', days: 2, total: 6104, status: 'In Use', crop: 'Rice', landSize: 8 },
    { id: 3, equipment: 'Power Tiller FJ500', farmer: 'Anita Deshmukh', location: 'Kolhapur', dates: 'Feb 20 \u2013 Feb 22', days: 2, total: 1308, status: 'Completed', crop: 'Sugarcane', landSize: 3 },
    { id: 4, equipment: 'Paddy Thresher PT-200', farmer: 'Manoj Shinde', location: 'Pune', dates: 'Mar 15 \u2013 Mar 17', days: 2, total: 1962, status: 'Pending', crop: 'Jowar', landSize: 4 },
];

/* ── UTILITY COMPONENTS ── */
const Stars = ({ rating }) => {
    const full = Math.floor(rating);
    const half = rating - full >= 0.3;
    return (
        <span style={{ color: C.gold, fontSize: 14, letterSpacing: 2 }}>
            {'\u2605'.repeat(full)}{half ? '\u2BEA' : ''}{'\u2606'.repeat(5 - full - (half ? 1 : 0))}
            <span style={{ color: C.gray, fontSize: 12, marginLeft: 4 }}>{rating}</span>
        </span>
    );
};

const Badge = ({ text, color = C.green }) => (
    <span style={{ background: color + '22', color, fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, letterSpacing: .5 }}>{text}</span>
);

const StatusBadge = ({ status }) => {
    const m = { Pending: C.orange, Confirmed: C.green, 'In Use': '#2196F3', Completed: C.gray, Cancelled: C.red };
    return <Badge text={status} color={m[status] || C.gray} />;
};

const Toast = ({ toasts, removeToast }) => (
    <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {toasts.map(t => (
            <div key={t.id} style={{ animation: t.removing ? 'slideOut .3s forwards' : 'slideIn .35s ease', background: t.type === 'success' ? C.green : t.type === 'error' ? C.red : C.brown, color: C.white, padding: '14px 22px', borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,.18)', display: 'flex', alignItems: 'center', gap: 12, minWidth: 280, maxWidth: 400, fontWeight: 500, fontSize: 14 }}>
                <span style={{ fontSize: 20 }}>{t.type === 'success' ? '\u2705' : t.type === 'error' ? '\u274C' : '\u2139\uFE0F'}</span>
                <span style={{ flex: 1 }}>{t.msg}</span>
                <span onClick={() => removeToast(t.id)} style={{ cursor: 'pointer', opacity: .7, fontSize: 18 }}>{'\u00D7'}</span>
            </div>
        ))}
    </div>
);

const Navbar = ({ page, setPage, user, setUser }) => {
    const [mob, setMob] = useState(false);
    const links = ['Home', 'Equipment', 'Dashboard', 'Booking'];
    const linkStyle = (p) => ({ color: page === p ? C.gold : C.white, fontWeight: page === p ? 700 : 400, cursor: 'pointer', fontSize: 15, padding: '6px 14px', borderRadius: 8, background: page === p ? 'rgba(201,169,122,.15)' : 'transparent', transition: 'all .2s', textDecoration: 'none', letterSpacing: .3 });
    return (
        <nav style={{ background: `linear-gradient(135deg,${C.greenDark},${C.green})`, padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64, position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 16px rgba(0,0,0,.12)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => setPage('Home')}>
                <span style={{ fontSize: 28 }}>{'\u{1F33E}'}</span>
                <span style={{ fontFamily: "'Playfair Display',serif", color: C.gold, fontWeight: 700, fontSize: 20, letterSpacing: 1 }}>KrishiShare</span>
            </div>
            <div className="nav-links" style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                {links.map(l => <span key={l} style={linkStyle(l)} onClick={() => setPage(l)}>{l}</span>)}
                {user ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 16 }}>
                        <span style={{ color: C.goldLight, fontSize: 13 }}>{'\u{1F464}'} {user.name}</span>
                        <button className="btn-pop" onClick={() => setUser(null)} style={{ background: 'rgba(255,255,255,.15)', color: C.white, border: 'none', padding: '6px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 13 }}>Logout</button>
                    </div>
                ) : (
                    <button className="btn-pop" onClick={() => setPage('Login')} style={{ background: C.gold, color: C.greenDark, border: 'none', padding: '8px 20px', borderRadius: 8, cursor: 'pointer', fontWeight: 700, fontSize: 14, marginLeft: 12 }}>Login / Register</button>
                )}
            </div>
            <div className="mobile-menu" style={{ display: 'none', flexDirection: 'column', position: 'relative' }}>
                <button onClick={() => setMob(!mob)} style={{ background: 'none', border: 'none', color: C.white, fontSize: 26, cursor: 'pointer' }}>{'\u2630'}</button>
                {mob && <div style={{ position: 'absolute', top: 40, right: 0, background: C.greenDark, borderRadius: 12, padding: 12, display: 'flex', flexDirection: 'column', gap: 6, minWidth: 160, boxShadow: '0 8px 24px rgba(0,0,0,.25)' }}>
                    {links.map(l => <span key={l} style={{ ...linkStyle(l), display: 'block' }} onClick={() => { setPage(l); setMob(false) }}>{l}</span>)}
                    {!user && <span style={linkStyle('Login')} onClick={() => { setPage('Login'); setMob(false) }}>Login</span>}
                    {user && <span style={{ color: C.white, cursor: 'pointer', padding: '6px 14px', fontSize: 14 }} onClick={() => { setUser(null); setMob(false) }}>Logout</span>}
                </div>}
            </div>
        </nav>
    );
};

/* ── HOME PAGE ── */
const HomePage = ({ setPage }) => {
    const stats = [
        { num: '146M', label: 'Farmers in India', icon: '\u{1F468}\u200D\u{1F33E}' },
        { num: '85%', label: 'Lack Equipment Access', icon: '\u{1F517}' },
        { num: '30\u201350%', label: 'Cost Savings', icon: '\u{1F4B0}' },
    ];
    const steps = [
        { n: 1, title: 'Register', desc: 'Create your free account as a farmer or equipment owner', icon: '\u{1F4DD}' },
        { n: 2, title: 'List Equipment', desc: 'Owners list their machinery with pricing and availability', icon: '\u{1F4CB}' },
        { n: 3, title: 'Search & Discover', desc: 'Farmers browse verified equipment near their location', icon: '\u{1F50D}' },
        { n: 4, title: 'Book a Slot', desc: 'Reserve equipment for the dates you need it', icon: '\u{1F4C5}' },
        { n: 5, title: 'Pre-Inspection', desc: 'Both parties verify equipment condition before handover', icon: '\u{1F50E}' },
        { n: 6, title: 'Use Equipment', desc: 'Farmer uses the equipment for their agricultural needs', icon: '\u{1F331}' },
        { n: 7, title: 'Return & Inspect', desc: 'Equipment returned and condition verified by owner', icon: '\u2705' },
        { n: 8, title: 'Payment Settlement', desc: 'Fair, transparent payment processed securely', icon: '\u{1F4B3}' },
    ];
    return (
        <div style={{ animation: 'fadeIn .6s ease' }}>
            <section style={{ background: `linear-gradient(135deg, ${C.greenDark} 0%, ${C.green} 50%, ${C.greenLight} 100%)`, padding: '80px 24px 90px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 20% 80%, rgba(201,169,122,.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,.05) 0%, transparent 50%)' }} />
                <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto' }}>
                    <span style={{ fontSize: 52, display: 'block', marginBottom: 16, animation: 'float 3s ease-in-out infinite' }}>{'\u{1F33E}'}</span>
                    <h1 className="hero-title" style={{ fontFamily: "'Playfair Display',serif", color: C.white, fontSize: '3rem', fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
                        Fair. Transparent. Accessible<br /><span style={{ color: C.gold }}>Farm Equipment Rental</span>
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,.85)', fontSize: 18, maxWidth: 560, margin: '0 auto 36px', lineHeight: 1.7, fontWeight: 300 }}>
                        Connecting equipment owners with small-scale farmers across India. Affordable access to modern agricultural machinery {'\u2014'} right at your fingertips.
                    </p>
                    <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button className="btn-pop" onClick={() => setPage('Login')} style={{ background: C.gold, color: C.greenDark, border: 'none', padding: '14px 36px', borderRadius: 12, fontWeight: 700, fontSize: 16, cursor: 'pointer', transition: 'all .2s', boxShadow: '0 4px 16px rgba(201,169,122,.4)' }}>{'\u{1F33E}'} Register as Farmer</button>
                        <button className="btn-pop" onClick={() => setPage('Login')} style={{ background: 'rgba(255,255,255,.12)', color: C.white, border: '2px solid rgba(255,255,255,.3)', padding: '14px 36px', borderRadius: 12, fontWeight: 700, fontSize: 16, cursor: 'pointer', transition: 'all .2s', backdropFilter: 'blur(8px)' }}>{'\u{1F69C}'} List Your Equipment</button>
                    </div>
                </div>
            </section>
            <section style={{ maxWidth: 960, margin: '-50px auto 0', padding: '0 24px', position: 'relative', zIndex: 2 }}>
                <div className="stat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
                    {stats.map((s, i) => (
                        <div key={i} className="card-hover" style={{ background: C.white, borderRadius: 16, padding: '32px 24px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,.08)', transition: 'all .3s', animation: `fadeIn .5s ease ${i * .15}s both` }}>
                            <span style={{ fontSize: 40, display: 'block', marginBottom: 12 }}>{s.icon}</span>
                            <h3 style={{ fontSize: 32, color: C.green, fontWeight: 800 }}>{s.num}</h3>
                            <p style={{ color: C.gray, fontSize: 14, marginTop: 4, fontWeight: 500 }}>{s.label}</p>
                        </div>
                    ))}
                </div>
            </section>
            <section style={{ maxWidth: 1000, margin: '0 auto', padding: '72px 24px 80px' }}>
                <h2 style={{ textAlign: 'center', fontSize: '2.2rem', color: C.greenDark, marginBottom: 8 }}>How It Works</h2>
                <p style={{ textAlign: 'center', color: C.gray, marginBottom: 44, fontSize: 16 }}>Simple, transparent process from registration to payment</p>
                <div className="step-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
                    {steps.map((s, i) => (
                        <div key={i} className="card-hover" style={{ background: C.white, borderRadius: 14, padding: '28px 18px', textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,.06)', transition: 'all .3s', position: 'relative', animation: `fadeIn .5s ease ${i * .08}s both` }}>
                            <div style={{ width: 36, height: 36, borderRadius: '50%', background: `linear-gradient(135deg,${C.green},${C.greenLight})`, color: C.white, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, marginBottom: 10 }}>{s.n}</div>
                            <span style={{ fontSize: 30, display: 'block', marginBottom: 8 }}>{s.icon}</span>
                            <h4 style={{ color: C.greenDark, fontSize: 15, marginBottom: 6 }}>{s.title}</h4>
                            <p style={{ color: C.gray, fontSize: 12, lineHeight: 1.5 }}>{s.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
            <footer style={{ background: C.greenDark, color: 'rgba(255,255,255,.7)', textAlign: 'center', padding: '32px 24px', fontSize: 13 }}>
                <span style={{ color: C.gold, fontWeight: 700, fontFamily: "'Playfair Display',serif", fontSize: 18 }}>{'\u{1F33E}'} KrishiShare</span>
                <p style={{ marginTop: 8 }}>{'\u00A9'} 2026 KrishiShare {'\u2014'} Empowering Indian Agriculture. Fair. Transparent. Accessible.</p>
            </footer>
        </div>
    );
};

/* ── EQUIPMENT PAGE ── */
const EquipmentPage = ({ setPage, setSelectedEquip, addToast, equipmentData }) => {
    const [search, setSearch] = useState('');
    const [typeF, setTypeF] = useState('All Types');
    const [locF, setLocF] = useState('All Locations');
    const [priceF, setPriceF] = useState(5000);
    const filtered = equipmentData.filter(e => {
        if (search && !e.name.toLowerCase().includes(search.toLowerCase())) return false;
        if (typeF !== 'All Types' && e.type !== typeF) return false;
        if (locF !== 'All Locations' && e.location !== locF) return false;
        if (e.price > priceF) return false;
        return true;
    });
    const inputS = { padding: '10px 14px', border: `1.5px solid ${C.lightGray}`, borderRadius: 10, fontSize: 14, outline: 'none', background: C.white, transition: 'border .2s' };
    return (
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '36px 24px', animation: 'fadeIn .5s ease' }}>
            <h2 style={{ fontSize: '2rem', color: C.greenDark, marginBottom: 6 }}>Browse Equipment</h2>
            <p style={{ color: C.gray, marginBottom: 28, fontSize: 15 }}>Find verified farm machinery near you at fair prices</p>
            <div className="filter-bar" style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap', alignItems: 'center', background: C.white, padding: '18px 20px', borderRadius: 14, boxShadow: '0 2px 10px rgba(0,0,0,.05)' }}>
                <input placeholder={'\u{1F50D} Search equipment\u2026'} value={search} onChange={e => setSearch(e.target.value)} style={{ ...inputS, flex: '1 1 200px', minWidth: 160 }} />
                <select value={typeF} onChange={e => setTypeF(e.target.value)} style={{ ...inputS, cursor: 'pointer' }}>{TYPES.map(t => <option key={t}>{t}</option>)}</select>
                <select value={locF} onChange={e => setLocF(e.target.value)} style={{ ...inputS, cursor: 'pointer' }}>{LOCATIONS.map(l => <option key={l}>{l}</option>)}</select>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 13, color: C.gray, whiteSpace: 'nowrap' }}>Max {'\u20B9'}{priceF}/day</span>
                    <input type="range" min={300} max={5000} step={100} value={priceF} onChange={e => setPriceF(Number(e.target.value))} style={{ width: 120, accentColor: C.green }} />
                </div>
            </div>
            <div className="resp-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }}>
                {filtered.map((eq, i) => (
                    <div key={eq.id} className="card-hover" style={{ background: C.white, borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 14px rgba(0,0,0,.06)', transition: 'all .3s', animation: `fadeIn .4s ease ${i * .07}s both` }}>
                        <div style={{ background: `linear-gradient(135deg,${C.green}15,${C.greenLight}10)`, padding: '28px 20px', textAlign: 'center', borderBottom: `1px solid ${C.lightGray}` }}>
                            <span style={{ fontSize: 52, display: 'block', marginBottom: 4 }}>{eq.icon}</span>
                            <Badge text={'\u2713 Verified Owner'} color={C.green} />
                        </div>
                        <div style={{ padding: '20px' }}>
                            <h4 style={{ color: C.greenDark, fontSize: 16, marginBottom: 6 }}>{eq.name}</h4>
                            <Stars rating={eq.rating} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, marginBottom: 6 }}>
                                <span style={{ fontSize: 13, color: C.gray }}>{'\u{1F4CD}'} {eq.location}</span>
                                {eq.available ? <Badge text="Available" color={C.green} /> : <Badge text="Booked" color={C.red} />}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 }}>
                                <span style={{ fontSize: 22, fontWeight: 800, color: C.green }}>{'\u20B9'}{eq.price.toLocaleString()}<span style={{ fontSize: 13, fontWeight: 400, color: C.gray }}>/day</span></span>
                                <button className="btn-pop" disabled={!eq.available} onClick={() => { setSelectedEquip(eq); setPage('Booking') }} style={{ background: eq.available ? C.green : C.lightGray, color: eq.available ? C.white : C.gray, border: 'none', padding: '9px 20px', borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: eq.available ? 'pointer' : 'not-allowed', transition: 'all .2s' }}>
                                    {eq.available ? 'Book Now \u2192' : 'Unavailable'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {filtered.length === 0 && <div style={{ textAlign: 'center', padding: 60, color: C.gray }}><span style={{ fontSize: 48, display: 'block', marginBottom: 12 }}>{'\u{1F50D}'}</span>No equipment matches your filters. Try adjusting your search.</div>}
        </div>
    );
};

/* ── BOOKING PAGE ── */
const BookingPage = ({ selectedEquip, setPage, addToast, bookings, setBookings }) => {
    const today = new Date();
    const [month, setMonth] = useState(today.getMonth());
    const [year] = useState(today.getFullYear());
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [form, setForm] = useState({ name: '', landSize: '', crop: CROPS[0] });
    if (!selectedEquip) return <div style={{ textAlign: 'center', padding: 80 }}><h3 style={{ color: C.gray }}>No equipment selected</h3><button className="btn-pop" onClick={() => setPage('Equipment')} style={{ marginTop: 16, background: C.green, color: C.white, border: 'none', padding: '10px 28px', borderRadius: 10, cursor: 'pointer', fontWeight: 600 }}>Browse Equipment</button></div>;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const isSelected = (d) => { if (!startDate) return false; const dt = new Date(year, month, d).getTime(); if (!endDate) return dt === startDate.getTime(); return dt >= startDate.getTime() && dt <= endDate.getTime(); };
    const isStart = (d) => startDate && new Date(year, month, d).getTime() === startDate.getTime();
    const isEnd = (d) => endDate && new Date(year, month, d).getTime() === endDate.getTime();
    const handleDay = (d) => { const dt = new Date(year, month, d); if (!startDate || (startDate && endDate)) { setStartDate(dt); setEndDate(null); } else if (dt > startDate) { setEndDate(dt); } else { setStartDate(dt); setEndDate(null); } };
    const days = Math.max(1, startDate && endDate ? Math.round((endDate - startDate) / 86400000) + 1 : 1);
    const rental = selectedEquip.price * days;
    const deposit = Math.round(selectedEquip.price * 0.5);
    const platformFee = Math.round(rental * 0.06);
    const total = rental + deposit + platformFee;
    const handleBook = () => {
        if (!form.name || !form.landSize || !startDate) { addToast('Please fill all fields and select dates', 'error'); return; }
        const newB = { id: Date.now(), equipment: selectedEquip.name, farmer: form.name, location: selectedEquip.location, dates: `${startDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })} \u2013 ${(endDate || startDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}`, days, total, status: 'Pending', crop: form.crop, landSize: Number(form.landSize) };
        setBookings([newB, ...bookings]);
        addToast(`Booking confirmed for ${selectedEquip.name}! Total: \u20B9${total.toLocaleString()}`, 'success');
        setPage('Dashboard');
    };
    const inputS = { width: '100%', padding: '11px 14px', border: `1.5px solid ${C.lightGray}`, borderRadius: 10, fontSize: 14, outline: 'none', background: C.white };
    const labelS = { fontSize: 13, fontWeight: 600, color: C.greenDark, marginBottom: 4, display: 'block' };
    return (
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '36px 24px', animation: 'fadeIn .5s ease' }}>
            <button onClick={() => setPage('Equipment')} style={{ background: 'none', border: 'none', color: C.green, cursor: 'pointer', fontSize: 14, fontWeight: 600, marginBottom: 18 }}>{'\u2190'} Back to Equipment</button>
            <h2 style={{ fontSize: '1.8rem', color: C.greenDark, marginBottom: 28 }}>Book Equipment</h2>
            <div className="resp-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
                <div>
                    <div style={{ background: C.white, borderRadius: 14, padding: 20, boxShadow: '0 2px 10px rgba(0,0,0,.05)', marginBottom: 22 }}>
                        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                            <span style={{ fontSize: 42 }}>{selectedEquip.icon}</span>
                            <div>
                                <h4 style={{ color: C.greenDark }}>{selectedEquip.name}</h4>
                                <Stars rating={selectedEquip.rating} />
                                <p style={{ color: C.green, fontWeight: 700, fontSize: 18, marginTop: 4 }}>{'\u20B9'}{selectedEquip.price.toLocaleString()}/day</p>
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
                        <label style={labelS}>Farmer Name *</label>
                        <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Enter your full name" style={{ ...inputS, marginBottom: 14 }} />
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
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: C.gray }}>Rental Fee ({days} day{days > 1 ? 's' : ''} {'\u00D7'} {'\u20B9'}{selectedEquip.price.toLocaleString()})</span><span style={{ fontWeight: 600 }}>{'\u20B9'}{rental.toLocaleString()}</span></div>
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

/* ── DASHBOARD ── */
const Dashboard = ({ bookings, setBookings, addToast, equipmentData, setEquipmentData, user }) => {
    const [role, setRole] = useState(user?.role || 'Farmer');
    const [showAddForm, setShowAddForm] = useState(false);
    const [newEquip, setNewEquip] = useState({ name: '', type: 'Tractor', price: '', location: 'Pune', rating: '4.0' });
    const [statusFilter, setStatusFilter] = useState('All');
    const cancelBooking = (id) => { setBookings(bookings.map(b => b.id === id ? { ...b, status: 'Cancelled' } : b)); addToast('Booking cancelled. Slot released successfully.', 'info'); };
    const addEquipment = () => {
        if (!newEquip.name || !newEquip.price) { addToast('Please fill equipment name and price', 'error'); return; }
        const eq = { id: Date.now(), name: newEquip.name, type: newEquip.type, price: Number(newEquip.price), location: newEquip.location, rating: Number(newEquip.rating), available: true, icon: newEquip.type === 'Tractor' ? '\u{1F69C}' : newEquip.type === 'Harvester' ? '\u{1F33E}' : newEquip.type === 'Tiller' ? '\u2699\uFE0F' : '\u{1F33F}', utilization: 0, totalRentals: 0 };
        setEquipmentData([...equipmentData, eq]); setShowAddForm(false); setNewEquip({ name: '', type: 'Tractor', price: '', location: 'Pune', rating: '4.0' }); addToast(`${eq.name} listed successfully!`, 'success');
    };
    const filteredBookings = statusFilter === 'All' ? bookings : bookings.filter(b => b.status === statusFilter);
    const monthlyIncome = bookings.filter(b => b.status !== 'Cancelled').reduce((s, b) => s + b.total, 0);
    const inputS = { width: '100%', padding: '10px 14px', border: `1.5px solid ${C.lightGray}`, borderRadius: 10, fontSize: 14, outline: 'none', background: C.white };
    const labelS = { fontSize: 13, fontWeight: 600, color: C.greenDark, marginBottom: 4, display: 'block' };
    const tabS = (active) => ({ padding: '8px 20px', borderRadius: 10, border: 'none', fontWeight: 600, fontSize: 14, cursor: 'pointer', transition: 'all .2s', background: active ? C.green : C.white, color: active ? C.white : C.gray, boxShadow: active ? '0 2px 8px rgba(45,106,79,.25)' : 'none' });
    return (
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '36px 24px', animation: 'fadeIn .5s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
                <h2 style={{ fontSize: '1.8rem', color: C.greenDark }}>Dashboard</h2>
                <div style={{ display: 'flex', gap: 6, background: C.white, padding: 4, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,.05)' }}>
                    {['Farmer', 'Equipment Owner', 'Admin'].map(r => (<button key={r} style={tabS(role === r)} onClick={() => setRole(r)}>{r}</button>))}
                </div>
            </div>
            {role === 'Farmer' && (
                <div>
                    <div className="dash-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 28 }}>
                        {[
                            { label: 'Active Bookings', val: bookings.filter(b => ['Pending', 'Confirmed', 'In Use'].includes(b.status)).length, icon: '\u{1F4C5}', color: C.green },
                            { label: 'Completed', val: bookings.filter(b => b.status === 'Completed').length, icon: '\u2705', color: '#2196F3' },
                            { label: 'Cancelled', val: bookings.filter(b => b.status === 'Cancelled').length, icon: '\u274C', color: C.red },
                            { label: 'Total Spent', val: `\u20B9${bookings.reduce((s, b) => b.status !== 'Cancelled' ? s + b.total : s, 0).toLocaleString()}`, icon: '\u{1F4B0}', color: C.gold },
                        ].map((c, i) => (
                            <div key={i} style={{ background: C.white, borderRadius: 14, padding: '22px 18px', boxShadow: '0 2px 10px rgba(0,0,0,.05)', borderLeft: `4px solid ${c.color}` }}>
                                <span style={{ fontSize: 24 }}>{c.icon}</span>
                                <h3 style={{ color: C.greenDark, fontSize: 22, marginTop: 6 }}>{c.val}</h3>
                                <p style={{ color: C.gray, fontSize: 12, marginTop: 2 }}>{c.label}</p>
                            </div>
                        ))}
                    </div>
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
                </div>
            )}
            {role === 'Equipment Owner' && (
                <div>
                    <div className="dash-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 28 }}>
                        {[
                            { label: 'Total Equipment Listed', val: equipmentData.length, icon: '\u{1F69C}', color: C.green },
                            { label: 'Monthly Income', val: `\u20B9${monthlyIncome.toLocaleString()}`, icon: '\u{1F4C8}', color: C.gold },
                            { label: 'Total Rentals', val: equipmentData.reduce((s, e) => s + e.totalRentals, 0), icon: '\u{1F504}', color: '#2196F3' },
                        ].map((c, i) => (
                            <div key={i} style={{ background: C.white, borderRadius: 14, padding: '22px 18px', boxShadow: '0 2px 10px rgba(0,0,0,.05)', borderLeft: `4px solid ${c.color}` }}>
                                <span style={{ fontSize: 24 }}>{c.icon}</span>
                                <h3 style={{ color: C.greenDark, fontSize: 22, marginTop: 6 }}>{c.val}</h3>
                                <p style={{ color: C.gray, fontSize: 12, marginTop: 2 }}>{c.label}</p>
                            </div>
                        ))}
                    </div>
                    <div style={{ background: C.white, borderRadius: 14, padding: 22, boxShadow: '0 2px 10px rgba(0,0,0,.05)', marginBottom: 22 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <h3 style={{ color: C.greenDark }}>Your Equipment</h3>
                            <button className="btn-pop" onClick={() => setShowAddForm(!showAddForm)} style={{ background: C.green, color: C.white, border: 'none', padding: '9px 20px', borderRadius: 10, fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>+ Add Equipment</button>
                        </div>
                        {showAddForm && (
                            <div style={{ background: C.cream, borderRadius: 12, padding: 20, marginBottom: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                <div><label style={labelS}>Equipment Name *</label><input value={newEquip.name} onChange={e => setNewEquip({ ...newEquip, name: e.target.value })} placeholder="e.g. Mahindra 575 DI" style={inputS} /></div>
                                <div><label style={labelS}>Type</label><select value={newEquip.type} onChange={e => setNewEquip({ ...newEquip, type: e.target.value })} style={inputS}>{TYPES.slice(1).map(t => <option key={t}>{t}</option>)}</select></div>
                                <div><label style={labelS}>Price per Day ({'\u20B9'}) *</label><input type="number" value={newEquip.price} onChange={e => setNewEquip({ ...newEquip, price: e.target.value })} placeholder="e.g. 1200" style={inputS} /></div>
                                <div><label style={labelS}>Location</label><select value={newEquip.location} onChange={e => setNewEquip({ ...newEquip, location: e.target.value })} style={inputS}>{LOCATIONS.slice(1).map(l => <option key={l}>{l}</option>)}</select></div>
                                <div style={{ gridColumn: '1/-1', display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                                    <button onClick={() => setShowAddForm(false)} style={{ background: C.lightGray, color: C.gray, border: 'none', padding: '9px 20px', borderRadius: 10, cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
                                    <button className="btn-pop" onClick={addEquipment} style={{ background: C.green, color: C.white, border: 'none', padding: '9px 24px', borderRadius: 10, cursor: 'pointer', fontWeight: 600 }}>List Equipment</button>
                                </div>
                            </div>
                        )}
                        <div className="resp-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
                            {equipmentData.map(eq => (
                                <div key={eq.id} style={{ border: `1.5px solid ${C.lightGray}`, borderRadius: 12, padding: 16 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                                        <span style={{ fontSize: 28 }}>{eq.icon}</span>
                                        <div><h4 style={{ fontSize: 14, color: C.greenDark }}>{eq.name}</h4><p style={{ fontSize: 12, color: C.gray }}>{'\u20B9'}{eq.price}/day {'\u00B7'} {eq.location}</p></div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}><span style={{ color: C.gray }}>Utilization</span><span style={{ fontWeight: 600, color: C.green }}>{eq.utilization}%</span></div>
                                    <div style={{ background: C.lightGray, borderRadius: 6, height: 6, marginTop: 4, overflow: 'hidden' }}><div style={{ background: `linear-gradient(90deg,${C.green},${C.greenLight})`, width: `${eq.utilization}%`, height: '100%', borderRadius: 6, transition: 'width .5s' }} /></div>
                                    <p style={{ fontSize: 11, color: C.gray, marginTop: 6 }}>{eq.totalRentals} total rentals</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {role === 'Admin' && (
                <div>
                    <div className="dash-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 28 }}>
                        {[
                            { label: 'Total Users', val: 128, icon: '\u{1F465}', color: C.green },
                            { label: 'Active Bookings', val: bookings.filter(b => ['Pending', 'Confirmed', 'In Use'].includes(b.status)).length, icon: '\u{1F4C5}', color: '#2196F3' },
                            { label: 'Equipment Listed', val: equipmentData.length, icon: '\u{1F69C}', color: C.gold },
                            { label: 'Disputes', val: 2, icon: '\u26A0\uFE0F', color: C.red },
                        ].map((c, i) => (
                            <div key={i} className="card-hover" style={{ background: C.white, borderRadius: 14, padding: '22px 18px', boxShadow: '0 2px 10px rgba(0,0,0,.05)', borderLeft: `4px solid ${c.color}`, transition: 'all .3s' }}>
                                <span style={{ fontSize: 24 }}>{c.icon}</span>
                                <h3 style={{ color: C.greenDark, fontSize: 24, marginTop: 6 }}>{c.val}</h3>
                                <p style={{ color: C.gray, fontSize: 12, marginTop: 2 }}>{c.label}</p>
                            </div>
                        ))}
                    </div>
                    <div style={{ background: C.white, borderRadius: 14, padding: 22, boxShadow: '0 2px 10px rgba(0,0,0,.05)', marginBottom: 24 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
                            <h3 style={{ color: C.greenDark }}>All Bookings</h3>
                            <div style={{ display: 'flex', gap: 6 }}>
                                {['All', 'Pending', 'Confirmed', 'In Use', 'Completed', 'Cancelled'].map(s => (
                                    <button key={s} onClick={() => setStatusFilter(s)} style={{ padding: '5px 14px', borderRadius: 8, border: 'none', fontSize: 12, fontWeight: 600, cursor: 'pointer', background: statusFilter === s ? C.green : C.lightGray, color: statusFilter === s ? C.white : C.gray }}>{s}</button>
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
                    <div style={{ background: C.white, borderRadius: 14, padding: 22, boxShadow: '0 2px 10px rgba(0,0,0,.05)' }}>
                        <h3 style={{ color: C.greenDark, marginBottom: 20 }}>Equipment Utilization Report</h3>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 18, height: 220, padding: '0 10px' }}>
                            {equipmentData.map((eq, i) => (
                                <div key={eq.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                                    <span style={{ fontSize: 12, fontWeight: 700, color: C.green }}>{eq.utilization}%</span>
                                    <div style={{ '--bar-h': `${eq.utilization * 1.8}px`, width: '100%', maxWidth: 52, height: eq.utilization * 1.8, background: `linear-gradient(180deg,${C.green},${C.greenLight})`, borderRadius: '8px 8px 0 0', animation: `barGrow .6s ease ${i * .1}s both`, transition: 'height .3s' }} />
                                    <span style={{ fontSize: 10, color: C.gray, textAlign: 'center', lineHeight: 1.2, maxWidth: 60, wordBreak: 'break-word' }}>{eq.name.split(' ').slice(0, 2).join(' ')}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

/* ── LOGIN / REGISTER ── */
const LoginPage = ({ setPage, setUser, addToast }) => {
    const [mode, setMode] = useState('login');
    const [role, setRole] = useState('Farmer');
    const [form, setForm] = useState({ name: '', mobile: '', village: '', password: '' });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (mode === 'register') {
            if (!form.name || !form.mobile || !form.village) { addToast('Please fill all fields', 'error'); return; }
            setUser({ name: form.name, role, mobile: form.mobile, village: form.village });
            addToast(`Welcome, ${form.name}! Registered as ${role}`, 'success');
        } else {
            if (!form.mobile || !form.password) { addToast('Please enter mobile and password', 'error'); return; }
            setUser({ name: 'Rajesh Patil', role: 'Farmer', mobile: form.mobile, village: 'Pune' });
            addToast('Logged in successfully!', 'success');
        }
        setPage('Home');
    };
    const inputS = { width: '100%', padding: '12px 14px', border: `1.5px solid ${C.lightGray}`, borderRadius: 10, fontSize: 14, outline: 'none', background: C.white, transition: 'border .2s' };
    const labelS = { fontSize: 13, fontWeight: 600, color: C.greenDark, marginBottom: 4, display: 'block' };
    return (
        <div style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', background: `linear-gradient(135deg, ${C.cream} 0%, ${C.goldLight}40 100%)` }}>
            <div style={{ background: C.white, borderRadius: 20, padding: '44px 36px', maxWidth: 440, width: '100%', boxShadow: '0 8px 32px rgba(0,0,0,.08)', animation: 'fadeIn .5s ease' }}>
                <div style={{ textAlign: 'center', marginBottom: 28 }}>
                    <span style={{ fontSize: 44, display: 'block', marginBottom: 8 }}>{'\u{1F33E}'}</span>
                    <h2 style={{ color: C.greenDark, fontSize: 24, marginBottom: 4 }}>{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
                    <p style={{ color: C.gray, fontSize: 14 }}>{mode === 'login' ? 'Login to your KrishiShare account' : "Join India's trusted farm equipment platform"}</p>
                </div>
                <div style={{ display: 'flex', marginBottom: 24, background: C.cream, borderRadius: 10, padding: 3 }}>
                    <button onClick={() => setMode('login')} style={{ flex: 1, padding: '10px', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer', transition: 'all .2s', background: mode === 'login' ? C.green : 'transparent', color: mode === 'login' ? C.white : C.gray }}>Login</button>
                    <button onClick={() => setMode('register')} style={{ flex: 1, padding: '10px', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer', transition: 'all .2s', background: mode === 'register' ? C.green : 'transparent', color: mode === 'register' ? C.white : C.gray }}>Register</button>
                </div>
                <form onSubmit={handleSubmit}>
                    {mode === 'register' && (
                        <>
                            <div style={{ marginBottom: 16 }}>
                                <label style={labelS}>I am a:</label>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    {['Farmer', 'Equipment Owner'].map(r => (
                                        <button type="button" key={r} onClick={() => setRole(r)} style={{ flex: 1, padding: '10px', border: `2px solid ${role === r ? C.green : C.lightGray}`, borderRadius: 10, fontWeight: 600, cursor: 'pointer', background: role === r ? C.green + '12' : 'transparent', color: role === r ? C.green : C.gray, transition: 'all .2s', fontSize: 14 }}>
                                            {r === 'Farmer' ? '\u{1F468}\u200D\u{1F33E}' : '\u{1F69C}'} {r}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div style={{ marginBottom: 14 }}><label style={labelS}>Full Name *</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Enter your full name" style={inputS} /></div>
                        </>
                    )}
                    <div style={{ marginBottom: 14 }}><label style={labelS}>Mobile Number *</label><input value={form.mobile} onChange={e => setForm({ ...form, mobile: e.target.value })} placeholder="+91 XXXXX XXXXX" style={inputS} /></div>
                    {mode === 'register' && (
                        <div style={{ marginBottom: 14 }}><label style={labelS}>Village / District *</label><input value={form.village} onChange={e => setForm({ ...form, village: e.target.value })} placeholder="e.g. Pune, Maharashtra" style={inputS} /></div>
                    )}
                    {mode === 'login' && (
                        <div style={{ marginBottom: 14 }}><label style={labelS}>Password *</label><input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Enter your password" style={inputS} /></div>
                    )}
                    <button type="submit" className="btn-pop" style={{ width: '100%', padding: '13px', background: `linear-gradient(135deg,${C.green},${C.greenLight})`, color: C.white, border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 16, cursor: 'pointer', marginTop: 8, boxShadow: '0 4px 16px rgba(45,106,79,.25)', transition: 'all .2s' }}>
                        {mode === 'login' ? '\u{1F513} Login' : '\u{1F33E} Create Account'}
                    </button>
                </form>
                <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: C.gray }}>
                    {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                    <span onClick={() => setMode(mode === 'login' ? 'register' : 'login')} style={{ color: C.green, fontWeight: 600, cursor: 'pointer' }}>{mode === 'login' ? 'Register here' : 'Login here'}</span>
                </p>
            </div>
        </div>
    );
};

/* ── MAIN APP ── */
export default function App() {
    const [page, setPage] = useState('Home');
    const [user, setUser] = useState(null);
    const [selectedEquip, setSelectedEquip] = useState(null);
    const [bookings, setBookings] = useState(initBookings);
    const [equipmentData, setEquipmentData] = useState(EQUIPMENT);
    const [toasts, setToasts] = useState([]);
    const addToast = (msg, type = 'success') => {
        const id = Date.now();
        setToasts(t => [...t, { id, msg, type }]);
        setTimeout(() => { setToasts(t => t.map(x => x.id === id ? { ...x, removing: true } : x)); setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 350); }, 3500);
    };
    const removeToast = (id) => { setToasts(t => t.map(x => x.id === id ? { ...x, removing: true } : x)); setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 350); };
    useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [page]);
    return (
        <div style={{ minHeight: '100vh', background: C.cream }}>
            <GlobalStyles />
            <Toast toasts={toasts} removeToast={removeToast} />
            <Navbar page={page} setPage={setPage} user={user} setUser={setUser} />
            {page === 'Home' && <HomePage setPage={setPage} />}
            {page === 'Equipment' && <EquipmentPage setPage={setPage} setSelectedEquip={setSelectedEquip} addToast={addToast} equipmentData={equipmentData} />}
            {page === 'Booking' && <BookingPage selectedEquip={selectedEquip} setPage={setPage} addToast={addToast} bookings={bookings} setBookings={setBookings} />}
            {page === 'Dashboard' && <Dashboard bookings={bookings} setBookings={setBookings} addToast={addToast} equipmentData={equipmentData} setEquipmentData={setEquipmentData} user={user} />}
            {page === 'Login' && <LoginPage setPage={setPage} setUser={setUser} addToast={addToast} />}
        </div>
    );
}
