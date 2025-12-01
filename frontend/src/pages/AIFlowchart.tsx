import React, { useEffect, useRef } from 'react';

interface AIFlowchartProps {
  theme: any;
}

const AIFlowchart: React.FC<AIFlowchartProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 15, 21, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${p.opacity})`;
        ctx.fill();
      });

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - dist / 100)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <section style={{
      padding: '100px 2rem',
      backgroundColor: theme.bg,
      position: 'relative',
      overflow: 'hidden'
    }}>
      <canvas
        ref={canvasRef}
        width={1400}
        height={800}
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: 0.3,
          pointerEvents: 'none'
        }}
      />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '5rem'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            marginBottom: '1rem',
            color: theme.text,
            letterSpacing: '-0.02em'
          }}>
            Technology Integration
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: theme.textSecondary
          }}>
            How AI, Web, and Systems work together
          </p>
        </div>

        {/* Main Flowchart */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2rem',
          flexWrap: 'wrap',
          position: 'relative'
        }}>
          {/* AI Node */}
          <div style={{
            position: 'relative',
            animation: 'float 6s ease-in-out infinite'
          }}>
            <div style={{
              width: '200px',
              height: '200px',
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))',
              border: '2px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(59, 130, 246, 0.2)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 12px 48px rgba(59, 130, 246, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(59, 130, 246, 0.2)';
            }}
            >
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem'
              }}>🤖</div>
              <div style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: theme.text,
                marginBottom: '0.5rem'
              }}>AI/ML</div>
              <div style={{
                fontSize: '0.75rem',
                color: theme.textSecondary,
                textAlign: 'center',
                padding: '0 1rem'
              }}>Neural Networks, Computer Vision, NLP</div>
            </div>
            {/* Pulse effect */}
            <div style={{
              position: 'absolute',
              inset: '-4px',
              border: '2px solid rgba(59, 130, 246, 0.5)',
              borderRadius: '22px',
              animation: 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
            }}></div>
          </div>

          {/* Connection Arrow 1 */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <div style={{
              width: '60px',
              height: '2px',
              background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.5), rgba(59, 130, 246, 0.8))',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                right: '-8px',
                top: '-3px',
                width: 0,
                height: 0,
                borderLeft: '8px solid rgba(59, 130, 246, 0.8)',
                borderTop: '4px solid transparent',
                borderBottom: '4px solid transparent'
              }}></div>
            </div>
          </div>

          {/* Web Node */}
          <div style={{
            position: 'relative',
            animation: 'float 6s ease-in-out infinite 2s'
          }}>
            <div style={{
              width: '200px',
              height: '200px',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))',
              border: '2px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(16, 185, 129, 0.2)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 12px 48px rgba(16, 185, 129, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(16, 185, 129, 0.2)';
            }}
            >
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem'
              }}>💻</div>
              <div style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: theme.text,
                marginBottom: '0.5rem'
              }}>Web Dev</div>
              <div style={{
                fontSize: '0.75rem',
                color: theme.textSecondary,
                textAlign: 'center',
                padding: '0 1rem'
              }}>React, Node.js, Full-Stack</div>
            </div>
            <div style={{
              position: 'absolute',
              inset: '-4px',
              border: '2px solid rgba(16, 185, 129, 0.5)',
              borderRadius: '22px',
              animation: 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite 0.5s'
            }}></div>
          </div>

          {/* Connection Arrow 2 */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <div style={{
              width: '60px',
              height: '2px',
              background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.5), rgba(251, 146, 60, 0.8))',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                right: '-8px',
                top: '-3px',
                width: 0,
                height: 0,
                borderLeft: '8px solid rgba(251, 146, 60, 0.8)',
                borderTop: '4px solid transparent',
                borderBottom: '4px solid transparent'
              }}></div>
            </div>
          </div>

          {/* OS/Systems Node */}
          <div style={{
            position: 'relative',
            animation: 'float 6s ease-in-out infinite 4s'
          }}>
            <div style={{
              width: '200px',
              height: '200px',
              background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.1), rgba(239, 68, 68, 0.1))',
              border: '2px solid rgba(251, 146, 60, 0.3)',
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(251, 146, 60, 0.2)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 12px 48px rgba(251, 146, 60, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(251, 146, 60, 0.2)';
            }}
            >
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem'
              }}>⚙️</div>
              <div style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: theme.text,
                marginBottom: '0.5rem'
              }}>Systems</div>
              <div style={{
                fontSize: '0.75rem',
                color: theme.textSecondary,
                textAlign: 'center',
                padding: '0 1rem'
              }}>Cloud, DevOps, Infrastructure</div>
            </div>
            <div style={{
              position: 'absolute',
              inset: '-4px',
              border: '2px solid rgba(251, 146, 60, 0.5)',
              borderRadius: '22px',
              animation: 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite 1s'
            }}></div>
          </div>
        </div>

        {/* Integration Description */}
        <div style={{
          marginTop: '5rem',
          textAlign: 'center',
          maxWidth: '800px',
          margin: '5rem auto 0'
        }}>
          <div style={{
            padding: '2rem',
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05))',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            borderRadius: '16px',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: theme.accent,
              marginBottom: '1rem'
            }}>
              Seamless Integration
            </h3>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.8',
              color: theme.textSecondary
            }}>
              AI models power intelligent features, web applications provide user interfaces, 
              and robust systems infrastructure ensures scalability and performance. Together, 
              they create next-generation solutions that are smart, accessible, and reliable.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes pulse-ring {
          0% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
          }
          100% {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }

        @media (max-width: 768px) {
          section > div > div:nth-child(2) {
            flex-direction: column !important;
          }
        }
      `}</style>
    </section>
  );
};

export default AIFlowchart;