import { useState } from 'react';
import { C, inputS, labelS } from '../styles';
import { TrustScoreBadge } from './Utilities';

const InsurancePage = ({ user, addToast }) => {
    const [calc, setCalc] = useState({ plan: 'Basic', landSize: user?.landSize || 5, frequency: 'Low', equipType: 'Tractor', damageHistory: 0 });
    const plans = [
        { name: 'Basic', monthly: 1000, maxCover: 50000, forLabel: 'Occasional borrowers', color: C.green, icon: '\u{1F33F}' },
        { name: 'Standard', monthly: 3000, maxCover: 200000, forLabel: 'Regular borrowers', color: C.blue, icon: '\u{1F6E1}\uFE0F' },
        { name: 'Premium', monthly: 5000, maxCover: 500000, forLabel: 'Frequent/large farmers', color: C.gold, icon: '\u{1F451}' },
    ];
    const landFactor = calc.landSize <= 2 ? 0.8 : calc.landSize <= 5 ? 1.0 : calc.landSize <= 10 ? 1.2 : 1.5;
    const usageFactor = { Low: 0.8, Medium: 1.0, High: 1.3, 'Very High': 1.6 }[calc.frequency] || 1.0;
    const riskMultiplier = calc.damageHistory === 0 ? 1.0 : calc.damageHistory === 1 ? 1.15 : calc.damageHistory === 2 ? 1.4 : 1.8;
    const basePlan = plans.find(p => p.name === calc.plan);
    const estimatedPremium = Math.round(basePlan.monthly * landFactor * usageFactor * riskMultiplier);
    const claimSteps = [
        { n: 1, title: 'Owner Files Claim', desc: 'Equipment owner reports damage with description', icon: '\u{1F4DD}' },
        { n: 2, title: 'Upload Evidence', desc: 'Upload timestamped photos/video of damage', icon: '\u{1F4F7}' },
        { n: 3, title: 'Mechanic Assigned', desc: 'Platform assigns verified mechanic for assessment', icon: '\u{1F527}' },
        { n: 4, title: 'Platform Review', desc: 'Admin reviews mechanic report and evidence', icon: '\u{1F50D}' },
        { n: 5, title: 'Claim Approved', desc: 'Claim approved and compensation amount determined', icon: '\u2705' },
        { n: 6, title: 'Fund Compensates', desc: 'Insurance fund pays out to equipment owner', icon: '\u{1F4B0}' },
    ];
    const misuseRules = [
        { n: '1st', desc: 'Damage logged in borrower\'s record', icon: '\u{1F4CB}', severity: 'Info' },
        { n: '2nd', desc: 'Flagged within 6 months \u2014 premium increases by 40%', icon: '\u26A0\uFE0F', severity: 'Warning' },
        { n: '3rd', desc: 'Within 12 months \u2014 account suspended pending admin review', icon: '\u{1F6D1}', severity: 'Critical' },
    ];
    return (
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '36px 24px', animation: 'fadeIn .5s ease' }}>
            <h2 style={{ fontSize: '2rem', color: C.greenDark, marginBottom: 6 }}>{'\u{1F6E1}\uFE0F'} Insurance & Protection</h2>
            <p style={{ color: C.gray, marginBottom: 32, fontSize: 15 }}>Protect your equipment rentals with our subscription-based insurance plans</p>
            {/* Plan Cards */}
            <div className="resp-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22, marginBottom: 40 }}>
                {plans.map((p, i) => (
                    <div key={i} className="card-hover" style={{ background: C.white, borderRadius: 16, padding: '28px 24px', boxShadow: '0 4px 20px rgba(0,0,0,.06)', transition: 'all .3s', border: calc.plan === p.name ? `2px solid ${p.color}` : '2px solid transparent', cursor: 'pointer', animation: `fadeIn .4s ease ${i * .1}s both` }} onClick={() => setCalc({ ...calc, plan: p.name })}>
                        <div style={{ textAlign: 'center', marginBottom: 16 }}>
                            <span style={{ fontSize: 36, display: 'block', marginBottom: 8 }}>{p.icon}</span>
                            <h3 style={{ color: p.color, fontSize: 20, marginBottom: 4 }}>{p.name}</h3>
                            <p style={{ color: C.gray, fontSize: 12 }}>{p.forLabel}</p>
                        </div>
                        <div style={{ background: C.cream, borderRadius: 12, padding: 16, textAlign: 'center', marginBottom: 14 }}>
                            <p style={{ fontSize: 28, fontWeight: 800, color: C.greenDark }}>{'\u20B9'}{p.monthly.toLocaleString()}<span style={{ fontSize: 14, fontWeight: 400, color: C.gray }}>/month</span></p>
                        </div>
                        <div style={{ fontSize: 13, color: C.gray }}>
                            <p style={{ marginBottom: 6 }}>{'\u2705'} Coverage up to <strong style={{ color: C.greenDark }}>{'\u20B9'}{p.maxCover.toLocaleString()}</strong></p>
                            <p style={{ marginBottom: 6 }}>{'\u2705'} Damage assessment included</p>
                            <p>{'\u2705'} 24/7 claim support</p>
                        </div>
                        {calc.plan === p.name && <div style={{ textAlign: 'center', marginTop: 12 }}><span style={{ background: p.color, color: C.white, fontSize: 11, fontWeight: 700, padding: '4px 14px', borderRadius: 20 }}>Selected</span></div>}
                    </div>
                ))}
            </div>
            {/* Dynamic Premium Calculator */}
            <div style={{ background: C.white, borderRadius: 16, padding: 28, boxShadow: '0 4px 20px rgba(0,0,0,.06)', marginBottom: 36 }}>
                <h3 style={{ color: C.greenDark, marginBottom: 20, fontSize: 18 }}>{'\u{1F4CA}'} Dynamic Premium Calculator</h3>
                <p style={{ color: C.gray, fontSize: 13, marginBottom: 20 }}>Formula: <code style={{ background: C.cream, padding: '2px 8px', borderRadius: 4, fontSize: 12 }}>Base Plan Price × Land Factor × Usage Factor × Risk History Multiplier</code></p>
                <div className="resp-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16, marginBottom: 24 }}>
                    <div><label style={labelS}>Insurance Plan</label><select value={calc.plan} onChange={e => setCalc({ ...calc, plan: e.target.value })} style={inputS}>{plans.map(p => <option key={p.name}>{p.name}</option>)}</select></div>
                    <div><label style={labelS}>Land Size (acres)</label><input type="number" value={calc.landSize} onChange={e => setCalc({ ...calc, landSize: Number(e.target.value) })} style={inputS} /></div>
                    <div><label style={labelS}>Borrowing Frequency</label><select value={calc.frequency} onChange={e => setCalc({ ...calc, frequency: e.target.value })} style={inputS}><option>Low</option><option>Medium</option><option>High</option><option>Very High</option></select></div>
                    <div><label style={labelS}>Past Damage Incidents</label><input type="number" min={0} max={5} value={calc.damageHistory} onChange={e => setCalc({ ...calc, damageHistory: Number(e.target.value) })} style={inputS} /></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }} className="dash-grid">
                    <div style={{ background: C.cream, borderRadius: 10, padding: '12px', textAlign: 'center' }}><p style={{ fontSize: 11, color: C.gray }}>Base Price</p><p style={{ fontWeight: 700, color: C.greenDark }}>{'\u20B9'}{basePlan.monthly.toLocaleString()}</p></div>
                    <div style={{ background: C.cream, borderRadius: 10, padding: '12px', textAlign: 'center' }}><p style={{ fontSize: 11, color: C.gray }}>Land Factor</p><p style={{ fontWeight: 700, color: C.brown }}>{landFactor}x</p></div>
                    <div style={{ background: C.cream, borderRadius: 10, padding: '12px', textAlign: 'center' }}><p style={{ fontSize: 11, color: C.gray }}>Usage Factor</p><p style={{ fontWeight: 700, color: C.blue }}>{usageFactor}x</p></div>
                    <div style={{ background: C.cream, borderRadius: 10, padding: '12px', textAlign: 'center' }}><p style={{ fontSize: 11, color: C.gray }}>Risk Multiplier</p><p style={{ fontWeight: 700, color: riskMultiplier > 1.2 ? C.red : C.green }}>{riskMultiplier}x</p></div>
                </div>
                <div style={{ background: `linear-gradient(135deg,${C.green},${C.greenLight})`, borderRadius: 14, padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div><p style={{ color: 'rgba(255,255,255,.8)', fontSize: 14 }}>Estimated Monthly Premium</p><p style={{ color: C.white, fontSize: 12, marginTop: 2 }}>Coverage up to {'\u20B9'}{basePlan.maxCover.toLocaleString()}</p></div>
                    <p style={{ fontSize: 32, fontWeight: 800, color: C.white }}>{'\u20B9'}{estimatedPremium.toLocaleString()}<span style={{ fontSize: 14, fontWeight: 400 }}>/month</span></p>
                </div>
            </div>
            {/* Trust Score */}
            {user && (
                <div style={{ background: C.white, borderRadius: 16, padding: 28, boxShadow: '0 4px 20px rgba(0,0,0,.06)', marginBottom: 36 }}>
                    <h3 style={{ color: C.greenDark, marginBottom: 16, fontSize: 18 }}>{'\u2B50'} Your Trust Score</h3>
                    <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
                        <TrustScoreBadge score={user.trustScore || 100} />
                        <div style={{ flex: 1 }}>
                            <p style={{ color: C.gray, fontSize: 13, lineHeight: 1.6, marginBottom: 8 }}>Your Trust Score reflects your rental behavior. Maintain a high score to get better insurance rates and priority access to premium equipment.</p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 8, fontSize: 12 }}>
                                <span style={{ color: C.green }}>{'\u2795'} +2 per safe return</span>
                                <span style={{ color: C.green }}>{'\u2795'} +1 per on-time premium</span>
                                <span style={{ color: C.green }}>{'\u2795'} +3 per positive review</span>
                                <span style={{ color: C.red }}>{'\u2796'} -5 late return</span>
                                <span style={{ color: C.red }}>{'\u2796'} -10 minor damage</span>
                                <span style={{ color: C.red }}>{'\u2796'} -30 major damage</span>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                        {[{ label: 'Excellent', range: '90-100', color: C.green }, { label: 'Good', range: '70-89', color: C.blue }, { label: 'Fair', range: '50-69', color: C.orange }, { label: 'High-Risk', range: '<50', color: C.red }].map((b, i) => (
                            <div key={i} style={{ flex: 1, background: b.color + '12', borderRadius: 8, padding: '8px', textAlign: 'center' }}>
                                <p style={{ fontWeight: 700, fontSize: 12, color: b.color }}>{b.label}</p>
                                <p style={{ fontSize: 10, color: C.gray }}>{b.range}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {/* Claims Flow */}
            <div style={{ background: C.white, borderRadius: 16, padding: 28, boxShadow: '0 4px 20px rgba(0,0,0,.06)', marginBottom: 36 }}>
                <h3 style={{ color: C.greenDark, marginBottom: 20, fontSize: 18 }}>{'\u{1F4CB}'} Damage & Claims Process</h3>
                <div style={{ display: 'flex', gap: 0, alignItems: 'flex-start', overflowX: 'auto', paddingBottom: 8 }}>
                    {claimSteps.map((s, i) => (
                        <div key={i} style={{ textAlign: 'center', minWidth: 140, flex: '1 0 140px', position: 'relative' }}>
                            {i > 0 && <div style={{ position: 'absolute', top: 24, left: 0, width: '50%', height: 3, background: `linear-gradient(90deg,${C.green},${C.greenLight})` }} />}
                            {i < claimSteps.length - 1 && <div style={{ position: 'absolute', top: 24, right: 0, width: '50%', height: 3, background: C.lightGray }} />}
                            <div style={{ width: 48, height: 48, borderRadius: '50%', background: C.green + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', position: 'relative', zIndex: 1, fontSize: 22 }}>{s.icon}</div>
                            <h4 style={{ fontSize: 13, color: C.greenDark, marginBottom: 4 }}>{s.title}</h4>
                            <p style={{ fontSize: 11, color: C.gray, lineHeight: 1.4 }}>{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
            {/* Misuse Rules */}
            <div style={{ background: C.white, borderRadius: 16, padding: 28, boxShadow: '0 4px 20px rgba(0,0,0,.06)' }}>
                <h3 style={{ color: C.greenDark, marginBottom: 20, fontSize: 18 }}>{'\u{1F6A8}'} Misuse & Suspension Rules</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {misuseRules.map((r, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', borderRadius: 12, background: r.severity === 'Critical' ? C.red + '08' : r.severity === 'Warning' ? C.orange + '08' : C.cream }}>
                            <span style={{ fontSize: 28 }}>{r.icon}</span>
                            <div>
                                <p style={{ fontWeight: 700, fontSize: 14, color: r.severity === 'Critical' ? C.red : r.severity === 'Warning' ? C.orange : C.greenDark }}>{r.n} Damage Incident</p>
                                <p style={{ fontSize: 13, color: C.gray }}>{r.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InsurancePage;
