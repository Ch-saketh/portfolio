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
    // Simulate API call
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
      backgroundColor: '#000', // Fixes white border issues
      height: '100vh', 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      margin: 0
    }}>
      {/* RICHNESS: Cinematic Ambient Light Effect */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(circle at 0% 0%, ${theme.accent}15 0%, transparent 50%), 
                     radial-gradient(circle at 100% 100%, ${theme.accent}10 0%, transparent 50%)`,
        filter: 'blur(80px)',
        zIndex: 0
      }} />

      <div style={{ 
        maxWidth: '1100px', 
        width: '100%', 
        zIndex: 1, 
        transform: 'scale(0.95)' // Ensures no scroll on small laptops
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '0.8fr 1.2fr',
          background: `rgba(255, 255, 255, 0.02)`,
          backdropFilter: 'blur(40px) saturate(180%)',
          borderRadius: '32px',
          border: `1px solid rgba(255, 255, 255, 0.08)`,
          boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
          overflow: 'hidden'
        }} className="contact-card">
          
          {/* LEFT: Identity Sidebar (Apple Influence) */}
          <div style={{
            padding: '60px 40px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRight: `1px solid rgba(255, 255, 255, 0.05)`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <h1 style={{ fontSize: '3rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.04em', margin: 0 }}>Let's talk.</h1>
              <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: '10px', fontSize: '1.1rem' }}>Chokkapu Saketh</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '10px', fontWeight: 800, color: theme.accent, letterSpacing: '2px' }}>EMAIL</span>
                <a href="mailto:chokkapusaketh@gmail.com" style={{ color: '#fff', textDecoration: 'none', fontSize: '14px' }}>chokkapusaketh@gmail.com</a>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '10px', fontWeight: 800, color: theme.accent, letterSpacing: '2px' }}>SOCIAL</span>
                <a href="https://www.linkedin.com/in/saketh-chokkapu-3a668a2b9" target="_blank" style={{ color: '#fff', textDecoration: 'none', fontSize: '14px' }}>LinkedIn Profile</a>
              </div>
            </div>
          </div>

          {/* RIGHT: High-End Form (Google Influence) */}
          <div style={{ padding: '60px' }}>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '40px', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '12px', width: 'fit-content' }}>
              {['collaborate', 'connect'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFormType(type as FormType)}
                  style={{
                    padding: '8px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    background: formType === type ? '#fff' : 'transparent',
                    color: formType === type ? '#000' : '#888',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: '0.3s'
                  }}
                >
                  {type === 'collaborate' ? 'New Project' : 'General Chat'}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div className="google-input">
                <input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder=" " />
                <label>Full Name</label>
                <div className="bar"></div>
              </div>

              <div className="google-input">
                <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder=" " />
                <label>Email Address</label>
                <div className="bar"></div>
              </div>

              <div className="google-input">
                <textarea name="message" required rows={3} value={formData.message} onChange={handleInputChange} placeholder=" " />
                <label>How can I help?</label>
                <div className="bar"></div>
              </div>

              <button type="submit" disabled={isSubmitting} className="submit-btn" style={{ background: theme.accent }}>
                {isSubmitting ? 'Deploying...' : 'Deploy Message 🚀'}
              </button>

              {submitSuccess && <p style={{ color: '#10B981', fontSize: '13px', textAlign: 'center', fontWeight: 600 }}>✓ Message deployed successfully.</p>}
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .google-input { position: relative; width: 100%; }
        .google-input input, .google-input textarea {
          width: 100%; padding: 10px 0; background: transparent; border: none;
          border-bottom: 1px solid rgba(255,255,255,0.1); color: #fff; font-size: 1rem; outline: none;
        }
        .google-input label {
          position: absolute; left: 0; top: 10px; color: rgba(255,255,255,0.3);
          pointer-events: none; transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .google-input input:focus ~ label, .google-input input:not(:placeholder-shown) ~ label,
        .google-input textarea:focus ~ label, .google-input textarea:not(:placeholder-shown) ~ label {
          top: -15px; font-size: 11px; color: ${theme.accent}; font-weight: 800; text-transform: uppercase;
        }
        .google-input .bar { position: absolute; bottom: 0; left: 0; width: 0; height: 2px; background: ${theme.accent}; transition: 0.4s; }
        .google-input input:focus ~ .bar, .google-input textarea:focus ~ .bar { width: 100%; }
        
        .submit-btn {
          padding: 16px; border-radius: 12px; border: none; color: #fff; font-weight: 800;
          cursor: pointer; transition: 0.3s; box-shadow: 0 10px 30px ${theme.accent}30;
        }
        .submit-btn:hover { transform: translateY(-3px); filter: brightness(1.1); }
        
        @media (max-width: 900px) {
          .contact-card { grid-template-columns: 1fr !important; }
          .contact-card > div:first-child { display: none; }
        }
      `}</style>
    </section>
  );
};

export default Contact;