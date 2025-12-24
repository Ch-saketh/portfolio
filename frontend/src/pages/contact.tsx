import React, { useState } from 'react';
import { Github, Linkedin, Send, Mail, Briefcase, MessageSquare, DollarSign, Layers } from 'lucide-react';

interface ContactProps { theme: any; }
type FormType = 'project' | 'chat';

const Contact: React.FC<ContactProps> = ({ theme }) => {
  const [formType, setFormType] = useState<FormType>('project');
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', projectType: 'AI/ML Development', budget: '', message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDeploy = (e: React.FormEvent) => {
    e.preventDefault();
    const emailTo = "chokkapusaketh@gmail.com";
    const subjectLine = formType === 'project' 
      ? `Project Inquiry: ${formData.projectType} - ${formData.name}`
      : `General Connect: ${formData.subject || 'Hello'} - ${formData.name}`;
    
    const bodyContent = `Name: ${formData.name}\nEmail: ${formData.email}\n${formType === 'project' ? `Project Type: ${formData.projectType}\nBudget: ${formData.budget}` : ''}\n\nMessage:\n${formData.message}`;
    window.location.href = `mailto:${emailTo}?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(bodyContent)}`;
  };

  return (
    <section id="contact" style={{
      height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#000', overflow: 'hidden', position: 'relative',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      {/* RICHNESS: Cinematic Ambient Light Feature */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(at 0% 0%, ${theme.accent}12 0px, transparent 50%),
                     radial-gradient(at 100% 100%, ${theme.accent}08 0px, transparent 50%)`,
        filter: 'blur(100px)', zIndex: 0
      }} />

      <div className="contact-card">
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

        <div className="form-area">
          <div className="toggle-bar">
            <button type="button" className={formType === 'project' ? 'active' : ''} onClick={() => setFormType('project')}>
              <Briefcase size={14} /> New Project
            </button>
            <button type="button" className={formType === 'chat' ? 'active' : ''} onClick={() => setFormType('chat')}>
              <MessageSquare size={14} /> General Chat
            </button>
          </div>

          <form onSubmit={handleDeploy} className="dynamic-form">
            <div className="input-row">
              <input type="text" name="name" className="apple-field" required placeholder="Full Name" value={formData.name} onChange={handleInputChange} />
              <input type="email" name="email" className="apple-field" required placeholder="Email Address" value={formData.email} onChange={handleInputChange} />
            </div>

            {formType === 'project' ? (
              <div className="input-row animate-in">
                <div className="field-box">
                  <Layers size={14} className="icon-sub" />
                  <select name="projectType" className="apple-field" value={formData.projectType} onChange={handleInputChange}>
                    <option value="AI/ML Development">AI/ML Development</option>
                    <option value="Quantum Security">Quantum Security</option>
                    <option value="Full Stack App">Full Stack App</option>
                  </select>
                </div>
                <div className="field-box">
                  <DollarSign size={14} className="icon-sub" />
                  <input type="text" name="budget" className="apple-field" placeholder="Budget" value={formData.budget} onChange={handleInputChange} />
                </div>
              </div>
            ) : (
              <input type="text" name="subject" className="apple-field animate-in" placeholder="Subject" value={formData.subject} onChange={handleInputChange} />
            )}

            <textarea name="message" className="apple-field" required rows={3} placeholder="Describe your vision..." value={formData.message} onChange={handleInputChange} />

            <button type="submit" className="deploy-btn" style={{ background: theme.accent }}>
              Deploy Message <Send size={16} />
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .contact-card {
          display: grid; grid-template-columns: 0.8fr 1.2fr; width: 1050px;
          background: rgba(255, 255, 255, 0.01); backdrop-filter: blur(60px) saturate(210%);
          border-radius: 32px; border: 1px solid rgba(255, 255, 255, 0.08);
          overflow: hidden; z-index: 10; transform: scale(0.95);
        }
        .sidebar { padding: 60px 45px; background: rgba(255, 255, 255, 0.02); display: flex; flex-direction: column; justify-content: space-between; border-right: 1px solid rgba(255, 255, 255, 0.05); }
        .title { font-size: 3.8rem; font-weight: 700; color: #fff; letter-spacing: -0.06em; margin: 0; }
        .subtitle { color: rgba(255, 255, 255, 0.4); margin-top: 15px; }
        .section-label { font-size: 10px; font-weight: 800; color: ${theme.accent}; letter-spacing: 0.2em; margin-bottom: 20px; display: block; }
        .social-links { display: flex; flex-direction: column; gap: 12px; }
        .glass-btn { display: flex; align-items: center; gap: 12px; padding: 14px 20px; background: rgba(255, 255, 255, 0.04); border-radius: 14px; color: #fff; text-decoration: none; font-size: 14px; transition: 0.3s; border: 1px solid rgba(255, 255, 255, 0.04); }
        .glass-btn:hover { background: rgba(255, 255, 255, 0.1); transform: translateX(5px); border-color: ${theme.accent}50; }
        .form-area { padding: 60px; }
        .toggle-bar { display: flex; gap: 8px; background: rgba(255, 255, 255, 0.04); padding: 4px; border-radius: 14px; margin-bottom: 40px; width: fit-content; }
        .toggle-bar button { padding: 10px 22px; border-radius: 11px; border: none; background: transparent; color: rgba(255, 255, 255, 0.4); font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: 0.2s; }
        .toggle-bar button.active { background: #fff; color: #000; }
        .dynamic-form { display: flex; flex-direction: column; gap: 30px; }
        .input-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .field-box { position: relative; width: 100%; display: flex; align-items: center; }
        .icon-sub { position: absolute; left: 0; color: ${theme.accent}; opacity: 0.7; }
        
        /* THE FIX FOR WHITE BACKGROUND */
        .apple-field { 
          width: 100%; padding: 12px 0; background: transparent !important; 
          border: none; border-bottom: 1px solid rgba(255, 255, 255, 0.1); 
          color: white !important; font-size: 1.1rem; outline: none; transition: 0.3s;
        }
        .apple-field:focus { border-bottom-color: ${theme.accent}; }
        .apple-field::placeholder { color: rgba(255, 255, 255, 0.2); }
        .apple-field:-webkit-autofill { -webkit-box-shadow: 0 0 0px 1000px #0c0c0c inset !important; -webkit-text-fill-color: white !important; transition: background-color 5000s ease-in-out 0s; }
        
        .field-box .apple-field { padding-left: 25px; }
        select.apple-field option { background: #0a0a0a; color: #fff; }
        .deploy-btn { display: flex; align-items: center; justify-content: center; gap: 12px; padding: 18px; border-radius: 16px; border: none; color: #fff; font-weight: 700; cursor: pointer; transition: 0.3s; box-shadow: 0 15px 35px ${theme.accent}30; }
        .deploy-btn:hover { transform: translateY(-4px); filter: brightness(1.2); }
        .animate-in { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 900px) { .contact-card { grid-template-columns: 1fr; width: 95%; transform: scale(1); } .sidebar { display: none; } }
      `}</style>
    </section>
  );
};

export default Contact;