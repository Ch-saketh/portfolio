import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Theme } from '../types/theme';

interface NavbarProps {
  theme: Theme;
}

const Navbar: React.FC<NavbarProps> = ({ theme }) => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: isScrolled ? theme.headerBg : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: isScrolled ? `1px solid ${theme.border}` : '1px solid transparent',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <nav
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: isScrolled ? '1rem 2rem' : '1.5rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'padding 0.4s ease',
        }}
      >
        <Link
          to="/"
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: theme.text,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            textDecoration: 'none',
          }}
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
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

          <Link
            to="/ui-library"
            style={navLinkStyle(isActive('/ui-library'), theme)}
            onMouseEnter={(e) =>
              !isActive('/ui-library') && (e.currentTarget.style.color = theme.accent)
            }
            onMouseLeave={(e) =>
              !isActive('/ui-library') && (e.currentTarget.style.color = theme.textSecondary)
            }
          >
            UI Library
          </Link>

          {location.pathname === '/' && (
            <>
              <a
                href="#about"
                style={navLinkStyle(false, theme)}
                onMouseEnter={(e) => (e.currentTarget.style.color = theme.accent)}
                onMouseLeave={(e) => (e.currentTarget.style.color = theme.textSecondary)}
              >
                About
              </a>

              <a
                href="#skills"
                style={navLinkStyle(false, theme)}
                onMouseEnter={(e) => (e.currentTarget.style.color = theme.accent)}
                onMouseLeave={(e) => (e.currentTarget.style.color = theme.textSecondary)}
              >
                Skills
              </a>
            </>
          )}

          <Link
            to="/contact"
            style={navLinkStyle(isActive('/contact'), theme)}
            onMouseEnter={(e) =>
              !isActive('/contact') && (e.currentTarget.style.color = theme.accent)
            }
            onMouseLeave={(e) =>
              !isActive('/contact') && (e.currentTarget.style.color = theme.textSecondary)
            }
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
};

const navLinkStyle = (active: boolean, theme: Theme) => ({
  color: active ? theme.accent : theme.textSecondary,
  textDecoration: 'none',
  fontSize: '0.9rem',
  fontWeight: 500,
  transition: 'color 0.2s ease',
  cursor: 'pointer',
});

export default Navbar;
