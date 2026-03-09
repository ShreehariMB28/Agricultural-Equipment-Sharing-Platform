import { C } from '../styles';

export const Stars = ({ rating }) => {
    const full = Math.floor(rating);
    const half = rating - full >= 0.3;
    return (
        <span style={{ color: C.gold, fontSize: 14, letterSpacing: 2 }}>
            {'\u2605'.repeat(full)}{half ? '\u2BEA' : ''}{'\u2606'.repeat(5 - full - (half ? 1 : 0))}
            <span style={{ color: C.gray, fontSize: 12, marginLeft: 4 }}>{rating}</span>
        </span>
    );
};

export const Badge = ({ text, color = C.green }) => (
    <span style={{ background: color + '22', color, fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, letterSpacing: .5 }}>{text}</span>
);

export const StatusBadge = ({ status }) => {
    const m = { Pending: C.orange, Confirmed: C.green, 'In Use': '#2196F3', Completed: C.gray, Cancelled: C.red, 'Available': C.green, 'Inspection Pending': C.orange, 'Mechanic Dispatched': '#9C27B0', 'Approved & Ready': C.green, 'Return Inspection Pending': C.orange, 'Mechanic Dispatched for Return Check': '#9C27B0', 'Returned & Cleared': C.gray, 'Under Review': C.orange, 'Approved': C.green, 'Settled': C.gray, 'Rejected': C.red };
    return <Badge text={status} color={m[status] || C.gray} />;
};

export const Toast = ({ toasts, removeToast }) => (
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

export const TrustScoreBadge = ({ score }) => {
    let band, color;
    if (score >= 90) { band = 'Excellent'; color = C.green; }
    else if (score >= 70) { band = 'Good'; color = '#2196F3'; }
    else if (score >= 50) { band = 'Fair'; color = C.orange; }
    else { band = 'High-Risk'; color = C.red; }
    return (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: color + '15', padding: '6px 14px', borderRadius: 20 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: `conic-gradient(${color} ${score * 3.6}deg, ${C.lightGray} 0deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, color }}>{score}</div>
            </div>
            <div>
                <div style={{ fontSize: 11, fontWeight: 700, color }}>{band}</div>
                <div style={{ fontSize: 10, color: C.gray }}>Trust Score</div>
            </div>
        </div>
    );
};
