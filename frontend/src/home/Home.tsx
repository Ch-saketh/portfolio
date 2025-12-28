import React, { useEffect } from "react";
import { BrowserRouter as Router } from 'react-router-dom'; // Ensure routing context
import Navbar from '../components/Navbar';
import About from '../pages/About';
import Skills from '../pages/Skills';
import Work from '../pages/Work';
import Achievements from '../components/Achievements'; // New Import
import Gallery from '../components/Gallery';           // New Import
import Contact from '../pages/contact';             // New Import
import LightRays from '../components/LightRays'; 

export default function Home(): React.ReactElement {
  const theme = {
    bg: '#020204',
    text: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.5)',
    cardBg: '#0c0c14',
    border: 'rgba(255, 255, 255, 0.08)',
    headerBg: 'rgba(2, 2, 4, 0.8)',
    accent: '#3b82f6',
    accentLight: '#60a5fa'
  };

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
      
      html, body, #root {
        height: auto !important;
        min-height: 100vh !important;
        overflow-x: hidden !important;
        margin: 0; padding: 0;
        scroll-behavior: smooth;
        background-color: ${theme.bg};
        font-family: 'Inter', -apple-system, sans-serif;
        font-size: clamp(14px, 2vw, 16px); 
      }

      body::before {
        content: '';
        position: fixed;
        inset: 0;
        background-image: 
          linear-gradient(${theme.border} 1px, transparent 1px), 
          linear-gradient(90deg, ${theme.border} 1px, transparent 1px);
        background-size: 60px 60px;
        opacity: 0.04;
        mask-image: radial-gradient(circle at center, black 40%, transparent 95%);
        pointer-events: none;
        z-index: 1;
      }

      section {
        background-color: transparent !important;
        position: relative;
        z-index: 10;
        max-width: 1200px;
        margin: 0 auto;
      }

      ::-webkit-scrollbar { width: 5px; background: transparent; }
      ::-webkit-scrollbar-thumb { background: ${theme.accent}30; border-radius: 10px; }
      
      @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.7; transform: scale(1.1); } }
      
      .glass-card {
        background: rgba(255, 255, 255, 0.02) !important;
        backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.05) !important;
      }

      /* MOBILE RESPONSIVE */
      @media (max-width: 768px) {
        html, body, #root {
          font-size: 14px;
        }
        section {
          padding: 0 1rem !important;
          max-width: 100% !important;
        }
        .footer-grid {
          grid-template-columns: 1fr !important;
          gap: 2rem !important;
          text-align: center !important;
        }
        .footer-grid > div {
          align-items: center !important;
        }
        .footer-social {
          justify-content: center !important;
        }
        .footer-nav {
          align-items: center !important;
        }
        .footer-bottom {
          flex-direction: column !important;
          gap: 1rem !important;
          text-align: center !important;
        }
      }

      @media (max-width: 480px) {
        html, body, #root {
          font-size: 13px;
        }
        body::before {
          background-size: 40px 40px;
        }
        section {
          padding: 0 0.75rem !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, [theme.bg, theme.border, theme.accent]);

  return (
    <div style={{ backgroundColor: theme.bg, minHeight: '100vh', position: 'relative' }}>
      
      {/* GLOBAL LIGHT RAYS */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: 0, 
        pointerEvents: 'none'
      }}>
        <LightRays
          raysOrigin="top-center"
          raysColor={theme.accent}
          raysSpeed={0.8}
          lightSpread={0.9}
          rayLength={2.0}
          followMouse={true}
          mouseInfluence={0.04}
          noiseAmount={0.06}
          distortion={0.03}
        />
      </div>

      <Navbar theme={theme} />
      
    <div style={{ position: 'relative', zIndex: 10 }}>
  <section id="about"><About theme={theme} /></section>
  
  {/* Link "Work" or "My Projects" here */}
  <section id="work"><Work theme={theme} /></section>
  
  {/* Link "Milestones" here */}
  <section id="milestones"><Achievements theme={theme} /></section>
  
  <section id="gallery"><Gallery theme={theme} /></section>
  <section id="skills"><Skills theme={theme} /></section>
  
  {/* Link "Contact" here */}
  <section id="contact"><Contact theme={theme} /></section>
</div>
      <footer style={{
        borderTop: `1px solid ${theme.border}`,
        padding: '4rem 2rem 2rem',
        background: `linear-gradient(to bottom, transparent, ${theme.bg})`,
        position: 'relative',
        zIndex: 20
      }}>
        {/* DESKTOP FOOTER */}
        <div className="desktop-footer" style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1, padding: '0 1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', fontWeight: 700, background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentLight})`, backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1rem' }}>Chokkapu Saketh</h3>
              <p style={{ color: theme.textSecondary, fontSize: 'clamp(0.8rem, 2vw, 0.9rem)', lineHeight: 1.6, marginBottom: '2rem' }}>Full-Stack AI Engineer specializing in Quantum-Secure and Intelligent systems.</p>
              <div style={{ display: 'flex', gap: '0.8rem' }}>
                <a href="https://github.com/ch-saketh" target="_blank" rel="noopener noreferrer" style={fStyles.socialLink(theme)}>
                   <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href="https://linkedin.com/in/saketh-chokkapu-3a668a2b9" target="_blank" rel="noopener noreferrer" style={fStyles.socialLink(theme)}>
                   <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>
            <div>
              <h4 style={fStyles.heading(theme)}>Links</h4>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <a href="#about" style={fStyles.link(theme)}>About</a>
                <a href="#work" style={fStyles.link(theme)}>Work</a>
                <a href="#milestones" style={fStyles.link(theme)}>Achievements</a>
                <a href="#gallery" style={fStyles.link(theme)}>Gallery</a>
                <a href="#skills" style={fStyles.link(theme)}>Skills</a>
                <a href="#contact" style={fStyles.link(theme)}>Contact</a>
              </nav>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <h4 style={fStyles.heading(theme)}>Contact</h4>
              <button onClick={() => window.location.href = 'mailto:chokkapusaketh@gmail.com'} style={fStyles.contactBtn(theme)}>Message</button>
            </div>
          </div>
          <div style={fStyles.bottom(theme)}>
            <p style={{ color: theme.textSecondary, fontSize: '0.8rem' }}>© 2025 Chokkapu Saketh. All rights reserved.</p>
            <span style={{ color: theme.textSecondary, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '6px', height: '6px', backgroundColor: '#10b981', borderRadius: '50%', animation: 'pulse 2s infinite' }}></div> Available
            </span>
          </div>
        </div>

        {/* MOBILE FOOTER - Minimal */}
        <div className="mobile-footer" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', display: 'none' }}>
          <h3 style={{ 
            fontSize: '1.3rem', 
            fontWeight: 700, 
            background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentLight})`, 
            backgroundClip: 'text', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent', 
            marginBottom: '1.2rem' 
          }}>
            Chokkapu Saketh
          </h3>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
            <a href="https://github.com/ch-saketh" target="_blank" rel="noopener noreferrer" style={fStyles.socialLink(theme)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a href="https://linkedin.com/in/saketh-chokkapu-3a668a2b9" target="_blank" rel="noopener noreferrer" style={fStyles.socialLink(theme)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          </div>

          <button 
            onClick={() => window.location.href = 'mailto:chokkapusaketh@gmail.com'} 
            style={{
              padding: '0.7rem 1.5rem',
              background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentLight})`,
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.85rem',
              marginBottom: '1.5rem'
            }}
          >
            Send a Message
          </button>

          <p style={{ color: theme.textSecondary, fontSize: '0.75rem', opacity: 0.7 }}>
            © 2025 Chokkapu Saketh
          </p>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .desktop-footer { display: none !important; }
            .mobile-footer { display: block !important; }
            footer { padding: 2rem 1.5rem !important; }
          }
        `}</style>
      </footer>
    </div>
  );
}

const fStyles = {
  socialLink: (t: any) => ({ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: '8px', color: t.text, textDecoration: 'none' }),
  heading: (t: any) => ({ color: t.text, fontSize: '1rem', fontWeight: 600, marginBottom: '1.2rem' }),
  link: (t: any) => ({ color: t.textSecondary, textDecoration: 'none', fontSize: '0.85rem' }),
  contactBtn: (t: any) => ({ padding: '0.6rem 1rem', background: `linear-gradient(135deg, ${t.accent}, ${t.accentLight})`, border: 'none', borderRadius: '6px', color: 'white', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }),
  bottom: (t: any) => ({ borderTop: `1px solid ${t.border}`, paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' })
};