import { useState } from 'react';
import { C, inputS, labelS, API_URL } from '../styles';

const AdminLoginPage = ({ setPage, setUser, addToast }) => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.email || !form.password) { addToast('Please enter email and password', 'error'); return; }
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/admin/login`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) { addToast(data.error || 'Admin login failed', 'error'); setLoading(false); return; }
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);
            addToast('Admin login successful!', 'success');
            setPage('Admin Dashboard');
        } catch (err) {
            addToast('Server unavailable. Please try again.', 'error');
        }
        setLoading(false);
    };

    return (
        <div style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', background: `linear-gradient(135deg, ${C.dark} 0%, #2a2a4a 100%)` }}>
            <div style={{ background: C.white, borderRadius: 20, padding: '44px 36px', maxWidth: 420, width: '100%', boxShadow: '0 8px 32px rgba(0,0,0,.15)', animation: 'fadeIn .5s ease' }}>
                <div style={{ textAlign: 'center', marginBottom: 28 }}>
                    <span style={{ fontSize: 44, display: 'block', marginBottom: 8 }}>{'\u{1F6E1}\uFE0F'}</span>
                    <h2 style={{ color: C.dark, fontSize: 24, marginBottom: 4 }}>Admin Login</h2>
                    <p style={{ color: C.gray, fontSize: 14 }}>KrishiYantra Administration Panel</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 14 }}><label style={labelS}>Admin Email *</label><input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="admin@krishiyantra.in" style={inputS} /></div>
                    <div style={{ marginBottom: 14 }}><label style={labelS}>Password *</label><input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Enter admin password" style={inputS} /></div>
                    <button type="submit" disabled={loading} className="btn-pop" style={{ width: '100%', padding: '13px', background: `linear-gradient(135deg,${C.dark},#3a3a5a)`, color: C.white, border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 16, cursor: loading ? 'wait' : 'pointer', marginTop: 8, boxShadow: '0 4px 16px rgba(0,0,0,.2)', transition: 'all .2s', opacity: loading ? .7 : 1 }}>
                        {loading ? 'Verifying...' : '\u{1F512} Admin Login'}
                    </button>
                </form>
                <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: C.gray }}>
                    Farmer account? <span onClick={() => setPage('Login')} style={{ color: C.green, fontWeight: 600, cursor: 'pointer' }}>Login here</span>
                </p>
            </div>
        </div>
    );
};

export default AdminLoginPage;
