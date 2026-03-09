import { useState } from 'react';
import { C, inputS, labelS, API_URL } from '../styles';

const LoginPage = ({ setPage, setUser, addToast }) => {
    const [mode, setMode] = useState('login');
    const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', landSize: '', district: '', state: '', farmerType: 'Borrower' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (mode === 'register') {
                if (!form.name || !form.email || !form.phone || !form.password) { addToast('Please fill all required fields', 'error'); setLoading(false); return; }
                const res = await fetch(`${API_URL}/register`, {
                    method: 'POST', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(form),
                });
                const data = await res.json();
                if (!res.ok) { addToast(data.error || 'Registration failed', 'error'); setLoading(false); return; }
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                setUser(data.user);
                addToast(`Welcome, ${data.user.name}! Registered successfully`, 'success');
                setPage('Dashboard');
            } else {
                if (!form.email || !form.password) { addToast('Please enter email and password', 'error'); setLoading(false); return; }
                const res = await fetch(`${API_URL}/login`, {
                    method: 'POST', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: form.email, password: form.password }),
                });
                const data = await res.json();
                if (!res.ok) { addToast(data.error || 'Login failed', 'error'); setLoading(false); return; }
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                setUser(data.user);
                addToast('Logged in successfully!', 'success');
                setPage('Dashboard');
            }
        } catch (err) {
            addToast('Server unavailable. Please try again.', 'error');
        }
        setLoading(false);
    };

    return (
        <div style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', background: `linear-gradient(135deg, ${C.cream} 0%, ${C.goldLight}40 100%)` }}>
            <div style={{ background: C.white, borderRadius: 20, padding: '44px 36px', maxWidth: 480, width: '100%', boxShadow: '0 8px 32px rgba(0,0,0,.08)', animation: 'fadeIn .5s ease' }}>
                <div style={{ textAlign: 'center', marginBottom: 28 }}>
                    <span style={{ fontSize: 44, display: 'block', marginBottom: 8 }}>{'\u{1F33E}'}</span>
                    <h2 style={{ color: C.greenDark, fontSize: 24, marginBottom: 4 }}>{mode === 'login' ? 'Farmer Login' : 'Farmer Registration'}</h2>
                    <p style={{ color: C.gray, fontSize: 14 }}>{mode === 'login' ? 'Login to your KrishiYantra account' : "Join India's trusted farm equipment platform"}</p>
                </div>
                <div style={{ display: 'flex', marginBottom: 24, background: C.cream, borderRadius: 10, padding: 3 }}>
                    <button onClick={() => setMode('login')} style={{ flex: 1, padding: '10px', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer', transition: 'all .2s', background: mode === 'login' ? C.green : 'transparent', color: mode === 'login' ? C.white : C.gray }}>Login</button>
                    <button onClick={() => setMode('register')} style={{ flex: 1, padding: '10px', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer', transition: 'all .2s', background: mode === 'register' ? C.green : 'transparent', color: mode === 'register' ? C.white : C.gray }}>Register</button>
                </div>
                <form onSubmit={handleSubmit}>
                    {mode === 'register' && (
                        <div style={{ marginBottom: 14 }}><label style={labelS}>Full Name *</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Enter your full name" style={inputS} /></div>
                    )}
                    <div style={{ marginBottom: 14 }}><label style={labelS}>Email *</label><input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="farmer@example.com" style={inputS} /></div>
                    {mode === 'register' && (
                        <div style={{ marginBottom: 14 }}><label style={labelS}>Phone *</label><input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91 XXXXX XXXXX" style={inputS} /></div>
                    )}
                    <div style={{ marginBottom: 14 }}><label style={labelS}>Password *</label><input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Enter your password" style={inputS} /></div>
                    {mode === 'register' && (
                        <>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                                <div><label style={labelS}>Land Size (acres)</label><input type="number" value={form.landSize} onChange={e => setForm({ ...form, landSize: e.target.value })} placeholder="e.g. 5" style={inputS} /></div>
                                <div><label style={labelS}>Farmer Type *</label><select value={form.farmerType} onChange={e => setForm({ ...form, farmerType: e.target.value })} style={inputS}><option value="Borrower">Borrower</option><option value="Lender">Lender</option><option value="Both">Both</option></select></div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                                <div><label style={labelS}>District</label><input value={form.district} onChange={e => setForm({ ...form, district: e.target.value })} placeholder="e.g. Pune" style={inputS} /></div>
                                <div><label style={labelS}>State</label><input value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} placeholder="e.g. Maharashtra" style={inputS} /></div>
                            </div>
                        </>
                    )}
                    <button type="submit" disabled={loading} className="btn-pop" style={{ width: '100%', padding: '13px', background: `linear-gradient(135deg,${C.green},${C.greenLight})`, color: C.white, border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 16, cursor: loading ? 'wait' : 'pointer', marginTop: 8, boxShadow: '0 4px 16px rgba(45,106,79,.25)', transition: 'all .2s', opacity: loading ? .7 : 1 }}>
                        {loading ? 'Please wait...' : mode === 'login' ? '\u{1F513} Login' : '\u{1F33E} Create Account'}
                    </button>
                </form>
                <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: C.gray }}>
                    {mode === 'login' ? "New user? " : 'Already have an account? '}
                    <span onClick={() => setMode(mode === 'login' ? 'register' : 'login')} style={{ color: C.green, fontWeight: 600, cursor: 'pointer' }}>{mode === 'login' ? 'Register here' : 'Login here'}</span>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
