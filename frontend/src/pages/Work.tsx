import React from 'react';

interface WorkProps {
  theme: any;
}

const Work: React.FC<WorkProps> = ({ theme }) => {
  const projects = [
    {
      id: 1,
      title: "PageMatch – Full Stack Website",
      description: "A dynamic web platform for matching users with relevant web pages based on profile preferences, with real-time interaction capabilities.",
      technologies: ["React.js", "Node.js", "Express", "MongoDB"],
      duration: "Jan 2025 – Present",
      responsibilities: [
        "Built Flask APIs in Node.js and Express for profile matching and data management.",
        "Created a modern, mobile-responsive UI in React.js.",
        "Integrated MongoDB for flexible, scalable storage of user profiles.",
        "Ensured smooth user navigation and minimal load times."
      ],
      usage: "Helps users quickly find the most relevant online content, improving search efficiency and personalization.",
      category: "Full Stack Development",
      color: "#3b82f6"
    },
    {
      id: 2,
      title: "Book Recommendation System",
      description: "A hybrid machine learning model combining content-based and collaborative filtering for book recommendations.",
      technologies: [
        "Python", 
        "Scikit-learn (TF-IDF Vectorizer, Cosine Similarity)", 
        "LightFM", 
        "WARP Loss Function", 
        "Precision@K"
      ],
      duration: "Jan 2025 – Present",
      responsibilities: [
        "Implemented TF-IDF Vectorizer for feature extraction from book metadata.",
        "Applied cosine similarity for ranking and retrieving similar books.",
        "Built and tuned LightFM collaborative filtering model using WARP loss.",
        "Evaluated model performance using Precision@K."
      ],
      usage: "Enables accurate and personalized book recommendations for both new and returning users.",
      category: "Machine Learning",
      color: "#10b981"
    },
    {
      id: 3,
      title: "Cine Portal",
      description: "An interactive movie portal that allows users to browse, search, and review films, fostering a movie-loving community.",
      technologies: ["React.js", "Flask", "MongoDB"],
      duration: "Jan 2025 – Present",
      responsibilities: [
        "Developed movie listing and search pages with React.js.",
        "Built Flask APIs to fetch and manage movie data from MongoDB.",
        "Implemented a review and rating system to enhance community interaction.",
        "Ensured high performance and responsiveness across devices."
      ],
      usage: "Provides movie enthusiasts with a central hub for film discovery, reviews, and discussions.",
      category: "Full Stack Development",
      color: "#8b5cf6"
    },
    {
      id: 4,
      title: "Quantum-Secure E-Auction System",
      description: "A secure e-auction system implementing quantum key distribution for enhanced security.",
      technologies: ["React (Vite)", "TailwindCSS", "Node.js", "Express.js", "MongoDB", "WebSockets", "IBM Qiskit", "BB84 Protocol"],
      duration: "Amaravati Quantum Valley Hackathon",
      responsibilities: [
        "Worked as Frontend Engineer, building the user interface using React (Vite) + TailwindCSS.",
        "Integrated frontend with backend services (Node.js, Express.js, MongoDB).",
        "Enabled real-time communication using WebSockets.",
        "Implemented security with Quantum Key Distribution (BB84 Protocol) via IBM Qiskit simulators."
      ],
      usage: "Secured 3rd Prize at the Internal Hackathon",
      category: "Quantum Computing",
      color: "#ec4899"
    }
  ];

  return (
    <section 
      id="work" 
      style={{
        padding: '100px 2rem',
        backgroundColor: theme.bg,
        minHeight: '100vh',
        position: 'relative'
      }}
    >
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `radial-gradient(circle at 20% 50%, ${theme.accent}08 0%, transparent 50%)`,
        pointerEvents: 'none'
      }}></div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '4rem'
        }}>
          <h2 style={{
            fontSize: '2.8rem',
            fontWeight: 700,
            background: `linear-gradient(135deg, ${theme.text}, ${theme.accentLight})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem'
          }}>
            My Projects
          </h2>
          <p style={{
            color: theme.textSecondary,
            fontSize: '1.1rem',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            A collection of my technical projects showcasing expertise in full-stack development, 
            machine learning, and emerging technologies.
          </p>
        </div>

        {/* Projects Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2.5rem',
          marginBottom: '4rem'
        }}>
          {projects.map((project) => (
            <div
              key={project.id}
              style={{
                background: theme.cardBg,
                borderRadius: '16px',
                border: `1px solid ${theme.border}`,
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = `0 20px 40px rgba(0, 0, 0, 0.3)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Accent Border */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: `linear-gradient(90deg, ${project.color}, ${project.color}60)`,
                borderRadius: '16px 16px 0 0'
              }}></div>

              <div style={{ padding: '2rem' }}>
                {/* Header */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '0.75rem'
                  }}>
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      color: theme.text,
                      margin: 0
                    }}>
                      {project.title}
                    </h3>
                    <span style={{
                      padding: '0.4rem 0.8rem',
                      background: `${project.color}20`,
                      color: project.color,
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 500
                    }}>
                      {project.category}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: theme.textSecondary,
                    fontSize: '0.9rem'
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.7 }}>
                      <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm0-2C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm1 17h-2v-7h2v7zm-1-9c-.553 0-1-.447-1-1s.447-1 1-1 1 .447 1 1-.447 1-1 1z"/>
                    </svg>
                    <span>{project.duration}</span>
                  </div>
                </div>

                {/* Description */}
                <p style={{
                  color: theme.textSecondary,
                  lineHeight: 1.6,
                  marginBottom: '1.5rem'
                }}>
                  {project.description}
                </p>

                {/* Technologies */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{
                    color: theme.text,
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    marginBottom: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: project.color }}>
                      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
                      <path d="M12 6c-3.309 0-6 2.691-6 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z"/>
                      <circle cx="12" cy="12" r="2"/>
                    </svg>
                    Technologies
                  </h4>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}>
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        style={{
                          padding: '0.4rem 0.8rem',
                          background: `${project.color}15`,
                          color: project.color,
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: 500,
                          border: `1px solid ${project.color}30`
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Responsibilities */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{
                    color: theme.text,
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    marginBottom: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: project.color }}>
                      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zM9 17l-4-4 1.414-1.414L9 14.172l7.586-7.586L18 8l-9 9z"/>
                    </svg>
                    Role & Responsibilities
                  </h4>
                  <ul style={{
                    margin: 0,
                    paddingLeft: '1.2rem',
                    color: theme.textSecondary,
                    fontSize: '0.9rem',
                    lineHeight: 1.6
                  }}>
                    {project.responsibilities.map((resp, index) => (
                      <li key={index} style={{ marginBottom: '0.4rem' }}>
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Impact/Usage */}
                <div style={{
                  padding: '1rem',
                  background: `${project.color}10`,
                  borderRadius: '8px',
                  borderLeft: `4px solid ${project.color}`
                }}>
                  <p style={{
                    color: theme.text,
                    fontSize: '0.9rem',
                    margin: 0,
                    fontStyle: 'italic'
                  }}>
                    <strong>Impact: </strong>
                    {project.usage}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {[
            { label: 'Total Projects', value: '4', color: '#3b82f6' },
            { label: 'Ongoing Projects', value: '3', color: '#10b981' },
            { label: 'Hackathon Wins', value: '1', color: '#ec4899' },
            { label: 'Technologies Used', value: '20+', color: '#8b5cf6' }
          ].map((stat, index) => (
            <div
              key={index}
              style={{
                background: theme.cardBg,
                borderRadius: '12px',
                padding: '1.5rem',
                border: `1px solid ${theme.border}`,
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = stat.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = theme.border;
              }}
            >
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 700,
                color: stat.color,
                marginBottom: '0.5rem'
              }}>
                {stat.value}
              </div>
              <div style={{
                color: theme.textSecondary,
                fontSize: '0.9rem',
                fontWeight: 500
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          background: theme.cardBg,
          borderRadius: '16px',
          border: `1px solid ${theme.border}`,
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background Pattern */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle at 50% 0%, ${theme.accent}10 0%, transparent 70%)`,
            pointerEvents: 'none'
          }}></div>

          <h3 style={{
            fontSize: '1.8rem',
            fontWeight: 600,
            color: theme.text,
            marginBottom: '1rem',
            position: 'relative',
            zIndex: 1
          }}>
            Interested in Collaborating?
          </h3>
          <p style={{
            color: theme.textSecondary,
            maxWidth: '600px',
            margin: '0 auto 2rem',
            lineHeight: 1.6,
            position: 'relative',
            zIndex: 1
          }}>
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <button
            onClick={() => window.location.href = 'mailto:chokkapusaketh@gmail.com'}
            style={{
              padding: '1rem 2.5rem',
              background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentLight})`,
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative',
              zIndex: 1
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = `0 10px 30px ${theme.accent}40`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Get In Touch
          </button>
        </div>
      </div>
    </section>
  );
};

export default Work;