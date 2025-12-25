import React from 'react';
import { Theme } from '../types/theme';

// USING YOUR EXACT FILE NAMES FROM SRC/ASSETS
import aqvhGallery from '../assets/aqvh-presentation.jpg';
import hackoverflowGallery from '../assets/hackoverflow-pitch.jpg';

interface GalleryProps { theme: Theme; }

const Gallery: React.FC<GalleryProps> = ({ theme }) => {
  const images = [
    { url: aqvhGallery, title: 'AQVH State Grand Finale', category: 'Quantum Research' },
    { url: hackoverflowGallery, title: 'Hackoverflow 2k25 Presentation', category: 'AI Engineering' }
  ];

  return (
    <section id="gallery" style={{ padding: '80px 0' }}>
      <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', marginBottom: '40px' }}>
        Visual Log<span style={{ color: theme.accent }}>.</span>
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '24px' }}>
        {images.map((img, idx) => (
          <div key={idx} className="gallery-item" style={{
            position: 'relative', borderRadius: '32px', overflow: 'hidden',
            height: '450px', border: `1px solid ${theme.border}`, background: 'rgba(255,255,255,0.02)'
          }}>
            <img src={img.url} style={{ 
              width: '100%', height: '100%', 
              objectFit: 'cover', 
              objectPosition: 'top center', // PREVENTS CUTTING YOUR BODY
              opacity: 0.8 
            }} />
            <div style={{
              position: 'absolute', inset: 0, padding: '32px',
              background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)',
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'
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