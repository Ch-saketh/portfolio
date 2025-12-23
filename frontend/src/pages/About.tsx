import React from 'react';
import ProfileCard from '../components/ProfileCard';
import profileImage from '../assets/profile-photo.png';

interface AboutProps {
  theme: {
    accent: string;
    border: string;
  };
}

const About: React.FC<AboutProps> = ({ theme }) => {
  return (
    <section id="about" style={styles.section}>
      <div style={styles.mainContainer}>
        {/* LEFT COLUMN: NUDGED SLIGHTLY HIGHER */}
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
              <h4 style={{ color: theme.accent, ...styles.bentoTitle }}>AI / ML</h4>
              <p style={styles.bentoText}>Recommendation systems, data-driven models.</p>
            </div>
            <div className="bento-module">
              <h4 style={{ color: theme.accent, ...styles.bentoTitle }}>FULL-STACK</h4>
              <p style={styles.bentoText}>React Native, REST APIs, and Cloud.</p>
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
            <a 
              href="/Saketh_Resume.pdf" 
              target="_blank" 
              style={{ ...styles.ctaBase, ...styles.ctaSecondary, borderColor: theme.border }}
            >
              View Resume
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: LOCKED SIZE & POSITION */}
        <div style={styles.rightColumn} className="reveal-right">
          <div style={{ ...styles.cardGlow, background: theme.accent }} />
          <div style={styles.cardWrapper}>
            <ProfileCard
              name="Chokkapu Saketh"
              title="AI Engineer"
              avatarUrl={profileImage}
              enableTilt={true}
              behindGlowEnabled={false}
              showSocialLinks={false} 
            />
          </div>
        </div>
      </div>

      <style>{`
        #about { font-family: 'Inter', sans-serif; }
        @keyframes revealUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        .reveal-left { animation: revealUp 0.8s cubic-bezier(0.15, 0, 0.15, 1) forwards; z-index: 10; }
        .reveal-right { animation: revealUp 1s cubic-bezier(0.15, 0, 0.15, 1) 0.1s forwards; opacity: 0; z-index: 10; }
        .status-orb { width: 8px; height: 8px; border-radius: 50%; animation: pulseOrb 2.5s infinite; }
        @keyframes pulseOrb { 0% { box-shadow: 0 0 0 0px ${theme.accent}60; } 70% { box-shadow: 0 0 0 10px transparent; } 100% { box-shadow: 0 0 0 0px transparent; } }
        .bento-module { padding: 1.1rem; background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(15px); border-radius: 14px; border: 1px solid rgba(255, 255, 255, 0.05); }
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
    paddingTop: '60px', 
    paddingBottom: '80px',
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
    padding: '0 4rem',
  },
  leftColumn: { 
    display: 'flex', 
    flexDirection: 'column' as const, 
    gap: '1.4rem', 
    justifyContent: 'center',
    marginTop: '-40px', // THE NUDGE: Moves the entire text column slightly higher
  },
  badge: { display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px', width: 'fit-content' },
  badgeText: { fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.12em' },
  heroTitle: { fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 800, color: '#fff', margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em' }, 
  description: { fontSize: '1.05rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, maxWidth: '520px', margin: 0 }, 
  bentoGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', marginTop: '1rem' },
  bentoTitle: { fontSize: '11px', fontWeight: 700, margin: '0 0 6px 0', textTransform: 'uppercase' as const, letterSpacing: '0.05em' },
  bentoText: { fontSize: '12px', color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.5 },
  buttonGroup: { display: 'flex', gap: '1.5rem', marginTop: '1.5rem' },
  ctaBase: { padding: '12px 28px', borderRadius: '12px', fontWeight: 600, fontSize: '14px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }, 
  ctaPrimary: { color: '#ffffff' },
  ctaSecondary: { color: '#ffffff', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' },
  rightColumn: { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    position: 'relative' as const 
  },
  cardWrapper: {
    width: '100%',
    maxWidth: '220px', 
    transform: 'scale(0.85)', 
    marginTop: '-60px', // LOCKED POSITION
  },
  cardGlow: { position: 'absolute' as const, width: '100%', height: '100%', filter: 'blur(100px)', opacity: 0.15, zIndex: -1 }
};

export default About;