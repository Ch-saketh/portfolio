import React, { useState } from 'react';
import ProfileCard from '../components/ProfileCard';
// Using the PNG file you confirmed
import profileImage from '../assets/saketh-photo.png'; 
import resumeFile from '../assets/saketh_resume.pdf'; 

// THE FIX: This interface now matches the object in App.tsx line 36
interface AboutProps {
  theme: {
    bg: string;
    text: string;
    textSecondary: string;
    cardBg: string;
    border: string;
    headerBg: string;
    accent: string;
    accentLight: string;
  };
}

const About: React.FC<AboutProps> = ({ theme }) => {
  const [showResume, setShowResume] = useState(false);

  return (
    <section id="about" style={styles.section}>
      <div style={styles.mainContainer}>
        {/* LEFT COLUMN: IDENTITY */}
        <div style={styles.leftColumn} className="reveal-left">
          <div style={{ ...styles.badge, borderColor: theme.border }}>
            <div className="status-orb" style={{ background: theme.accent }} />
            <span style={styles.badgeText}>AI & FULL-STACK ENGINEER</span>
          </div>

          <h1 style={styles.heroTitle}>
            Chokkapu Saketh <span style={{ color: theme.accent }}>.</span>
          </h1>
          
          <p style={styles.description}>
            Focused on building scalable web applications and AI-driven systems, 
            with experience in <span style={{ color: '#fff', fontWeight: 600 }}>React</span>, 
            <span style={{ color: '#fff', fontWeight: 600 }}> Node.js</span>, and applied 
            <span style={{ color: '#fff', fontWeight: 600 }}> machine learning</span> models.
          </p>

          <div style={styles.bentoGrid}>
            <div className="bento-module">
              <h4 style={{ color: theme.accent, ...styles.bentoTitle }}>AI ASSESSMENT</h4>
              <p style={styles.bentoText}>1st Prize Winner: Skill roadmaps & mentor matching.</p>
            </div>
            <div className="bento-module">
              <h4 style={{ color: theme.accent, ...styles.bentoTitle }}>QUANTUM SECURITY</h4>
              <p style={styles.bentoText}>3rd Prize: Quantum-secure E-auction using BB84.</p>
            </div>
          </div>

          <div style={styles.buttonGroup}>
            <a 
              href="https://github.com/Ch-saketh" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ ...styles.ctaBase, ...styles.ctaPrimary, background: theme.accent }}
            >
              GitHub Profile
            </a>
            <button 
              onClick={() => setShowResume(true)}
              style={{ ...styles.ctaBase, ...styles.ctaSecondary, borderColor: theme.border, cursor: 'pointer' }}
            >
              View Resume
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: 3D PROFILE CARD */}
        <div style={styles.rightColumn} className="reveal-right">
          <div style={{ ...styles.cardGlow, background: theme.accent }} />
          <div style={styles.cardWrapper}>
            <ProfileCard
              name="Chokkapu Saketh"
              title="" 
              avatarUrl={profileImage}
              enableTilt={true}
              behindGlowEnabled={false}
              handle="ch-saketh"
            />
          </div>
        </div>
      </div>

      {/* RESUME MODAL */}
      {showResume && (
        <div style={styles.modalOverlay} onClick={() => setShowResume(false)} className="fade-in">
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={{ color: '#fff', margin: 0 }}>Resume - Chokkapu Saketh</h3>
              <div style={styles.modalActions}>
                <a href={resumeFile} download="Saketh_Resume.pdf" style={styles.downloadBtn}>Download PDF</a>
                <button onClick={() => setShowResume(false)} style={styles.closeBtn}>✕</button>
              </div>
            </div>
            <iframe
              src={`${resumeFile}#toolbar=0`}
              title="Resume Viewer"
              style={styles.iframe}
            />
          </div>
        </div>
      )}

      <style>{`
        #about { font-family: 'Inter', sans-serif; }
        .fade-in { animation: fadeIn 0.3s ease-out forwards; }
        
        /* Positioning the name precisely below the photo */
        .pc-details {
          margin-top: 14px !important; 
          text-align: center !important;
          width: 100% !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
        }

        .pc-details h3 {
          text-align: center !important;
          margin: 0 !important;
          font-size: 1.6rem !important;
          font-weight: 700;
          color: #fff;
        }

        /* Glass footer containment */
        .pc-user-info { 
          width: calc(100% - 40px) !important; 
          left: 20px !important; 
          right: 20px !important;
          box-sizing: border-box !important;
          bottom: 22px !important;
          position: absolute !important;
        }

        @keyframes revealUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        .reveal-left { animation: revealUp 0.8s cubic-bezier(0.15, 0, 0.15, 1) forwards; }
        .reveal-right { animation: revealUp 1s cubic-bezier(0.15, 0, 0.15, 1) 0.1s forwards; opacity: 0; }
        
        .status-orb { width: 8px; height: 8px; border-radius: 50%; animation: pulseOrb 2.5s infinite; }
        @keyframes pulseOrb { 0% { box-shadow: 0 0 0 0px ${theme.accent}60; } 70% { box-shadow: 0 0 0 10px transparent; } 100% { box-shadow: 0 0 0 0px transparent; } }
        .bento-module { padding: 1.1rem; background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(15px); border-radius: 14px; border: 1px solid rgba(255, 255, 255, 0.05); }
      `}</style>
    </section>
  );
};

const styles = {
  section: { width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', overflow: 'hidden', position: 'relative' as const, padding: '60px 0 80px 0' },
  mainContainer: { maxWidth: '1200px', width: '100%', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '5rem', alignItems: 'center', zIndex: 10, padding: '0 4rem' },
  leftColumn: { display: 'flex', flexDirection: 'column' as const, gap: '1.4rem' },
  badge: { display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid', borderRadius: '100px', width: 'fit-content' },
  badgeText: { fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.12em' },
  heroTitle: { fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 800, color: '#fff', margin: 0, lineHeight: 1.1 }, 
  description: { fontSize: '1.05rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, maxWidth: '520px' }, 
  bentoGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' },
  bentoTitle: { fontSize: '11px', fontWeight: 700, margin: '0 0 6px 0', textTransform: 'uppercase' as const },
  bentoText: { fontSize: '12px', color: 'rgba(255,255,255,0.5)', margin: 0 },
  buttonGroup: { display: 'flex', gap: '1.5rem', marginTop: '1.5rem' },
  ctaBase: { padding: '12px 28px', border: 'none', borderRadius: '12px', fontWeight: 600, fontSize: '14px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }, 
  ctaPrimary: { color: '#ffffff' },
  ctaSecondary: { color: '#ffffff', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid' },
  rightColumn: { display: 'flex', justifyContent: 'center', position: 'relative' as const },
  cardWrapper: { width: '360px', transform: 'scale(0.85)' },
  cardGlow: { position: 'absolute' as const, width: '100%', height: '100%', filter: 'blur(100px)', opacity: 0.15, zIndex: -1 },
  modalOverlay: { position: 'fixed' as const, inset: 0, background: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(10px)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 40px' },
  modalContent: { width: '100%', maxWidth: '1000px', height: '85vh', background: '#111', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', flexDirection: 'column' as const, overflow: 'hidden' },
  modalHeader: { padding: '20px 30px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', justifyContent: 'space-between' },
  modalActions: { display: 'flex', gap: '15px' },
  iframe: { width: '100%', flex: 1, border: 'none' },
  closeBtn: { background: 'transparent', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer' },
  downloadBtn: { background: '#fff', color: '#000', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, textDecoration: 'none' },
};

export default About;