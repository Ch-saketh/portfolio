import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface WorkProps {
  theme: any;
}

const Work: React.FC<WorkProps> = ({ theme }) => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  
  // UI Library Projects for the Netflix-style row
  const uiLibraryProjects = [
    {
      id: 1,
      title: "Quantum Dashboard",
      description: "A futuristic dashboard with quantum computing visualizations",
      thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=225&fit=crop",
      category: "UI Design",
      color: "#6366f1"
    },
    {
      id: 2,
      title: "Data Visualization Suite",
      description: "Interactive charts and graphs for complex datasets",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop",
      category: "UI Components",
      color: "#10b981"
    },
    {
      id: 3,
      title: "Neumorphic Calculator",
      description: "Modern calculator with soft UI design principles",
      thumbnail: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=400&h=225&fit=crop",
      category: "UI Component",
      color: "#f59e0b"
    },
    {
      id: 4,
      title: "Animated Navigation",
      description: "Smooth animated navigation system with micro-interactions",
      thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=225&fit=crop",
      category: "UI Navigation",
      color: "#8b5cf6"
    },
    {
      id: 5,
      title: "Dark Mode Toggle",
      description: "Beautiful dark/light mode toggle with transitions",
      thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=225&fit=crop",
      category: "UI Component",
      color: "#ec4899"
    },
    {
      id: 6,
      title: "Form Component Library",
      description: "Complete set of accessible form components",
      thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=225&fit=crop",
      category: "UI Library",
      color: "#3b82f6"
    }
  ];

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

  const handleViewMore = () => {
    navigate('/ui-library');
  };

  const handleCardClick = (projectId: number) => {
    console.log('Clicked UI project:', projectId);
  };

  return (
    <section 
      id="work" 
      style={{
        padding: '120px 2rem 60px',
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
        maxWidth: '1400px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Netflix-style UI Library Section */}
        <div style={{ marginBottom: '6rem' }}>
          {/* Section Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            padding: '0 0.5rem'
          }}>
            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: 700,
              color: theme.text,
              margin: 0
            }}>
              UI Component Library
            </h2>
            <button
              onClick={handleViewMore}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'transparent',
                border: `2px solid ${theme.accent}`,
                borderRadius: '8px',
                color: theme.accent,
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${theme.accent}15`;
                e.currentTarget.style.transform = 'translateX(4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              View All
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
              </svg>
            </button>
          </div>

          {/* Netflix-style Horizontal Scrolling Row */}
          <div style={{
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Scroll Container */}
            <div style={{
              display: 'flex',
              gap: '1.5rem',
              overflowX: 'auto',
              padding: '1rem 0.5rem',
              scrollBehavior: 'smooth',
              scrollbarWidth: 'thin',
              scrollbarColor: `${theme.accent} ${theme.border}`
            }} className="hide-scrollbar">
              {uiLibraryProjects.map((project) => (
                <motion.div
                  key={project.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCardClick(project.id)}
                  style={{
                    flex: '0 0 auto',
                    width: '280px',
                    background: theme.cardBg,
                    borderRadius: '12px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    border: `1px solid ${theme.border}`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = `0 20px 40px rgba(0, 0, 0, 0.3)`;
                    e.currentTarget.style.borderColor = project.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = theme.border;
                  }}
                >
                  {/* Thumbnail */}
                  <div style={{
                    width: '100%',
                    height: '160px',
                    background: `linear-gradient(135deg, ${project.color}20, ${project.color}40)`,
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <img 
                      src={project.thumbnail} 
                      alt={project.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    />
                    {/* Category Badge */}
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      padding: '0.25rem 0.75rem',
                      background: `${project.color}dd`,
                      color: 'white',
                      borderRadius: '20px',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      backdropFilter: 'blur(4px)'
                    }}>
                      {project.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: '1.25rem' }}>
                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: theme.text,
                      marginBottom: '0.5rem',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {project.title}
                    </h3>
                    <p style={{
                      fontSize: '0.85rem',
                      color: theme.textSecondary,
                      lineHeight: 1.4,
                      marginBottom: '1rem',
                      height: '2.8rem',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {project.description}
                    </p>
                    
                    {/* Preview Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(project.id);
                      }}
                      style={{
                        width: '100%',
                        padding: '0.6rem',
                        background: `${project.color}15`,
                        border: `1px solid ${project.color}30`,
                        borderRadius: '8px',
                        color: project.color,
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `${project.color}25`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = `${project.color}15`;
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                      </svg>
                      Preview Component
                    </button>
                  </div>

                  {/* Hover Gradient Effect */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(to top, ${project.color}10, transparent 60%)`,
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: 'none'
                  }} className="hover-gradient"></div>
                </motion.div>
              ))}
            </div>

            {/* Scroll Indicators */}
            <button
              onClick={() => {
                const container = document.querySelector('.hide-scrollbar');
                if (container) container.scrollLeft -= 300;
              }}
              style={{
                position: 'absolute',
                left: '0',
                top: '50%',
                transform: 'translateY(-50%)',
                background: theme.cardBg,
                border: `1px solid ${theme.border}`,
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                opacity: 0.7,
                zIndex: 2
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.background = theme.accent;
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.7';
                e.currentTarget.style.background = theme.cardBg;
                e.currentTarget.style.color = theme.text;
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
              </svg>
            </button>
            
            <button
              onClick={() => {
                const container = document.querySelector('.hide-scrollbar');
                if (container) container.scrollLeft += 300;
              }}
              style={{
                position: 'absolute',
                right: '0',
                top: '50%',
                transform: 'translateY(-50%)',
                background: theme.cardBg,
                border: `1px solid ${theme.border}`,
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                opacity: 0.7,
                zIndex: 2
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.background = theme.accent;
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.7';
                e.currentTarget.style.background = theme.cardBg;
                e.currentTarget.style.color = theme.text;
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* YOUR ORIGINAL PROJECTS SECTION */}
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

        {/* Call to Action (No Stats Section in between) */}
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

      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        .hover-gradient {
          pointer-events: none;
        }
        
        .hide-scrollbar > div:hover .hover-gradient {
          opacity: 1;
        }
        
        /* Responsive adjustments for Netflix-style row */
        @media (max-width: 768px) {
          .hide-scrollbar {
            padding: 0.5rem;
          }
          
          .hide-scrollbar > div {
            width: 220px;
          }
          
          .hide-scrollbar > div > div:first-child {
            height: 120px;
          }
        }
        
        @media (max-width: 480px) {
          .hide-scrollbar {
            gap: 1rem;
          }
          
          .hide-scrollbar > div {
            width: 200px;
          }
        }
      `}</style>
    </section>
  );
};

export default Work;