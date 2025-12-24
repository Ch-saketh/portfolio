import React, { useState } from 'react';
import { Github, Linkedin, Send, Mail, Briefcase, MessageSquare, DollarSign, Layers } from 'lucide-react';

interface ContactProps {
  theme: any;
}

type FormType = 'project' | 'chat';

const Contact: React.FC<ContactProps> = ({ theme }) => {
  const [formType, setFormType] = useState<FormType>('project');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    projectType: 'AI/ML Development',
    budget: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDeploy = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Constructing the Outlook/Email Body
    const emailTo = "chokkapusaketh@gmail.com";
    const subjectLine = formType === 'project' 
      ? `Project Inquiry: ${formData.projectType} - ${formData.name}`
      : `General Connect: ${formData.subject || 'Hello'} - ${formData.name}`;
    
    const bodyContent = `
Name: ${formData.name}
Email: ${formData.email}
${formType === 'project' ? `Project Type: ${formData.projectType}` : ''}
${formType === 'project' ? `Estimated Budget: ${formData.budget}` : ''}

Message:
${formData.message}
    `.trim();

    // Triggering the Mailto Engine
    window.location.href = `mailto:${emailTo}?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(bodyContent)}`;
  };

  return (
    <section id="contact" style={{
      height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#000', overflow: 'hidden', position: 'relative',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      {/* Background Ambient Glows */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(at 0% 0%, ${theme.accent}12 0px, transparent 50%),
                     radial-gradient(at 100% 100%, ${theme.accent}08 0px, transparent 50%)`,
        filter: 'blur(100px)', zIndex: 0
      }} />

      <div className="contact-card">
        {/* SIDEBAR: Social & Identity */}
        <div className="sidebar">
          <div className="sidebar-top">
            <h1 className="title">Let's talk.</h1>
            <p className="subtitle">Chokkapu Saketh.</p>
          </div>

          <div className="social-links">
            <span className="section-label">NETWORKS</span>
            <a href="https://github.com/ch-saketh" target="_blank" rel="noreferrer" className="glass-btn">
              <Github size={18} /> <span>GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/saketh-chokkapu-3a668a2b9" target="_blank" rel="noreferrer" className="glass-btn">
              <Linkedin size={18} /> <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* FORM AREA: Dynamic Logic */}
        <div className="form-area">
          <div className="toggle-bar">
            <button 
              type="button"
              className={formType === 'project' ? 'active' : ''} 
              onClick={() => setFormType('project')}
            >
              <Briefcase size={14} /> New Project
            </button>
            <button 
              type="button"
              className={formType === 'chat' ? 'active' : ''} 
              onClick={() => setFormType('chat')}
            >
              <MessageSquare size={14} /> General Chat
            </button>
          </div>

          <form onSubmit={handleDeploy} className="dynamic-form">
            <div className="input-row">
              <div className="field-box">
                <input type="text" name="name" required placeholder="Full Name" value={formData.name} onChange={handleInputChange} />
              </div>
              <div className="field-box">
                <input type="email" name="email" required placeholder="Email Address" value={formData.email} onChange={handleInputChange} />
              </div>
            </div>

            {/* CONDITIONAL FIELDS BASED ON SELECTION */}
            {formType === 'project' ? (
              <div className="input-row animate-in">
                <div className="field-box">
                  <Layers size={14} className="icon-sub" />
                  <select name="projectType" value={formData.projectType} onChange={handleInputChange}>
                    <option value="AI/ML Development">AI/ML Development</option>
                    <option value="Quantum Security">Quantum Security</option>
                    <option value="Full Stack App">Full Stack App</option>
                    <option value="Other">Other Research</option>
                  </select>
                </div>
                <div className="field-box">
                  <DollarSign size={14} className="icon-sub" />
                  <input type="text" name="budget" placeholder="Budget (Optional)" value={formData.budget} onChange={handleInputChange} />
                </div>
              </div>
            ) : (
              <div className="field-box animate-in">
                <input type="text" name="subject" placeholder="Subject / Topic" value={formData.subject} onChange={handleInputChange} />
              </div>
            )}

            <div className="field-box">
              <textarea name="message" required rows={3} placeholder="Describe your vision..." value={formData.message} onChange={handleInputChange} />
            </div>

            <button type="submit" className="deploy-btn" style={{ background: theme.accent }}>
              Deploy Message <Send size={16} />
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .contact-card {
          display: grid; grid-template-columns: 0.8fr 1.2fr; width: 1050px;
          background: rgba(255, 255, 255, 0.01); backdrop-filter: blur(50px) saturate(180%);
          border-radius: 32px; border: 1px solid rgba(255, 255, 255, 0.08);
          overflow: hidden; z-index: 10; transform: scale(0.95);
        }
        
        .sidebar {
          padding: 60px 45px; background: rgba(255, 255, 255, 0.02);
          display: flex; flex-direction: column; justify-content: space-between;
          border-right: 1px solid rgba(255, 255, 255, 0.05);
        }

        .title { font-size: 3.8rem; font-weight: 700; color: #fff; letter-spacing: -0.06em; margin: 0; line-height: 1; }
        .subtitle { color: rgba(255, 255, 255, 0.4); margin-top: 15px; font-size: 1.1rem; }
        
        .section-label { font-size: 10px; font-weight: 800; color: ${theme.accent}; letter-spacing: 0.2em; margin-bottom: 20px; display: block; }
        .social-links { display: flex; flex-direction: column; gap: 12px; }
        
        .glass-btn {
          display: flex; align-items: center; gap: 12px; padding: 14px 20px;
          background: rgba(255, 255, 255, 0.04); border-radius: 14px;
          color: #fff; text-decoration: none; font-size: 14px; transition: 0.3s;
          border: 1px solid rgba(255, 255, 255, 0.04);
        }
        .glass-btn:hover { background: rgba(255, 255, 255, 0.1); transform: translateX(5px); border-color: ${theme.accent}50; }

        .form-area { padding: 60px; }
        .toggle-bar {
          display: flex; gap: 8px; background: rgba(255, 255, 255, 0.04);
          padding: 4px; border-radius: 14px; margin-bottom: 40px; width: fit-content;
        }
        .toggle-bar button {
          padding: 10px 22px; border-radius: 11px; border: none; background: transparent;
          color: rgba(255, 255, 255, 0.4); font-weight: 600; cursor: pointer;
          display: flex; align-items: center; gap: 8px; transition: 0.2s ease;
        }
        .toggle-bar button.active { background: #fff; color: #000; }

        .dynamic-form { display: flex; flex-direction: column; gap: 30px; }
        .input-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

        .field-box { position: relative; width: 100%; display: flex; align-items: center; }
        .icon-sub { position: absolute; left: 0; color: ${theme.accent}; opacity: 0.7; }
        
        .field-box input, .field-box textarea, .field-box select {
          width: 100%; padding: 12px 0; background: transparent !important;
          border: none; border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          color: white !important; font-size: 1.1rem; outline: none; transition: 0.3s;
        }
        
        /* THE FIX FOR PROJECT TYPE / BUDGET ICON SPACING */
        .field-box select, .field-box input[name="budget"] { padding-left: 25px; }

        .field-box input:focus, .field-box textarea:focus { border-bottom-color: ${theme.accent}; }
        .field-box input::placeholder, .field-box textarea::placeholder { color: rgba(255, 255, 255, 0.2); }
        
        select option { background: #0a0a0a; color: #fff; }

        .deploy-btn {
          display: flex; align-items: center; justify-content: center; gap: 12px;
          padding: 18px; border-radius: 16px; border: none; color: #fff;
          font-weight: 700; font-size: 15px; cursor: pointer; transition: 0.3s;
          box-shadow: 0 15px 35px ${theme.accent}30; margin-top: 10px;
        }
        .deploy-btn:hover { transform: translateY(-4px); filter: brightness(1.2); box-shadow: 0 20px 40px ${theme.accent}40; }

        .animate-in { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 900px) {
          .contact-card { grid-template-columns: 1fr; width: 95%; transform: scale(1); }
          .sidebar { display: none; }
          .form-area { padding: 40px 25px; }
        }
      `}</style>
    </section>
  );
};

export default Contact;