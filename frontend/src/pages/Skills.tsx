import React, { useState, useEffect } from 'react';

interface SkillsProps {
  theme: any;
}

const Skills: React.FC<SkillsProps> = ({ theme }) => {
  const [activeCategory, setActiveCategory] = useState<string>('backend');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Professional icon URLs - using brighter versions
  const categoryIcons: Record<string, string> = {
    'ai-ml': 'https://cdn-icons-png.flaticon.com/512/2103/2103655.png',
    'frontend': 'https://cdn-icons-png.flaticon.com/512/5968/5968292.png',
    'backend': 'https://cdn-icons-png.flaticon.com/512/1086/1086581.png',
    'databases': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    'tools': 'https://cdn-icons-png.flaticon.com/512/3248/3248193.png'
  };

  // Technology icon URLs - ALL BRIGHT VERSIONS
  const techIcons: Record<string, string> = {
    // AI/ML Icons
    'TensorFlow': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
    'PyTorch': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
    'Scikit-learn': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Scikit_learn_logo_small.svg/512px-Scikit_learn_logo_small.svg.png',
    'Computer Vision': 'https://cdn-icons-png.flaticon.com/512/2103/2103655.png',
    'NLP': 'https://cdn-icons-png.flaticon.com/512/2103/2103833.png',
    'Deep Learning': 'https://cdn-icons-png.flaticon.com/512/2103/2103796.png',
    'Reinforcement Learning': 'https://cdn-icons-png.flaticon.com/512/2103/2103838.png',
    'Data Analysis': 'https://cdn-icons-png.flaticon.com/512/2103/2103611.png',
    
    // Frontend Icons
    'React.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    'Tailwind CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
    'Vite': 'https://vitejs.dev/logo.svg',
    'Redux': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
    'Webpack': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg',
    'Three.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg',
    
    // Backend Icons - BRIGHT & HIGH CONTRAST
    'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg',
    'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original-wordmark.svg',
    'Express.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg',
    'FastAPI': 'https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/fastapi.svg',
    'Flask': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original-wordmark.svg',
    'REST APIs': 'https://cdn-icons-png.flaticon.com/512/2165/2165004.png',
    'GraphQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain-wordmark.svg',
    'WebSockets': 'https://cdn-icons-png.flaticon.com/512/3094/3094864.png',
    
    // Database Icons
    'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original-wordmark.svg',
    'PostgreSQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original-wordmark.svg',
    'Redis': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original-wordmark.svg',
    'Neo4j': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/neo4j/neo4j-original-wordmark.svg',
    'Elasticsearch': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original-wordmark.svg',
    'MySQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg',
    'Firebase': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain-wordmark.svg',
    'DynamoDB': 'https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/amazondynamodb.svg',
    
    // Tools Icons
    'GitHub': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original-wordmark.svg',
    'VS Code': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original-wordmark.svg',
    'Jira': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original-wordmark.svg',
    'Figma': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    'Postman': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original-wordmark.svg',
    'Agile/Scrum': 'https://cdn-icons-png.flaticon.com/512/3094/3094970.png',
    'Clean Architecture': 'https://cdn-icons-png.flaticon.com/512/3094/3094976.png',
    'TDD': 'https://cdn-icons-png.flaticon.com/512/3094/3094978.png'
  };

  const skillsData = {
    'ai-ml': {
      title: 'Artificial Intelligence & Machine Learning',
      skills: [
        { name: 'TensorFlow', level: 90, color: '#FF6F00' },
        { name: 'PyTorch', level: 85, color: '#EE4C2C' },
        { name: 'Scikit-learn', level: 88, color: '#F7931E' },
        { name: 'Computer Vision', level: 85, color: '#4285F4' },
        { name: 'NLP', level: 80, color: '#34A853' },
        { name: 'Deep Learning', level: 87, color: '#9C27B0' },
        { name: 'Reinforcement Learning', level: 75, color: '#E91E63' },
        { name: 'Data Analysis', level: 90, color: '#2196F3' }
      ]
    },
    'frontend': {
      title: 'Frontend Development',
      skills: [
        { name: 'React.js', level: 92, color: '#61DAFB' },
        { name: 'TypeScript', level: 88, color: '#3178C6' },
        { name: 'Next.js', level: 85, color: '#000000' },
        { name: 'Tailwind CSS', level: 90, color: '#38B2AC' },
        { name: 'Vite', level: 87, color: '#646CFF' },
        { name: 'Redux', level: 85, color: '#764ABC' },
        { name: 'Webpack', level: 80, color: '#8DD6F9' },
        { name: 'Three.js', level: 75, color: '#000000' }
      ]
    },
    'backend': {
      title: 'Backend & API Development',
      skills: [
        { name: 'Node.js', level: 90, color: '#339933' },
        { name: 'Python', level: 92, color: '#3776AB' },
        { name: 'Express.js', level: 88, color: '#000000' },
        { name: 'FastAPI', level: 85, color: '#009688' },
        { name: 'Flask', level: 82, color: '#000000' },
        { name: 'REST APIs', level: 91, color: '#FF6D00' },
        { name: 'GraphQL', level: 80, color: '#E10098' },
        { name: 'WebSockets', level: 78, color: '#4CAF50' }
      ]
    },
    'databases': {
      title: 'Databases & Data Management',
      skills: [
        { name: 'MongoDB', level: 88, color: '#47A248' },
        { name: 'PostgreSQL', level: 85, color: '#336791' },
        { name: 'Redis', level: 82, color: '#DC382D' },
        { name: 'Neo4j', level: 80, color: '#008CC1' },
        { name: 'Elasticsearch', level: 78, color: '#005571' },
        { name: 'MySQL', level: 83, color: '#4479A1' },
        { name: 'Firebase', level: 79, color: '#FFCA28' },
        { name: 'DynamoDB', level: 75, color: '#4053D6' }
      ]
    },
    'tools': {
      title: 'Development Tools & Methodologies',
      skills: [
        { name: 'GitHub', level: 92, color: '#181717' },
        { name: 'VS Code', level: 95, color: '#007ACC' },
        { name: 'Jira', level: 85, color: '#0052CC' },
        { name: 'Figma', level: 80, color: '#F24E1E' },
        { name: 'Postman', level: 88, color: '#FF6C37' },
        { name: 'Agile/Scrum', level: 90, color: '#0052CC' },
        { name: 'Clean Architecture', level: 87, color: '#4CAF50' },
        { name: 'TDD', level: 82, color: '#E91E63' }
      ]
    }
  };

  // Animation for skill bars
  useEffect(() => {
    const bars = document.querySelectorAll('.skill-bar-fill');
    bars.forEach((bar, index) => {
      setTimeout(() => {
        (bar as HTMLElement).style.width = '100%';
      }, index * 100);
    });
  }, [activeCategory]);

  const currentCategory = skillsData[activeCategory as keyof typeof skillsData];

  return (
    <section id="skills" style={{
      paddingTop: '100px',
      paddingBottom: '80px',
      backgroundColor: theme.bg,
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `radial-gradient(circle at 20% 30%, ${theme.accent}05 0%, transparent 50%),
                    radial-gradient(circle at 80% 70%, ${theme.accentLight}03 0%, transparent 50%)`,
        pointerEvents: 'none'
      }}></div>

      {/* Floating Tech Icons - IMPROVED VISIBILITY */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        opacity: 0.08
      }}>
        {Object.keys(techIcons).slice(0, 20).map((tech, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '50px',
              height: '50px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 20 + 20}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`,
              filter: 'brightness(1.5) contrast(1.2)',
              backdropFilter: 'blur(2px)',
              borderRadius: '12px',
              padding: '5px',
              background: theme.bg + '40'
            }}
          >
            <img 
              src={techIcons[tech]} 
              alt="" 
              style={{ 
                width: '100%', 
                height: '100%',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.3))'
              }}
            />
          </div>
        ))}
      </div>

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
        padding: '0 2rem',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '4rem'
        }}>
          <div style={{
            display: 'inline-block',
            marginBottom: '1rem',
            padding: '0.75rem 1.5rem',
            background: `linear-gradient(135deg, ${theme.accent}20, ${theme.accentLight}10)`,
            borderRadius: '50px',
            border: `1px solid ${theme.accent}30`,
            backdropFilter: 'blur(10px)'
          }}>
            <span style={{
              color: theme.accent,
              fontSize: '0.85rem',
              fontWeight: 600,
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}>
              Technical Expertise
            </span>
          </div>
          
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 800,
            marginBottom: '1.5rem',
            background: `linear-gradient(135deg, ${theme.text}, ${theme.accentLight})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em',
            lineHeight: '1.1'
          }}>
            Skills Dashboard
          </h1>
          
          <p style={{
            fontSize: '1.2rem',
            color: theme.textSecondary,
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Interactive visualization of technical proficiencies across modern development stacks
          </p>
        </div>

        {/* Main Dashboard */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '280px 1fr',
          gap: '3rem',
          height: '600px',
          background: theme.cardBg,
          borderRadius: '24px',
          border: `1px solid ${theme.border}`,
          overflow: 'hidden',
          boxShadow: `0 20px 60px rgba(0, 0, 0, 0.3)`,
          backdropFilter: 'blur(10px)'
        }}>
          {/* Sidebar - Categories */}
          <div style={{
            padding: '2rem 1.5rem',
            borderRight: `1px solid ${theme.border}`,
            background: `linear-gradient(180deg, ${theme.cardBg} 0%, ${theme.bg} 100%)`,
            display: 'flex',
            flexDirection: 'column'
          }}>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: theme.textSecondary,
              marginBottom: '1.5rem',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Categories
            </h3>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              flex: 1
            }}>
              {Object.entries(skillsData).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1rem 1.25rem',
                    background: activeCategory === key 
                      ? `linear-gradient(90deg, ${theme.accent}20, ${theme.accent}10)` 
                      : 'transparent',
                    border: `1px solid ${activeCategory === key ? theme.accent : 'transparent'}`,
                    borderRadius: '12px',
                    color: activeCategory === key ? theme.accent : theme.textSecondary,
                    fontSize: '0.95rem',
                    fontWeight: activeCategory === key ? 600 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => {
                    if (activeCategory !== key) {
                      e.currentTarget.style.background = theme.accent + '10';
                      e.currentTarget.style.borderColor = theme.accent + '30';
                      e.currentTarget.style.color = theme.text;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeCategory !== key) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.borderColor = 'transparent';
                      e.currentTarget.style.color = theme.textSecondary;
                    }
                  }}
                >
                  <div style={{
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    filter: 'brightness(1.3)'
                  }}>
                    <img 
                      src={categoryIcons[key]} 
                      alt="" 
                      style={{ 
                        width: '100%', 
                        height: '100%',
                        objectFit: 'contain',
                        opacity: activeCategory === key ? 1 : 0.8
                      }}
                    />
                  </div>
                  <span>{category.title.split('&')[0].trim()}</span>
                </button>
              ))}
            </div>

            {/* Stats Summary */}
            <div style={{
              paddingTop: '2rem',
              borderTop: `1px solid ${theme.border}`,
              marginTop: 'auto'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  textAlign: 'center',
                  padding: '0.75rem',
                  background: `${theme.accent}10`,
                  borderRadius: '8px',
                  border: `1px solid ${theme.accent}20`
                }}>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: theme.accent,
                    marginBottom: '0.25rem'
                  }}>
                    {Object.values(skillsData).reduce((acc, cat) => acc + cat.skills.length, 0)}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: theme.textSecondary,
                    fontWeight: 500
                  }}>
                    Technologies
                  </div>
                </div>
                <div style={{
                  textAlign: 'center',
                  padding: '0.75rem',
                  background: `${theme.accentLight}10`,
                  borderRadius: '8px',
                  border: `1px solid ${theme.accentLight}20`
                }}>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: theme.accentLight,
                    marginBottom: '0.25rem'
                  }}>
                    {Object.keys(skillsData).length}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: theme.textSecondary,
                    fontWeight: 500
                  }}>
                    Categories
                  </div>
                </div>
              </div>
              
              <div style={{
                color: theme.textSecondary,
                fontSize: '0.8rem',
                textAlign: 'center'
              }}>
                Interactive Dashboard • Updated: {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </div>
            </div>
          </div>

          {/* Main Content - Skills Visualization */}
          <div style={{
            padding: '2rem',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Category Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem',
              paddingBottom: '1.5rem',
              borderBottom: `1px solid ${theme.border}`
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '12px',
                  background: `${theme.accent}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `2px solid ${theme.accent}30`,
                  padding: '8px'
                }}>
                  <img 
                    src={categoryIcons[activeCategory]} 
                    alt="" 
                    style={{ 
                      width: '100%', 
                      height: '100%',
                      objectFit: 'contain',
                      filter: 'brightness(1.4)'
                    }}
                  />
                </div>
                <div>
                  <h2 style={{
                    fontSize: '1.8rem',
                    fontWeight: 700,
                    color: theme.text,
                    marginBottom: '0.5rem'
                  }}>
                    {currentCategory.title}
                  </h2>
                  <p style={{
                    color: theme.textSecondary,
                    fontSize: '0.95rem'
                  }}>
                    {currentCategory.skills.length} Core Technologies • Proficiency Matrix
                  </p>
                </div>
              </div>
              
              <div style={{
                padding: '0.75rem 1.5rem',
                background: `${theme.accent}15`,
                borderRadius: '12px',
                border: `1px solid ${theme.accent}30`,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <div style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: theme.accent,
                  boxShadow: `0 0 10px ${theme.accent}`
                }}></div>
                <span style={{
                  color: theme.accent,
                  fontSize: '0.85rem',
                  fontWeight: 600
                }}>
                  Live Visualization
                </span>
              </div>
            </div>

            {/* Skills Grid - IMPROVED ICON VISIBILITY */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.5rem',
              height: 'calc(100% - 180px)',
              overflowY: 'auto',
              paddingRight: '1rem'
            }}>
              {currentCategory.skills.map((skill, index) => (
                <div
                  key={skill.name}
                  style={{
                    background: hoveredSkill === skill.name 
                      ? `linear-gradient(145deg, ${theme.cardBg}, ${theme.bg})` 
                      : theme.cardBg,
                    borderRadius: '16px',
                    padding: '1.5rem',
                    border: `1px solid ${theme.border}`,
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    backdropFilter: 'blur(10px)',
                    transform: hoveredSkill === skill.name ? 'translateY(-2px)' : 'none',
                    boxShadow: hoveredSkill === skill.name ? `0 10px 30px rgba(0, 0, 0, 0.15)` : 'none'
                  }}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  {/* Skill Header */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}>
                      <div style={{
                        width: '55px',
                        height: '55px',
                        borderRadius: '14px',
                        background: `${skill.color}20`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: `2px solid ${skill.color}40`,
                        padding: '8px',
                        boxShadow: `0 4px 12px ${skill.color}20`
                      }}>
                        <img 
                          src={techIcons[skill.name]} 
                          alt={skill.name}
                          style={{ 
                            width: '100%', 
                            height: '100%',
                            objectFit: 'contain',
                            filter: 'brightness(1.4) contrast(1.2)',
                            transition: 'transform 0.3s ease'
                          }}
                        />
                      </div>
                      <div>
                        <h4 style={{
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          color: theme.text,
                          margin: 0
                        }}>
                          {skill.name}
                        </h4>
                        <div style={{
                          fontSize: '0.8rem',
                          color: theme.textSecondary,
                          marginTop: '0.25rem',
                          fontWeight: 500
                        }}>
                          {skill.level >= 90 ? 'Expert Level' : 
                           skill.level >= 80 ? 'Advanced Level' : 
                           skill.level >= 70 ? 'Proficient' : 
                           'Intermediate'}
                        </div>
                      </div>
                    </div>
                    
                    <div style={{
                      fontSize: '1.8rem',
                      fontWeight: 800,
                      color: skill.color,
                      textShadow: `0 0 20px ${skill.color}40`,
                      background: `${skill.color}15`,
                      padding: '0.5rem 1rem',
                      borderRadius: '12px',
                      border: `1px solid ${skill.color}30`
                    }}>
                      {skill.level}%
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div style={{
                    height: '12px',
                    background: `${theme.border}80`,
                    borderRadius: '6px',
                    overflow: 'hidden',
                    marginBottom: '1.5rem',
                    position: 'relative',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    <div
                      className="skill-bar-fill"
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        height: '100%',
                        width: '0%',
                        background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`,
                        borderRadius: '6px',
                        transition: 'width 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        transitionDelay: `${index * 0.1}s`,
                        boxShadow: `0 0 20px ${skill.color}40`
                      }}
                    ></div>
                  </div>

                  {/* Skill Level Indicator */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      display: 'flex',
                      gap: '0.3rem'
                    }}>
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            background: i < Math.floor(skill.level / 20) 
                              ? skill.color 
                              : theme.border,
                            boxShadow: i < Math.floor(skill.level / 20) 
                              ? `0 0 12px ${skill.color}` 
                              : 'none',
                            transition: 'all 0.3s ease'
                          }}
                        />
                      ))}
                    </div>
                    
                    <div style={{
                      fontSize: '0.8rem',
                      color: theme.text,
                      fontWeight: 600,
                      padding: '0.4rem 1rem',
                      background: `${skill.color}20`,
                      borderRadius: '20px',
                      border: `1px solid ${skill.color}40`,
                      backdropFilter: 'blur(5px)'
                    }}>
                      Level {Math.floor(skill.level / 20)}/5
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  {hoveredSkill === skill.name && (
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `radial-gradient(circle at center, ${skill.color}15 0%, transparent 70%)`,
                      pointerEvents: 'none',
                      zIndex: -1
                    }}></div>
                  )}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '3rem',
              marginTop: '2rem',
              paddingTop: '1.5rem',
              borderTop: `1px solid ${theme.border}`,
              flexWrap: 'wrap'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '4px',
                  background: theme.accent,
                  boxShadow: `0 0 12px ${theme.accent}`
                }}></div>
                <span style={{ color: theme.textSecondary, fontSize: '0.85rem', fontWeight: 500 }}>Expert (90-100%)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '4px',
                  background: theme.accentLight,
                  boxShadow: `0 0 12px ${theme.accentLight}`
                }}></div>
                <span style={{ color: theme.textSecondary, fontSize: '0.85rem', fontWeight: 500 }}>Advanced (80-89%)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '4px',
                  background: theme.textSecondary,
                  boxShadow: `0 0 12px ${theme.textSecondary}`
                }}></div>
                <span style={{ color: theme.textSecondary, fontSize: '0.85rem', fontWeight: 500 }}>Proficient (70-79%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Stack Cards */}
        <div style={{
          marginTop: '4rem',
          padding: '2rem',
          background: theme.cardBg,
          borderRadius: '20px',
          border: `1px solid ${theme.border}`,
          backdropFilter: 'blur(10px)',
          boxShadow: `0 15px 40px rgba(0, 0, 0, 0.2)`
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem'
          }}>
            <h3 style={{
              fontSize: '1.8rem',
              fontWeight: 700,
              color: theme.text,
              background: `linear-gradient(135deg, ${theme.text}, ${theme.accentLight})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Technology Stack Overview
            </h3>
            <div style={{
              fontSize: '0.9rem',
              color: theme.textSecondary,
              fontWeight: 500,
              padding: '0.5rem 1.2rem',
              background: `${theme.accent}10`,
              borderRadius: '20px',
              border: `1px solid ${theme.accent}30`
            }}>
              Total Technologies: {Object.values(skillsData).reduce((acc, cat) => acc + cat.skills.length, 0)}
            </div>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem'
          }}>
            {Object.entries(skillsData).map(([key, category]) => {
              const avgLevel = Math.round(
                category.skills.reduce((acc, skill) => acc + skill.level, 0) / category.skills.length
              );
              
              return (
                <div key={key} style={{
                  textAlign: 'center',
                  padding: '2rem',
                  background: `linear-gradient(135deg, ${theme.cardBg}, ${theme.bg})`,
                  borderRadius: '16px',
                  border: `1px solid ${theme.border}`,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                  e.currentTarget.style.boxShadow = `0 20px 40px rgba(0, 0, 0, 0.25)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onClick={() => setActiveCategory(key)}
                >
                  {/* Background Pattern */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `radial-gradient(circle at center, ${theme.accent}08 0%, transparent 70%)`,
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  }}></div>
                  
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '20px',
                    background: `${theme.accent}15`,
                    margin: '0 auto 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `2px solid ${theme.accent}30`,
                    position: 'relative',
                    zIndex: 1,
                    padding: '12px',
                    boxShadow: `0 8px 25px ${theme.accent}20`
                  }}>
                    <img 
                      src={categoryIcons[key]} 
                      alt="" 
                      style={{ 
                        width: '100%', 
                        height: '100%',
                        objectFit: 'contain',
                        filter: 'brightness(1.4)'
                      }}
                    />
                  </div>
                  <h4 style={{
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    color: theme.text,
                    marginBottom: '0.75rem',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    {category.title.split('&')[0].trim()}
                  </h4>
                  <div style={{
                    fontSize: '2.5rem',
                    fontWeight: 800,
                    background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentLight})`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '0.5rem',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    {avgLevel}%
                  </div>
                  <div style={{
                    color: theme.textSecondary,
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    position: 'relative',
                    zIndex: 1
                  }}>
                    Average Proficiency
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '0.75rem',
                    color: theme.accent,
                    fontWeight: 600,
                    background: `${theme.accent}15`,
                    padding: '0.3rem 1rem',
                    borderRadius: '12px',
                    border: `1px solid ${theme.accent}30`
                  }}>
                    {category.skills.length} Technologies
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Add animations */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          33% {
            transform: translateY(-25px) translateX(15px) rotate(5deg);
          }
          66% {
            transform: translateY(15px) translateX(-20px) rotate(-5deg);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.08;
          }
          50% {
            opacity: 0.12;
          }
        }
        
        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: ${theme.border}20;
          border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: ${theme.accent}60;
          border-radius: 5px;
          border: 2px solid ${theme.cardBg};
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: ${theme.accent};
        }
        
        @media (max-width: 1200px) {
          #skills > div > div:first-child {
            grid-template-columns: 1fr !important;
            height: auto !important;
          }
        }
        
        @media (max-width: 768px) {
          #skills {
            padding: 60px 1rem 40px !important;
          }
          
          #skills h1 {
            font-size: 2.2rem !important;
          }
          
          #skills > div > div:first-child {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
          
          #skills > div > div:first-child > div:last-child {
            grid-template-columns: 1fr !important;
            padding: 1rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;