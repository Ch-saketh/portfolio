import React from 'react';
import { Trophy, Award, ExternalLink } from 'lucide-react';
import { Theme } from '../types/theme';

interface AchievementsProps { theme: Theme; }

const Achievements: React.FC<AchievementsProps> = ({ theme }) => {
  const achievements = [
    {
      title: "AQVH Hackathon",
      rank: "3rd Prize // State Level",
      org: "Amaravati Quantum Valley",
      type: "video",
      mediaUrl: "/videos/aqvh_finale.mp4", // Path to your video
      desc: "Developed a Quantum-Secure communication prototype for the APSCHE state finale."
    },
    {
      title: "Hackoverflow 2k25",
      rank: "2nd Prize // National Level",
      org: "PHCET (Hackoverflow)",
      type: "image",
      mediaUrl: "/images/hackoverflow_prize.jpg", // Path to your prize image
      desc: "Engineered an AI-driven industry solution for real-world problem statements."
    }
  ];

  return (
    <section id="achievements" style={{ padding: '80px 0', background: 'transparent' }}>
      <h2 style={{ 
        fontSize: '2.5rem', 
        fontWeight: 800, 
        color: '#fff', 
        marginBottom: '40px', 
        letterSpacing: '-0.04em' 
      }}>
        Achievements<span style={{ color: theme.accent }}>.</span>
      </h2>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '24px' 
      }}>
        {achievements.map((item, idx) => (
          <div key={idx} className="achievement-card" style={{
            aspectRatio: '1/1', // Strictly square to match project cards
            position: 'relative',
            borderRadius: '24px',
            overflow: 'hidden',
            border: `1px solid ${theme.border}`,
            background: theme.cardBg,
            transition: '0.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            {/* Background Media */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
              {item.type === 'video' ? (
                <video autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}>
                  <source src={item.mediaUrl} type="video/mp4" />
                </video>
              ) : (
                <img src={item.mediaUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} />
              )}
            </div>

            {/* Content Overlay */}
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
              <div style={{ 
                width: '40px', height: '40px', background: `${theme.accent}20`, 
                borderRadius: '12px', display: 'flex', alignItems: 'center', 
                justifyContent: 'center', marginBottom: '16px', color: theme.accent 
              }}>
                <Trophy size={20} />
              </div>
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
        .achievement-card:hover img, .achievement-card:hover video { opacity: 0.7; transform: scale(1.05); }
      `}`</style>
    </section>
  );
};

export default Achievements