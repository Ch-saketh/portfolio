import React from 'react';
import ProfileCard from '../components/ProfileCard';
import profileImage from '../assets/profile-photo.jpg';

interface AboutProps {
  theme: any;
}

const About: React.FC<AboutProps> = ({ theme }) => {
  return (
    <section id="about" style={{
      paddingTop: '100px',
      paddingBottom: '80px',
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'visible'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 2rem',
        display: 'grid',
        gridTemplateColumns: '1.1fr 0.9fr',
        gap: '3rem',
        alignItems: 'flex-start',
        width: '100%',
        height: '100%'
      }}>
        {/* Left Content */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          maxWidth: '580px',
          height: '100%',
          position: 'relative',
          zIndex: 10  // Added to ensure content stays on top
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.5rem 1rem',
            backgroundColor: theme.accent + '12',
            border: '1px solid ' + theme.accent + '25',
            borderRadius: '50px',
            marginBottom: '1.5rem',
            width: 'fit-content'
          }}>
            <div style={{
              width: '6px',
              height: '6px',
              backgroundColor: theme.accent,
              borderRadius: '50%',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
            }}></div>
            <span style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: theme.accent,
              letterSpacing: '0.02em'
            }}>
              AI/ML Engineer & Full-Stack Developer
            </span>
          </div>

          {/* Name with White Gradient */}
          <div
            style={{
              fontSize: '2.8rem',
              fontWeight: 700,
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
              margin: '0 0 0.8rem 0',
              background: 'linear-gradient(90deg, #ffffff, #f0f9ff, #e0f2fe, #f0f9ff, #ffffff)',
              backgroundSize: '300% 100%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'gradientMove 6s linear infinite',
              width: 'fit-content'
            }}
          >
            Chokkapu Saketh
          </div>

          <h2 style={{
            fontSize: '1.3rem',
            fontWeight: 600,
            lineHeight: '1.4',
            color: theme.accent,
            marginBottom: '1rem',
            letterSpacing: '-0.01em'
          }}>
            Building Intelligent Digital Experiences with AI
          </h2>

          {/* Flowchart/Tree Structure */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
            marginBottom: '0.8rem'
          }}>
            {/* Main Node */}
            <div style={{
              position: 'relative',
              padding: '0.75rem',
              backgroundColor: theme.accent + '08',
              border: `1px solid ${theme.accent}20`,
              borderRadius: '10px',
              borderLeft: `4px solid ${theme.accent}`
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '0.3rem'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: theme.accent,
                  borderRadius: '50%'
                }}></div>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: theme.accent,
                  margin: 0
                }}>
                  Core Expertise
                </h3>
              </div>
              <p style={{
                color: theme.textSecondary,
                lineHeight: '1.6',
                fontSize: '0.9rem',
                margin: 0
              }}>
                AI/ML Engineering • Full-Stack Development • Computer Vision • NLP
              </p>
            </div>

            {/* Branch 1 */}
            <div style={{
              position: 'relative',
              marginLeft: '2rem',
              paddingLeft: '1.5rem'
            }}>
              {/* Vertical connector line */}
              <div style={{
                position: 'absolute',
                left: '0',
                top: '0',
                bottom: '0',
                width: '2px',
                backgroundColor: theme.accent + '30'
              }}></div>
              
              {/* Horizontal connector line */}
              <div style={{
                position: 'absolute',
                left: '0',
                top: '50%',
                width: '1rem',
                height: '2px',
                backgroundColor: theme.accent + '30',
                transform: 'translateY(-50%)'
              }}></div>

              <div style={{
                padding: '0.7rem',
                backgroundColor: theme.accent + '05',
                border: `1px solid ${theme.accent}15`,
                borderRadius: '8px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.15rem'
                }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    backgroundColor: theme.accent,
                    borderRadius: '50%'
                  }}></div>
                  <h4 style={{
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: theme.text,
                    margin: 0
                  }}>
                    AI/ML Development
                  </h4>
                </div>
                <p style={{
                  color: theme.textSecondary,
                  lineHeight: '1.5',
                  fontSize: '0.85rem',
                  margin: 0
                }}>
                  Neural Networks • Deep Learning • Predictive Models • Model Deployment
                </p>
              </div>
            </div>

            {/* Branch 2 */}
            <div style={{
              position: 'relative',
              marginLeft: '2rem',
              paddingLeft: '1.5rem'
            }}>
              {/* Vertical connector line continues */}
              <div style={{
                position: 'absolute',
                left: '0',
                top: '0',
                bottom: '0',
                width: '2px',
                backgroundColor: theme.accent + '30'
              }}></div>
              
              {/* Horizontal connector line */}
              <div style={{
                position: 'absolute',
                left: '0',
                top: '50%',
                width: '1rem',
                height: '2px',
                backgroundColor: theme.accent + '30',
                transform: 'translateY(-50%)'
              }}></div>

              <div style={{
                padding: '1.25rem',
                backgroundColor: theme.accent + '05',
                border: `1px solid ${theme.accent}15`,
                borderRadius: '8px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.25rem'
                }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    backgroundColor: theme.accent,
                    borderRadius: '50%'
                  }}></div>
                  <h4 style={{
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: theme.text,
                    margin: 0
                  }}>
                    Full-Stack Engineering
                  </h4>
                </div>
                <p style={{
                  color: theme.textSecondary,
                  lineHeight: '1.5',
                  fontSize: '0.85rem',
                  margin: 0
                }}>
                  React • Node.js • Python • Cloud Infrastructure • Database Design
                </p>
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            gap: '0.8rem',
            alignItems: 'center',
            flexWrap: 'wrap',
            position: 'relative',
            zIndex: 20  // Higher z-index for buttons
          }}>
            
            
            
          </div>
        </div>

        {/* Right - Profile Card Container */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          position: 'relative',
          height: '100%',
          paddingTop: '0',
          pointerEvents: 'none'  // Prevent container from blocking clicks
        }}>
          <div style={{
            width: '100%',
            maxWidth: '380px',
            height: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transform: 'scale(0.88)',
            pointerEvents: 'auto'  // Re-enable clicks on the card itself
          }}>
            <ProfileCard
              name="Chokkapu Saketh"
              title="AI/ML Engineer and Web Developer"
              handle="ch-saketh"
              status="Online"
              contactText="Contact Me"
              avatarUrl={profileImage}
              miniAvatarUrl={profileImage}
              showUserInfo={true}
              showSocialLinks={false}
              enableTilt={true}
              onContactClick={() => {
                window.location.href = 'mailto:chokkpausaketh@gmail.com';
              }}
              behindGlowEnabled={true}
              behindGlowColor="rgba(59, 130, 246, 0.5)"
              behindGlowSize="40%"
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        #about {
          overflow: visible !important;
          min-height: 100vh !important;
          height: auto !important;
        }

        @media (max-width: 1200px) {
          #about > div {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
            padding: 0 1.5rem !important;
          }
          
          #about > div > div:first-child {
            text-align: center;
            align-items: center;
            max-width: 100% !important;
            padding: 1rem 0 !important;
          }
          
          #about > div > div:first-child > * {
            margin-left: auto;
            margin-right: auto;
          }
          
          #about > div > div:last-child {
            order: -1;
            min-height: 400px;
            padding: 1rem 0 !important;
          }

          #about > div > div:last-child > div {
            transform: scale(0.85) !important;
          }
        }

        @media (max-width: 768px) {
          #about {
            padding-top: 40px !important;
            padding-bottom: 40px !important;
            min-height: auto !important;
          }
          
          #about > div {
            gap: 1rem !important;
            padding: 0 1rem !important;
            min-height: auto !important;
          }

          #about > div > div:last-child {
            min-height: 350px;
          }

          #about > div > div:last-child > div {
            transform: scale(0.8) !important;
          }

          /* Adjust flowchart for mobile */
          .flowchart-branch {
            margin-left: 1rem !important;
            padding-left: 1rem !important;
          }
        }

        @media (max-width: 480px) {
          #about > div > div:last-child {
            min-height: 320px;
          }

          #about > div > div:last-child > div {
            transform: scale(0.75) !important;
          }
        }
      `}</style>
    </section>
  );
};

export default About;