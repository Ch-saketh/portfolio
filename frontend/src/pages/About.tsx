import React, { useState } from 'react';
import ProfileCard from '../components/ProfileCard';
// Using your confirmed PNG photo
import profileImage from '../assets/saketh-photo.png';
import resumeFile from '../assets/saketh_resume.pdf';

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

  // Email logic for the main CTA buttons
  const handleContactMe = () => {
    window.location.href = "mailto:chokkapusaketh@gmail.com?subject=Collaboration Inquiry";
  };

  return (
    <section id="about" style={styles.section}>
      <div style={styles.mainContainer} className="about-main-container">
        {/* LEFT COLUMN: IDENTITY & PROJECTS */}
        <div style={styles.leftColumn} className="reveal-left about-left-col">
          <div style={{ ...styles.badge, borderColor: theme.border }} className="about-badge">
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

          <div style={styles.bentoGrid} className="about-bento">
            <div className="bento-module">
              <h4 style={{ color: theme.accent, ...styles.bentoTitle }}>AI ASSESSMENT</h4>
              <p style={styles.bentoText}>1st Prize Winner: Skill roadmaps & mentor matching.</p>
            </div>
            <div className="bento-module">
              <h4 style={{ color: theme.accent, ...styles.bentoTitle }}>QUANTUM SECURITY</h4>
              <p style={styles.bentoText}>3rd Prize: Quantum-secure E-auction using BB84.</p>
            </div>
          </div>

          <div style={styles.buttonGroup} className="about-buttons">
            <button
              onClick={handleContactMe}
              style={{ ...styles.ctaBase, ...styles.ctaPrimary, background: theme.accent, border: 'none', cursor: 'pointer' }}
            >
              Contact Me
            </button>
            <button
              onClick={() => setShowResume(true)}
              style={{ ...styles.ctaBase, ...styles.ctaSecondary, borderColor: theme.border, cursor: 'pointer' }}
            >
              View Resume
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: 3D PROFILE CARD */}
        <div style={styles.rightColumn} className="reveal-right about-right-col">
          <div style={{ ...styles.cardGlow, background: theme.accent }} />
          <div style={styles.cardWrapper} className="about-card-wrapper">
            <ProfileCard
              name="Chokkapu Saketh"
              avatarUrl={profileImage}
              handle="ch-saketh"
              link="mailto:chokkapusaketh@gmail.com"
              enableTilt={true}
              behindGlowEnabled={false}
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
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        /* Centering and Raising the Name */
        .pc-details {
          margin-top: 14px !important; 
          text-align: center !important;
          width: 100% !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
        }

        /* Glass footer containment */
        .pc-user-info { 
          width: calc(100% - 40px) !important; 
          left: 20px !important; 
          bottom: 22px !important;
          position: absolute !important;
        }

        @keyframes revealUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        .reveal-left { animation: revealUp 0.8s cubic-bezier(0.15, 0, 0.15, 1) forwards; z-index: 10; }
        .reveal-right { animation: revealUp 1s cubic-bezier(0.15, 0, 0.15, 1) 0.1s forwards; opacity: 0; z-index: 10; }
        
        .status-orb { width: 8px; height: 8px; border-radius: 50%; animation: pulseOrb 2.5s infinite; }
        @keyframes pulseOrb { 0% { box-shadow: 0 0 0 0px ${theme.accent}60; } 70% { box-shadow: 0 0 0 10px transparent; } 100% { box-shadow: 0 0 0 0px transparent; } }
        .bento-module { padding: 1.1rem; background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(15px); border-radius: 14px; border: 1px solid rgba(255, 255, 255, 0.05); }

        /* MOBILE VIEW OPTIMIZATION */
        @media (max-width: 768px) {
          .about-main-container {
            display: flex !important;
            flex-direction: column !important;
            padding: 20px 20px 60px 20px !important;
            gap: 1.5rem !important;
            text-align: center !important;
          }
          .about-right-col { order: 1 !important; margin-top: 0 !important; }
          .about-left-col { order: 2 !important; margin-top: 0 !important; align-items: center !important; }
          .about-card-wrapper { margin-top: 0 !important; transform: scale(0.8) !important; }
          .about-badge { margin: 0 auto !important; }
          .about-bento { grid-template-columns: 1fr !important; text-align: left !important; width: 100%; }
          .about-buttons { justify-content: center !important; }
          #about { min-height: auto !important; padding-top: 80px !important; padding-bottom: 40px !important; }
          .reveal-right { opacity: 1 !important; }
        }
      `}</style>
    </section>
  );
};

const styles = {
  section: {
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    overflow: 'hidden',
    position: 'relative' as const,
    paddingTop: '40px',
    paddingBottom: '100px',
  },
  mainContainer: {
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1.2fr 0.8fr',
    gap: '5rem',
    alignItems: 'center',
    zIndex: 10,
    padding: '2rem 4rem',
  },
  leftColumn: { 
    display: 'flex', 
    flexDirection: 'column' as const, 
    gap: '1.4rem', 
    justifyContent: 'center', 
    marginTop: '-80px' 
  },
  badge: { display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px', width: 'fit-content' },
  badgeText: { fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.12em' },
  heroTitle: { fontSize: '3.8rem', fontWeight: 800, color: '#fff', margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em' },
  description: { fontSize: '1.05rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: '520px', margin: 0 },
  bentoGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1.2rem', marginTop: '0.5rem' },
  bentoTitle: { fontSize: '11px', fontWeight: 700, margin: '0 0 6px 0', textTransform: 'uppercase' as const, letterSpacing: '0.05em' },
  bentoText: { fontSize: '13px', color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.6 },
  buttonGroup: { display: 'flex', gap: '1.5rem', marginTop: '1rem', flexWrap: 'wrap' as const },
  ctaBase: { padding: '14px 32px', border: 'none', borderRadius: '12px', fontWeight: 600, fontSize: '14px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' },
  ctaPrimary: { color: '#ffffff' },
  ctaSecondary: { color: '#ffffff', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' },
  rightColumn: { display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' as const },
  cardWrapper: {
    width: '360px',
    maxWidth: '100%',
    transform: 'scale(0.85)',
    marginTop: '-70px' // Moved slightly down from -100px
  },
  cardGlow: { position: 'absolute' as const, width: '100%', height: '100%', filter: 'blur(100px)', opacity: 0.15, zIndex: -1 },

  modalOverlay: { position: 'fixed' as const, inset: 0, background: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(10px)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 40px 40px 40px' },
  modalContent: { width: '100%', maxWidth: '1000px', height: '85vh', background: '#111', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', flexDirection: 'column' as const, overflow: 'hidden' },
  modalHeader: { padding: '20px 30px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  modalActions: { display: 'flex', gap: '15px', alignItems: 'center' },
  iframe: { width: '100%', flex: 1, border: 'none' },
  closeBtn: { background: 'transparent', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer', padding: '5px' },
  downloadBtn: { background: '#fff', color: '#000', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, textDecoration: 'none' },
};

export default About;