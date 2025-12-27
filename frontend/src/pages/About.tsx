import React, { useState } from 'react';
import ProfileCard from '../components/ProfileCard';
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

  const handleContactMe = () => {
    window.location.href = "mailto:chokkapusaketh@gmail.com?subject=Collaboration Inquiry";
  };

  return (
    <section id="about" style={styles.section}>
      <div style={styles.mainContainer} className="about-grid">
        
        {/* PROFILE CARD - Now appears first/top on mobile via CSS order */}
        <div style={styles.rightColumn} className="reveal-right profile-container">
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

        {/* IDENTITY & INFO */}
        <div style={styles.leftColumn} className="reveal-left info-container">
          <div style={{ ...styles.badge, borderColor: theme.border }} className="mx-auto-mobile">
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
            <button
              onClick={handleContactMe}
              style={{ ...styles.ctaBase, ...styles.ctaPrimary, background: theme.accent }}
            >
              Contact Me
            </button>
            <button
              onClick={() => setShowResume(true)}
              style={{ ...styles.ctaBase, ...styles.ctaSecondary, borderColor: theme.border }}
            >
              View Resume
            </button>
          </div>
        </div>
      </div>

      {/* RESUME MODAL */}
      {showResume && (
        <div style={styles.modalOverlay} onClick={() => setShowResume(false)} className="fade-in">
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={{ color: '#fff', margin: 0 }}>Resume</h3>
              <div style={styles.modalActions}>
                <a href={resumeFile} download="Saketh_Resume.pdf" style={styles.downloadBtn}>Download</a>
                <button onClick={() => setShowResume(false)} style={styles.closeBtn}>✕</button>
              </div>
            </div>
            <iframe src={`${resumeFile}#toolbar=0`} title="Resume Viewer" style={styles.iframe} />
          </div>
        </div>
      )}

      <style>{`
        #about { font-family: 'Inter', sans-serif; }
        .fade-in { animation: fadeIn 0.3s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        /* Smooth Reveal Animations */
        @keyframes revealUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .reveal-left { animation: revealUp 0.8s cubic-bezier(0.15, 0, 0.15, 1) forwards; }
        .reveal-right { animation: revealUp 0.8s cubic-bezier(0.15, 0, 0.15, 1) 0.2s forwards; opacity: 0; }

        .status-orb { width: 8px; height: 8px; border-radius: 50%; animation: pulseOrb 2.5s infinite; }
        @keyframes pulseOrb { 0% { box-shadow: 0 0 0 0px ${theme.accent}60; } 70% { box-shadow: 0 0 0 10px transparent; } 100% { box-shadow: 0 0 0 0px transparent; } }
        
        .bento-module { 
          padding: 1.1rem; 
          background: rgba(255, 255, 255, 0.03); 
          backdrop-filter: blur(10px); 
          border-radius: 16px; 
          border: 1px solid rgba(255, 255, 255, 0.08); 
        }

        /* MOBILE SPECIFIC OVERRIDES */
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            display: flex !important;
            flex-direction: column !important;
            padding: 2rem 1.5rem !important;
            text-align: center;
          }
          
          .profile-container {
            order: 1; /* Profile Card on top */
            margin-bottom: 2rem;
          }

          .info-container {
            order: 2; /* Info below card */
            align-items: center;
            margin-top: 0 !important;
          }

          .mx-auto-mobile {
            margin-left: auto;
            margin-right: auto;
          }

          .bento-module {
            text-align: left; /* Keep text readable inside modules */
          }

          #about {
            min-height: auto !important;
            padding-top: 80px !important;
          }
        }

        /* Profile Card internal adjustments */
        .pc-details {
          margin-top: 14px !important; 
          text-align: center !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
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
    position: 'relative' as const,
    paddingTop: '60px',
  },
  mainContainer: {
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1.1fr 0.9fr',
    gap: '3rem',
    alignItems: 'center',
    padding: '2rem',
  },
  leftColumn: { display: 'flex', flexDirection: 'column' as const, gap: '1.5rem' },
  badge: { display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px' },
  badgeText: { fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em' },
  heroTitle: { fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, color: '#fff', margin: 0, lineHeight: 1.1 },
  description: { fontSize: '1rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, maxWidth: '500px' },
  bentoGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' },
  bentoTitle: { fontSize: '11px', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '0.05em' },
  bentoText: { fontSize: '13px', color: 'rgba(255,255,255,0.5)', margin: 0 },
  buttonGroup: { display: 'flex', gap: '1rem', flexWrap: 'wrap' as const, justifyContent: 'center' },
  ctaBase: { padding: '12px 28px', borderRadius: '12px', fontWeight: 600, fontSize: '14px', cursor: 'pointer', transition: '0.3s', border: 'none' },
  ctaPrimary: { color: '#fff' },
  ctaSecondary: { color: '#fff', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' },
  rightColumn: { position: 'relative' as const, display: 'flex', justifyContent: 'center' },
  cardWrapper: { width: '340px', maxWidth: '100%', transform: 'scale(1)' },
  cardGlow: { position: 'absolute' as const, width: '80%', height: '80%', filter: 'blur(80px)', opacity: 0.2, zIndex: -1 },
  // Modal Styles
  modalOverlay: { position: 'fixed' as const, inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
  modalContent: { width: '100%', maxWidth: '900px', height: '80vh', background: '#0a0a0a', borderRadius: '20px', overflow: 'hidden', display: 'flex', flexDirection: 'column' as const },
  modalHeader: { padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#111' },
  modalActions: { display: 'flex', gap: '10px' },
  downloadBtn: { background: '#fff', color: '#000', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 700, textDecoration: 'none' },
  closeBtn: { background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '18px' },
  iframe: { flex: 1, width: '100%', border: 'none' }
};

export default About;