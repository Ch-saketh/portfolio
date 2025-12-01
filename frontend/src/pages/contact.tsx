import React, { useState } from 'react';

type ContactProps = { theme: any }

type FormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  userType: string
  message: string
}

const Contact: React.FC<ContactProps> = ({ theme }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    userType: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" style={{
      padding: '100px 2rem 80px',
      backgroundColor: theme.bg,
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem',
        alignItems: 'start'
      }}>
        
        {/* Left Column - Contact Info & Testimonial */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '3rem'
        }}>
          {/* Contact Header */}
          <div>
            <h2 style={{
              fontSize: '3rem',
              fontWeight: 700,
              background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentLight})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1rem',
              lineHeight: 1.2
            }}>
              Get in touch
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: theme.textSecondary,
              lineHeight: 1.6,
              marginBottom: '2rem'
            }}>
              Our friendly team would love to hear from you.
            </p>
          </div>

          {/* Testimonial */}
          <div style={{
            background: theme.cardBg,
            borderRadius: '16px',
            border: `1px solid ${theme.border}`,
            padding: '2rem',
            position: 'relative'
          }}>
            <div style={{
              fontSize: '3rem',
              position: 'absolute',
              top: '-10px',
              left: '2rem',
              opacity: 0.1
            }}>
              "
            </div>
            <p style={{
              color: theme.text,
              lineHeight: 1.6,
              marginBottom: '1.5rem',
              fontSize: '1.1rem'
            }}>
              "The perfect tool for startups to keep track of their financials. Their intuitive dashboard and reporting capabilities have saved our team hours of manual work."
            </p>
            <div>
              <p style={{
                fontWeight: 600,
                color: theme.text,
                marginBottom: '0.25rem'
              }}>
                Allan Lane
              </p>
              <p style={{
                color: theme.textSecondary,
                fontSize: '0.9rem'
              }}>
                CTO, TechCorp
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div style={{
          background: theme.cardBg,
          borderRadius: '20px',
          border: `1px solid ${theme.border}`,
          padding: '2.5rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
        }}>
          <form onSubmit={handleSubmit}>
            {/* Name Fields */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: theme.text,
                  marginBottom: '0.5rem'
                }}>
                  First name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: theme.bg,
                    border: `1px solid ${theme.border}`,
                    borderRadius: '8px',
                    color: theme.text,
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                    e.currentTarget.style.borderColor = theme.accent;
                    e.currentTarget.style.boxShadow = `0 0 0 3px ${theme.accent}20`;
                  }}
                  onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                    e.currentTarget.style.borderColor = theme.border;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: theme.text,
                  marginBottom: '0.5rem'
                }}>
                  Last name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: theme.bg,
                    border: `1px solid ${theme.border}`,
                    borderRadius: '8px',
                    color: theme.text,
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                    e.currentTarget.style.borderColor = theme.accent;
                    e.currentTarget.style.boxShadow = `0 0 0 3px ${theme.accent}20`;
                  }}
                  onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                    e.currentTarget.style.borderColor = theme.border;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            {/* Email */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: theme.text,
                marginBottom: '0.5rem'
              }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@company.com"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: theme.bg,
                  border: `1px solid ${theme.border}`,
                  borderRadius: '8px',
                  color: theme.text,
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                  onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                    e.currentTarget.style.borderColor = theme.accent;
                    e.currentTarget.style.boxShadow = `0 0 0 3px ${theme.accent}20`;
                  }}
                  onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                    e.currentTarget.style.borderColor = theme.border;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
              />
            </div>

            {/* Phone */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: theme.text,
                marginBottom: '0.5rem'
              }}>
                Phone number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: theme.bg,
                  border: `1px solid ${theme.border}`,
                  borderRadius: '8px',
                  color: theme.text,
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                  e.currentTarget.style.borderColor = theme.accent;
                  e.currentTarget.style.boxShadow = `0 0 0 3px ${theme.accent}20`;
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                  e.currentTarget.style.borderColor = theme.border;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* User Type Selection */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: theme.text,
                marginBottom: '1rem'
              }}>
                I am...
              </label>
              <div style={{
                display: 'grid',
                gap: '1rem'
              }}>
                {[
                  { value: 'solo', label: 'A solo creator', description: 'Automate basic tasks and manage workflows.' },
                  { value: 'team', label: 'Part of a team', description: 'I need multi-user business automations.' }
                ].map((option) => (
                  <label
                    key={option.value}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1rem',
                      padding: '1rem',
                      background: theme.bg,
                      border: `1px solid ${formData.userType === option.value ? theme.accent : theme.border}`,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (formData.userType !== option.value) {
                        e.currentTarget.style.borderColor = theme.accentLight;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (formData.userType !== option.value) {
                        e.currentTarget.style.borderColor = theme.border;
                      }
                    }}
                  >
                    <input
                      type="radio"
                      name="userType"
                      value={option.value}
                      checked={formData.userType === option.value}
                      onChange={handleChange}
                      style={{
                        marginTop: '0.25rem'
                      }}
                    />
                    <div>
                      <div style={{
                        fontWeight: 600,
                        color: theme.text,
                        marginBottom: '0.25rem'
                      }}>
                        {option.label}
                      </div>
                      <div style={{
                        fontSize: '0.9rem',
                        color: theme.textSecondary
                      }}>
                        {option.description}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Message */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: theme.text,
                marginBottom: '0.5rem'
              }}>
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Tell me about your project..."
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: theme.bg,
                  border: `1px solid ${theme.border}`,
                  borderRadius: '8px',
                  color: theme.text,
                  fontSize: '1rem',
                  outline: 'none',
                  resize: 'vertical',
                  transition: 'all 0.3s ease',
                  fontFamily: 'inherit'
                }}
                onFocus={(e: React.FocusEvent<HTMLTextAreaElement>) => {
                  e.currentTarget.style.borderColor = theme.accent;
                  e.currentTarget.style.boxShadow = `0 0 0 3px ${theme.accent}20`;
                }}
                onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => {
                  e.currentTarget.style.borderColor = theme.border;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Privacy Policy & Submit */}
            <div>
              <label style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                marginBottom: '2rem',
                fontSize: '0.9rem',
                color: theme.textSecondary,
                cursor: 'pointer'
              }}>
                <input type="checkbox" style={{ marginTop: '0.25rem' }} />
                <span>
                  You agree to our friendly <span style={{ color: theme.accent, cursor: 'pointer' }}>privacy policy</span>.
                </span>
              </label>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '1rem 2rem',
                  background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentLight})`,
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(59, 130, 246, 0.3)';
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Get in touch
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Mobile Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          section {
            padding: 80px 1rem 60px !important;
          }
          
          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          
          div[style*="gridTemplateColumns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          
          h2 {
            font-size: 2.5rem !important;
          }
        }
        
        @media (max-width: 480px) {
          section {
            padding: 60px 1rem 40px !important;
          }
          
          h2 {
            font-size: 2rem !important;
          }
          
          div[style*="padding: 2.5rem"] {
            padding: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;