import React, { useState, useEffect } from 'react';

interface SkillsProps {
  theme: any;
}

interface GraphNode {
  id: string;
  name: string;
  color: string;
  category: string;
  x: number;
  y: number;
  description?: string;
  learnMoreUrl?: string;
}

interface GraphLink {
  source: string;
  target: string;
  strength: number;
}

interface TechDetail {
  title: string;
  description: string;
  useCases: string[];
  experience: string;
  url: string;
}

const Skills: React.FC<SkillsProps> = ({ theme }) => {
  const [activeCategory, setActiveCategory] = useState<string>('programming');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [graphData, setGraphData] = useState<{ nodes: GraphNode[], links: GraphLink[] }>({ nodes: [], links: [] });
  const [showInfo, setShowInfo] = useState<boolean>(false);

  // Category icons - Official company logos
  const categoryIcons: Record<string, string> = {
    'programming': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
    'frontend': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    'backend': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
    'databases': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
    'ml': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg',
    'quantum': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/qiskit/qiskit-original.svg',
    'tools': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg'
  };

  // Category background colors for visual distinction
  const categoryColors: Record<string, string> = {
    'programming': '#3776AB',
    'frontend': '#61DAFB',
    'backend': '#339933',
    'databases': '#13AA52',
    'ml': '#FF6F00',
    'quantum': '#6D28D9',
    'tools': '#F1502F'
  };

  // LOGOS WITH BEST VISIBILITY - Using colored and original variants for clarity
  const techIcons: Record<string, string> = {
    // Programming Languages
    'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
    'Java': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
    'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    'C': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg',
    
    // Frontend
    'React.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    'Vite': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg',
    'TailwindCSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-plain.svg',
    'Electron.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/electron/electron-original.svg',
    
    // Backend
    'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
    'Express.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg',
    'Flask': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg',
    'FastAPI': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg',
    'RESTful APIs': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg',
    
    // Databases
    'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
    'Neo4j': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/neo4j/neo4j-original.svg',
    'PostgreSQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
    'SQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
    'Supabase': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg',
    
    // Machine Learning
    'Scikit-learn': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg',
    'TF-IDF': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg',
    'Cosine Similarity': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg',
    'NLP': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg',
    
    // Quantum Computing
    'IBM Qiskit': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/qiskit/qiskit-original.svg',
    'Quantum Computing': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/qiskit/qiskit-original.svg',
    'Quantum Key Distribution': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/qiskit/qiskit-original.svg',
    'BB84 Protocol': 'https://cdn-icons-png.flaticon.com/512/4436/4436481.png',
    'Kyber': 'https://cdn-icons-png.flaticon.com/512/3050/3050159.png',
    
    // Tools
    'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
    'Linux': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg',
    'Jupyter Notebook': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg',
    'VS Code': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg',
    'Postman': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg'
  };

  // Dark logos that need light background for visibility
  const darkLogos = new Set(['Git', 'Java', 'Linux', 'PostgreSQL', 'SQL', 'C', 'Jupyter Notebook', 'Electron.js', 'TailwindCSS', 'Quantum Computing', 'Express.js', 'Flask', 'IBM Qiskit', 'Quantum Key Distribution']);

  // Tech details
  const techDetails: Record<string, TechDetail> = {
    // Programming Languages
    'Python': {
      title: 'Python',
      description: 'High-level programming language for AI/ML, backend services, and automation.',
      useCases: ['AI/ML Development', 'Backend Services', 'Data Analysis', 'Automation'],
      experience: '4+ years',
      url: 'https://www.python.org'
    },
    'Java': {
      title: 'Java',
      description: 'Object-oriented language for enterprise applications and Android development.',
      useCases: ['Enterprise Applications', 'Android Development', 'High-concurrency Systems'],
      experience: '3+ years',
      url: 'https://www.java.com'
    },
    'JavaScript': {
      title: 'JavaScript',
      description: 'Universal scripting language for web and full-stack development.',
      useCases: ['Web Applications', 'Server-side Development', 'Real-time Applications'],
      experience: '4+ years',
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
    },

    // Frontend
    'React.js': {
      title: 'React.js',
      description: 'JavaScript library for building modern user interfaces.',
      useCases: ['Single Page Applications', 'Complex Dashboards', 'Real-time Interfaces'],
      experience: '3+ years',
      url: 'https://reactjs.org'
    },
    'Vite': {
      title: 'Vite',
      description: 'Next-generation frontend tooling with fast development experience.',
      useCases: ['Modern Web Development', 'Fast Refresh', 'Production Bundling'],
      experience: '2+ years',
      url: 'https://vitejs.dev'
    },
    'TailwindCSS': {
      title: 'TailwindCSS',
      description: 'Utility-first CSS framework for rapid UI development.',
      useCases: ['Rapid Prototyping', 'Design Systems', 'Responsive Design'],
      experience: '2+ years',
      url: 'https://tailwindcss.com'
    },
    'Electron.js': {
      title: 'Electron.js',
      description: 'Framework for building cross-platform desktop apps.',
      useCases: ['Desktop Applications', 'Cross-platform Tools'],
      experience: 'Desktop app development',
      url: 'https://www.electronjs.org'
    },

    // Backend
    'Node.js': {
      title: 'Node.js',
      description: 'JavaScript runtime for scalable network applications.',
      useCases: ['RESTful APIs', 'Real-time Applications', 'Microservices'],
      experience: '3+ years',
      url: 'https://nodejs.org'
    },
    'Express.js': {
      title: 'Express.js',
      description: 'Minimal Node.js web application framework.',
      useCases: ['REST API Development', 'Web Applications', 'Middleware'],
      experience: '3+ years',
      url: 'https://expressjs.com'
    },
    'Flask': {
      title: 'Flask',
      description: 'Lightweight Python web framework.',
      useCases: ['Rapid Prototyping', 'REST APIs', 'Web Applications'],
      experience: '2+ years',
      url: 'https://flask.palletsprojects.com'
    },
    'FastAPI': {
      title: 'FastAPI',
      description: 'Modern Python framework for building APIs.',
      useCases: ['High-performance APIs', 'Microservices', 'Data Validation'],
      experience: 'API development',
      url: 'https://fastapi.tiangolo.com'
    },
    'RESTful APIs': {
      title: 'RESTful APIs',
      description: 'Architectural style for networked applications.',
      useCases: ['Web Services', 'Mobile Backends', 'Third-party Integrations'],
      experience: '4+ years',
      url: 'https://restfulapi.net'
    },

    // Databases
    'MongoDB': {
      title: 'MongoDB',
      description: 'NoSQL document database for scalability.',
      useCases: ['Content Management', 'Real-time Analytics', 'Mobile Apps'],
      experience: '3+ years',
      url: 'https://www.mongodb.com'
    },
    'Neo4j': {
      title: 'Neo4j',
      description: 'Native graph database for connected data.',
      useCases: ['Social Networks', 'Recommendation Engines', 'Fraud Detection'],
      experience: 'Graph database modeling',
      url: 'https://neo4j.com'
    },
    'SQL': {
      title: 'SQL',
      description: 'Language for relational databases.',
      useCases: ['Relational Data', 'Transaction Systems', 'Data Warehousing'],
      experience: '4+ years',
      url: 'https://en.wikipedia.org/wiki/SQL'
    },

    // Machine Learning
    'Scikit-learn': {
      title: 'Scikit-learn',
      description: 'Machine learning library for predictive analysis.',
      useCases: ['Predictive Analytics', 'Classification', 'Clustering'],
      experience: '2+ years',
      url: 'https://scikit-learn.org'
    },
    'TF-IDF': {
      title: 'TF-IDF',
      description: 'Statistical measure for word importance.',
      useCases: ['Text Mining', 'Information Retrieval', 'Document Classification'],
      experience: 'Text analysis implementation',
      url: 'https://en.wikipedia.org/wiki/Tf%E2%80%93idf'
    },
    'Cosine Similarity': {
      title: 'Cosine Similarity',
      description: 'Measure of similarity between vectors.',
      useCases: ['Document Similarity', 'Recommendation Systems', 'Clustering'],
      experience: 'Similarity algorithm implementation',
      url: 'https://en.wikipedia.org/wiki/Cosine_similarity'
    },
    'NLP': {
      title: 'NLP',
      description: 'AI for computer-human language interaction.',
      useCases: ['Text Classification', 'Sentiment Analysis', 'Named Entity Recognition'],
      experience: 'NLP techniques',
      url: 'https://en.wikipedia.org/wiki/Natural_language_processing'
    },

    // Quantum Computing
    'IBM Qiskit': {
      title: 'IBM Qiskit',
      description: 'Open-source SDK for quantum computing.',
      useCases: ['Quantum Algorithm Development', 'Circuit Simulation'],
      experience: 'Quantum computing concepts',
      url: 'https://qiskit.org'
    },
    'Quantum Key Distribution': {
      title: 'Quantum Key Distribution',
      description: 'Secure communication using quantum mechanics.',
      useCases: ['Secure Communication', 'Cryptographic Protocols'],
      experience: 'Quantum cryptography principles',
      url: 'https://en.wikipedia.org/wiki/Quantum_key_distribution'
    },
    'BB84 Protocol': {
      title: 'BB84 Protocol',
      description: 'First quantum cryptography protocol.',
      useCases: ['Quantum Cryptography', 'Secure Key Exchange'],
      experience: 'Quantum protocol understanding',
      url: 'https://en.wikipedia.org/wiki/BB84'
    },
    'Kyber': {
      title: 'Kyber',
      description: 'Post-quantum cryptographic algorithm.',
      useCases: ['Post-Quantum Cryptography', 'Secure Communication'],
      experience: 'Post-quantum algorithm knowledge',
      url: 'https://pq-crystals.org/kyber/'
    },

    // Tools
    'Git': {
      title: 'Git',
      description: 'Distributed version control system.',
      useCases: ['Version Control', 'Collaborative Development'],
      experience: '4+ years',
      url: 'https://git-scm.com'
    },
    'Jupyter Notebook': {
      title: 'Jupyter Notebook',
      description: 'Web app for code and visualizations.',
      useCases: ['Data Analysis', 'ML Prototyping'],
      experience: '3+ years',
      url: 'https://jupyter.org'
    },
    'VS Code': {
      title: 'VS Code',
      description: 'Source-code editor.',
      useCases: ['Code Editing', 'Debugging', 'Extensions'],
      experience: '4+ years',
      url: 'https://code.visualstudio.com'
    },
    'Postman': {
      title: 'Postman',
      description: 'API platform for building and testing.',
      useCases: ['API Testing', 'Documentation', 'Mock Servers'],
      experience: '3+ years',
      url: 'https://www.postman.com'
    }
  };

  // UPDATED CATEGORIES
  const skillsData = {
    'programming': {
      title: 'Programming',
      skills: [
        { name: 'Python', color: '#3776AB' },
        { name: 'Java', color: '#007396' },
        { name: 'JavaScript', color: '#F7DF1E' }
      ]
    },
    'frontend': {
      title: 'Frontend',
      skills: [
        { name: 'React.js', color: '#61DAFB' },
        { name: 'Vite', color: '#646CFF' },
        { name: 'TailwindCSS', color: '#38B2AC' },
        { name: 'Electron.js', color: '#47848F' }
      ]
    },
    'backend': {
      title: 'Backend',
      skills: [
        { name: 'Node.js', color: '#339933' },
        { name: 'Express.js', color: '#000000' },
        { name: 'Flask', color: '#000000' },
        { name: 'FastAPI', color: '#009688' },
        { name: 'RESTful APIs', color: '#FF6D00' }
      ]
    },
    'databases': {
      title: 'Databases',
      skills: [
        { name: 'MongoDB', color: '#47A248' },
        { name: 'Neo4j', color: '#008CC1' },
        { name: 'SQL', color: '#4479A1' }
      ]
    },
    'ml': {
      title: 'Machine Learning',
      skills: [
        { name: 'Scikit-learn', color: '#F7931E' },
        { name: 'TF-IDF', color: '#3D5AFE' },
        { name: 'Cosine Similarity', color: '#3D5AFE' },
        { name: 'NLP', color: '#3D5AFE' }
      ]
    },
    'quantum': {
      title: 'Quantum Computing',
      skills: [
        { name: 'IBM Qiskit', color: '#6929C4' },
        { name: 'Quantum Key Distribution', color: '#6929C4' },
        { name: 'BB84 Protocol', color: '#6929C4' },
        { name: 'Kyber', color: '#6929C4' }
      ]
    },
    'tools': {
      title: 'Tools',
      skills: [
        { name: 'Git', color: '#F05032' },
        { name: 'Jupyter Notebook', color: '#F37626' },
        { name: 'VS Code', color: '#007ACC' },
        { name: 'Postman', color: '#FF6C37' }
      ]
    }
  };

  const createLayout = (): GraphNode[] => {
    const nodes: GraphNode[] = [];
    
    // Optimized center positions
    const categoryCenters = [
      { id: 'center-programming', name: 'Programming', color: '#3b82f6', category: 'programming', x: 450, y: 120 },
      { id: 'center-frontend', name: 'Frontend', color: '#8b5cf6', category: 'frontend', x: 180, y: 220 },
      { id: 'center-backend', name: 'Backend', color: '#10b981', category: 'backend', x: 720, y: 220 },
      { id: 'center-databases', name: 'Databases', color: '#ef4444', category: 'databases', x: 720, y: 480 },
      { id: 'center-tools', name: 'Tools', color: '#f59e0b', category: 'tools', x: 180, y: 480 },
      { id: 'center-ml', name: 'Machine Learning', color: '#ec4899', category: 'ml', x: 320, y: 350 },
      { id: 'center-quantum', name: 'Quantum Computing', color: '#06b6d4', category: 'quantum', x: 580, y: 350 }
    ];
    
    categoryCenters.forEach(center => nodes.push({
      ...center,
      description: `${center.name} technologies`,
      learnMoreUrl: '#'
    }));
    
    // Create skill nodes
    Object.entries(skillsData).forEach(([category, data]) => {
      const center = categoryCenters.find(c => c.category === category);
      if (!center) return;
      
      const radius = 80 + (data.skills.length * 10);
      const angleStep = (2 * Math.PI) / data.skills.length;
      
      data.skills.forEach((skill, index) => {
        const angle = (-Math.PI / 2) + (angleStep * index);
        const x = center.x + radius * Math.cos(angle);
        const y = center.y + radius * Math.sin(angle);
        
        nodes.push({
          id: skill.name,
          name: skill.name,
          color: skill.color,
          category,
          x,
          y,
          description: techDetails[skill.name]?.description || `${skill.name} technology`,
          learnMoreUrl: techDetails[skill.name]?.url || '#'
        });
      });
    });
    
    return nodes;
  };

  const getTechnologyConnections = (): GraphLink[] => {
    const connections: GraphLink[] = [];
    
    // Connect skills to their category centers ONLY
    Object.values(skillsData).forEach(categoryData => {
      const centerId = `center-${categoryData.title.toLowerCase().replace(/ /g, '-')}`;
      categoryData.skills.forEach(skill => {
        connections.push({
          source: skill.name,
          target: centerId,
          strength: 0.5
        });
      });
    });
    
    // Minimal connections between category centers
    connections.push(
      { source: 'center-programming', target: 'center-frontend', strength: 0.6 },
      { source: 'center-programming', target: 'center-backend', strength: 0.7 },
      { source: 'center-programming', target: 'center-ml', strength: 0.6 },
      { source: 'center-backend', target: 'center-databases', strength: 0.7 }
    );
    
    return connections;
  };

  useEffect(() => {
    setGraphData({ nodes: createLayout(), links: getTechnologyConnections() });
  }, []);

  const handleNodeClick = (nodeId: string) => { 
    setSelectedSkill(nodeId); 
    setShowInfo(true); 
  };

  const closeInfoPanel = () => { 
    setShowInfo(false); 
    setSelectedSkill(null); 
  };

  const filteredNodes = graphData.nodes.filter(node => 
    node.id.startsWith('center-') || node.category === activeCategory
  );
  
  const filteredLinks = graphData.links.filter(link => {
    const sourceNode = graphData.nodes.find(n => n.id === link.source);
    const targetNode = graphData.nodes.find(n => n.id === link.target);
    return sourceNode?.category === activeCategory || 
           targetNode?.category === activeCategory || 
           sourceNode?.id.startsWith('center-') || 
           targetNode?.id.startsWith('center-');
  });

  const selectedNode = selectedSkill ? graphData.nodes.find(n => n.id === selectedSkill) : null;

  // Information Panel Component
  const InformationPanel = () => {
    if (!selectedSkill || !showInfo || !selectedNode) return null;

    const isCenterNode = selectedNode.id.startsWith('center-');
    const detail = techDetails[selectedSkill];
    const iconUrl = isCenterNode ? categoryIcons[selectedNode.category] : techIcons[selectedNode.name];

    return (
      <div 
        className="info-panel"
        style={{
          position: 'absolute',
          right: '1.5rem',
          top: '1.5rem',
          height: 'auto',
          maxHeight: 'calc(100% - 3rem)',
          width: '380px',
          background: theme.cardBg,
          borderRadius: '24px',
          border: `1px solid ${theme.border}`,
          boxShadow: '0 30px 60px rgba(0, 0, 0, 0.5)',
          zIndex: 2000,
          backdropFilter: 'blur(30px)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'fadeInPanel 0.3s ease-out'
        }}
      >
        <div style={{ 
          padding: '1.5rem', 
          borderBottom: `1px solid ${theme.border}`,
          flexShrink: 0 
        }}>
          <button
            onClick={closeInfoPanel}
            style={{
              position: 'absolute', 
              top: '1rem', 
              right: '1.2rem',
              background: 'rgba(255,255,255,0.05)', 
              border: 'none',
              color: '#fff', 
              cursor: 'pointer', 
              width: '32px', 
              height: '32px', 
              borderRadius: '50%'
            }}
          >
            ✕
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '12px', 
              background: isCenterNode ? selectedNode.color : '#fff',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              padding: '8px'
            }}>
              {iconUrl && (
                <img 
                  src={iconUrl} 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'contain' 
                  }} 
                  alt={selectedNode.name} 
                  onError={(e) => {
                    // Fallback text if image fails
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.innerHTML = `<div style="color: ${isCenterNode ? '#fff' : '#000'}; font-weight: bold; font-size: 18px;">${selectedNode.name.charAt(0)}</div>`;
                      parent.style.background = selectedNode.color;
                    }
                  }}
                />
              )}
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: theme.text, margin: 0 }}>
                {selectedNode.name}
              </h3>
              <span style={{ fontSize: '0.8rem', color: selectedNode.color, fontWeight: 600 }}>
                {isCenterNode ? 'Category' : 'Technology'}
              </span>
            </div>
          </div>
        </div>
        
        <div style={{ 
          flex: '1 1 auto',
          overflowY: 'auto', 
          padding: '1.5rem' 
        }}>
          <h4 style={styles.detailLabel}>Description</h4>
          <p style={styles.detailText}>{detail ? detail.description : selectedNode.description}</p>
          
          {detail?.useCases && (
            <div style={{ marginTop: '1.5rem' }}>
              <h4 style={styles.detailLabel}>Primary Use Cases</h4>
              <ul style={{ 
                paddingLeft: '1.2rem', 
                margin: '0.5rem 0',
                color: 'rgba(255,255,255,0.7)', 
                fontSize: '0.9rem',
                lineHeight: '1.6'
              }}>
                {detail.useCases.map((u, i) => (
                  <li key={i} style={{ marginBottom: '0.3rem' }}>{u}</li>
                ))}
              </ul>
            </div>
          )}
          
          {detail?.experience && (
            <div style={{ marginTop: '1.5rem' }}>
              <h4 style={styles.detailLabel}>Experience</h4>
              <p style={styles.detailText}>{detail.experience}</p>
            </div>
          )}
        </div>

        {detail?.url && (
          <div style={{ 
            padding: '1.25rem', 
            borderTop: `1px solid ${theme.border}`, 
            background: 'rgba(0,0,0,0.2)', 
            flexShrink: 0 
          }}>
            <button 
              onClick={() => window.open(detail.url, '_blank')} 
              style={styles.learnMoreBtn}
            >
              📚 Learn More
            </button>
          </div>
        )}
      </div>
    );
  };

  // Mobile Skills Card Component
  const MobileSkillsView = () => {
    const currentCategory = skillsData[activeCategory as keyof typeof skillsData];
    
    return (
      <div className="mobile-skills-view">
        {/* Category Pills */}
        <div className="mobile-category-pills">
          {Object.entries(skillsData).map(([key, data]) => (
            <button
              key={key}
              onClick={() => {
                setActiveCategory(key);
                setSelectedSkill(null);
                setShowInfo(false);
              }}
              className={`category-pill ${activeCategory === key ? 'active' : ''}`}
              style={{
                background: activeCategory === key 
                  ? `linear-gradient(135deg, ${categoryColors[key]}, ${categoryColors[key]}90)` 
                  : 'rgba(255,255,255,0.05)',
                color: activeCategory === key ? '#fff' : 'rgba(255,255,255,0.6)',
                border: activeCategory === key ? 'none' : '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <img 
                src={categoryIcons[key]} 
                alt="" 
                style={{ 
                  width: '16px', 
                  height: '16px',
                  filter: activeCategory === key ? 'brightness(10)' : 'none',
                  opacity: activeCategory === key ? 1 : 0.7
                }} 
              />
              <span>{data.title}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="mobile-skills-grid">
          {currentCategory.skills.map((skill, index) => {
            const iconUrl = techIcons[skill.name];
            const detail = techDetails[skill.name];
            const isSelected = selectedSkill === skill.name;
            const needsLightBg = darkLogos.has(skill.name);
            
            return (
              <div
                key={skill.name}
                className={`mobile-skill-card ${isSelected ? 'selected' : ''}`}
                onClick={() => {
                  setSelectedSkill(isSelected ? null : skill.name);
                  setShowInfo(!isSelected);
                }}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  borderColor: isSelected ? skill.color : 'rgba(255,255,255,0.1)',
                }}
              >
                <div className="skill-card-header">
                  <div 
                    className="skill-icon-wrapper"
                    style={{
                      background: needsLightBg 
                        ? 'linear-gradient(135deg, #fff, #f0f0f0)' 
                        : `linear-gradient(135deg, ${skill.color}20, ${skill.color}10)`,
                      boxShadow: isSelected ? `0 0 20px ${skill.color}40` : 'none'
                    }}
                  >
                    {iconUrl && (
                      <img src={iconUrl} alt={skill.name} className="skill-icon" />
                    )}
                  </div>
                  <div className="skill-info">
                    <h4 style={{ color: isSelected ? skill.color : '#fff' }}>{skill.name}</h4>
                    {detail?.experience && (
                      <span className="skill-exp">{detail.experience}</span>
                    )}
                  </div>
                  <div className="expand-icon" style={{ color: skill.color }}>
                    {isSelected ? '−' : '+'}
                  </div>
                </div>
                
                {/* Expanded Content */}
                {isSelected && detail && (
                  <div className="skill-card-expanded">
                    <p className="skill-description">{detail.description}</p>
                    <div className="skill-use-cases">
                      {detail.useCases.slice(0, 3).map((useCase, i) => (
                        <span 
                          key={i} 
                          className="use-case-tag"
                          style={{ 
                            background: `${skill.color}15`,
                            color: skill.color,
                            borderColor: `${skill.color}30`
                          }}
                        >
                          {useCase}
                        </span>
                      ))}
                    </div>
                    <button 
                      className="learn-more-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(detail.url, '_blank');
                      }}
                      style={{ background: skill.color }}
                    >
                      Learn More →
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Category Summary */}
        <div className="mobile-category-summary" style={{ borderColor: categoryColors[activeCategory] }}>
          <div className="summary-stat">
            <span className="stat-number" style={{ color: categoryColors[activeCategory] }}>
              {currentCategory.skills.length}
            </span>
            <span className="stat-label">Technologies</span>
          </div>
          <div className="summary-divider" style={{ background: categoryColors[activeCategory] }} />
          <div className="summary-text">
            <span style={{ color: categoryColors[activeCategory] }}>{currentCategory.title}</span>
            <span>Tap any skill to explore</span>
          </div>
        </div>
      </div>
    );
  };

  const renderGraph = () => {
    return (
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 900 700" 
        style={{ 
          background: `radial-gradient(circle at center, ${theme.cardBg}80 0%, ${theme.bg} 100%)`, 
          borderRadius: '12px', 
          overflow: 'visible' 
        }}
      >
        <defs>
          <filter id="node-glow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="selected-glow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {filteredLinks.map((link, index) => {
          const sourceNode = filteredNodes.find(n => n.id === link.source);
          const targetNode = filteredNodes.find(n => n.id === link.target);
          if (!sourceNode || !targetNode) return null;
          
          const isSelectedLink = selectedSkill && (selectedSkill === link.source || selectedSkill === link.target);
          return (
            <line 
              key={`${link.source}-${link.target}-${index}`} 
              x1={sourceNode.x} 
              y1={sourceNode.y} 
              x2={targetNode.x} 
              y2={targetNode.y} 
              stroke={isSelectedLink ? theme.accent : `${theme.accent}20`} 
              strokeWidth={isSelectedLink ? 4 : link.strength * 2} 
              opacity={isSelectedLink ? 0.9 : 0.3} 
              style={{ transition: '0.3s' }} 
            />
          );
        })}
        
        {filteredNodes.map((node) => {
          const isCenterNode = node.id.startsWith('center-');
          const isSelected = selectedSkill === node.id;
          const radius = isCenterNode ? 40 : 22;
          const iconUrl = isCenterNode ? categoryIcons[node.category] : techIcons[node.name];
          
          return (
            <g 
              key={node.id} 
              className="graph-node-group" 
              transform={`translate(${node.x}, ${node.y})`} 
              onClick={() => handleNodeClick(node.id)}
            >
              {isSelected && (
                <circle 
                  r={radius + 15} 
                  fill={node.color} 
                  opacity="0.2" 
                  filter="url(#selected-glow)" 
                />
              )}
              
              <circle 
                className="node-circle" 
                r={radius} 
                fill={node.color} 
                stroke={isSelected ? 'white' : 'rgba(255,255,255,0.3)'} 
                strokeWidth={isSelected ? 4 : 2.5} 
                filter="url(#node-glow)" 
                style={{ 
                  transition: '0.2s',
                  cursor: 'pointer'
                }} 
              />
              
              {iconUrl && (
                <>
                  {/* Subtle background for dark logos - lower opacity to show logo through */}
                  {darkLogos.has(node.name) && (
                    <circle 
                      cx="0" 
                      cy="0" 
                      r={isCenterNode ? 19 : 15} 
                      fill="rgba(255, 255, 255, 0.65)"
                      opacity="0.75"
                    />
                  )}
                  <image 
                    href={iconUrl} 
                    x={isCenterNode ? -18 : -14} 
                    y={isCenterNode ? -18 : -14} 
                    width={isCenterNode ? 36 : 28} 
                    height={isCenterNode ? 36 : 28} 
                    style={{ 
                      pointerEvents: 'none',
                      borderRadius: '50%',
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
                      opacity: 1
                    }} 
                    onError={(e) => {
                      // Hide broken images
                      const target = e.target as SVGImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </>
              )}
              
              <text 
                textAnchor="middle" 
                y={radius + 18} 
                fill="#fff" 
                fontSize="10" 
                fontWeight="600"
                style={{ 
                  pointerEvents: 'none', 
                  opacity: isSelected ? 1 : 0.7,
                  textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                }}
              >
                {isCenterNode ? node.name : 
                 node.name.length > 12 ? 
                 node.name.substring(0, 10) + '...' : node.name}
              </text>
              
              {isSelected && (
                <circle 
                  r={radius + 6} 
                  fill="transparent" 
                  stroke={theme.accent} 
                  strokeWidth="2" 
                  strokeDasharray="5,5" 
                  opacity="0.8" 
                  style={{ animation: 'rotate 6s linear infinite' }} 
                />
              )}
            </g>
          );
        })}
      </svg>
    );
  };

  return (
    <section id="skills" style={{ 
      padding: 'clamp(60px, 10vw, 120px) 2rem', 
      backgroundColor: theme.bg, 
      minHeight: '100vh', 
      position: 'relative' 
    }}>
      {/* Background Gradient Effects */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '500px',
        height: '500px',
        background: `radial-gradient(circle, ${theme.accent}15 0%, transparent 70%)`,
        filter: 'blur(80px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '10%',
        width: '400px',
        height: '400px',
        background: `radial-gradient(circle, #10b98120 0%, transparent 70%)`,
        filter: 'blur(60px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{ maxWidth: '1600px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 4rem)' }}>
          <span style={{
            display: 'inline-block',
            padding: '8px 16px',
            background: `${theme.accent}15`,
            border: `1px solid ${theme.accent}30`,
            borderRadius: '100px',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: theme.accent,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '1rem'
          }}>
            Skills & Expertise
          </span>
          <h1 style={{ 
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
            fontWeight: 800, 
            color: theme.text,
            marginBottom: '1rem',
            letterSpacing: '-0.03em'
          }}>
            Technical Stack
          </h1>
          <p style={{ 
            color: theme.textSecondary,
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Interactive visualization of my technology expertise across multiple domains
          </p>
        </div>
        
        {/* Desktop Layout - Improved */}
        <div className="skills-layout desktop-skills" style={{ 
          display: 'grid', 
          gridTemplateColumns: '280px 1fr', 
          gap: '2rem',
          alignItems: 'start'
        }}>
          {/* Categories Sidebar - Enhanced */}
          <div className="categories-panel" style={{ 
            background: `linear-gradient(135deg, ${theme.cardBg} 0%, rgba(255,255,255,0.02) 100%)`,
            borderRadius: '24px', 
            padding: '1.5rem', 
            border: `1px solid ${theme.border}`,
            position: 'sticky',
            top: '100px',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '1.5rem',
              paddingBottom: '1rem',
              borderBottom: `1px solid ${theme.border}`
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                background: theme.accent,
                borderRadius: '50%',
                animation: 'pulse 2s infinite'
              }} />
              <h3 style={{ 
                color: theme.accent, 
                fontSize: '0.8rem', 
                textTransform: 'uppercase',
                letterSpacing: '2px',
                margin: 0,
                fontWeight: 700
              }}>
                Categories
              </h3>
            </div>
            
            {Object.entries(skillsData).map(([key, data]) => (
              <button 
                key={key} 
                onClick={() => {
                  setActiveCategory(key);
                  setSelectedSkill(null);
                  setShowInfo(false);
                }} 
                style={{ 
                  width: '100%', 
                  padding: '14px 16px', 
                  background: activeCategory === key 
                    ? `linear-gradient(135deg, ${theme.accent}25 0%, ${theme.accent}10 100%)` 
                    : 'transparent', 
                  color: activeCategory === key ? theme.accent : 'rgba(255,255,255,0.6)', 
                  border: activeCategory === key ? `1px solid ${theme.accent}40` : '1px solid transparent',
                  textAlign: 'left', 
                  cursor: 'pointer', 
                  borderRadius: '14px', 
                  fontSize: '0.9rem', 
                  fontWeight: 600,
                  marginBottom: '8px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  if (activeCategory !== key) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.color = '#fff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeCategory !== key) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                  }
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img 
                    src={categoryIcons[key]} 
                    alt="" 
                    style={{ 
                      width: '20px', 
                      height: '20px',
                      opacity: activeCategory === key ? 1 : 0.6,
                      transition: 'opacity 0.3s'
                    }} 
                  />
                  {data.title}
                </span>
                <span style={{ 
                  fontSize: '0.75rem', 
                  background: activeCategory === key ? theme.accent : 'rgba(255,255,255,0.1)', 
                  color: activeCategory === key ? '#fff' : 'rgba(255,255,255,0.6)',
                  padding: '4px 10px', 
                  borderRadius: '8px',
                  fontWeight: 700,
                  minWidth: '24px',
                  textAlign: 'center',
                  transition: 'all 0.3s'
                }}>
                  {data.skills.length}
                </span>
              </button>
            ))}

            {/* Stats Summary */}
            <div style={{
              marginTop: '1.5rem',
              paddingTop: '1.5rem',
              borderTop: `1px solid ${theme.border}`,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: theme.accent }}>
                  {Object.values(skillsData).reduce((acc, cat) => acc + cat.skills.length, 0)}
                </div>
                <div style={{ fontSize: '0.65rem', color: theme.textSecondary, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Total Skills
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10b981' }}>
                  {Object.keys(skillsData).length}
                </div>
                <div style={{ fontSize: '0.65rem', color: theme.textSecondary, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Categories
                </div>
              </div>
            </div>
          </div>
          
          {/* Graph Container - Enhanced */}
          <div className="graph-container" style={{ 
            background: `linear-gradient(145deg, ${theme.cardBg} 0%, rgba(0,0,0,0.4) 100%)`,
            borderRadius: '24px', 
            border: `1px solid ${theme.border}`, 
            position: 'relative', 
            height: '700px',
            minHeight: '600px',
            overflow: 'hidden',
            boxShadow: `0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)`
          }}>
            {/* Graph Header */}
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '24px',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                padding: '8px 14px',
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(10px)',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  background: categoryColors[activeCategory] || theme.accent,
                  borderRadius: '50%',
                  boxShadow: `0 0 10px ${categoryColors[activeCategory] || theme.accent}`
                }} />
                <span style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 600 }}>
                  {skillsData[activeCategory as keyof typeof skillsData]?.title || 'All Skills'}
                </span>
              </div>
            </div>

            {/* Hint Text */}
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 10,
              padding: '8px 16px',
              background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(10px)',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>
                Click on any node to explore details
              </span>
            </div>

            {renderGraph()}
            <InformationPanel />
          </div>
        </div>

        {/* Mobile Skills View - Only visible on mobile */}
        <MobileSkillsView />
      </div>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
        
        .graph-node-group { cursor: pointer; }
        .graph-node-group:hover .node-circle { 
          transform: scale(1.15); 
          filter: brightness(1.3); 
          stroke-width: 3px;
        }

        /* Hide mobile view on desktop */
        .mobile-skills-view {
          display: none;
        }

        /* MOBILE RESPONSIVE SKILLS */
        @media (max-width: 768px) {
          /* Hide desktop view */
          .desktop-skills {
            display: none !important;
          }

          /* Show mobile view */
          .mobile-skills-view {
            display: block !important;
          }

          /* Category Pills */
          .mobile-category-pills {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 1.5rem;
            justify-content: center;
          }

          .category-pill {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 8px 14px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .category-pill.active {
            transform: scale(1.05);
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
          }

          /* Skills Grid */
          .mobile-skills-grid {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          .mobile-skill-card {
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 16px;
            padding: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
            animation: slideUp 0.4s ease forwards;
            opacity: 0;
          }

          .mobile-skill-card.selected {
            background: rgba(255,255,255,0.06);
            border-width: 2px;
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .skill-card-header {
            display: flex;
            align-items: center;
            gap: 14px;
          }

          .skill-icon-wrapper {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            transition: all 0.3s ease;
          }

          .skill-icon {
            width: 28px;
            height: 28px;
            object-fit: contain;
          }

          .skill-info {
            flex: 1;
          }

          .skill-info h4 {
            font-size: 1rem;
            font-weight: 600;
            margin: 0 0 4px 0;
            transition: color 0.3s ease;
          }

          .skill-exp {
            font-size: 0.75rem;
            color: rgba(255,255,255,0.5);
          }

          .expand-icon {
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.4rem;
            font-weight: 300;
            opacity: 0.7;
          }

          /* Expanded Content */
          .skill-card-expanded {
            margin-top: 16px;
            padding-top: 16px;
            border-top: 1px solid rgba(255,255,255,0.1);
            animation: fadeIn 0.3s ease;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          .skill-description {
            font-size: 0.85rem;
            color: rgba(255,255,255,0.7);
            line-height: 1.5;
            margin: 0 0 14px 0;
          }

          .skill-use-cases {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 16px;
          }

          .use-case-tag {
            font-size: 0.7rem;
            padding: 5px 10px;
            border-radius: 6px;
            border: 1px solid;
            font-weight: 500;
          }

          .learn-more-btn {
            width: 100%;
            padding: 12px;
            border: none;
            border-radius: 10px;
            color: #fff;
            font-size: 0.85rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .learn-more-btn:active {
            transform: scale(0.98);
          }

          /* Category Summary */
          .mobile-category-summary {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-top: 1.5rem;
            padding: 16px;
            background: rgba(255,255,255,0.03);
            border: 1px solid;
            border-radius: 14px;
          }

          .summary-stat {
            display: flex;
            flex-direction: column;
            align-items: center;
            min-width: 60px;
          }

          .stat-number {
            font-size: 1.8rem;
            font-weight: 700;
            line-height: 1;
          }

          .stat-label {
            font-size: 0.65rem;
            color: rgba(255,255,255,0.5);
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .summary-divider {
            width: 2px;
            height: 40px;
            opacity: 0.3;
            border-radius: 1px;
          }

          .summary-text {
            display: flex;
            flex-direction: column;
            gap: 2px;
          }

          .summary-text span:first-child {
            font-weight: 600;
            font-size: 0.95rem;
          }

          .summary-text span:last-child {
            font-size: 0.75rem;
            color: rgba(255,255,255,0.5);
          }
        }

        @media (max-width: 900px) and (min-width: 769px) {
          .skills-layout {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .categories-panel {
            display: flex !important;
            flex-wrap: wrap !important;
            gap: 8px !important;
            padding: 1rem !important;
          }
          .categories-panel h3 {
            width: 100% !important;
            margin-bottom: 0.5rem !important;
          }
          .categories-panel button {
            flex: 1 1 auto !important;
            min-width: 120px !important;
            padding: 12px 14px !important;
            font-size: 0.85rem !important;
          }
          .graph-container {
            height: clamp(350px, 60vh, 500px) !important;
          }
        }

        @keyframes fadeInPanel { 
          from { 
            opacity: 0; 
            transform: translateX(20px); 
          } 
          to { 
            opacity: 1; 
            transform: translateX(0); 
          } 
        }
        @keyframes rotate { 
          from { 
            transform: rotate(0deg); 
          } 
          to { 
            transform: rotate(360deg); 
          } 
        }
      `}</style>
    </section>
  );
};

const styles = {
  detailLabel: { 
    fontSize: '0.7rem', 
    fontWeight: 800, 
    color: '#3b82f6', 
    textTransform: 'uppercase' as const, 
    letterSpacing: '0.1em', 
    marginBottom: '0.5rem' 
  },
  detailText: { 
    fontSize: '0.95rem', 
    color: 'rgba(255,255,255,0.8)', 
    lineHeight: 1.6, 
    margin: 0 
  },
  learnMoreBtn: { 
    padding: '0.8rem', 
    background: '#3b82f6', 
    border: 'none', 
    borderRadius: '10px', 
    color: 'white', 
    fontWeight: 700, 
    cursor: 'pointer', 
    width: '100%', 
    transition: 'background 0.3s',
    fontSize: '0.95rem'
  }
};

export default Skills;