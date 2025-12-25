import React from 'react';
import { Trophy, Award, Calendar } from 'lucide-react';
import { Theme } from '../types/theme';

interface AchievementsProps {
  theme: Theme;
}

const Achievements: React.FC<AchievementsProps> = ({ theme }) => {
  const milestones = [
    {
      title: "Amaravati Quantum Valley Hackathon (AQVH)",
      rank: "3rd Prize // State Level",
      org: "APSCHE & Amaravati Quantum Valley",
      desc: "Developed a Quantum-Secure communication prototype during the state-level grand finale.",
      year: "2025"
    },
    {
      title: "Hackoverflow 2k25",
      rank: "2nd Prize // National Level",
      org: "National Level Hackathon",
      desc: "Engineered a scalable AI-driven solution for real-world industry problem statements.",
      year: "2025"
    }
  ];

  return (
    <section id="achievements" style={{ padding: '100px 2rem', background: theme.bg }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.8rem', fontWeight: 800, color: theme.text, marginBottom: '60px', letterSpacing: '-0.05em' }}>
          Milestones<span style={{ color: theme.accent }}>.</span>
        </h2>

        <div style={{ display: 'grid', gap: '24px' }}>
          {milestones.map((item, idx) => (
            <div key={idx} style={{
              padding: '40px',
              background: 'rgba(255,255,255,0.02)',
              borderRadius: '28px',
              border: `1px solid ${theme.border}`,
              display: 'flex',
              gap: '30px',
              transition: '0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }} className="milestone-card">
              <div style={{ 
                padding: '18px', 
                background: `${theme.accent}15`, 
                borderRadius: '18px', 
                color: theme.accent,
                height: 'fit-content'
              }}>
                <Trophy size={32} />
              </div>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 800, color: theme.accent, letterSpacing: '2px', textTransform: 'uppercase' }}>
                  {item.rank}
                </span>
                <h3 style={{ fontSize: '1.8rem', color: theme.text, margin: '8px 0' }}>{item.title}</h3>
                <p style={{ color: theme.textSecondary, marginBottom: '20px', fontSize: '0.95rem' }}>
                  {item.org} • {item.year}
                </p>
                <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, fontSize: '1.1rem' }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .milestone-card:hover {
          transform: translateY(-8px);
          border-color: ${theme.accent}40;
          background: rgba(255,255,255,0.04);
        }
      `}</style>
    </section>
  );
};

export default Achievements;