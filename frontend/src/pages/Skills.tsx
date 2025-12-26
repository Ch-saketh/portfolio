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

  // Professional icon URLs - ONLY YOUR EXACT STACK
  const categoryIcons: Record<string, string> = {
    'programming': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    'frontend': 'https://cdn-icons-png.flaticon.com/512/5968/5968292.png',
    'backend': 'https://cdn-icons-png.flaticon.com/512/1086/1086581.png',
    'databases': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    'ml': 'https://cdn-icons-png.flaticon.com/512/2103/2103791.png',
    'quantum': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Qiskit-Logo.svg/1024px-Qiskit-Logo.svg.png',
    'tools': 'https://cdn-icons-png.flaticon.com/512/3248/3248193.png'
  };

  // ONLY YOUR EXACT TECH STACK - FIXED QUANTUM ICONS
  const techIcons: Record<string, string> = {
    // Programming Languages
    'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    'Java': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    
    // Frontend
    'React.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'Vite': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg',
    'TailwindCSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
    'HTML5': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    'CSS3': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    'Electron.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/electron/electron-original.svg',
    
    // Backend
    'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    'Express.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    'Flask': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',
    'FastAPI': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg',
    'RESTful APIs': 'https://cdn-icons-png.flaticon.com/512/2165/2165004.png',
    
    // Databases
    'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    'Neo4j': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/neo4j/neo4j-original.svg',
    'SQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    
    // Machine Learning
    'Scikit-learn': 'https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg',
    'LightFM': 'https://raw.githubusercontent.com/lyst/lightfm/master/logo.png',
    'TF-IDF': 'https://cdn-icons-png.flaticon.com/512/2103/2103791.png',
    'Cosine Similarity': 'https://cdn-icons-png.flaticon.com/512/2103/2103791.png',
    'NLP': 'https://cdn-icons-png.flaticon.com/512/2103/2103791.png',
    
    // Quantum Computing - FIXED IBM QISKIT LOGO
    'IBM Qiskit': 'https://qiskit.org/textbook/assets/images/logo.png',
    'Quantum Key Distribution': 'https://cdn-icons-png.flaticon.com/512/3767/3767084.png',
    'BB84 Protocol': 'https://cdn-icons-png.flaticon.com/512/3767/3767084.png',
    'Kyber': 'https://cdn-icons-png.flaticon.com/512/3767/3767084.png',
    
    // Tools
    'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    'Linux': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
    'Jupyter Notebook': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg',
    'VS Code': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
    'Postman': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg'
  };

  // Tech details - ONLY YOUR EXACT STACK
  const techDetails: Record<string, TechDetail> = {
    // Programming Languages
    'Python': {
      title: 'Python',
      description: 'A high-level, interpreted programming language known for its simplicity and versatility. Used extensively in AI/ML, backend development, and automation.',
      useCases: ['AI/ML Development', 'Backend Services', 'Data Analysis', 'Automation Scripting'],
      experience: '4+ years of production experience',
      url: 'https://www.python.org'
    },
    'Java': {
      title: 'Java',
      description: 'Object-oriented programming language designed for reliability and scalability in enterprise environments.',
      useCases: ['Enterprise Applications', 'Android Development', 'High-concurrency Systems'],
      experience: '3+ years building robust applications',
      url: 'https://www.java.com'
    },
    'JavaScript': {
      title: 'JavaScript',
      description: 'The universal scripting language for interactive web applications and modern full-stack development.',
      useCases: ['Web Applications', 'Server-side Development', 'Real-time Applications'],
      experience: '4+ years across full stack',
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
    },

    // Frontend
    'React.js': {
      title: 'React.js',
      description: 'A declarative, component-based JavaScript library for building modern user interfaces.',
      useCases: ['Single Page Applications', 'Complex Dashboards', 'Real-time Interfaces'],
      experience: '3+ years in production',
      url: 'https://reactjs.org'
    },
    'Vite': {
      title: 'Vite',
      description: 'Next-generation frontend tooling with lightning-fast development experience.',
      useCases: ['Modern Web Development', 'Fast Refresh', 'Production Bundling'],
      experience: '2+ years using Vite',
      url: 'https://vitejs.dev'
    },
    'TailwindCSS': {
      title: 'TailwindCSS',
      description: 'A utility-first CSS framework for rapid UI development.',
      useCases: ['Rapid Prototyping', 'Design Systems', 'Responsive Design'],
      experience: '2+ years building interfaces',
      url: 'https://tailwindcss.com'
    },
    'HTML5': {
      title: 'HTML5',
      description: 'Latest markup language for creating web pages and applications.',
      useCases: ['Web Page Structure', 'Semantic Markup', 'Web Applications'],
      experience: '5+ years writing semantic HTML',
      url: 'https://developer.mozilla.org/en-US/docs/Web/HTML'
    },
    'CSS3': {
      title: 'CSS3',
      description: 'Latest CSS with flexbox, grid, animations, and responsive design.',
      useCases: ['Styling and Layout', 'Responsive Design', 'Animations'],
      experience: '5+ years creating interfaces',
      url: 'https://developer.mozilla.org/en-US/docs/Web/CSS'
    },
    'Electron.js': {
      title: 'Electron.js',
      description: 'Framework for building cross-platform desktop apps with web tech.',
      useCases: ['Desktop Applications', 'Cross-platform Tools'],
      experience: 'Desktop app development',
      url: 'https://www.electronjs.org'
    },

    // Backend
    'Node.js': {
      title: 'Node.js',
      description: 'JavaScript runtime for building scalable network applications.',
      useCases: ['RESTful APIs', 'Real-time Applications', 'Microservices'],
      experience: '3+ years in production',
      url: 'https://nodejs.org'
    },
    'Express.js': {
      title: 'Express.js',
      description: 'Minimal and flexible Node.js web application framework.',
      useCases: ['REST API Development', 'Web Applications', 'Middleware'],
      experience: '3+ years building APIs',
      url: 'https://expressjs.com'
    },
    'Flask': {
      title: 'Flask',
      description: 'Lightweight WSGI web application framework for Python.',
      useCases: ['Rapid Prototyping', 'REST APIs', 'Web Applications'],
      experience: '2+ years with Flask',
      url: 'https://flask.palletsprojects.com'
    },
    'FastAPI': {
      title: 'FastAPI',
      description: 'Modern, fast Python framework for building APIs.',
      useCases: ['High-performance APIs', 'Microservices', 'Data Validation'],
      experience: 'Fast API development',
      url: 'https://fastapi.tiangolo.com'
    },
    'RESTful APIs': {
      title: 'RESTful APIs',
      description: 'Architectural style for designing networked applications.',
      useCases: ['Web Services', 'Mobile Backends', 'Third-party Integrations'],
      experience: '4+ years designing APIs',
      url: 'https://restfulapi.net'
    },

    // Databases
    'MongoDB': {
      title: 'MongoDB',
      description: 'NoSQL document database designed for scalability.',
      useCases: ['Content Management', 'Real-time Analytics', 'Mobile Apps'],
      experience: '3+ years in production',
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
      description: 'Structured Query Language for relational databases.',
      useCases: ['Relational Data', 'Transaction Systems', 'Data Warehousing'],
      experience: '4+ years with SQL',
      url: 'https://en.wikipedia.org/wiki/SQL'
    },

    // Machine Learning
    'Scikit-learn': {
      title: 'Scikit-learn',
      description: 'Machine learning library for predictive data analysis.',
      useCases: ['Predictive Analytics', 'Classification', 'Clustering'],
      experience: '2+ years building ML models',
      url: 'https://scikit-learn.org'
    },
    'LightFM': {
      title: 'LightFM',
      description: 'Python library for hybrid recommendation systems.',
      useCases: ['Recommendation Systems', 'Collaborative Filtering'],
      experience: 'Building recommendation engines',
      url: 'https://github.com/lyst/lightfm'
    },
    'TF-IDF': {
      title: 'TF-IDF',
      description: 'Statistical measure for word importance in documents.',
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
      description: 'AI subfield for computer-human language interaction.',
      useCases: ['Text Classification', 'Sentiment Analysis', 'Named Entity Recognition'],
      experience: 'NLP techniques for text processing',
      url: 'https://en.wikipedia.org/wiki/Natural_language_processing'
    },

    // Quantum Computing
    'IBM Qiskit': {
      title: 'IBM Qiskit',
      description: 'Open-source SDK for quantum computing algorithms.',
      useCases: ['Quantum Algorithm Development', 'Circuit Simulation'],
      experience: 'Quantum computing concepts and simulation',
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
      experience: '4+ years with Git',
      url: 'https://git-scm.com'
    },
    'Linux': {
      title: 'Linux',
      description: 'Open-source Unix-like operating system.',
      useCases: ['Server Administration', 'Development Environments'],
      experience: '4+ years with Linux',
      url: 'https://www.linux.org'
    },
    'Jupyter Notebook': {
      title: 'Jupyter Notebook',
      description: 'Web app for live code and visualizations.',
      useCases: ['Data Analysis', 'ML Prototyping'],
      experience: '3+ years with Jupyter',
      url: 'https://jupyter.org'
    },
    'VS Code': {
      title: 'VS Code',
      description: 'Free source-code editor by Microsoft.',
      useCases: ['Code Editing', 'Debugging', 'Extensions'],
      experience: '4+ years as primary editor',
      url: 'https://code.visualstudio.com'
    },
    'Postman': {
      title: 'Postman',
      description: 'API platform for building and testing.',
      useCases: ['API Testing', 'Documentation', 'Mock Servers'],
      experience: '3+ years with Postman',
      url: 'https://www.postman.com'
    }
  };

  // ONLY YOUR EXACT CATEGORIES AND SKILLS
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
        { name: 'HTML5', color: '#E34F26' },
        { name: 'CSS3', color: '#1572B6' },
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
        { name: 'LightFM', color: '#FF6B35' },
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
        { name: 'Linux', color: '#FCC624' },
        { name: 'Jupyter Notebook', color: '#F37626' },
        { name: 'VS Code', color: '#007ACC' },
        { name: 'Postman', color: '#FF6C37' }
      ]
    }
  };

  const createLayout = (): GraphNode[] => {
    const nodes: GraphNode[] = [];
    
    // Optimized center positions to prevent overlaps
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
    
    Object.entries(skillsData).forEach(([category, data]) => {
      const center = categoryCenters.find(c => c.category === category);
      if (!center) return;
      
      // Different radii based on number of skills to prevent overlap
      let radius: number;
      switch(category) {
        case 'programming': radius = 100; break;
        case 'databases': radius = 100; break;
        case 'quantum': radius = 110; break;
        case 'ml': radius = 130; break;
        case 'backend': radius = 130; break;
        case 'frontend': radius = 140; break;
        case 'tools': radius = 140; break;
        default: radius = 120;
      }
      
      const angleStep = (2 * Math.PI) / data.skills.length;
      
      data.skills.forEach((skill, index) => {
        // Add small random offset to prevent perfect alignment overlap
        const randomOffset = (Math.random() - 0.5) * 15;
        const angle = (-Math.PI / 2) + (angleStep * index) + randomOffset * 0.01;
        
        // Ensure nodes don't go out of bounds
        let x = center.x + radius * Math.cos(angle);
        let y = center.y + radius * Math.sin(angle);
        
        // Boundary checks
        x = Math.max(50, Math.min(x, 850));
        y = Math.max(50, Math.min(y, 650));
        
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
    
    // Core connections
    connections.push(
      { source: 'Python', target: 'Scikit-learn', strength: 0.9 },
      { source: 'Python', target: 'Flask', strength: 0.8 },
      { source: 'Python', target: 'FastAPI', strength: 0.8 },
      { source: 'JavaScript', target: 'React.js', strength: 0.9 },
      { source: 'JavaScript', target: 'Node.js', strength: 0.9 },
      { source: 'React.js', target: 'Vite', strength: 0.8 },
      { source: 'Node.js', target: 'Express.js', strength: 0.9 },
      { source: 'Node.js', target: 'MongoDB', strength: 0.8 }
    );
    
    // Connect skills to their category centers
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
    
    // Connect category centers
    connections.push(
      { source: 'center-programming', target: 'center-frontend', strength: 0.6 },
      { source: 'center-programming', target: 'center-backend', strength: 0.7 },
      { source: 'center-programming', target: 'center-ml', strength: 0.6 },
      { source: 'center-backend', target: 'center-databases', strength: 0.7 },
      { source: 'center-databases', target: 'center-tools', strength: 0.5 }
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
  const needsWhiteBackground = ['Express.js', 'Flask', 'Git'];

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
        {/* Fixed Header */}
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
                    // Fallback for broken images
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = '<span style="color: #000; font-weight: bold; font-size: 12px;">' + 
                      selectedNode.name.charAt(0) + '</span>';
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
        
        {/* Scrollable Body */}
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

        {/* Fixed Footer */}
        {(detail?.url) && (
          <div style={{ 
            padding: '1.25rem', 
            borderTop: `1px solid ${theme.border}`, 
            background: 'rgba(0,0,0,0.2)', 
            flexShrink: 0 
          }}>
            <button 
              onClick={() => window.open(detail.url, '_blank')} 
              style={styles.learnMoreBtn}
              onMouseEnter={(e) => e.currentTarget.style.background = '#2563eb'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#3b82f6'}
            >
              📚 Learn More
            </button>
          </div>
        )}
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
        
        {/* Render links */}
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
        
        {/* Render nodes */}
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
              
              {needsWhiteBackground.includes(node.name) && !isCenterNode && (
                <circle 
                  r={radius - 4} 
                  fill="white" 
                  opacity="0.9" 
                />
              )}
              
              <circle 
                className="node-circle" 
                r={radius} 
                fill={node.color} 
                stroke={isSelected ? 'white' : theme.border} 
                strokeWidth={isSelected ? 4 : 2} 
                filter="url(#node-glow)" 
                style={{ 
                  transition: '0.2s',
                  cursor: 'pointer'
                }} 
              />
              
              {iconUrl && (
                <image 
                  href={iconUrl} 
                  x={isCenterNode ? -18 : -14} 
                  y={isCenterNode ? -18 : -14} 
                  width={isCenterNode ? 36 : 28} 
                  height={isCenterNode ? 36 : 28} 
                  style={{ 
                    pointerEvents: 'none',
                    borderRadius: '50%'
                  }} 
                  onError={(e) => {
                    // Hide broken images
                    (e.target as SVGImageElement).style.display = 'none';
                  }}
                />
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
      padding: '80px 2rem', 
      backgroundColor: theme.bg, 
      minHeight: '100vh', 
      position: 'relative' 
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: 800, 
            color: theme.text,
            marginBottom: '1rem'
          }}>
            Technical Stack
          </h1>
          <p style={{ 
            color: theme.textSecondary,
            fontSize: '1.1rem',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Interactive visualization of my technology expertise
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem' }}>
          {/* Categories Sidebar */}
          <div style={{ 
            background: theme.cardBg, 
            borderRadius: '20px', 
            padding: '2rem', 
            border: `1px solid ${theme.border}`,
            height: 'fit-content'
          }}>
            <h3 style={{ 
              color: theme.accent, 
              fontSize: '0.9rem', 
              marginBottom: '1.5rem', 
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              CATEGORIES
            </h3>
            
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
                  background: activeCategory === key ? `${theme.accent}20` : 'transparent', 
                  color: activeCategory === key ? theme.accent : 'rgba(255,255,255,0.7)', 
                  border: 'none', 
                  textAlign: 'left', 
                  cursor: 'pointer', 
                  borderRadius: '12px', 
                  fontSize: '0.95rem', 
                  fontWeight: 600,
                  marginBottom: '10px',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderLeft: activeCategory === key ? `4px solid ${theme.accent}` : '4px solid transparent'
                }}
              >
                <span>{data.title}</span>
                <span style={{ 
                  fontSize: '0.8rem', 
                  background: 'rgba(255,255,255,0.1)', 
                  padding: '4px 10px', 
                  borderRadius: '12px',
                  minWidth: '28px',
                  textAlign: 'center'
                }}>
                  {data.skills.length}
                </span>
              </button>
            ))}
          </div>
          
          {/* Graph Visualization */}
          <div style={{ 
            background: theme.cardBg, 
            borderRadius: '20px', 
            border: `1px solid ${theme.border}`, 
            position: 'relative', 
            height: '700px', 
            overflow: 'hidden' 
          }}>
            {renderGraph()}
            <InformationPanel />
          </div>
        </div>
      </div>
      
      <style>{`
        .graph-node-group { cursor: pointer; }
        .graph-node-group:hover .node-circle { 
          transform: scale(1.15); 
          filter: brightness(1.3); 
          stroke-width: 3px;
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