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
    <section id="about" style={styles.section} className="about-section-viewport">
      <div style={styles.mainContainer} className="about-main-layout">
        {/* LEFT COLUMN: IDENTITY & PROJECTS */}
        <div style={styles.leftColumn} className="reveal-left about-info-column">
          
          <div className="mobile-header-stack">
            <div style={{ ...styles.badge, borderColor: theme.border }} className="about-badge-fix">
              <div className="status-orb" style={{ background: theme.accent }} />
              <span style={styles.badgeText}>AI & FULL-STACK ENGINEER</span>
            </div>

            <h1 style={styles.heroTitle} className="about-name-fix">
              Chokkapu Saketh <span style={{ color: theme.accent }}>.</span>
            </h1>
          </div>

          {/* This wrapper only appears/stacks on Mobile */}
          <div className="mobile-only-card-container">
            <div style={styles.cardWrapper} className="mobile-card-scaling">
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

          <p style={styles.description} className="about-description-fix">
            Focused on building scalable web applications and AI-driven systems,
            with experience in <span style={{ color: '#fff', fontWeight: 600 }}>React</span>,
            <span style={{ color: '#fff', fontWeight: 600 }}> Node.js</span>, and applied
            <span style={{ color: '#fff', fontWeight: 600 }}> machine learning</span> models.
          </p>

          <div style={styles.bentoGrid} className="about-bento-fix">
            <div className="bento-module">
              <h4 style={{ color: theme.accent, ...styles.bentoTitle }}>AI ASSESSMENT</h4>
              <p style={styles.bentoText}>1st Prize Winner: Skill roadmaps & mentor matching.</p>
            </div>
            <div className="bento-module">
              <h4 style={{ color: theme.accent, ...styles.bentoTitle }}>QUANTUM SECURITY</h4>
              <p style={styles.bentoText}>3rd Prize: Quantum-secure E-auction using BB84.</p>
            </div>
          </div>

          <div style={styles.buttonGroup} className="about-buttons-fix">
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

        {/* RIGHT COLUMN: 3D PROFILE CARD (Desktop Original) */}
        <div style={styles.rightColumn} className="reveal-right desktop-card-pos">
          <div style={{ ...styles.cardGlow, background: theme.accent }} />
          <div style={styles.cardWrapper}>
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

        .pc-details {
          margin-top: 14px !important; 
          text-align: center !important;
          width: 100% !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
        }

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

        .mobile-only-card-container { display: none; }

        @media (max-width: 768px) {
          .desktop-card-pos { display: none !important; }
          .about-section-viewport { overflow-x: hidden !important; }
          
          .about-main-layout {
            display: flex !important;
            flex-direction: column !important;
            padding: 30px 16px !important;
            width: 100% !important;
            text-align: center !important;
          }

          .about-info-column {
            margin-top: 0 !important;
            align-items: center !important;
          }

          .mobile-header-stack {
            margin-top: 40px !important; /* Move name down for frame 1 */
          }

          .about-badge-fix { margin: 0 auto !important; }
          .about-name-fix { font-size: 2.2rem !important; margin-top: 10px !important; }

          .mobile-only-card-container { 
            display: flex !important; 
            justify-content: center; 
            width: 100%; 
            margin: -35px 0 -15px 0 !important; /* Closes the gap with name */
          }

          .mobile-card-scaling {
            margin: 0 auto !important;
            transform: scale(0.75) !important;
            left: 0 !important;
            position: relative !important;
            width: 100% !important;
            max-width: 320px !important; /* Prevents edge overlap */
          }

          .about-description-fix {
            margin: 0 auto 20px auto !important;
            text-align: center !important;
            font-size: 0.9rem !important;
            max-width: 90% !important;
            line-height: 1.5 !important;
          }

          .about-bento-fix {
            grid-template-columns: 1fr !important;
            text-align: left !important;
            width: 100% !important;
          }

          .about-buttons-fix {
            justify-content: center !important; /* Centered on mobile */
            margin-top: 20px !important;
            padding-bottom: 50px !important;
          }

          #about { min-height: auto !important; }
          .reveal-right { opacity: 1 !important; transform: none !important; animation: none !important; }
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
    paddingTop: 'clamp(40px, 8vw, 60px)',
    paddingBottom: 'clamp(40px, 8vw, 80px)',
  },
  mainContainer: {
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1.2fr 0.8fr',
    gap: 'clamp(2rem, 5vw, 5rem)',
    alignItems: 'center',
    zIndex: 10,
    padding: 'clamp(1rem, 4vw, 4rem)',
  },
  leftColumn: { display: 'flex', flexDirection: 'column' as const, gap: '1.4rem', justifyContent: 'center', marginTop: '-40px' },
  badge: { display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px', width: 'fit-content' },
  badgeText: { fontSize: 'clamp(9px, 2vw, 10px)', fontWeight: 600, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.12em' },
  heroTitle: { fontSize: 'clamp(1.8rem, 6vw, 3.8rem)', fontWeight: 800, color: '#fff', margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em' },
  description: { fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: '520px', margin: 0 },
  bentoGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 'clamp(0.6rem, 2vw, 1.2rem)', marginTop: '1rem' },
  bentoTitle: { fontSize: 'clamp(9px, 2vw, 11px)', fontWeight: 700, margin: '0 0 6px 0', textTransform: 'uppercase' as const, letterSpacing: '0.05em' },
  bentoText: { fontSize: 'clamp(11px, 2.5vw, 13px)', color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.6 },
  buttonGroup: { display: 'flex', gap: 'clamp(0.8rem, 2vw, 1.5rem)', marginTop: '1.5rem', flexWrap: 'wrap' as const },
  ctaBase: { padding: 'clamp(12px, 2vw, 14px) clamp(24px, 4vw, 32px)', border: 'none', borderRadius: '12px', fontWeight: 600, fontSize: 'clamp(13px, 2vw, 14px)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' },
  ctaPrimary: { color: '#ffffff' },
  ctaSecondary: { color: '#ffffff', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' },
  rightColumn: { display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' as const },
  cardWrapper: {
    width: '360px',
    maxWidth: '100%',
    transform: 'scale(0.85)',
    marginTop: '-60px'
  },
  cardGlow: { position: 'absolute' as const, width: '100%', height: '100%', filter: 'blur(100px)', opacity: 0.15, zIndex: -1 },

  modalOverlay: {
    position: 'fixed' as const,
    inset: 0,
    background: 'rgba(0, 0, 0, 0.85)',
    backdropFilter: 'blur(10px)',
    zIndex: 10000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px 40px 40px 40px',
  },
  modalContent: {
    width: '100%',
    maxWidth: '1000px',
    height: '85vh',
    background: '#111',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden',
  },
  modalHeader: {
    padding: '20px 30px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalActions: { display: 'flex', gap: '15px', alignItems: 'center' },
  iframe: { width: '100%', flex: 1, border: 'none' },
  closeBtn: { background: 'transparent', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer', padding: '5px' },
  downloadBtn: { background: '#fff', color: '#000', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, textDecoration: 'none' },
};

export default About;