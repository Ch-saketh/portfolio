import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Work: React.FC<{ theme: any }> = ({ theme }) => {
  const [sel, setSel] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1, title: "Loan Application", role: "Frontend Developer", color: "#10b981",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
      github: "https://github.com/Ch-saketh/loan-App", view: "https://loanapp-nu.vercel.app/",
      achievement: "Live Production", isLive: true,
      description: "High-conversion digital loan processing application frontend built with React.",
      readme: { 
        problem: "Complexity in digital onboarding leading to high user drop-off rates.", 
        solution: "Built a high-performance React interface with real-time validation and localized UI components.", 
        impact: "Currently live and operational on Vercel for production use." 
      }
    },
    {
      id: 2, title: "QMail: Quantum-Secure", role: "System Architect", color: "#10b981",
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1200&q=80",
      github: "https://github.com/Ch-saketh/Qmail-", achievement: "SIH 2025 Submission",
      description: "Secure email client protecting communication using hybrid Kyber PQC encryption.",
      readme: { 
        problem: "Vulnerability of classical encryption (AES/RSA) to future quantum computer attacks using Shor's algorithm.", 
        solution: "Integrated hybrid layers: Quantum-Secure One-Time Pad with QKD and Kyber PQC encryption.", 
        features: ["Post-Quantum Kyber PQC", "Timed Emails (Auto-expire)", "IBM Cloud QKD Simulation"] 
      }
    },
    {
      id: 3, title: "Quantum E-Auction", role: "Core Developer", color: "#10b981",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&q=80",
      github: "https://github.com/vijayagiduthuri/QKD", achievement: "Won 3rd Prize - AQVH",
      description: "Secure bidding system integrating BB84 protocol for bid confidentiality.",
      readme: { 
        problem: "Lack of bid amount confidentiality in traditional systems enables tampering and unfairness.", 
        solution: "First integration of BB84 quantum cryptography into e-auctions to generate unbreakable keys.", 
        impact: "Secured 3rd Prize at Amaravati Quantum Valley Hackathon 2025." 
      }
    },
    {
      id: 4, title: "Hybrid Rec Engine", role: "AI Engineer", color: "#10b981",
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&q=80",
      github: "https://github.com/Ch-saketh/pagematch2", achievement: "0.1688 Precision",
      description: "ML model combining TF-IDF and LightFM collaborative filtering.",
      readme: { 
        problem: "Challenges in recommending relevant content with sparse user data in large libraries.", 
        solution: "Hybrid approach merging textual metadata analysis with user-interaction patterns.", 
        results: ["Achieved final Precision@5 score of 0.1688 after optimized training", "Significant improvement from initial raw data score of 0.0087"] 
      }
    },
    {
      id: 5, title: "Autopsy-Agent", role: "Full Stack Developer", color: "#10b981",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
      github: "https://github.com/Ch-saketh/Autopsy-Agent", achievement: "Security Research",
      description: "Automated digital forensics agent for complex system analysis and security auditing.",
      readme: { 
        problem: "Manual forensic diagnostics are time-intensive during critical security breaches.", 
        solution: "Automated AI agent that parses system logs and identifying anomalies in real-time.", 
        impact: "Reduces manual effort in digital forensics and speeds up system recovery." 
      }
    },
    {
      id: 6, title: "Civic Issue App", role: "Frontend Lead", color: "#10b981",
      image: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=1200&q=80",
      github: "https://github.com/asatvik1958/quantum_mail_client", achievement: "SIH 2025 Idea",
      description: "Crowdsourced reporting system with smart routing based on location priority.",
      readme: { 
        problem: "Lack of transparency and citizen confusion regarding jurisdictional reporting.", 
        solution: "Priority-based resolution system focusing on areas near hospitals and schools.", 
        impact: "Social empowerment through rapid issue resolution and transparent governance." 
      }
    }
  ];

  const GithubIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );

  return (
    <section id="work" style={{ padding: '100px 0', background: theme.bg, position: 'relative', zIndex: 5 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.04em' }}>
          My Projects<span style={{ color: theme.accent || '#3b82f6' }}>.</span>
        </h2>
      </div>

      <div ref={scrollRef} style={{ display: 'flex', gap: '2rem', overflowX: 'auto', padding: '0 2rem 50px' }} className="hide-scrollbar">
        {projects.map((p) => (
          <motion.div 
            key={p.id} 
            whileHover={{ y: -5 }}
            style={{ flex: '0 0 450px', height: '440px', background: theme.cardBg, borderRadius: '32px', border: `1px solid ${theme.border}`, display: 'grid', gridTemplateColumns: '1fr 1.2fr', overflow: 'hidden' }}
          >
            <div style={{ position: 'relative' }}>
              <img src={p.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.8))' }} />
              {p.isLive && (
                 <div style={{ position: 'absolute', top: '20px', left: '20px', background: '#10b981', color: '#fff', fontSize: '0.6rem', fontWeight: 900, padding: '5px 12px', borderRadius: '100px', letterSpacing: '0.1em' }}>LIVE PRODUCTION</div>
              )}
            </div>
            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase' }}>{p.role}</span>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#fff', margin: '0.5rem 0' }}>{p.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>{p.description}</p>
              
              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div style={{ display: 'flex', gap: '0.8rem' }}>
                  <button onClick={() => window.open(p.github, '_blank')} style={styles.actionBtn}>
                    <GithubIcon /> GitHub
                  </button>
                  <button onClick={() => setSel(p)} style={{ ...styles.actionBtn, background: '#10b981', border: 'none', color: '#fff' }}>README</button>
                </div>
                {p.view && (
                  <button onClick={() => window.open(p.view, '_blank')} style={{ ...styles.actionBtn, background: '#fff', color: '#000', border: 'none' }}>
                    View Live Project ↗
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {sel && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={styles.overlay} onClick={() => setSel(null)}>
            <motion.div initial={{ scale: 0.95, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.95, y: 20, opacity: 0 }} onClick={(e) => e.stopPropagation()} style={{ ...styles.modal, border: `1px solid ${theme.border}` }}>
              <div style={{ padding: '1.2rem 2rem', borderBottom: `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                   <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }} />
                   <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
                   <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }} />
                </div>
                <span style={{ fontSize: '0.8rem', opacity: 0.5, fontWeight: 600 }}>{sel.title}.md</span>
                <button onClick={() => setSel(null)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
              </div>
              <div style={{ padding: '3rem', overflowY: 'auto', maxHeight: '60vh' }} className="custom-scroll">
                <h4 style={styles.label}>[01] PROBLEM</h4>
                <p style={styles.text}>{sel.readme.problem}</p>
                
                <h4 style={{ ...styles.label, marginTop: '2.5rem' }}>[02] ENGINEERING SOLUTION</h4>
                <p style={styles.text}>{sel.readme.solution}</p>
                
                {sel.readme.features && (
                  <ul style={{ marginTop: '1.5rem', paddingLeft: '1.2rem' }}>
                    {sel.readme.features.map((f: any, i: number) => (
                      <li key={i} style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '0.8rem' }}>{f}</li>
                    ))}
                  </ul>
                )}
                <div style={{ marginTop: '3rem', padding: '2rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '20px', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                  <h4 style={{ ...styles.label, color: '#10b981' }}>[03] IMPACT</h4>
                  <p style={{ ...styles.text, color: '#fff' }}>{sel.readme.impact || sel.achievement}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
    </section>
  );
};

const styles = {
  actionBtn: { flex: 1, padding: '0.8rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' } as React.CSSProperties,
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(15px)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' } as React.CSSProperties,
  modal: { background: '#0a0a0f', width: '100%', maxWidth: '750px', borderRadius: '28px', overflow: 'hidden', boxShadow: '0 50px 100px rgba(0,0,0,0.8)' } as React.CSSProperties,
  label: { fontSize: '0.7rem', fontWeight: 800, color: 'rgba(255,255,255,0.3)', marginBottom: '1rem', letterSpacing: '0.2em' } as React.CSSProperties,
  text: { fontSize: '1.1rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.85)', margin: 0 } as React.CSSProperties
};

export default Work;