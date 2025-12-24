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
      padding: '0 2rem',
      backgroundColor: '#000', 
      height: '100vh', 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      margin: 0,
      /* Apple System Font Stack */
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif'
    }}>
      {/* RICHNESS: Subtle Mesh Gradient Light Effect */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(at 0% 0%, ${theme.accent}12 0px, transparent 50%),
                     radial-gradient(at 100% 100%, ${theme.accent}08 0px, transparent 50%)`,
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div style={{ 
        maxWidth: '1000px', 
        width: '100%', 
        zIndex: 1, 
        transform: 'scale(0.92)' 
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '0.7fr 1.3fr',
          background: 'rgba(255, 255, 255, 0.01)',
          backdropFilter: 'blur(50px) saturate(200%)',
          borderRadius: '30px',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          boxShadow: '0 40px 100px -20px rgba(0,0,0,0.7)',
          overflow: 'hidden'
        }}>
          
          {/* LEFT: APPLE MINIMAL SIDEBAR */}
          <div style={{
            padding: '50px 40px',
            background: 'rgba(255, 255, 255, 0.02)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRight: '1px solid rgba(255, 255, 255, 0.04)'
          }}>
            <div>
              <h1 style={{ 
                fontSize: '3.2rem', 
                fontWeight: 700, 
                color: '#fff', 
                letterSpacing: '-0.05em', 
                margin: 0,
                lineHeight: 1
              }}>Let's talk.</h1>
              <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: '12px', fontSize: '1.1rem', fontWeight: 400 }}>
                Chokkapu Saketh
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, color: theme.accent, letterSpacing: '0.15em' }}>EMAIL</span>
                <a href="mailto:chokkapusaketh@gmail.com" style={{ color: '#fff', textDecoration: 'none', fontSize: '14px', opacity: 0.8 }}>chokkapusaketh@gmail.com</a>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, color: theme.accent, letterSpacing: '0.15em' }}>LINKEDIN</span>
                <a href="https://www.linkedin.com/in/saketh-chokkapu-3a668a2b9" target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '14px', opacity: 0.8 }}>Saketh Chokkapu</a>
              </div>
            </div>
          </div>

          {/* RIGHT: CLEAN INTERACTION AREA */}
          <div style={{ padding: '50px' }}>
            <div style={{ 
              display: 'inline-flex', 
              padding: '3px', 
              background: 'rgba(255,255,255,0.04)', 
              borderRadius: '12px', 
              marginBottom: '40px' 
            }}>
              {['collaborate', 'connect'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFormType(type as FormType)}
                  style={{
                    padding: '8px 20px',
                    borderRadius: '9px',
                    border: 'none',
                    background: formType === type ? '#fff' : 'transparent',
                    color: formType === type ? '#000' : 'rgba(255,255,255,0.4)',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {type === 'collaborate' ? 'New Project' : 'General Chat'}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div className="apple-input">
                <input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="Full Name" />
                <div className="indicator"></div>
              </div>

              <div className="apple-input">
                <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="Email Address" />
                <div className="indicator"></div>
              </div>

              <div className="apple-input">
                <textarea name="message" required rows={3} value={formData.message} onChange={handleInputChange} placeholder="How can I help?" />
                <div className="indicator"></div>
              </div>

              <button type="submit" disabled={isSubmitting} className="apple-btn" style={{ background: theme.accent }}>
                {isSubmitting ? 'Sending...' : 'Deploy Message'}
              </button>

              {submitSuccess && (
                <div style={{ color: '#10B981', textAlign: 'center', fontSize: '13px', fontWeight: 500, animation: 'fadeIn 0.4s ease' }}>
                  ✓ Message transmitted successfully.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .apple-input { position: relative; width: 100%; }
        .apple-input input, .apple-input textarea {
          width: 100%; padding: 12px 0; background: transparent; border: none;
          border-bottom: 1px solid rgba(255,255,255,0.08); color: #fff; font-size: 1.1rem; outline: none;
          transition: border-color 0.3s ease;
        }
        .apple-input input::placeholder, .apple-input textarea::placeholder {
          color: rgba(255,255,255,0.2); font-weight: 400;
        }
        .apple-input .indicator {
          position: absolute; bottom: 0; left: 0; width: 0; height: 1.5px;
          background: ${theme.accent}; transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .apple-input input:focus ~ .indicator, .apple-input textarea:focus ~ .indicator { width: 100%; }
        
        .apple-btn {
          padding: 18px; border-radius: 14px; border: none; color: #fff; font-weight: 700;
          font-size: 15px; cursor: pointer; transition: transform 0.3s ease, filter 0.3s ease;
          box-shadow: 0 15px 35px ${theme.accent}30;
        }
        .apple-btn:hover { transform: translateY(-3px); filter: brightness(1.1); }
        .apple-btn:active { transform: translateY(-1px); }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 900px) {
          #contact { padding: 0 1rem; }
          .grid-container { grid-template-columns: 1fr !important; }
          sidebar { display: none; }
        }
      `}</style>
    </section>
  );
};

export default Contact;