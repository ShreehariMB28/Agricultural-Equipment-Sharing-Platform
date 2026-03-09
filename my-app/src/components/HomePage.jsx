import { useState } from 'react';
import { C, inputS } from '../styles';

const HomePage = ({ setPage, addToast }) => {
    const [contactForm, setContactForm] = useState({ name: '', mobile: '', message: '' });
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
    const aboutCards = [
        { icon: '\u{1F468}\u200D\u{1F33E}', title: '125M+ Farmers Served', desc: 'Reaching smallholder farmers across every state in India' },
        { icon: '\u2705', title: 'Verified Equipment Only', desc: 'Every machine is inspected and approved before listing' },
        { icon: '\u{1F4B0}', title: 'Transparent Pricing', desc: 'No hidden fees. What you see is what you pay.' },
    ];
    const handleContact = (e) => {
        e.preventDefault();
        if (!contactForm.name || !contactForm.mobile || !contactForm.message) { addToast('Please fill all contact fields', 'error'); return; }
        addToast('Message sent! We will get back to you soon.', 'success');
        setContactForm({ name: '', mobile: '', message: '' });
    };
    return (
        <div style={{ animation: 'fadeIn .6s ease' }}>
            {/* HERO */}
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
                </div>
            </section>
            {/* STATS */}
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
            {/* HOW IT WORKS */}
            <section style={{ maxWidth: 1000, margin: '0 auto', padding: '72px 24px 60px' }}>
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
            {/* ABOUT US */}
            <section style={{ background: C.white, padding: '72px 24px' }}>
                <div style={{ maxWidth: 900, margin: '0 auto' }}>
                    <h2 style={{ textAlign: 'center', fontSize: '2.2rem', color: C.greenDark, marginBottom: 12 }}>About KrishiYantra</h2>
                    <p style={{ textAlign: 'center', color: C.gray, fontSize: 16, lineHeight: 1.8, maxWidth: 700, margin: '0 auto 40px' }}>
                        We are a digital marketplace connecting small and marginal farmers across India with verified equipment owners. Our mission is to make modern farm mechanization accessible, affordable, and transparent for every farmer.
                    </p>
                    <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }}>
                        {aboutCards.map((c, i) => (
                            <div key={i} className="card-hover" style={{ background: C.cream, borderRadius: 16, padding: '32px 22px', textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,.05)', transition: 'all .3s', animation: `fadeIn .5s ease ${i * .12}s both` }}>
                                <span style={{ fontSize: 42, display: 'block', marginBottom: 14 }}>{c.icon}</span>
                                <h4 style={{ color: C.greenDark, fontSize: 16, marginBottom: 8 }}>{c.title}</h4>
                                <p style={{ color: C.gray, fontSize: 13, lineHeight: 1.6 }}>{c.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* CONTACT US */}
            <section style={{ padding: '72px 24px', background: C.cream }}>
                <div style={{ maxWidth: 900, margin: '0 auto' }}>
                    <h2 style={{ textAlign: 'center', fontSize: '2.2rem', color: C.greenDark, marginBottom: 8 }}>Contact Us</h2>
                    <p style={{ textAlign: 'center', color: C.gray, marginBottom: 40, fontSize: 15 }}>Have questions? We are here to help.</p>
                    <div className="resp-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                        <form onSubmit={handleContact} style={{ background: C.white, borderRadius: 16, padding: 28, boxShadow: '0 2px 12px rgba(0,0,0,.05)' }}>
                            <div style={{ marginBottom: 14 }}><label style={{ fontSize: 13, fontWeight: 600, color: C.greenDark, display: 'block', marginBottom: 4 }}>Name</label><input value={contactForm.name} onChange={e => setContactForm({ ...contactForm, name: e.target.value })} placeholder="Your name" style={inputS} /></div>
                            <div style={{ marginBottom: 14 }}><label style={{ fontSize: 13, fontWeight: 600, color: C.greenDark, display: 'block', marginBottom: 4 }}>Mobile Number</label><input value={contactForm.mobile} onChange={e => setContactForm({ ...contactForm, mobile: e.target.value })} placeholder="+91 XXXXX XXXXX" style={inputS} /></div>
                            <div style={{ marginBottom: 14 }}><label style={{ fontSize: 13, fontWeight: 600, color: C.greenDark, display: 'block', marginBottom: 4 }}>Message</label><textarea value={contactForm.message} onChange={e => setContactForm({ ...contactForm, message: e.target.value })} placeholder="How can we help?" rows={4} style={{ ...inputS, resize: 'vertical' }} /></div>
                            <button type="submit" className="btn-pop" style={{ width: '100%', padding: '13px', background: `linear-gradient(135deg,${C.green},${C.greenLight})`, color: C.white, border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: 'pointer', transition: 'all .2s' }}>Send Message</button>
                        </form>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24 }}>
                            {[
                                { icon: '\u{1F4E7}', label: 'Email', val: 'support@krishiyantra.in' },
                                { icon: '\u{1F4DE}', label: 'Phone', val: '1800-XXX-XXXX (Toll Free)' },
                                { icon: '\u{1F4CD}', label: 'Address', val: 'Pune, Maharashtra, India' },
                            ].map((c, i) => (
                                <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                                    <span style={{ fontSize: 28, width: 48, height: 48, background: C.green + '15', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{c.icon}</span>
                                    <div><p style={{ fontWeight: 600, color: C.greenDark, fontSize: 14 }}>{c.label}</p><p style={{ color: C.gray, fontSize: 14 }}>{c.val}</p></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            {/* FOOTER */}
            <footer style={{ background: C.greenDark, color: 'rgba(255,255,255,.7)', textAlign: 'center', padding: '32px 24px', fontSize: 13 }}>
                <span style={{ color: C.gold, fontWeight: 700, fontFamily: "'Playfair Display',serif", fontSize: 18 }}>{'\u{1F33E}'} KrishiYantra</span>
                <p style={{ marginTop: 8 }}>{'\u00A9'} 2026 KrishiYantra {'\u2014'} Empowering Indian Agriculture. Fair. Transparent. Accessible.</p>
            </footer>
        </div>
    );
};

export default HomePage;
