import React, { useState } from 'react';
import { Theme } from '../types/theme';

interface ContactProps {
  theme: any;
}

type FormType = 'collaborate' | 'connect';

const Contact: React.FC<ContactProps> = ({ theme }) => {
  const [formType, setFormType] = useState<FormType>('collaborate');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Form submitted:', { type: formType, ...formData });
    setIsSubmitting(false);
    setSubmitSuccess(true);
    
    setTimeout(() => {
      setSubmitSuccess(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" style={{
      padding: '60px 2rem',
      backgroundColor: theme.bg,
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Glow Effects */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '5%',
        width: '400px',
        height: '400px',
        background: `radial-gradient(circle, ${theme.accent}15 0%, transparent 70%)`,
        borderRadius: '50%',
        filter: 'blur(60px)',
        pointerEvents: 'none',
        zIndex: 0
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '5%',
        width: '350px',
        height: '350px',
        background: `radial-gradient(circle, ${theme.accentLight}12 0%, transparent 70%)`,
        borderRadius: '50%',
        filter: 'blur(60px)',
        pointerEvents: 'none',
        zIndex: 0
      }}></div>

      <div style={{
        maxWidth: '1100px',
        width: '100%',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Main Container with Glass Effect */}
        <div style={{
          background: `linear-gradient(135deg, ${theme.cardBg}95 0%, ${theme.cardBg}80 100%)`,
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          border: `1px solid ${theme.border}`,
          padding: '35px 40px',
          boxShadow: `0 20px 60px rgba(0, 0, 0, 0.3), 0 0 1px ${theme.accent}20`,
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Inner Glow Border Effect */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: '24px',
            padding: '2px',
            background: `linear-gradient(135deg, ${theme.accent}30, transparent, ${theme.accentLight}30)`,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            pointerEvents: 'none'
          }}></div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '300px 1fr',
            gap: '40px',
            alignItems: 'start'
          }} className="contact-grid">
            
            {/* Left Side - Contact Info */}
            <div>
              {/* Header */}
              <div style={{ marginBottom: '30px' }}>
                <h1 style={{
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: theme.text,
                  marginBottom: '12px',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1
                }}>
                  Contact Me
                </h1>
                <p style={{
                  fontSize: '0.95rem',
                  color: theme.textSecondary,
                  lineHeight: 1.5
                }}>
                  Got any questions or want to collaborate? I'm here to help.
                </p>
              </div>

              {/* Contact Cards */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
              }}>
                {/* Email */}
                <a
                  href="mailto:chokkapusaketh@gmail.com"
                  className="contact-item"
                  style={{
                    textDecoration: 'none',
                    padding: '16px 18px',
                    background: `${theme.accent}08`,
                    border: `1px solid ${theme.border}`,
                    borderRadius: '16px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'block',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: `linear-gradient(135deg, #EA4335, #D44638)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.3s ease'
                    }} className="icon-box">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: '0.9rem',
                        color: theme.text,
                        fontWeight: 500,
                        lineHeight: 1.3
                      }}>
                        chokkapusaketh@gmail.com
                      </div>
                    </div>
                  </div>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/ch-saketh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-item"
                  style={{
                    textDecoration: 'none',
                    padding: '16px 18px',
                    background: `${theme.accent}08`,
                    border: `1px solid ${theme.border}`,
                    borderRadius: '16px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'block',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: `linear-gradient(135deg, #24292e, #1a1e22)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.3s ease'
                    }} className="icon-box">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: '0.9rem',
                        color: theme.text,
                        fontWeight: 500,
                        lineHeight: 1.3
                      }}>
                        @ch-saketh
                      </div>
                    </div>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/saketh-chokkapu-3a668a2b9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-item"
                  style={{
                    textDecoration: 'none',
                    padding: '16px 18px',
                    background: `${theme.accent}08`,
                    border: `1px solid ${theme.border}`,
                    borderRadius: '16px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'block',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: `linear-gradient(135deg, #0077B5, #005E93)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.3s ease'
                    }} className="icon-box">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: '0.9rem',
                        color: theme.text,
                        fontWeight: 500,
                        lineHeight: 1.3
                      }}>
                        Saketh Chokkapu
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Side - Form */}
            <div>
              {/* Toggle Buttons */}
              <div style={{
                display: 'flex',
                gap: '10px',
                marginBottom: '24px',
                padding: '4px',
                background: theme.bg,
                borderRadius: '12px',
                border: `1px solid ${theme.border}`
              }}>
                <button
                  type="button"
                  onClick={() => setFormType('collaborate')}
                  style={{
                    flex: 1,
                    padding: '10px 24px',
                    background: formType === 'collaborate' 
                      ? `linear-gradient(135deg, ${theme.accent}, ${theme.accentLight})` 
                      : 'transparent',
                    border: 'none',
                    borderRadius: '10px',
                    color: formType === 'collaborate' ? 'white' : theme.textSecondary,
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    fontFamily: 'inherit',
                    boxShadow: formType === 'collaborate' 
                      ? `0 4px 16px ${theme.accent}50` 
                      : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (formType !== 'collaborate') {
                      e.currentTarget.style.background = `${theme.accent}10`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (formType !== 'collaborate') {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  🤝 Collaborate
                </button>
                <button
                  type="button"
                  onClick={() => setFormType('connect')}
                  style={{
                    flex: 1,
                    padding: '10px 24px',
                    background: formType === 'connect' 
                      ? `linear-gradient(135deg, ${theme.accent}, ${theme.accentLight})` 
                      : 'transparent',
                    border: 'none',
                    borderRadius: '10px',
                    color: formType === 'connect' ? 'white' : theme.textSecondary,
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    fontFamily: 'inherit',
                    boxShadow: formType === 'connect' 
                      ? `0 4px 16px ${theme.accent}50` 
                      : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (formType !== 'connect') {
                      e.currentTarget.style.background = `${theme.accent}10`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (formType !== 'connect') {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  💬 Connect
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                {/* Name */}
                <div style={{ marginBottom: '14px', position: 'relative' }}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Your Name"
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: `${theme.cardBg}dd`,
                      border: `2px solid ${focusedField === 'name' ? theme.accent : theme.border}`,
                      borderRadius: '12px',
                      color: theme.text,
                      fontSize: '0.875rem',
                      outline: 'none',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      fontFamily: 'inherit',
                      boxShadow: focusedField === 'name' 
                        ? `0 0 0 4px ${theme.accent}15, 0 8px 24px ${theme.accent}20` 
                        : '0 2px 8px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </div>

                {/* Email */}
                <div style={{ marginBottom: '14px', position: 'relative' }}>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Your Email"
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: `${theme.cardBg}dd`,
                      border: `2px solid ${focusedField === 'email' ? theme.accent : theme.border}`,
                      borderRadius: '12px',
                      color: theme.text,
                      fontSize: '0.875rem',
                      outline: 'none',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      fontFamily: 'inherit',
                      boxShadow: focusedField === 'email' 
                        ? `0 0 0 4px ${theme.accent}15, 0 8px 24px ${theme.accent}20` 
                        : '0 2px 8px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </div>

                {/* Message */}
                <div style={{ marginBottom: '20px', position: 'relative' }}>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    placeholder={formType === 'collaborate' 
                      ? 'Tell me about your project idea...' 
                      : 'What would you like to discuss...'}
                    required
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: `${theme.cardBg}dd`,
                      border: `2px solid ${focusedField === 'message' ? theme.accent : theme.border}`,
                      borderRadius: '12px',
                      color: theme.text,
                      fontSize: '0.875rem',
                      outline: 'none',
                      resize: 'vertical',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      fontFamily: 'inherit',
                      minHeight: '100px',
                      maxHeight: '200px',
                      boxShadow: focusedField === 'message' 
                        ? `0 0 0 4px ${theme.accent}15, 0 8px 24px ${theme.accent}20` 
                        : '0 2px 8px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '14px 32px',
                    background: isSubmitting 
                      ? theme.textSecondary 
                      : `linear-gradient(135deg, ${theme.accent}, ${theme.accentLight})`,
                    border: 'none',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    fontFamily: 'inherit',
                    opacity: isSubmitting ? 0.6 : 1,
                    boxShadow: isSubmitting 
                      ? 'none' 
                      : `0 8px 24px ${theme.accent}40`
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = `0 12px 32px ${theme.accent}50`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = `0 8px 24px ${theme.accent}40`;
                    }
                  }}
                >
                  {isSubmitting ? (
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <span className="spinner"></span> Sending...
                    </span>
                  ) : (
                    `Send Message 🚀`
                  )}
                </button>

                {/* Success Message */}
                {submitSuccess && (
                  <div style={{
                    marginTop: '16px',
                    padding: '14px 20px',
                    background: 'linear-gradient(135deg, #10B981, #059669)',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    boxShadow: '0 8px 24px rgba(16, 185, 129, 0.4)',
                    animation: 'slideIn 0.4s ease'
                  }}>
                    <span style={{ fontSize: '1.2rem' }}>✓</span>
                    <span>Message sent! I'll get back to you soon.</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        .contact-item {
          cursor: pointer;
        }

        .contact-item:hover {
          transform: translateY(-4px);
          border-color: ${theme.accent} !important;
          box-shadow: 0 12px 32px ${theme.accent}30, 0 0 0 1px ${theme.accent}30;
        }

        .contact-item:hover .icon-box {
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
        }

        input::placeholder,
        textarea::placeholder {
          color: ${theme.textSecondary};
          opacity: 0.6;
        }

        @media (max-width: 1100px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 50px !important;
          }
        }

        @media (max-width: 768px) {
          #contact {
            padding: 60px 1.5rem !important;
          }
          
          #contact > div > div {
            padding: 35px 25px !important;
          }

          h1 {
            font-size: 2.5rem !important;
          }
        }

        @media (max-width: 480px) {
          #contact > div > div {
            padding: 30px 20px !important;
          }

          h1 {
            font-size: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;