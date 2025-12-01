import React, { useEffect, useState } from "react";
import Navbar from '../components/Navbar';
import About from '../pages/About';
import Skills from '../pages/Skills';


export default function Home(): React.ReactElement {
  const [activeNode, setActiveNode] = useState(null);



  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      html, body, #root {
        height: auto !important;
        min-height: 100vh !important;
        overflow-x: hidden !important;
        margin: 0;
        padding: 0;
        scroll-behavior: smooth;
      }
      body {
        overflow-y: auto !important;
        padding-top: 0;
      }
      ::-webkit-scrollbar {
        width: 6px;
        background: transparent;
      }
      ::-webkit-scrollbar-thumb {
        background: rgba(59, 130, 246, 0.3);
        border-radius: 3px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: rgba(59, 130, 246, 0.5);
      }
      * {
        box-sizing: border-box;
      }
      
      .tree-node {
        transition: all 0.3s ease;
        cursor: pointer;
      }
      
      .tree-node:hover circle:nth-child(2) {
        filter: brightness(1.3);
        transform: scale(1.1);
      }

      @keyframes drawLine {
        to {
          stroke-dashoffset: 0;
        }
      }

      .tree-line {
        stroke-dasharray: 1000;
        stroke-dashoffset: 1000;
        animation: drawLine 1.5s ease-in-out forwards;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .tech-item {
        animation: fadeIn 0.4s ease forwards;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const theme = {
    bg: '#0f0f15',
    text: '#ffffff',
    textSecondary: '#a0a0a0',
    cardBg: '#1a1a25',
    border: '#2a2a35',
    headerBg: 'rgba(15, 15, 21, 0.95)',
    accent: '#3b82f6',
    accentLight: '#60a5fa'
  };

  // Completely separated tree structure with no overlapping
  // Completely separated tree structure with no overlapping
// Completely separated tree structure with no overlapping
const treeNodes = [
  // Level 0 - Root (centered)
  {
    id: 'root',
    title: 'Full-Stack',
    subtitle: 'AI Engineer',
    type: 'root',
    x: 500,
    y: 80,
    color: '#3b82f6'
  },
  
  // Level 1 - Main Branches (WIDELY SPACED)
  {
    id: 'ai-ml',
    title: 'AI/ML',
    subtitle: 'Engineering',
    type: 'branch',
    x: 150,
    y: 220,
    color: '#10b981',
    parent: 'root'
  },
  {
    id: 'frontend',
    title: 'Frontend',
    subtitle: 'Development',
    type: 'branch',
    x: 500,
    y: 220,
    color: '#f59e0b',
    parent: 'root'
  },
  {
    id: 'architecture',
    title: 'Backend',
    subtitle: 'Architecture',
    type: 'branch',
    x: 850,
    y: 220,
    color: '#ef4444',
    parent: 'root'
  },
  
  // Level 2 - AI/ML Specializations (LEFT SIDE)
  {
    id: 'computer-vision',
    title: 'Computer',
    subtitle: 'Vision',
    type: 'leaf',
    x: 80,
    y: 380,
    color: '#10b981',
    parent: 'ai-ml',
    tech: ['TensorFlow', 'PyTorch', 'OpenCV', 'YOLO', 'CNN']
  },
  {
    id: 'nlp',
    title: 'Natural',
    subtitle: 'Language',
    type: 'leaf',
    x: 180,
    y: 380,
    color: '#10b981',
    parent: 'ai-ml',
    tech: ['Transformers', 'BERT', 'GPT', 'spaCy', 'NLTK']
  },
  {
    id: 'deep-learning',
    title: 'Deep',
    subtitle: 'Learning',
    type: 'leaf',
    x: 280,
    y: 380,
    color: '#10b981',
    parent: 'ai-ml',
    tech: ['Neural Networks', 'GANs', 'RNN/LSTM', 'Autoencoders']
  },
  
  // Level 2 - Frontend Technologies (CENTER)
  {
    id: 'react',
    title: 'React',
    subtitle: 'Ecosystem',
    type: 'leaf',
    x: 430,
    y: 380,
    color: '#f59e0b',
    parent: 'frontend',
    tech: ['React', 'Next.js', 'TypeScript', 'Redux', 'Vite']
  },
  {
    id: 'web-tech',
    title: 'Web',
    subtitle: 'Technologies',
    type: 'leaf',
    x: 530,
    y: 380,
    color: '#f59e0b',
    parent: 'frontend',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind', 'Webpack']
  },
  {
    id: 'ui-ux',
    title: 'UI/UX',
    subtitle: 'Design',
    type: 'leaf',
    x: 630,
    y: 380,
    color: '#f59e0b',
    parent: 'frontend',
    tech: ['Figma', 'Responsive Design', 'User Experience', 'Prototyping']
  },
  
  // Level 2 - Architecture Layers (RIGHT SIDE - WIDER SPACING)
  {
    id: 'database-layer',
    title: 'Database',
    subtitle: 'Layer',
    type: 'branch',
    x: 750,
    y: 380,
    color: '#8b5cf6',
    parent: 'architecture'
  },
  {
    id: 'business-layer',
    title: 'Business',
    subtitle: 'Layer',
    type: 'branch',
    x: 900,
    y: 380,
    color: '#ec4899',
    parent: 'architecture'
  },
  {
    id: 'api-layer',
    title: 'API',
    subtitle: 'Layer',
    type: 'branch',
    x: 1050,
    y: 380,
    color: '#06b6d4',
    parent: 'architecture'
  },
  
  // Level 3 - Database Layer Technologies (WIDER SPACING)
  {
    id: 'neo4j',
    title: 'Neo4j',
    subtitle: 'Graph DB',
    type: 'leaf',
    x: 680,
    y: 520,
    color: '#8b5cf6',
    parent: 'database-layer',
    tech: ['Neo4j', 'Cypher Query', 'Graph Algorithms']
  },
  {
    id: 'mongodb',
    title: 'MongoDB',
    subtitle: 'NoSQL',
    type: 'leaf',
    x: 750,
    y: 520,
    color: '#8b5cf6',
    parent: 'database-layer',
    tech: ['MongoDB', 'Mongoose', 'Aggregation']
  },
  {
    id: 'redis',
    title: 'Redis',
    subtitle: 'Cache',
    type: 'leaf',
    x: 820,
    y: 520,
    color: '#8b5cf6',
    parent: 'database-layer',
    tech: ['Redis', 'Caching', 'Pub/Sub']
  },
  
  // Level 3 - Business Layer Frameworks (WIDER SPACING)
  {
    id: 'node-frameworks',
    title: 'Node.js',
    subtitle: 'Frameworks',
    type: 'leaf',
    x: 870,
    y: 520,
    color: '#ec4899',
    parent: 'business-layer',
    tech: ['Express.js', 'NestJS', 'Business Logic']
  },
  {
    id: 'python-frameworks',
    title: 'Python',
    subtitle: 'Frameworks',
    type: 'leaf',
    x: 950,
    y: 520,
    color: '#ec4899',
    parent: 'business-layer',
    tech: ['Django', 'Flask', 'FastAPI']
  },
  
  // Level 3 - API Layer Technologies (WIDER SPACING)
  {
    id: 'rest-api',
    title: 'REST',
    subtitle: 'API',
    type: 'leaf',
    x: 1020,
    y: 520,
    color: '#06b6d4',
    parent: 'api-layer',
    tech: ['REST API', 'Endpoints', 'HTTP Methods']
  },
  {
    id: 'graphql-api',
    title: 'GraphQL',
    subtitle: 'API',
    type: 'leaf',
    x: 1100,
    y: 520,
    color: '#06b6d4',
    parent: 'api-layer',
    tech: ['GraphQL', 'Queries', 'Mutations']
  }
];

  // Calculate connections with curved paths
  const connections = treeNodes
    .filter(node => node.parent)
    .map(node => {
      const parentNode = treeNodes.find(n => n.id === node.parent);
      return parentNode ? {
        from: { x: parentNode.x, y: parentNode.y },
        to: { x: node.x, y: node.y },
        color: node.color
      } : null;
    })
    .filter(conn => conn !== null);

  const activeNodeData = treeNodes.find(node => node.id === activeNode);

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      backgroundColor: theme.bg,
      color: theme.text,
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      margin: 0,
      padding: 0,
      lineHeight: 1.6,
      position: 'relative',
      overflow: 'visible'
    }}>
      <Navbar theme={theme} />
      
      {/* About Section */}
      <About theme={theme} />

      {/* Skills Section */}
      
      <Skills theme={theme} />

      {/* Tree Visualization */}
      <section id="tree" style={{
        paddingTop: '120px',
        paddingBottom: '100px',
        backgroundColor: theme.bg,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          padding: '0 2rem',
          display: 'grid',
          gridTemplateColumns: '1fr 320px',
          gap: '3rem',
          alignItems: 'start'
        }}>
          {/* Tree Visualization */}
          <div style={{
            position: 'relative',
            minHeight: '700px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
           <svg
  width="100%"
  height="700"
  viewBox="0 0 1200 700"  // Wider viewBox
  preserveAspectRatio="xMidYMid meet"
  style={{ overflow: 'visible' }}
>
              <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Draw connections */}
              {connections.map((connection, index) => (
                <line
                  key={index}
                  x1={connection.from.x}
                  y1={connection.from.y}
                  x2={connection.to.x}
                  y2={connection.to.y}
                  stroke={connection.color}
                  strokeWidth="3"
                  opacity="0.6"
                  strokeDasharray="1000"
                  strokeDashoffset="1000"
                  className="tree-line"
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                />
              ))}

              {/* Draw nodes */}
              {treeNodes.map((node) => (
                <g key={node.id} className="tree-node" onClick={() => setActiveNode(node.id)}>
                  {/* Glow effect */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.type === 'root' ? 28 : node.type === 'branch' ? 22 : 18}
                    fill={node.color}
                    opacity="0.2"
                    filter="url(#glow)"
                  />
                  
                  {/* Node circle */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.type === 'root' ? 22 : node.type === 'branch' ? 18 : 14}
                    fill={node.color}
                    stroke={theme.bg}
                    strokeWidth="4"
                    style={{
                      transition: 'all 0.3s ease'
                    }}
                  />
                  
                  {/* For ALL Level 3 leaf nodes (y >= 480), position text BELOW the node */}
                  {node.y >= 480 ? (
                    <>
                      {/* Title - positioned below node */}
                      <text
                        x={node.x}
                        y={node.y + 45}
                        textAnchor="middle"
                        fill={theme.text}
                        fontSize="14"
                        fontWeight="600"
                        style={{ pointerEvents: 'none', userSelect: 'none' }}
                      >
                        {node.title}
                      </text>
                      
                      {/* Subtitle - positioned below title */}
                      <text
                        x={node.x}
                        y={node.y + 62}
                        textAnchor="middle"
                        fill={theme.textSecondary}
                        fontSize="12"
                        fontWeight="400"
                        style={{ pointerEvents: 'none', userSelect: 'none' }}
                      >
                        {node.subtitle}
                      </text>
                    </>
                  ) : (
                    <>
                      {/* For other nodes, position text ABOVE the node */}
                      <text
                        x={node.x}
                        y={node.y - (node.type === 'root' ? 45 : node.type === 'branch' ? 40 : 35)}
                        textAnchor="middle"
                        fill={theme.text}
                        fontSize={node.type === 'root' ? '16' : '14'}
                        fontWeight="600"
                        style={{ pointerEvents: 'none', userSelect: 'none' }}
                      >
                        {node.title}
                      </text>
                      
                      {/* Subtitle - positioned below title */}
                      <text
                        x={node.x}
                        y={node.y - (node.type === 'root' ? 28 : node.type === 'branch' ? 24 : 20)}
                        textAnchor="middle"
                        fill={theme.textSecondary}
                        fontSize={node.type === 'root' ? '14' : '12'}
                        fontWeight="400"
                        style={{ pointerEvents: 'none', userSelect: 'none' }}
                      >
                        {node.subtitle}
                      </text>
                    </>
                  )}
                </g>
              ))}
            </svg>

            {/* Instructions */}
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
              fontSize: '0.9rem',
              color: theme.textSecondary,
              background: `${theme.cardBg}dd`,
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              border: `1px solid ${theme.border}`,
              backdropFilter: 'blur(10px)'
            }}>
              💡 Click any node to explore technologies
            </div>
          </div>

          {/* Technology Display */}
          {/* Technology Display - MOVED HIGHER */}
<div style={{
  background: theme.cardBg,
  borderRadius: '16px',
  border: `1px solid ${theme.border}`,
  padding: '1.5rem',
  height: 'fit-content',
  position: 'sticky',
  top: '80px',  // CHANGED from top: '120px' to top: '80px'
  minHeight: '350px',
  maxHeight: '550px',
  overflowY: 'auto'
}}>
            {activeNodeData ? (
              <>
                <div style={{
                  textAlign: 'center',
                  marginBottom: '1.5rem',
                  paddingBottom: '1.25rem',
                  borderBottom: `1px solid ${theme.border}`
                }}>
                  <div style={{
                    width: '45px',
                    height: '45px',
                    borderRadius: '50%',
                    background: `${activeNodeData.color}20`,
                    border: `3px solid ${activeNodeData.color}`,
                    margin: '0 auto 0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.3rem'
                  }}>
                    {activeNodeData.type === 'root' ? '🎯' :
                     activeNodeData.type === 'branch' ? '🌿' : '📌'}
                  </div>
                  <h3 style={{
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    color: activeNodeData.color,
                    marginBottom: '0.4rem',
                    lineHeight: '1.3'
                  }}>
                    {activeNodeData.title} {activeNodeData.subtitle}
                  </h3>
                  <p style={{
                    fontSize: '0.85rem',
                    color: theme.textSecondary
                  }}>
                    {activeNodeData.tech ? `${activeNodeData.tech.length} Technologies` : 'Core Skill Area'}
                  </p>
                </div>

                {activeNodeData.tech && (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.65rem'
                  }}>
                    {activeNodeData.tech.map((tech, index) => (
                      <div
                        key={tech}
                        className="tech-item"
                        style={{
                          padding: '0.75rem 1rem',
                          background: `${activeNodeData.color}10`,
                          border: `2px solid ${activeNodeData.color}30`,
                          borderRadius: '8px',
                          fontSize: '0.88rem',
                          color: activeNodeData.color,
                          fontWeight: 500,
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          animationDelay: `${index * 0.05}s`
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = `${activeNodeData.color}20`;
                          e.currentTarget.style.transform = 'translateX(8px)';
                          e.currentTarget.style.borderColor = activeNodeData.color;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = `${activeNodeData.color}10`;
                          e.currentTarget.style.transform = 'translateX(0)';
                          e.currentTarget.style.borderColor = `${activeNodeData.color}30`;
                        }}
                      >
                        • {tech}
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div style={{
                textAlign: 'center',
                color: theme.textSecondary,
                padding: '2rem 1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%'
              }}>
                <div style={{
                  width: '65px',
                  height: '65px',
                  borderRadius: '50%',
                  background: `${theme.accent}15`,
                  border: `2px dashed ${theme.accent}40`,
                  margin: '0 auto 1.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem'
                }}>
                  🔍
                </div>
                <h4 style={{
                  fontSize: '1.1rem',
                  marginBottom: '0.6rem',
                  color: theme.text
                }}>
                  Explore Skills
                </h4>
                <p style={{
                  fontSize: '0.85rem',
                  lineHeight: '1.5',
                  opacity: 0.8
                }}>
                  Click any node to view technologies
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
     {/* Footer */}
<footer style={{
  borderTop: `2px solid ${theme.accent}40`,
  padding: '4rem 2rem 2rem',
  background: `linear-gradient(135deg, ${theme.cardBg} 0%, ${theme.bg} 100%)`,
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
    background: `radial-gradient(circle at 20% 80%, ${theme.accent}15 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, ${theme.accentLight}10 0%, transparent 50%)`,
    opacity: 0.6
  }}></div>

  <div style={{
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1
  }}>
    {/* Main Footer Content */}
    <div style={{
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr',
      gap: '3rem',
      marginBottom: '3rem'
    }}>
      {/* Brand & Description */}
      <div>
        <h3 style={{
          fontSize: '1.8rem',
          fontWeight: 700,
          background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentLight})`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1rem'
        }}>
          Chokkapu Saketh
        </h3>
        <p style={{
          color: theme.textSecondary,
          lineHeight: 1.6,
          marginBottom: '2rem',
          maxWidth: '400px'
        }}>
          Full-Stack AI Engineer passionate about building intelligent digital experiences. 
          Specializing in AI/ML, computer vision, and modern web technologies.
        </p>
        
        {/* Social Links */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center'
        }}>
          {/* GitHub */}
          <a 
            href="https://github.com/ch-saketh" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: `${theme.cardBg}`,
              border: `1px solid ${theme.border}`,
              borderRadius: '10px',
              color: theme.text,
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              fontSize: '1.2rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = theme.accent;
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = `0 8px 25px ${theme.accent}30`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = theme.cardBg;
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>

          {/* LinkedIn */}
          <a 
            href="https://www.linkedin.com/in/saketh-chokkapu-3a668a2b9" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: `${theme.cardBg}`,
              border: `1px solid ${theme.border}`,
              borderRadius: '10px',
              color: theme.text,
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              fontSize: '1.2rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#0077b5';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 119, 181, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = theme.cardBg;
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>

          {/* Email */}
          <a 
            href="mailto:chokkapusaketh@gmail.com"
            style={{
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: `${theme.cardBg}`,
              border: `1px solid ${theme.border}`,
              borderRadius: '10px',
              color: theme.text,
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              fontSize: '1.2rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#ea4335';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(234, 67, 53, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = theme.cardBg;
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h4 style={{
          color: theme.text,
          fontSize: '1.1rem',
          fontWeight: 600,
          marginBottom: '1.5rem'
        }}>
          Navigation
        </h4>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          {['About', 'Skills', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                color: theme.textSecondary,
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                fontSize: '0.95rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = theme.accent;
                e.currentTarget.style.transform = 'translateX(5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = theme.textSecondary;
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* Contact Info */}
      <div>
        <h4 style={{
          color: theme.text,
          fontSize: '1.1rem',
          fontWeight: 600,
          marginBottom: '1.5rem'
        }}>
          Get In Touch
        </h4>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            color: theme.textSecondary
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.7 }}>
              <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"/>
            </svg>
            <span style={{ fontSize: '0.9rem' }}>chokkapusaketh@gmail.com</span>
          </div>
          
          <button
            onClick={() => window.location.href = 'mailto:chokkapusaketh@gmail.com'}
            style={{
              padding: '0.75rem 1.5rem',
              background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentLight})`,
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '0.9rem',
              width: 'fit-content'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = `0 8px 25px ${theme.accent}40`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Send Message
          </button>
        </div>
      </div>
    </div>

    {/* Bottom Bar */}
    <div style={{
      borderTop: `1px solid ${theme.border}`,
      paddingTop: '2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem'
    }}>
      <p style={{
        color: theme.textSecondary,
        fontSize: '0.9rem',
        margin: 0
      }}>
        © 2024 Chokkapu Saketh. All rights reserved.
      </p>
      
      <div style={{
        display: 'flex',
        gap: '2rem',
        alignItems: 'center'
      }}>
        <span style={{
          color: theme.textSecondary,
          fontSize: '0.85rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            backgroundColor: '#10b981',
            borderRadius: '50%',
            animation: 'pulse 2s infinite'
          }}></div>
          Available for new projects
        </span>
      </div>
    </div>
  </div>

  {/* Add pulse animation */}
  <style>{`
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: 0.7;
        transform: scale(1.1);
      }
    }
    
    @media (max-width: 768px) {
      footer > div > div:first-child {
        grid-template-columns: 1fr !important;
        gap: 2rem !important;
      }
    }
  `}</style>
</footer>
    </div>
  );
}