import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  theme: any;
}

const Navbar: React.FC<NavbarProps> = ({ theme }) => {
  const location = useLocation();
  
  // Check if current path is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backgroundColor: theme.headerBg,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: `1px solid ${theme.border}`,
      transition: 'all 0.3s ease'
    }}>
      <nav style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '1.5rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo/Home Link */}
        <Link 
          to="/" 
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            letterSpacing: '0.02em',
            color: theme.text,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            textDecoration: 'none'
          }}
        >
          <div style={{
            width: '8px',
            height: '8px',
            backgroundColor: theme.accent,
            borderRadius: '50%'
          }}></div>
          CS22
        </Link>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2.5rem'
        }}>
          {/* Show Home link only when NOT on home page */}
          {location.pathname !== '/' && (
            <Link
              to="/"
              style={{
                color: theme.textSecondary,
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                transition: 'color 0.2s ease',
                cursor: 'pointer',
                letterSpacing: '0.02em'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = theme.accent}
              onMouseLeave={(e) => e.currentTarget.style.color = theme.textSecondary}
            >
              Home
            </Link>
          )}
          
          {/* Show Work link - highlight when active */}
          <Link
            to="/work"
            style={{
              color: isActive('/work') ? theme.accent : theme.textSecondary,
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 500,
              transition: 'color 0.2s ease',
              cursor: 'pointer',
              letterSpacing: '0.02em'
            }}
            onMouseEnter={(e) => {
              if (!isActive('/work')) e.currentTarget.style.color = theme.accent;
            }}
            onMouseLeave={(e) => {
              if (!isActive('/work')) e.currentTarget.style.color = theme.textSecondary;
            }}
          >
            Work
          </Link>
          
          {/* Show About and Skills only on home page (as anchor links) */}
          {location.pathname === '/' && (
            <>
              <a
                href="#about"
                style={{
                  color: theme.textSecondary,
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  transition: 'color 0.2s ease',
                  cursor: 'pointer',
                  letterSpacing: '0.02em'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = theme.accent}
                onMouseLeave={(e) => e.currentTarget.style.color = theme.textSecondary}
              >
                About
              </a>
              
              <a
                href="#skills"
                style={{
                  color: theme.textSecondary,
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  transition: 'color 0.2s ease',
                  cursor: 'pointer',
                  letterSpacing: '0.02em'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = theme.accent}
                onMouseLeave={(e) => e.currentTarget.style.color = theme.textSecondary}
              >
                Skills
              </a>
            </>
          )}
          
          {/* Contact link (always shown as anchor) */}
          <a
            href="#contact"
            style={{
              color: theme.textSecondary,
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 500,
              transition: 'color 0.2s ease',
              cursor: 'pointer',
              letterSpacing: '0.02em'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = theme.accent}
            onMouseLeave={(e) => e.currentTarget.style.color = theme.textSecondary}
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;