import React, { useState } from 'react';

interface ContactProps {
  theme: any;
}

type FormType = 'collaborate' | 'connect';

const Contact: React.FC<ContactProps> = ({ theme }) => {
  const [formType, setFormType] = useState<FormType>('collaborate');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
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
      padding: '100px 2rem',
      backgroundColor: theme.bg,
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    }}>
      {/* Cinematic Background Glows */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '600px',
        height: '600px',
        background: `radial-gradient(circle, ${theme.accent}10 0%, transparent 70%)`,
        filter: 'blur(100px)',
        zIndex: 0
      }} />

      <div style={{ maxWidth: '1200px', width: '100%', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '0.8fr 1.2fr',
          background: `rgba(255, 255, 255, 0.02)`,
          backdropFilter: 'blur(30px) saturate(180%)',
          borderRadius: '32px',
          border: `1px solid rgba(255, 255, 255, 0.08)`,
          boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
          overflow: 'hidden'
        }} className="main-container">
          
          {/* LEFT: Apple-Style Minimal Sidebar */}
          <div style={{
            padding: '60px 40px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRight: `1px solid rgba(255, 255, 255, 0.05)`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <h2 style={{
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '3px',
                color: theme.accent,
                fontWeight: 800,
                marginBottom: '20px'
              }}>Inquiries</h2>
              <h1 style={{
                fontSize: '3.5rem',
                fontWeight: 700,
                color: '#fff',
                lineHeight: 1,
                letterSpacing: '-0.04em',
                marginBottom: '24px'
              }}>Let's talk.</h1>
              <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, fontSize: '1.1rem' }}>
                Blending <span style={{ color: '#fff' }}>logic</span> with <span style={{ color: '#fff' }}>creativity</span>. Send a message to start our next project.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { label: 'Email', val: 'chokkapusaketh@gmail.com', href: 'mailto:chokkapusaketh@gmail.com' },
                { label: 'LinkedIn', val: 'Saketh Chokkapu', href: 'https://www.linkedin.com/in/saketh-chokkapu-3a668a2b9' },
                { label: 'GitHub', val: '@ch-saketh', href: 'https://github.com/ch-saketh' }
              ].map((item, idx) => (
                <a key={idx} href={item.href} target="_blank" rel="noreferrer" className="social-link" style={{
                  textDecoration: 'none',
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '0.95rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, opacity: 0.4, textTransform: 'uppercase' }}>{item.label}</span>
                  <span className="link-text">{item.val}</span>
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT: Google-Style Clean Form */}
          <div style={{ padding: '60px' }}>
            {/* Segmented Control - Apple Style */}
            <div style={{
              display: 'inline-flex',
              padding: '4px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '14px',
              marginBottom: '40px'
            }}>
              {['collaborate', 'connect'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFormType(type as FormType)}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '11px',
                    border: 'none',
                    background: formType === type ? '#fff' : 'transparent',
                    color: formType === type ? '#000' : '#888',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: '0.2s ease'
                  }}
                >
                  {type === 'collaborate' ? 'New Project' : 'General Chat'}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div className="input-group">
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  placeholder=" "
                />
                <label>Full Name</label>
                <div className="line"></div>
              </div>

              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder=" "
                />
                <label>Email Address</label>
                <div className="line"></div>
              </div>

              <div className="input-group">
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  placeholder=" "
                />
                <label>How can I help?</label>
                <div className="line"></div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  padding: '20px',
                  borderRadius: '18px',
                  border: 'none',
                  background: isSubmitting ? 'rgba(255,255,255,0.1)' : theme.accent,
                  color: '#fff',
                  fontSize: '16px',
                  fontWeight: 700,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  marginTop: '10px',
                  boxShadow: `0 20px 40px ${theme.accent}30`
                }}
                className="submit-btn"
              >
                {isSubmitting ? 'Processing...' : 'Deploy Message'}
              </button>

              {submitSuccess && (
                <div style={{
                  color: '#10B981',
                  textAlign: 'center',
                  fontSize: '14px',
                  fontWeight: 600,
                  animation: 'fadeIn 0.5s ease'
                }}>
                  ✓ Message sent successfully. I'll reach out within 24 hours.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .input-group {
          position: relative;
          width: 100%;
        }

        .input-group input, .input-group textarea {
          width: 100%;
          padding: 12px 0;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          color: #fff;
          font-size: 1.1rem;
          outline: none;
          transition: 0.3s;
        }

        .input-group label {
          position: absolute;
          left: 0;
          top: 12px;
          color: rgba(255,255,255,0.3);
          pointer-events: none;
          transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .input-group input:focus ~ label,
        .input-group input:not(:placeholder-shown) ~ label,
        .input-group textarea:focus ~ label,
        .input-group textarea:not(:placeholder-shown) ~ label {
          top: -12px;
          font-size: 12px;
          color: ${theme.accent};
          font-weight: 700;
          text-transform: uppercase;
        }

        .input-group .line {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: ${theme.accent};
          transition: 0.4s;
        }

        .input-group input:focus ~ .line,
        .input-group textarea:focus ~ .line {
          width: 100%;
        }

        .social-link:hover .link-text {
          color: #fff;
          transform: translateX(5px);
        }

        .link-text {
          transition: 0.3s;
        }

        .submit-btn:hover {
          transform: scale(1.02) translateY(-4px);
          filter: brightness(1.1);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1000px) {
          .main-container {
            grid-template-columns: 1fr !important;
          }
          .main-container > div:first-child {
            padding: 40px !important;
            border-right: none;
            border-bottom: 1px solid rgba(255,255,255,0.05);
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;