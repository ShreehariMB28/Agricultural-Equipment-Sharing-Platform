import { useState } from 'react';
import { C } from '../styles';

const Navbar = ({ page, setPage, user, setUser }) => {
    const [mob, setMob] = useState(false);
    const isAdmin = user?.role === 'admin';
    const farmerLinks = user ? ['Home', 'Equipment', 'Insurance', 'Dashboard'] : ['Home', 'Equipment'];
    const adminLinks = ['Home', 'Admin Dashboard'];
    const links = isAdmin ? adminLinks : farmerLinks;
    const linkStyle = (p) => ({ color: page === p ? C.gold : C.white, fontWeight: page === p ? 700 : 400, cursor: 'pointer', fontSize: 15, padding: '6px 14px', borderRadius: 8, background: page === p ? 'rgba(201,169,122,.15)' : 'transparent', transition: 'all .25s', textDecoration: 'none', letterSpacing: .3 });
    return (
        <nav style={{ background: `linear-gradient(135deg,${C.greenDark},${C.green})`, padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64, position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 16px rgba(0,0,0,.12)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => setPage('Home')}>
                <span style={{ fontSize: 28 }}>{'\u{1F33E}'}</span>
                <span style={{ fontFamily: "'Playfair Display',serif", color: C.gold, fontWeight: 700, fontSize: 20, letterSpacing: 1 }}>KrishiYantra</span>
            </div>
            <div className="nav-links" style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                {links.map(l => <span key={l} className="nav-link" style={linkStyle(l)} onClick={() => setPage(l)}>{l}</span>)}
                {user ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 12 }}>
                        <span style={{ color: C.goldLight, fontSize: 13, fontWeight: 500 }}>{'\u{1F464}'} {user.name}</span>
                        <button className="btn-pop" onClick={() => { setUser(null); localStorage.removeItem('token'); localStorage.removeItem('user'); setPage('Home') }} style={{ background: C.gold, color: C.greenDark, border: 'none', padding: '8px 20px', borderRadius: 8, cursor: 'pointer', fontWeight: 700, fontSize: 14, transition: 'all .25s' }}>Logout</button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', gap: 6, marginLeft: 12 }}>
                        <button className="btn-pop" onClick={() => setPage('Login')} style={{ background: C.gold, color: C.greenDark, border: 'none', padding: '8px 20px', borderRadius: 8, cursor: 'pointer', fontWeight: 700, fontSize: 14, transition: 'all .25s' }}>Farmer Login</button>
                        <button className="btn-pop" onClick={() => setPage('AdminLogin')} style={{ background: 'transparent', color: C.goldLight, border: `1.5px solid ${C.gold}`, padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 13, transition: 'all .25s' }}>Admin</button>
                    </div>
                )}
            </div>
            <div className="mobile-menu" style={{ display: 'none', flexDirection: 'column', position: 'relative' }}>
                <button onClick={() => setMob(!mob)} style={{ background: 'none', border: 'none', color: C.white, fontSize: 26, cursor: 'pointer' }}>{'\u2630'}</button>
                {mob && <div style={{ position: 'absolute', top: 40, right: 0, background: C.greenDark, borderRadius: 12, padding: 12, display: 'flex', flexDirection: 'column', gap: 6, minWidth: 160, boxShadow: '0 8px 24px rgba(0,0,0,.25)' }}>
                    {links.map(l => <span key={l} className="nav-link" style={{ ...linkStyle(l), display: 'block' }} onClick={() => { setPage(l); setMob(false) }}>{l}</span>)}
                    {user ? <span style={{ color: C.white, cursor: 'pointer', padding: '6px 14px', fontSize: 14 }} onClick={() => { setUser(null); localStorage.removeItem('token'); localStorage.removeItem('user'); setMob(false); setPage('Home') }}>Logout</span>
                        : <>
                            <span className="nav-link" style={linkStyle('Login')} onClick={() => { setPage('Login'); setMob(false) }}>Farmer Login</span>
                            <span className="nav-link" style={linkStyle('AdminLogin')} onClick={() => { setPage('AdminLogin'); setMob(false) }}>Admin</span>
                        </>}
                </div>}
            </div>
        </nav>
    );
};

export default Navbar;
