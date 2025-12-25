import React from 'react';
import { Theme } from '../types/theme';

interface GalleryProps {
  theme: Theme;
}

const Gallery: React.FC<GalleryProps> = ({ theme }) => {
  const images = [
    { url: '/hack1.jpg', title: 'AQVH Grand Finale', category: 'Quantum Research' },
    { url: '/hack2.jpg', title: 'Hackoverflow 2k25', category: 'AI Engineering' },
    { url: '/award1.jpg', title: 'State Level Recognition', category: 'Award' },
    { url: '/team.jpg', title: 'Collaboration', category: 'Team' },
  ];

  return (
    <section id="gallery" style={{ padding: '100px 2rem', background: theme.bg }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.8rem', fontWeight: 800, color: theme.text, marginBottom: '60px', letterSpacing: '-0.05em' }}>
          Visual Log<span style={{ color: theme.accent }}>.</span>
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '24px',
        }}>
          {images.map((img, idx) => (
            <div key={idx} style={{
              position: 'relative',
              borderRadius: '32px',
              overflow: 'hidden',
              height: '400px',
              border: `1px solid ${theme.border}`,
              background: 'rgba(255,255,255,0.02)'
            }} className="gallery-item">
              <img src={img.url} alt={img.title} style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.8,
                transition: '0.6s cubic-bezier(0.16, 1, 0.3, 1)'
              }} />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '30px',
                opacity: 0.9
              }}>
                <span style={{ fontSize: '10px', fontWeight: 800, color: theme.accent, letterSpacing: '1.5px', marginBottom: '8px' }}>
                  {img.category.toUpperCase()}
                </span>
                <p style={{ fontSize: '1.2rem', fontWeight: 600, color: '#fff' }}>{img.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .gallery-item:hover img {
          transform: scale(1.08);
          opacity: 1;
        }
        .gallery-item:hover {
          border-color: ${theme.accent};
        }
      `}</style>
    </section>
  );
};

export default Gallery;