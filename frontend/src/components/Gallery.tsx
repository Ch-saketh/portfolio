import React from 'react';
import { Theme } from '../types/theme';

// 1. IMPORT YOUR GALLERY IMAGES (Ensures they load on Vercel)
import aqvhGallery from '../assets/gallery-aqvh-demo.jpg';
import hackoverflowGallery from '../assets/gallery-hackoverflow-pitch.jpg';

interface GalleryProps { theme: Theme; }

const Gallery: React.FC<GalleryProps> = ({ theme }) => {
  const images = [
    { 
      url: aqvhGallery, 
      title: 'AQVH State Grand Finale', 
      category: 'Quantum Research' 
    },
    { 
      url: hackoverflowGallery, 
      title: 'Hackoverflow 2k25 Presentation', 
      category: 'AI Engineering' 
    }
  ];

  return (
    <section id="gallery" style={{ padding: '80px 0', background: 'transparent' }}>
      <h2 style={{ 
        fontSize: '2.5rem', 
        fontWeight: 800, 
        color: '#fff', 
        marginBottom: '40px', 
        letterSpacing: '-0.04em' 
      }}>
        Visual Log<span style={{ color: theme.accent }}>.</span>
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
        gap: '24px',
      }}>
        {images.map((img, idx) => (
          <div key={idx} className="gallery-item" style={{
            position: 'relative',
            borderRadius: '32px',
            overflow: 'hidden',
            height: '450px',
            border: `1px solid ${theme.border}`,
            background: 'rgba(255,255,255,0.02)',
            transition: 'border-color 0.3s ease'
          }}>
            {/* The Image Fix: objectPosition: top center ensures no heads/bodies are cut off */}
            <img src={img.url} alt={img.title} style={{
              width: '100%', 
              height: '100%', 
              objectFit: 'cover', 
              objectPosition: 'top center',
              opacity: 0.8,
              transition: '0.6s cubic-bezier(0.16, 1, 0.3, 1)'
            }} />
            
            {/* Glassmorphism Text Overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '32px'
            }}>
              <span style={{ 
                fontSize: '10px', 
                fontWeight: 800, 
                color: theme.accent, 
                letterSpacing: '1.5px', 
                marginBottom: '8px' 
              }}>
                {img.category.toUpperCase()}
              </span>
              <p style={{ 
                fontSize: '1.4rem', 
                fontWeight: 600, 
                color: '#fff', 
                margin: 0 
              }}>{img.title}</p>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .gallery-item:hover img { transform: scale(1.05); opacity: 1; }
        .gallery-item:hover { border-color: ${theme.accent}; }
      `}</style>
    </section>
  );
};

export default Gallery;