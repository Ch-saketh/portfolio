import React from 'react';
import { Theme } from '../types/theme';

interface GalleryProps { theme: Theme; }

const Gallery: React.FC<GalleryProps> = ({ theme }) => {
  const images = [
    { url: '/assets/aqvh-presentation.jpg', title: 'AQVH State Grand Finale', category: 'Quantum Research' },
    { url: '/assets/hackoverflow-pitch.jpg', title: 'Hackoverflow 2k25 Presentation', category: 'AI Engineering' }
  ];

  return (
    <section id="gallery" style={{ padding: '80px 0' }}>
      <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', marginBottom: '40px', letterSpacing: '-0.04em' }}>
        Visual Log<span style={{ color: theme.accent }}>.</span>
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '24px' }}>
        {images.map((img, idx) => (
          <div key={idx} className="gallery-item" style={{
            position: 'relative',
            borderRadius: '32px',
            overflow: 'hidden',
            height: '450px',
            border: `1px solid ${theme.border}`,
            background: 'rgba(255,255,255,0.02)'
          }}>
            <img src={img.url} alt={img.title} style={{
              width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7,
              transition: '0.6s cubic-bezier(0.16, 1, 0.3, 1)'
            }} />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '32px'
            }}>
              <span style={{ fontSize: '10px', fontWeight: 800, color: theme.accent, letterSpacing: '1.5px', marginBottom: '8px' }}>
                {img.category.toUpperCase()}
              </span>
              <p style={{ fontSize: '1.4rem', fontWeight: 600, color: '#fff', margin: 0 }}>{img.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;