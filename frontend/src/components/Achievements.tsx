import React from 'react';
import { Trophy, Play } from 'lucide-react';
import { Theme } from '../types/theme';

interface AchievementsProps { theme: Theme; }

const Achievements: React.FC<AchievementsProps> = ({ theme }) => {
  const milestones = [
    {
      title: "AQVH Hackathon",
      rank: "3rd Prize // State Level",
      org: "Amaravati Quantum Valley",
      type: "video",
      mediaUrl: "/path-to-your-video.mp4", // Replace with your video path
      desc: "Quantum-Secure communication prototype."
    },
    {
      title: "Hackoverflow 2k25",
      rank: "2nd Prize // National",
      org: "PHCET",
      type: "image",
      mediaUrl: "/path-to-your-2nd-prize-image.jpg", // Replace with your prize image
      desc: "AI-driven industry solution."
    }
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
      {milestones.map((m, i) => (
        <div key={i} className="square-card" style={{
          aspectRatio: '1/1',
          position: 'relative',
          borderRadius: '24px',
          overflow: 'hidden',
          border: `1px solid ${theme.border}`,
          background: theme.cardBg
        }}>
          {/* Background Media */}
          {m.type === 'video' ? (
            <video autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}>
              <source src={m.mediaUrl} type="video/mp4" />
            </video>
          ) : (
            <img src={m.mediaUrl} alt={m.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} />
          )}

          {/* Overlay Content */}
          <div style={{
            position: 'absolute', inset: 0, padding: '30px',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)'
          }}>
            <Trophy size={24} color={theme.accent} style={{ marginBottom: '15px' }} />
            <span style={{ fontSize: '10px', fontWeight: 800, color: theme.accent, letterSpacing: '2px' }}>{m.rank}</span>
            <h3 style={{ fontSize: '1.4rem', color: '#fff', margin: '5px 0' }}>{m.title}</h3>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', margin: 0 }}>{m.desc}</p>
          </div>
        </div>
      ))}
      <style>{`
        .square-card { transition: 0.4s ease; }
        .square-card:hover { transform: translateY(-10px); border-color: ${theme.accent}; }
        .square-card:hover video, .square-card:hover img { opacity: 0.7; transform: scale(1.05); }
      `}</style>
    </div>
  );
};

export default Achievements;