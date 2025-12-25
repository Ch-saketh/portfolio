import React from 'react';
import { Trophy } from 'lucide-react';
import { Theme } from '../types/theme';

// USING YOUR EXACT FILE NAMES FROM SRC/ASSETS
import aqvhPhoto from '../assets/aqvh-state-finale.jpg';
import hackoverflowPhoto from '../assets/hackoverflow-prize.jpg';

interface AchievementsProps { theme: Theme; }

const Achievements: React.FC<AchievementsProps> = ({ theme }) => {
  const data = [
    {
      title: "AQVH Hackathon",
      rank: "3rd Prize // State Level",
      image: aqvhPhoto,
      desc: "Developed a Quantum-Secure communication prototype for the APSCHE state-level grand finale."
    },
    {
      title: "Hackoverflow 2k25",
      rank: "2nd Prize // National Level",
      image: hackoverflowPhoto,
      desc: "Engineered a scalable AI-driven solution for real-world industry problem statements."
    }
  ];

  return (
    <section id="achievements" style={{ padding: '80px 0' }}>
      <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', marginBottom: '40px' }}>
        Achievements<span style={{ color: theme.accent }}>.</span>
      </h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '24px' 
      }}>
        {data.map((item, idx) => (
          <div key={idx} className="achievement-card" style={{
            aspectRatio: '1/1', // EXACT SIZE MATCH FOR PROJECT CARDS
            position: 'relative',
            borderRadius: '24px',
            overflow: 'hidden',
            border: `1px solid ${theme.border}`,
            background: theme.cardBg
          }}>
            <img 
              src={item.image} 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                objectPosition: 'top center', // PREVENTS CUTTING YOUR BODY
                opacity: 0.5 
              }} 
            />
            <div style={{
              position: 'absolute', inset: 0, padding: '32px',
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
              background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 70%)'
            }}>
              <Trophy size={20} color={theme.accent} style={{ marginBottom: '12px' }} />
              <span style={{ fontSize: '10px', fontWeight: 800, color: theme.accent, letterSpacing: '2px' }}>{item.rank}</span>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', margin: '5px 0' }}>{item.title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', margin: 0 }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Achievements;