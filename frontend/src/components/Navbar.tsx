import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Theme } from '../types/theme';

interface NavbarProps {
  theme: Theme;
}

const Navbar: React.FC<NavbarProps> = ({ theme }) => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: isScrolled || mobileMenuOpen ? theme.headerBg : 'transparent',
          backdropFilter: isScrolled || mobileMenuOpen ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: isScrolled || mobileMenuOpen ? 'blur(20px)' : 'none',
          borderBottom: isScrolled ? `1px solid ${theme.border}` : '1px solid transparent',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <nav
          className="navbar-container"
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: isScrolled ? 'clamp(0.8rem, 2vw, 1rem) 1.5rem' : 'clamp(1rem, 3vw, 1.5rem) 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'padding 0.4s ease',
          }}
        >
          <Link
            to="/"
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              fontWeight: 700,
              color: theme.text,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              textDecoration: 'none',
              zIndex: 1001,
            }}
            onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); handleLinkClick(); }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                backgroundColor: theme.accent,
                borderRadius: '50%',
              }}
            />
            CS22
          </Link>

          {/* Desktop Navigation */}
          <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
            {location.pathname !== '/' && (
              <Link
                to="/"
                style={navLinkStyle(false, theme)}
                onMouseEnter={(e) => (e.currentTarget.style.color = theme.accent)}
                onMouseLeave={(e) => (e.currentTarget.style.color = theme.textSecondary)}
              >
                Home
              </Link>
            )}
            <a href="#work" style={navLinkStyle(false, theme)} onMouseEnter={(e) => (e.currentTarget.style.color = theme.accent)} onMouseLeave={(e) => (e.currentTarget.style.color = theme.textSecondary)}>Work</a>
            <a href="#milestones" style={navLinkStyle(false, theme)} onMouseEnter={(e) => (e.currentTarget.style.color = theme.accent)} onMouseLeave={(e) => (e.currentTarget.style.color = theme.textSecondary)}>Milestones</a>
            <a href="#skills" style={navLinkStyle(false, theme)} onMouseEnter={(e) => (e.currentTarget.style.color = theme.accent)} onMouseLeave={(e) => (e.currentTarget.style.color = theme.textSecondary)}>Skills</a>
            <a href="#contact" style={navLinkStyle(false, theme)} onMouseEnter={(e) => (e.currentTarget.style.color = theme.accent)} onMouseLeave={(e) => (e.currentTarget.style.color = theme.textSecondary)}>Contact</a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              zIndex: 1001,
            }}
            aria-label="Toggle menu"
          >
            <div style={{ width: '24px', height: '18px', position: 'relative' }}>
              <span style={{
                position: 'absolute',
                width: '100%',
                height: '2px',
                background: theme.text,
                borderRadius: '2px',
                transition: 'all 0.3s ease',
                top: mobileMenuOpen ? '8px' : '0',
                transform: mobileMenuOpen ? 'rotate(45deg)' : 'none',
              }} />
              <span style={{
                position: 'absolute',
                width: '100%',
                height: '2px',
                background: theme.text,
                borderRadius: '2px',
                transition: 'all 0.3s ease',
                top: '8px',
                opacity: mobileMenuOpen ? 0 : 1,
              }} />
              <span style={{
                position: 'absolute',
                width: '100%',
                height: '2px',
                background: theme.text,
                borderRadius: '2px',
                transition: 'all 0.3s ease',
                top: mobileMenuOpen ? '8px' : '16px',
                transform: mobileMenuOpen ? 'rotate(-45deg)' : 'none',
              }} />
            </div>
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className="mobile-menu-overlay"
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
          opacity: mobileMenuOpen ? 1 : 0,
          visibility: mobileMenuOpen ? 'visible' : 'hidden',
          transition: 'all 0.3s ease',
        }}
      >
        {location.pathname !== '/' && (
          <Link to="/" onClick={handleLinkClick} style={mobileLinkStyle(theme)}>Home</Link>
        )}
        <a href="#work" onClick={handleLinkClick} style={mobileLinkStyle(theme)}>Work</a>
        <a href="#milestones" onClick={handleLinkClick} style={mobileLinkStyle(theme)}>Milestones</a>
        <a href="#skills" onClick={handleLinkClick} style={mobileLinkStyle(theme)}>Skills</a>
        <a href="#contact" onClick={handleLinkClick} style={mobileLinkStyle(theme)}>Contact</a>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
          .navbar-container {
            padding: 0.9rem 1rem !important;
          }
        }
      `}</style>
    </>
  );
};

const navLinkStyle = (active: boolean, theme: Theme) => ({
  color: active ? theme.accent : theme.textSecondary,
  textDecoration: 'none',
  fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
  fontWeight: 500,
  transition: 'color 0.2s ease',
  cursor: 'pointer',
});

const mobileLinkStyle = (theme: Theme) => ({
  color: theme.text,
  textDecoration: 'none',
  fontSize: '1.5rem',
  fontWeight: 600,
  transition: 'color 0.2s ease, transform 0.2s ease',
  cursor: 'pointer',
});

export default Navbar;