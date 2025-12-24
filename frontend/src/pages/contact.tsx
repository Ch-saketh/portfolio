import React, { useState } from 'react';
import { Github, Linkedin, Send, Mail } from 'lucide-react';

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
    
    // Replace this with your actual EmailJS or API logic
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
      padding: '80px 1rem',
      backgroundColor: '#000',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
    }}>
      {/* Background Glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(at 0% 0%, ${theme.accent}12 0px, transparent 50%),
                     radial-gradient(at 100% 100%, ${theme.accent}08 0px, transparent 50%)`,
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div className="contact-container">
        <div className="contact-card">
          
          {/* LEFT: APPLE SIDEBAR */}
          <div className="sidebar">
            <div className="sidebar-top">
              <h1 className="main-title">Let's talk.</h1>
              <p className="subtitle">Chokkapu Saketh</p>
            </div>

            <div className="social-links-container">
              <span className="label">CONNECT</span>
              <div className="button-group">
                <a href="mailto:chokkapusaketh@gmail.com" className="social-button">
                  <Mail size={18} />
                  <span>Email</span>
                </a>
                <a href="https://github.com/ch-saketh" target="_blank" rel="noreferrer" className="social-button">
                  <Github size={18} />
                  <span>GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/saketh-chokkapu-3a668a2b9" target="_blank" rel="noreferrer" className="social-button">
                  <Linkedin size={18} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: INTERACTION AREA */}
          <div className="form-area">
            <div className="segmented-control">
              {['collaborate', 'connect'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFormType(type as FormType)}
                  className={`segment-btn ${formType === type ? 'active' : ''}`}
                >
                  {type === 'collaborate' ? 'New Project' : 'General Chat'}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="actual-form">
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
                <Send size={16} style={{ marginLeft: '8px' }} />
              </button>

              {submitSuccess && (
                <div className="success-toast">
                  ✓ Message transmitted successfully.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .contact-container {
          max-width: 1000px;
          width: 100%;
          z-index: 1;
          animation: slideUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .contact-card {
          display: grid;
          grid-template-columns: 0.75fr 1.25fr;
          background: rgba(255, 255, 255, 0.01);
          backdrop-filter: blur(50px) saturate(200%);
          border-radius: 32px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 40px 100px -20px rgba(0,0,0,0.7);
          overflow: hidden;
        }

        .sidebar {
          padding: 60px 40px;
          background: rgba(255, 255, 255, 0.02);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-right: 1px solid rgba(255, 255, 255, 0.05);
        }

        .main-title {
          font-size: 3.5rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.06em;
          margin: 0;
          line-height: 1;
        }

        .subtitle {
          color: rgba(255, 255, 255, 0.4);
          margin-top: 15px;
          font-size: 1.1rem;
        }

        .label {
          font-size: 10px;
          font-weight: 700;
          color: ${theme.accent};
          letter-spacing: 0.15em;
          margin-bottom: 15px;
          display: block;
        }

        .button-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .social-button {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          color: #fff;
          text-decoration: none;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .social-button:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateX(5px);
          border-color: ${theme.accent}50;
        }

        .form-area {
          padding: 60px;
        }

        .segmented-control {
          display: inline-flex;
          padding: 3px;
          background: rgba(255, 255, 255, 0.04);
          border-radius: 14px;
          margin-bottom: 40px;
        }

        .segment-btn {
          padding: 8px 22px;
          border-radius: 11px;
          border: none;
          background: transparent;
          color: rgba(255, 255, 255, 0.4);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .segment-btn.active {
          background: #fff;
          color: #000;
        }

        .actual-form {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .apple-input {
          position: relative;
          width: 100%;
        }

        .apple-input input, .apple-input textarea {
          width: 100%;
          padding: 12px 0;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          color: #fff;
          font-size: 1.1rem;
          outline: none;
          transition: border-color 0.3s ease;
        }

        .apple-input input::placeholder, .apple-input textarea::placeholder {
          color: rgba(255, 255, 255, 0.2);
        }

        .apple-input .indicator {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1.5px;
          background: ${theme.accent};
          transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .apple-input input:focus ~ .indicator, .apple-input textarea:focus ~ .indicator {
          width: 100%;
        }

        .apple-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px;
          border-radius: 16px;
          border: none;
          color: #fff;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 15px 35px ${theme.accent}30;
        }

        .apple-btn:hover:not(:disabled) {
          transform: translateY(-3px);
          filter: brightness(1.1);
        }

        .apple-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .success-toast {
          color: #10B981;
          text-align: center;
          font-size: 13px;
          font-weight: 500;
          animation: fadeIn 0.4s ease;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* MOBILE RESPONSIVENESS */
        @media (max-width: 900px) {
          .contact-card {
            grid-template-columns: 1fr;
          }
          .sidebar {
            border-right: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            padding: 40px;
            gap: 40px;
          }
          .main-title {
            font-size: 2.8rem;
          }
          .button-group {
            flex-direction: row;
            flex-wrap: wrap;
          }
          .social-button {
            flex: 1;
            min-width: 120px;
            justify-content: center;
          }
          .form-area {
            padding: 40px 20px;
          }
        }

        @media (max-width: 480px) {
          .main-title {
            font-size: 2.2rem;
          }
          .social-button span {
            display: none;
          }
          .social-button {
            min-width: 50px;
            padding: 15px;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;