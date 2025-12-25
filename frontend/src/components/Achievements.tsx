import React from 'react';
import { Trophy, Award } from 'lucide-react';
import { Theme } from '../types/theme';

// Import your media from assets
import aqvhVideo from '../assets/aqvh-finale-clip.mp4';
import hackoverflowPrize from '../assets/hackoverflow-prize.jpg';

interface AchievementsProps { theme: Theme; }

const Achievements: React.FC<AchievementsProps> = ({ theme }) => {
  const milestones = [
    {
      title: "AQVH Hackathon",
      rank: "3rd Prize // State Level",
      org: "Amaravati Quantum Valley",
      type: "video",
      media: aqvhVideo,
      desc: "Developed Quantum-Secure communication prototype for state finale."
    },
    {
      title: "Hackoverflow 2k25",
      rank: "2nd Prize // National",
      org: "PHCET Hackathon",
      type: "image",
      media: hackoverflowPrize,
      desc: "Engineered AI-driven industry solution for real-world problems."
    }
  ];

  return (
    <section id="achievements" style={{ padding: '80px 0' }}>
      <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', marginBottom: '40px', letterSpacing: '-0.04em' }}>
        Achievements<span style={{ color: theme.accent }}>.</span>
      </h2>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '24px' 
      }}>
        {milestones.map((item, idx) => (
          <div key={idx} className="achievement-card" style={{
            aspectRatio: '1/1', // Matches project card dimensions
            position: 'relative',
            borderRadius: '24px',
            overflow: 'hidden',
            border: `1px solid ${theme.border}`,
            background: theme.cardBg,
            transition: '0.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            {/* Background Media Layer */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
              {item.type === 'video' ? (
                <video autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}>
                  <source src={item.media} type="video/mp4" />
                </video>
              ) : (
                <img src={item.media} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} />
              )}
            </div>

            {/* Premium Content Overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 60%)',
              zIndex: 1
            }}>
              <Trophy size={20} color={theme.accent} style={{ marginBottom: '16px' }} />
              <span style={{ fontSize: '10px', fontWeight: 800, color: theme.accent, letterSpacing: '2px', textTransform: 'uppercase' }}>
                {item.rank}
              </span>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', margin: '8px 0' }}>{item.title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, margin: 0 }}>
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .achievement-card:hover { transform: translateY(-10px); border-color: ${theme.accent}60; }
        .achievement-card:hover video, .achievement-card:hover img { opacity: 0.6; transform: scale(1.05); transition: 0.6s ease; }
      `}</style>
    </section>
  );
};

export default Achievements;