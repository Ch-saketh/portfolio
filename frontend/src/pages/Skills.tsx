import React, { useState, useEffect, useRef } from 'react';
import { Theme } from '../types/theme';

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
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [graphData, setGraphData] = useState<{ nodes: GraphNode[], links: GraphLink[] }>({ nodes: [], links: [] });
  const [isInitialAnimation, setIsInitialAnimation] = useState(true);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  // Professional icon URLs - UPDATED TO MATCH RESUME
  const categoryIcons: Record<string, string> = {
    'programming': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    'frontend': 'https://cdn-icons-png.flaticon.com/512/5968/5968292.png',
    'backend': 'https://cdn-icons-png.flaticon.com/512/1086/1086581.png',
    'databases': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    'ai': 'https://cdn-icons-png.flaticon.com/512/2103/2103791.png',
    'quantum': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Qiskit-Logo.svg/1024px-Qiskit-Logo.svg.png',
    'tools': 'https://cdn-icons-png.flaticon.com/512/3248/3248193.png'
  };

  // UPDATED TO MATCH YOUR RESUME TECH STACK
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
    
    // Quantum Computing
    'IBM Qiskit': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Qiskit-Logo.svg/1024px-Qiskit-Logo.svg.png',
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

  // UPDATED TECH DETAILS TO MATCH YOUR RESUME
  const techDetails: Record<string, TechDetail> = {
    // Programming Languages
    'Python': {
      title: 'Python',
      description: 'A high-level, interpreted programming language known for its simplicity and versatility. Used extensively in AI/ML, backend development, and automation.',
      useCases: ['AI/ML Development', 'Backend Services (FastAPI, Flask)', 'Data Analysis & Automation', 'Scripting and Tooling'],
      experience: '4+ years of experience in production environments, including ML models, backend APIs, and data processing pipelines.',
      url: 'https://www.python.org'
    },
    'Java': {
      title: 'Java',
      description: 'Object-oriented programming language designed for reliability and scalability in enterprise environments. Known for platform independence and strong memory management.',
      useCases: ['Enterprise Applications', 'Android Development', 'High-concurrency Systems', 'Financial Applications'],
      experience: '3+ years building robust applications with Java, focusing on enterprise architecture and system design.',
      url: 'https://www.java.com'
    },
    'JavaScript': {
      title: 'JavaScript',
      description: 'The universal scripting language for interactive web applications and modern full-stack development. Powers both frontend and backend (Node.js) applications.',
      useCases: ['Web Applications', 'Server-side Development (Node.js)', 'Real-time Applications', 'Cross-platform Development'],
      experience: '4+ years building production applications with JavaScript across the entire stack.',
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
    },

    // Frontend
    'React.js': {
      title: 'React.js',
      description: 'A declarative, component-based JavaScript library for building modern user interfaces with a virtual DOM for optimal performance.',
      useCases: ['Single Page Applications', 'Progressive Web Apps', 'Complex Dashboards', 'Real-time Interfaces'],
      experience: '3+ years building production React applications with state management, hooks, and modern React patterns.',
      url: 'https://reactjs.org'
    },
    'Vite': {
      title: 'Vite',
      description: 'Next-generation frontend tooling that provides lightning-fast development experience with instant server start and optimized production builds.',
      useCases: ['Modern Web Development', 'Fast Refresh Development', 'Production Bundling', 'Framework-agnostic Tooling'],
      experience: '2+ years using Vite for rapid development and optimized production builds.',
      url: 'https://vitejs.dev'
    },
    'TailwindCSS': {
      title: 'TailwindCSS',
      description: 'A utility-first CSS framework that enables rapid UI development with a design system approach directly in HTML.',
      useCases: ['Rapid Prototyping', 'Design Systems', 'Responsive Web Design', 'Component Libraries'],
      experience: '2+ years building modern, responsive interfaces with TailwindCSS utility classes.',
      url: 'https://tailwindcss.com'
    },
    'HTML5': {
      title: 'HTML5',
      description: 'The latest evolution of the standard markup language for creating web pages and applications, with new semantic elements and APIs.',
      useCases: ['Web Page Structure', 'Semantic Markup', 'Web Applications', 'Cross-platform Content'],
      experience: '5+ years writing semantic, accessible HTML for production applications.',
      url: 'https://developer.mozilla.org/en-US/docs/Web/HTML'
    },
    'CSS3': {
      title: 'CSS3',
      description: 'Latest version of Cascading Style Sheets with features like flexbox, grid, animations, and responsive design capabilities.',
      useCases: ['Styling and Layout', 'Responsive Design', 'Animations and Transitions', 'Modern UI Components'],
      experience: '5+ years creating responsive, animated interfaces with modern CSS features.',
      url: 'https://developer.mozilla.org/en-US/docs/Web/CSS'
    },
    'Electron.js': {
      title: 'Electron.js',
      description: 'A framework for building cross-platform desktop applications using web technologies (HTML, CSS, JavaScript).',
      useCases: ['Desktop Applications', 'Cross-platform Tools', 'Native-feeling Web Apps', 'Development Tools'],
      experience: 'Experience building desktop applications with Electron.js for cross-platform deployment.',
      url: 'https://www.electronjs.org'
    },

    // Backend
    'Node.js': {
      title: 'Node.js',
      description: 'JavaScript runtime built on Chrome\'s V8 engine, designed for building scalable network applications with non-blocking I/O.',
      useCases: ['RESTful API Development', 'Real-time Applications', 'Microservices', 'Backend for Web/Mobile Apps'],
      experience: '3+ years building production backend services and APIs with Node.js.',
      url: 'https://nodejs.org'
    },
    'Express.js': {
      title: 'Express.js',
      description: 'Minimal and flexible Node.js web application framework that provides robust features for building web and mobile applications.',
      useCases: ['REST API Development', 'Middleware Architecture', 'Web Applications', 'Server-side Logic'],
      experience: '3+ years building RESTful APIs and web applications with Express.js middleware and routing.',
      url: 'https://expressjs.com'
    },
    'Flask': {
      title: 'Flask',
      description: 'Lightweight WSGI web application framework for Python, designed for quick prototyping and building simple to complex web applications.',
      useCases: ['Rapid Prototyping', 'REST APIs', 'Microservices', 'Web Applications'],
      experience: '2+ years building Python web applications and APIs with Flask.',
      url: 'https://flask.palletsprojects.com'
    },
    'FastAPI': {
      title: 'FastAPI',
      description: 'Modern, fast web framework for building APIs with Python 3.7+ based on standard Python type hints, with automatic OpenAPI documentation.',
      useCases: ['High-performance APIs', 'Microservices', 'Real-time Applications', 'Data Validation'],
      experience: 'Experience building fast and efficient Python APIs with automatic documentation.',
      url: 'https://fastapi.tiangolo.com'
    },
    'RESTful APIs': {
      title: 'RESTful APIs',
      description: 'Architectural style for designing networked applications using HTTP protocols and stateless operations.',
      useCases: ['Web Service Development', 'Mobile App Backends', 'Third-party Integrations', 'Microservices Communication'],
      experience: '4+ years designing and implementing RESTful APIs following best practices and industry standards.',
      url: 'https://restfulapi.net'
    },

    // Databases
    'MongoDB': {
      title: 'MongoDB',
      description: 'NoSQL document database designed for scalability and flexibility, using JSON-like documents with optional schemas.',
      useCases: ['Content Management Systems', 'Real-time Analytics', 'Mobile Applications', 'Catalogs and Inventories'],
      experience: '3+ years working with MongoDB in production, including schema design and aggregation pipelines.',
      url: 'https://www.mongodb.com'
    },
    'Neo4j': {
      title: 'Neo4j',
      description: 'Native graph database that stores and queries connected data efficiently, using the Cypher query language.',
      useCases: ['Social Networks', 'Recommendation Engines', 'Fraud Detection', 'Network Analysis'],
      experience: 'Experience with graph database modeling and complex relationship-based queries.',
      url: 'https://neo4j.com'
    },
    'SQL': {
      title: 'SQL',
      description: 'Structured Query Language for managing and manipulating relational databases, with various implementations like PostgreSQL, MySQL.',
      useCases: ['Relational Data Management', 'Transaction Systems', 'Data Warehousing', 'Complex Queries'],
      experience: '4+ years working with SQL databases including schema design, optimization, and complex queries.',
      url: 'https://en.wikipedia.org/wiki/SQL'
    },

    // Machine Learning
    'Scikit-learn': {
      title: 'Scikit-learn',
      description: 'Machine learning library for Python featuring simple and efficient tools for predictive data analysis and ML model building.',
      useCases: ['Predictive Analytics', 'Classification & Regression', 'Clustering', 'Model Evaluation'],
      experience: '2+ years building ML models with scikit-learn for various predictive tasks.',
      url: 'https://scikit-learn.org'
    },
    'LightFM': {
      title: 'LightFM',
      description: 'Python library for hybrid recommendation systems that can incorporate both user and item metadata into recommendations.',
      useCases: ['Recommendation Systems', 'Collaborative Filtering', 'Content-based Filtering', 'Hybrid Recommenders'],
      experience: 'Experience building recommendation engines with LightFM for personalized content delivery.',
      url: 'https://github.com/lyst/lightfm'
    },
    'TF-IDF': {
      title: 'TF-IDF',
      description: 'Term Frequency-Inverse Document Frequency, a numerical statistic that reflects how important a word is to a document in a collection.',
      useCases: ['Text Mining', 'Information Retrieval', 'Document Classification', 'Search Engine Relevance'],
      experience: 'Experience implementing TF-IDF for text analysis and document similarity calculations.',
      url: 'https://en.wikipedia.org/wiki/Tf%E2%80%93idf'
    },
    'Cosine Similarity': {
      title: 'Cosine Similarity',
      description: 'A measure of similarity between two non-zero vectors in an inner product space, commonly used in text analysis and recommendation systems.',
      useCases: ['Document Similarity', 'Recommendation Systems', 'Clustering Algorithms', 'Pattern Recognition'],
      experience: 'Experience implementing cosine similarity for various ML applications including recommendations.',
      url: 'https://en.wikipedia.org/wiki/Cosine_similarity'
    },
    'NLP': {
      title: 'NLP',
      description: 'Natural Language Processing, a subfield of AI that focuses on interaction between computers and human language.',
      useCases: ['Text Classification', 'Sentiment Analysis', 'Named Entity Recognition', 'Language Translation'],
      experience: 'Experience with NLP techniques for text processing and analysis.',
      url: 'https://en.wikipedia.org/wiki/Natural_language_processing'
    },

    // Quantum Computing
    'IBM Qiskit': {
      title: 'IBM Qiskit',
      description: 'Open-source SDK for working with quantum computers at the level of circuits, pulses, and algorithms.',
      useCases: ['Quantum Algorithm Development', 'Circuit Simulation', 'Quantum Research', 'Quantum State Preparation'],
      experience: 'Experience with quantum computing concepts and Qiskit for quantum algorithm simulation.',
      url: 'https://qiskit.org'
    },
    'Quantum Key Distribution': {
      title: 'Quantum Key Distribution',
      description: 'Secure communication method that uses quantum mechanics to ensure cryptographic key distribution security.',
      useCases: ['Secure Communication', 'Cryptographic Protocols', 'Quantum Cryptography', 'Network Security'],
      experience: 'Knowledge of quantum cryptography principles and QKD protocols.',
      url: 'https://en.wikipedia.org/wiki/Quantum_key_distribution'
    },
    'BB84 Protocol': {
      title: 'BB84 Protocol',
      description: 'The first quantum cryptography protocol developed by Bennett and Brassard in 1984, using photon polarization states.',
      useCases: ['Quantum Cryptography', 'Secure Key Exchange', 'Quantum Network Security', 'Research Applications'],
      experience: 'Understanding of quantum cryptographic protocols and their implementations.',
      url: 'https://en.wikipedia.org/wiki/BB84'
    },
    'Kyber': {
      title: 'Kyber',
      description: 'Post-quantum cryptographic algorithm selected by NIST for standardization, based on lattice-based cryptography.',
      useCases: ['Post-Quantum Cryptography', 'Secure Communication', 'Key Exchange Protocols', 'Future-proof Security'],
      experience: 'Knowledge of post-quantum cryptographic algorithms and their importance.',
      url: 'https://pq-crystals.org/kyber/'
    },

    // Tools
    'Git': {
      title: 'Git',
      description: 'Distributed version control system for tracking changes in source code during software development.',
      useCases: ['Version Control', 'Collaborative Development', 'Branch Management', 'Code Review Workflows'],
      experience: '4+ years using Git for version control in individual and team projects.',
      url: 'https://git-scm.com'
    },
    'Linux': {
      title: 'Linux',
      description: 'Open-source Unix-like operating system based on the Linux kernel, widely used in servers and development environments.',
      useCases: ['Server Administration', 'Development Environments', 'Containerization', 'System Scripting'],
      experience: '4+ years using Linux for development, server management, and system administration.',
      url: 'https://www.linux.org'
    },
    'Jupyter Notebook': {
      title: 'Jupyter Notebook',
      description: 'Open-source web application that allows creation and sharing of documents containing live code, equations, and visualizations.',
      useCases: ['Data Analysis', 'Machine Learning Prototyping', 'Interactive Computing', 'Research Documentation'],
      experience: '3+ years using Jupyter for data science, ML prototyping, and research documentation.',
      url: 'https://jupyter.org'
    },
    'VS Code': {
      title: 'VS Code',
      description: 'Free source-code editor made by Microsoft with support for debugging, Git control, syntax highlighting, and extensions.',
      useCases: ['Code Editing', 'Debugging', 'Version Control Integration', 'Extension Ecosystem'],
      experience: 'Primary code editor for 4+ years across all development work.',
      url: 'https://code.visualstudio.com'
    },
    'Postman': {
      title: 'Postman',
      description: 'API platform for building and testing APIs, with features for API documentation, testing, and monitoring.',
      useCases: ['API Testing', 'API Documentation', 'Mock Servers', 'Automated Testing'],
      experience: '3+ years using Postman for API development, testing, and documentation.',
      url: 'https://www.postman.com'
    }
  };

  // UPDATED TO MATCH YOUR RESUME STRUCTURE
  type SkillCategory = 'programming' | 'frontend' | 'backend' | 'databases' | 'ai' | 'tools';
  const skillsData: Record<SkillCategory, { title: string; color: string; skills: string[] }> = {
    programming: { title: 'Languages', color: '#007AFF', skills: ['Python', 'Java', 'JavaScript', 'C'] },
    frontend: { title: 'Frontend', color: '#5856D6', skills: ['React.js', 'Vite', 'TailwindCSS'] },
    backend: { title: 'Backend', color: '#34C759', skills: ['Node.js', 'Express.js', 'FastAPI', 'Flask'] },
    databases: { title: 'Databases', color: '#FF3B30', skills: ['MongoDB', 'Neo4j', 'PostgreSQL', 'Supabase'] },
    ai: { title: 'AI & Quantum', color: '#FF9500', skills: ['Scikit-learn', 'IBM Qiskit'] },
    tools: { title: 'Tools', color: '#AF52DE', skills: ['Git', 'Linux', 'VS Code', 'Postman'] }
  };

  const createLayout = (): GraphNode[] => {
    const nodes: GraphNode[] = [];
    
    // Center positions for each category
    const categoryCenters = [
      { id: 'center-programming', name: 'Programming', color: '#3b82f6', category: 'programming', x: 450, y: 150, description: 'Core programming languages and fundamentals.' },
      { id: 'center-frontend', name: 'Frontend', color: '#8b5cf6', category: 'frontend', x: 200, y: 250, description: 'Technologies for building user interfaces and client-side applications.' },
      { id: 'center-backend', name: 'Backend', color: '#10b981', category: 'backend', x: 700, y: 250, description: 'Server-side technologies for building APIs and application logic.' },
      { id: 'center-databases', name: 'Databases', color: '#ef4444', category: 'databases', x: 700, y: 450, description: 'Database technologies for data storage and management.' },
      { id: 'center-tools', name: 'Tools', color: '#f59e0b', category: 'tools', x: 200, y: 450, description: 'Development tools and environments.' },
      { id: 'center-ai', name: 'Machine Learning', color: '#ec4899', category: 'ai', x: 350, y: 350, description: 'AI and Machine Learning technologies.' },
      { id: 'center-quantum', name: 'Quantum Computing', color: '#06b6d4', category: 'quantum', x: 550, y: 350, description: 'Quantum computing frameworks and protocols.' }
    ];
    
    categoryCenters.forEach(center => nodes.push(center));
    
    Object.entries(skillsData).forEach(([category, data]) => {
      const center = categoryCenters.find(c => c.category === category);
      if (!center) return;
      
      const radius = category === 'programming' || category === 'databases' ? 120 : 140;
      const angleStep = (2 * Math.PI) / data.skills.length;
      
      data.skills.forEach((skill, index) => {
        const angle = (-Math.PI / 2) + (angleStep * index);
        nodes.push({
          id: skill,
          name: skill,
          color: data.color,
          category,
          x: center.x + radius * Math.cos(angle),
          y: center.y + radius * Math.sin(angle),
          description: techDetails[skill]?.description || `${skill} technology`,
          learnMoreUrl: techDetails[skill]?.url || '#'
        });
      });
    });
    
    return nodes;
  };

  const getTechnologyConnections = (): GraphLink[] => {
    const connections: GraphLink[] = [];
    
    // Programming language connections
    connections.push(
      { source: 'Python', target: 'Scikit-learn', strength: 0.9 },
      { source: 'Python', target: 'Flask', strength: 0.8 },
      { source: 'Python', target: 'FastAPI', strength: 0.8 },
      { source: 'Python', target: 'Jupyter Notebook', strength: 0.7 },
      { source: 'JavaScript', target: 'React.js', strength: 0.9 },
      { source: 'JavaScript', target: 'Node.js', strength: 0.9 },
      { source: 'JavaScript', target: 'Vite', strength: 0.7 },
      { source: 'Java', target: 'Spring Boot', strength: 0.8 }
    );
    
    // Frontend connections
    connections.push(
      { source: 'React.js', target: 'Vite', strength: 0.8 },
      { source: 'React.js', target: 'TailwindCSS', strength: 0.7 },
      { source: 'React.js', target: 'HTML5', strength: 0.8 },
      { source: 'React.js', target: 'CSS3', strength: 0.8 },
      { source: 'HTML5', target: 'CSS3', strength: 0.9 }
    );
    
    // Backend connections
    connections.push(
      { source: 'Node.js', target: 'Express.js', strength: 0.9 },
      { source: 'Node.js', target: 'RESTful APIs', strength: 0.8 },
      { source: 'Python', target: 'Flask', strength: 0.8 },
      { source: 'Python', target: 'FastAPI', strength: 0.8 }
    );
    
    // Database connections
    connections.push(
      { source: 'Node.js', target: 'MongoDB', strength: 0.8 },
      { source: 'Python', target: 'MongoDB', strength: 0.7 },
      { source: 'Python', target: 'SQL', strength: 0.7 },
      { source: 'Express.js', target: 'MongoDB', strength: 0.8 }
    );
    
    // ML connections
    connections.push(
      { source: 'Python', target: 'Scikit-learn', strength: 0.9 },
      { source: 'Scikit-learn', target: 'TF-IDF', strength: 0.7 },
      { source: 'Scikit-learn', target: 'Cosine Similarity', strength: 0.7 },
      { source: 'TF-IDF', target: 'NLP', strength: 0.8 },
      { source: 'LightFM', target: 'Cosine Similarity', strength: 0.7 }
    );
    
    // Tool connections
    connections.push(
      { source: 'Git', target: 'VS Code', strength: 0.8 },
      { source: 'VS Code', target: 'Python', strength: 0.7 },
      { source: 'VS Code', target: 'JavaScript', strength: 0.7 },
      { source: 'Postman', target: 'RESTful APIs', strength: 0.8 },
      { source: 'Jupyter Notebook', target: 'Python', strength: 0.8 }
    );
    
    // Connect skills to their category centers
    Object.values(skillsData).forEach(categoryData => {
      categoryData.skills.forEach(skill => {
        connections.push({
          source: skill,
          target: `center-${categoryData.title.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`,
          strength: 0.5
        });
      });
    });
    
    // Connect category centers
    connections.push(
      { source: 'center-programming', target: 'center-frontend', strength: 0.7 },
      { source: 'center-programming', target: 'center-backend', strength: 0.8 },
      { source: 'center-programming', target: 'center-ai', strength: 0.6 },
      { source: 'center-frontend', target: 'center-backend', strength: 0.6 },
      { source: 'center-backend', target: 'center-databases', strength: 0.8 },
      { source: 'center-databases', target: 'center-tools', strength: 0.5 },
      { source: 'center-tools', target: 'center-frontend', strength: 0.5 },
      { source: 'center-ai', target: 'center-quantum', strength: 0.4 },
      { source: 'center-programming', target: 'center-tools', strength: 0.6 }
    );
    
    return connections;
  };

  useEffect(() => {
    setGraphData({ nodes: createLayout(), links: getTechnologyConnections() });
    const timer = setTimeout(() => setIsInitialAnimation(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleNodeClick = (nodeId: string) => { setSelectedSkill(nodeId); setShowInfo(true); };
  const handleMouseEnter = (nodeId: string) => { setHoveredSkill(nodeId); };
  const handleMouseLeave = () => { setHoveredSkill(null); };
  const closeInfoPanel = () => { setShowInfo(false); setSelectedSkill(null); };

  const getConnectedNodes = (nodeId: string): string[] => {
    const connections = graphData.links.filter(link => link.source === nodeId || link.target === nodeId);
    const connectedNodes = new Set<string>();
    connections.forEach(link => {
      if (link.source === nodeId) connectedNodes.add(link.target);
      if (link.target === nodeId) connectedNodes.add(link.source);
    });
    return Array.from(connectedNodes);
  };

  const filteredNodes = graphData.nodes.filter(node => node.id.startsWith('center-') || node.category === activeCategory);
  const filteredLinks = graphData.links.filter(link => {
    const sourceNode = graphData.nodes.find(n => n.id === link.source);
    const targetNode = graphData.nodes.find(n => n.id === link.target);
    return sourceNode?.category === activeCategory || targetNode?.category === activeCategory || sourceNode?.id.startsWith('center-') || targetNode?.id.startsWith('center-');
  });

  const selectedNode = selectedSkill ? graphData.nodes.find(n => n.id === selectedSkill) : null;
  const connectedNodes = selectedSkill ? getConnectedNodes(selectedSkill) : [];
  const needsWhiteBackground = ['Python', 'Java', 'JavaScript', 'React.js', 'Node.js', 'Express.js', 'Flask', 'FastAPI', 'MongoDB', 'Neo4j', 'SQL', 'Scikit-learn', 'LightFM', 'IBM Qiskit', 'Git', 'Linux', 'VS Code', 'Postman'];

  // Information Panel Component
  const InformationPanel = () => {
    if (!selectedSkill || !showInfo || !selectedNode) return null;

    const isCenterNode = selectedNode.id.startsWith('center-');
    const detail = techDetails[selectedSkill];

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
              position: 'absolute', top: '1rem', right: '1.2rem',
              background: 'rgba(255,255,255,0.05)', border: 'none',
              color: '#fff', cursor: 'pointer', width: '32px', height: '32px', borderRadius: '50%'
            }}
          >✕</button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ 
              width: '48px', height: '48px', borderRadius: '12px', 
              background: isCenterNode ? selectedNode.color : 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px'
            }}>
              <img 
                src={isCenterNode ? categoryIcons[selectedNode.category] : techIcons[selectedNode.name]} 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                alt="" 
              />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: theme.text, margin: 0 }}>{selectedNode.name}</h3>
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
              <ul style={{ paddingLeft: '1.2rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
                {detail.useCases.map((u, i) => <li key={i}>{u}</li>)}
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
        {(detail?.url || selectedNode.learnMoreUrl) && (
          <div style={{ 
            padding: '1.25rem', 
            borderTop: `1px solid ${theme.border}`, 
            background: 'rgba(0,0,0,0.2)', 
            flexShrink: 0 
          }}>
            <button 
              onClick={() => window.open(detail?.url || selectedNode!.learnMoreUrl, '_blank')} 
              style={styles.learnMoreBtn}
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
      <svg width="100%" height="100%" viewBox="0 0 900 700" style={{ background: `radial-gradient(circle at center, ${theme.cardBg}80 0%, ${theme.bg} 100%)`, borderRadius: '12px', overflow: 'visible' }}>
        <defs>
          <filter id="node-glow"><feGaussianBlur in="SourceGraphic" stdDeviation="2" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <filter id="selected-glow"><feGaussianBlur in="SourceGraphic" stdDeviation="4" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        {filteredLinks.map((link, index) => {
          const sourceNode = filteredNodes.find(n => n.id === link.source);
          const targetNode = filteredNodes.find(n => n.id === link.target);
          if (!sourceNode || !targetNode) return null;
          const isSelectedLink = selectedSkill && (selectedSkill === link.source || selectedSkill === link.target);
          return (
            <line key={`${link.source}-${link.target}-${index}`} x1={sourceNode.x} y1={sourceNode.y} x2={targetNode.x} y2={targetNode.y} stroke={isSelectedLink ? theme.accent : `${theme.accent}20`} strokeWidth={isSelectedLink ? 4 : link.strength * 2} opacity={isSelectedLink ? 0.9 : 0.3} style={{ transition: '0.3s' }} />
          );
        })}
        {filteredNodes.map((node) => {
          const isCenterNode = node.id.startsWith('center-');
          const isSelected = selectedSkill === node.id;
          const radius = isCenterNode ? 40 : 22;
          return (
            <g key={node.id} className="graph-node-group" transform={`translate(${node.x}, ${node.y})`} onClick={() => handleNodeClick(node.id)}>
              {isSelected && (<circle r={radius + 15} fill={node.color} opacity="0.2" filter="url(#selected-glow)" />)}
              {needsWhiteBackground.includes(node.name) && !isCenterNode && (<circle r={radius - 4} fill="white" opacity="0.9" />)}
              <circle className="node-circle" r={radius} fill={node.color} stroke={isSelected ? 'white' : theme.border} strokeWidth={isSelected ? 4 : 2} filter="url(#node-glow)" style={{ transition: '0.2s' }} />
              {!isCenterNode && techIcons[node.name] && (<image href={techIcons[node.name]} x="-14" y="-14" width="28" height="28" style={{ pointerEvents: 'none' }} />)}
              {isCenterNode && categoryIcons[node.category] && (<image href={categoryIcons[node.category]} x="-18" y="-18" width="36" height="36" style={{ pointerEvents: 'none' }} />)}
              <text textAnchor="middle" y={radius + 18} fill="#fff" fontSize="10" style={{ pointerEvents: 'none', opacity: 0.7 }}>
                {isCenterNode ? node.name : node.name.length > 12 ? node.name.substring(0, 10) + '...' : node.name}
              </text>
              {isSelected && (<circle r={radius + 6} fill="transparent" stroke={theme.accent} strokeWidth="2" strokeDasharray="5,5" opacity="0.8" style={{ animation: 'rotate 6s linear infinite' }} />)}
            </g>
          );
        })}
      </svg>
    );
  };

  return (
    <section id="skills" style={{ padding: '80px 2rem', backgroundColor: theme.bg, minHeight: '100vh', position: 'relative' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, color: theme.text }}>Technical Stack</h1>
          <p style={{ color: theme.textSecondary }}>Click on any node to see detailed information</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem' }}>
          <div style={{ background: theme.cardBg, borderRadius: '20px', padding: '2rem', border: `1px solid ${theme.border}` }}>
            <h3 style={{ color: theme.accent, fontSize: '0.9rem', marginBottom: '1rem', textTransform: 'uppercase' }}>CATEGORIES</h3>
            {Object.entries(skillsData).map(([key, data]) => (
              <button 
                key={key} 
                onClick={() => setActiveCategory(key)} 
                style={{ 
                  display: 'flex', 
                  width: '100%', 
                  padding: '12px 16px', 
                  background: activeCategory === key ? `${theme.accent}20` : 'transparent', 
                  color: activeCategory === key ? theme.accent : '#aaa', 
                  border: 'none', 
                  textAlign: 'left', 
                  cursor: 'pointer', 
                  borderRadius: '10px', 
                  fontSize: '0.9rem', 
                  fontWeight: 600,
                  marginBottom: '8px',
                  transition: 'all 0.3s ease',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>{data.title}</span>
                <span style={{ 
                  fontSize: '0.8rem', 
                  background: 'rgba(255,255,255,0.1)', 
                  padding: '2px 8px', 
                  borderRadius: '12px' 
                }}>
                  {data.skills.length}
                </span>
              </button>
            ))}
          </div>
          <div style={{ background: theme.cardBg, borderRadius: '20px', border: `1px solid ${theme.border}`, position: 'relative', height: '700px', overflow: 'hidden' }}>
            {renderGraph()}
            <InformationPanel />
          </div>
        </div>
      </div>
      <style>{`
        .graph-node-group { cursor: pointer; }
        .graph-node-group:hover .node-circle { transform: scale(1.1); filter: brightness(1.2); }
        @keyframes fadeInPanel { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
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
    transition: '0.3s',
    '&:hover': {
      background: '#2563eb'
    }
  }
};

export default Skills;

