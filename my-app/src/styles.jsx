/* ── COLORS ── */
export const C = { green: '#2D6A4F', greenLight: '#40916C', greenDark: '#1B4332', cream: '#FAF3E0', brown: '#8B5E3C', gold: '#C9A97A', goldLight: '#E8D5B0', white: '#FFFFFF', dark: '#1A1A2E', gray: '#6B7280', lightGray: '#E5E7EB', red: '#E63946', orange: '#F4845F', blue: '#2196F3', purple: '#9C27B0' };

export const inputS = { width: '100%', padding: '12px 14px', border: `1.5px solid ${C.lightGray}`, borderRadius: 10, fontSize: 14, outline: 'none', background: C.white, transition: 'border .2s' };
export const labelS = { fontSize: 13, fontWeight: 600, color: C.greenDark, marginBottom: 4, display: 'block' };

export const GlobalStyles = () => (
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
    @keyframes modalIn { from{opacity:0;transform:scale(.92)} to{opacity:1;transform:scale(1)} }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.6} }
    .card-hover:hover { transform:translateY(-6px); box-shadow:0 12px 32px rgba(45,106,79,.18)!important; }
    .btn-pop:hover { transform:scale(1.04); }
    .btn-pop:active { transform:scale(.97); }
    .nav-link { position:relative; transition:all .25s ease; }
    .nav-link::after { content:''; position:absolute; bottom:-2px; left:50%; width:0; height:2px; background:#C9A97A; transition:all .3s ease; transform:translateX(-50%); }
    .nav-link:hover::after { width:80%; }
    .nav-link:hover { color:#C9A97A!important; background:rgba(201,169,122,.12)!important; }
    @media(max-width:768px){
      .resp-grid { grid-template-columns:1fr!important; }
      .hero-title { font-size:2rem!important; }
      .nav-links { display:none!important; }
      .mobile-menu { display:flex!important; }
      .stat-grid { grid-template-columns:1fr!important; }
      .step-grid { grid-template-columns:1fr 1fr!important; }
      .filter-bar { flex-direction:column!important; }
      .dash-grid { grid-template-columns:1fr!important; }
      .about-grid { grid-template-columns:1fr!important; }
    }
  `}</style>
);

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
