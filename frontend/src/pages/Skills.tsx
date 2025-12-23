import React, { useState, useEffect, useRef } from 'react';

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
  const [activeCategory, setActiveCategory] = useState<string>('frontend');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [graphData, setGraphData] = useState<{ nodes: GraphNode[], links: GraphLink[] }>({ nodes: [], links: [] });
  const [isInitialAnimation, setIsInitialAnimation] = useState(true);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  // Professional icon URLs
  const categoryIcons: Record<string, string> = {
    'frontend': 'https://cdn-icons-png.flaticon.com/512/5968/5968292.png',
    'backend': 'https://cdn-icons-png.flaticon.com/512/1086/1086581.png',
    'databases': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    'tools': 'https://cdn-icons-png.flaticon.com/512/3248/3248193.png',
    'ai': 'https://cdn-icons-png.flaticon.com/512/2103/2103791.png'
  };

  const techIcons: Record<string, string> = {
    'React.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    'Tailwind CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
    'Redux': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
    'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    'Express.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    'FastAPI': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg',
    'REST APIs': 'https://cdn-icons-png.flaticon.com/512/2165/2165004.png',
    'GraphQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
    'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    'Neo4j': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/neo4j/neo4j-original.svg',
    'MySQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    'Firebase': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
    'GitHub': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    'VS Code': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
    'Jira': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg',
    'Figma': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    'Postman': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg',
    'OpenAI': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/openai/openai-original.svg',
    'LangChain': 'https://avatars.githubusercontent.com/u/126733545?s=200&v=4',
    'TensorFlow': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
    'PyTorch': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
    'Computer Vision': 'https://cdn-icons-png.flaticon.com/512/2103/2103791.png'
  };

  const techDetails: Record<string, TechDetail> = {
    'React.js': {
      title: 'React.js',
      description: 'A declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small, isolated pieces of code called components.',
      useCases: ['Single Page Applications (SPAs)', 'Progressive Web Apps (PWAs)', 'Complex dashboard interfaces', 'Real-time data visualization'],
      experience: '3+ years of professional experience building enterprise applications with React, including state management with Context API and Redux.',
      url: 'https://reactjs.org'
    },
    'TypeScript': {
      title: 'TypeScript',
      description: 'A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. TypeScript adds optional types to JavaScript that support tools for large-scale JavaScript applications.',
      useCases: ['Large-scale applications', 'Team collaboration projects', 'Enterprise software development', 'API type definitions'],
      experience: '2+ years of experience using TypeScript in production applications. Strong understanding of interfaces, generics, and type inference.',
      url: 'https://www.typescriptlang.org'
    },
    'Next.js': {
      title: 'Next.js',
      description: 'The React Framework for Production. Next.js gives you the best developer experience with all the features you need for production: hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more.',
      useCases: ['Server-side rendered applications', 'Static website generation', 'E-commerce platforms', 'Marketing websites'],
      experience: '2 years building SEO-optimized applications with Next.js, implementing both static generation and server-side rendering patterns.',
      url: 'https://nextjs.org'
    },
    'Node.js': {
      title: 'Node.js',
      description: 'A JavaScript runtime built on Chrome\'s V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices.',
      useCases: ['RESTful API development', 'Real-time applications', 'Microservices architecture', 'Backend for mobile apps'],
      experience: '3+ years building scalable backend services, API gateways, and microservices with Node.js and Express.',
      url: 'https://nodejs.org'
    },
    'Express.js': {
      title: 'Express.js',
      description: 'Fast, unopinionated, minimalist web framework for Node.js. Express provides a robust set of features for web and mobile applications.',
      useCases: ['REST API development', 'Web applications', 'Middleware implementation', 'Server-side rendering'],
      experience: '3+ years building RESTful APIs and web applications with Express.js.',
      url: 'https://expressjs.com'
    },
    'FastAPI': {
      title: 'FastAPI',
      description: 'Modern, fast web framework for building APIs with Python 3.7+ based on standard Python type hints.',
      useCases: ['High-performance APIs', 'Microservices', 'Real-time applications', 'Data validation'],
      experience: 'Experience building fast and efficient APIs with automatic documentation.',
      url: 'https://fastapi.tiangolo.com'
    },
    'MongoDB': {
      title: 'MongoDB',
      description: 'A source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas.',
      useCases: ['Content management systems', 'Real-time analytics', 'Mobile applications', 'Catalogs and inventories'],
      experience: '2+ years working with MongoDB in production environments, including schema design, indexing, and aggregation pipelines.',
      url: 'https://www.mongodb.com'
    },
    'Neo4j': {
      title: 'Neo4j',
      description: 'A native graph database that leverages data relationships as first-class entities, helping enterprises build intelligent applications to meet today\'s evolving data challenges.',
      useCases: ['Social networks', 'Recommendation engines', 'Fraud detection', 'Network and IT operations'],
      experience: 'Experience with graph database modeling and Cypher query language for complex relationship-based queries.',
      url: 'https://neo4j.com'
    },
    'MySQL': {
      title: 'MySQL',
      description: 'An open-source relational database management system. Its name is a combination of "My", the name of co-founder Michael Widenius\'s daughter, and "SQL", the abbreviation for Structured Query Language.',
      useCases: ['Web applications', 'E-commerce platforms', 'Data warehousing', 'Logging applications'],
      experience: '2+ years of experience with MySQL including database design, optimization, and administration.',
      url: 'https://www.mysql.com'
    },
    'Firebase': {
      title: 'Firebase',
      description: 'Backend-as-a-Service platform by Google that provides tools and infrastructure for building web and mobile applications.',
      useCases: ['Real-time databases', 'Authentication', 'Hosting', 'Cloud functions'],
      experience: 'Experience with Firebase for real-time applications and serverless backend solutions.',
      url: 'https://firebase.google.com'
    },
    'OpenAI': {
      title: 'OpenAI',
      description: 'AI research and deployment company, creator of GPT models and API. Specializing in developing advanced AI models and making them accessible through APIs.',
      useCases: ['Natural Language Processing', 'Chatbots and virtual assistants', 'Content generation', 'Code generation and assistance'],
      experience: '1+ year working with OpenAI APIs for various AI-powered applications.',
      url: 'https://openai.com'
    },
    'TensorFlow': {
      title: 'TensorFlow',
      description: 'An end-to-end open source platform for machine learning. It has a comprehensive, flexible ecosystem of tools, libraries, and community resources.',
      useCases: ['Machine Learning models', 'Neural networks', 'Computer vision applications', 'Natural language processing'],
      experience: 'Experience with building and training ML models using TensorFlow.',
      url: 'https://www.tensorflow.org'
    },
    'LangChain': {
      title: 'LangChain',
      description: 'A framework for developing applications powered by language models. It enables applications that are data-aware and agentic, allowing language models to interact with their environment.',
      useCases: ['Chatbots with memory', 'Document question answering', 'Intelligent agents', 'Workflow automation'],
      experience: 'Experience building AI-powered applications using LangChain framework.',
      url: 'https://www.langchain.com'
    },
    'PyTorch': {
      title: 'PyTorch',
      description: 'An open source machine learning framework that accelerates the path from research prototyping to production deployment.',
      useCases: ['Deep learning research', 'Computer vision', 'Natural language processing', 'Reinforcement learning'],
      experience: 'Experience with PyTorch for building and training neural networks.',
      url: 'https://pytorch.org'
    },
    'Redux': {
      title: 'Redux',
      description: 'A predictable state container for JavaScript apps. It helps you write applications that behave consistently, run in different environments, and are easy to test.',
      useCases: ['Complex state management', 'Large-scale applications', 'Time-travel debugging', 'State persistence'],
      experience: '2+ years using Redux for state management in large React applications.',
      url: 'https://redux.js.org'
    },
    'GraphQL': {
      title: 'GraphQL',
      description: 'A query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API.',
      useCases: ['Mobile applications', 'Complex data requirements', 'Microservices aggregation'],
      experience: 'Experience building GraphQL APIs with Apollo Server and Client.',
      url: 'https://graphql.org'
    },
    'Tailwind CSS': {
      title: 'Tailwind CSS',
      description: 'A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.',
      useCases: ['Rapid UI development', 'Custom design systems', 'Responsive web design', 'Prototyping'],
      experience: '2+ years using Tailwind CSS for building modern, responsive user interfaces.',
      url: 'https://tailwindcss.com'
    },
    'REST APIs': {
      title: 'REST APIs',
      description: 'Representational State Transfer API design architecture for building web services that use HTTP requests to access and use data.',
      useCases: ['Web service development', 'Mobile app backends', 'Third-party integrations', 'Microservices communication'],
      experience: '3+ years designing and implementing RESTful APIs for various applications.',
      url: 'https://restfulapi.net'
    },
    'GitHub': {
      title: 'GitHub',
      description: 'A platform for version control and collaboration that lets developers work together on projects from anywhere.',
      useCases: ['Version control', 'Collaborative development', 'Code review', 'CI/CD pipelines'],
      experience: '4+ years using GitHub for personal and professional projects.',
      url: 'https://github.com'
    },
    'VS Code': {
      title: 'VS Code',
      description: 'A free, lightweight but powerful source code editor that runs on your desktop and is available for Windows, macOS and Linux.',
      useCases: ['Code editing', 'Debugging', 'Git integration', 'Extension ecosystem'],
      experience: 'Primary code editor for all development work for 3+ years.',
      url: 'https://code.visualstudio.com'
    },
    'Jira': {
      title: 'Jira',
      description: 'A proprietary issue tracking product developed by Atlassian that allows bug tracking and agile project management.',
      useCases: ['Project management', 'Bug tracking', 'Agile development', 'Task management'],
      experience: '2+ years using Jira in professional team environments.',
      url: 'https://www.atlassian.com/software/jira'
    },
    'Figma': {
      title: 'Figma',
      description: 'A collaborative web application for interface design, with additional offline features enabled by desktop applications.',
      useCases: ['UI/UX design', 'Prototyping', 'Design systems', 'Collaborative design'],
      experience: '2+ years using Figma for design collaboration and prototyping.',
      url: 'https://www.figma.com'
    },
    'Postman': {
      title: 'Postman',
      description: 'An API platform for building and using APIs. Postman simplifies each step of the API lifecycle and streamlines collaboration.',
      useCases: ['API testing', 'API documentation', 'Mock servers', 'API monitoring'],
      experience: '3+ years using Postman for API development and testing.',
      url: 'https://www.postman.com'
    },
    'Computer Vision': {
      title: 'Computer Vision',
      description: 'A field of artificial intelligence that trains computers to interpret and understand the visual world.',
      useCases: ['Image recognition', 'Object detection', 'Facial recognition', 'Autonomous vehicles'],
      experience: 'Experience with computer vision algorithms and applications.',
      url: 'https://opencv.org'
    }
  };

  const skillsData = {
    'frontend': {
      title: 'Frontend',
      skills: [
        { name: 'React.js', color: '#61DAFB' },
        { name: 'TypeScript', color: '#3178C6' },
        { name: 'Next.js', color: '#000000' },
        { name: 'Tailwind CSS', color: '#38B2AC' },
        { name: 'Redux', color: '#764ABC' }
      ]
    },
    'backend': {
      title: 'Backend',
      skills: [
        { name: 'Node.js', color: '#339933' },
        { name: 'Express.js', color: '#000000' },
        { name: 'FastAPI', color: '#009688' },
        { name: 'REST APIs', color: '#FF6D00' },
        { name: 'GraphQL', color: '#E10098' }
      ]
    },
    'databases': {
      title: 'Databases',
      skills: [
        { name: 'MongoDB', color: '#47A248' },
        { name: 'Neo4j', color: '#008CC1' },
        { name: 'MySQL', color: '#4479A1' },
        { name: 'Firebase', color: '#FFCA28' }
      ]
    },
    'tools': {
      title: 'Tools',
      skills: [
        { name: 'GitHub', color: '#181717' },
        { name: 'VS Code', color: '#007ACC' },
        { name: 'Jira', color: '#0052CC' },
        { name: 'Figma', color: '#F24E1E' },
        { name: 'Postman', color: '#FF6C37' }
      ]
    },
    'ai': {
      title: 'AI & ML',
      skills: [
        { name: 'OpenAI', color: '#412991' },
        { name: 'LangChain', color: '#FF6B35' },
        { name: 'TensorFlow', color: '#FF6F00' },
        { name: 'PyTorch', color: '#EE4C2C' },
        { name: 'Computer Vision', color: '#3D5AFE' }
      ]
    }
  };

  const createLayout = (): GraphNode[] => {
    const nodes: GraphNode[] = [];
    const categoryCenters = [
      { id: 'center-frontend', name: 'Frontend', color: '#3b82f6', category: 'frontend', x: 300, y: 200, description: 'Technologies for building user interfaces and client-side applications.', learnMoreUrl: '#' },
      { id: 'center-backend', name: 'Backend', color: '#10b981', category: 'backend', x: 600, y: 200, description: 'Server-side technologies for building APIs, services, and application logic.', learnMoreUrl: '#' },
      { id: 'center-databases', name: 'Databases', color: '#ef4444', category: 'databases', x: 600, y: 450, description: 'Database technologies for data storage, retrieval, and management.', learnMoreUrl: '#' },
      { id: 'center-tools', name: 'Tools', color: '#8b5cf6', category: 'tools', x: 300, y: 450, description: 'Development tools for version control, collaboration, and workflow.', learnMoreUrl: '#' },
      { id: 'center-ai', name: 'AI & ML', color: '#f59e0b', category: 'ai', x: 450, y: 325, description: 'Artificial Intelligence and Machine Learning technologies.', learnMoreUrl: '#' }
    ];
    categoryCenters.forEach(center => nodes.push(center));
    Object.entries(skillsData).forEach(([category, data]) => {
      const center = categoryCenters.find(c => c.category === category);
      if (!center) return;
      const radius = 140;
      const angleStep = (2 * Math.PI) / data.skills.length;
      data.skills.forEach((skill, index) => {
        const angle = (-Math.PI / 2) + (angleStep * index);
        nodes.push({
          id: skill.name,
          name: skill.name,
          color: skill.color,
          category,
          x: center.x + radius * Math.cos(angle),
          y: center.y + radius * Math.sin(angle),
          description: techDetails[skill.name]?.description || `${skill.name} technology`,
          learnMoreUrl: techDetails[skill.name]?.url || '#'
        });
      });
    });
    return nodes;
  };

  const getTechnologyConnections = (): GraphLink[] => {
    const connections: GraphLink[] = [];
    connections.push(
      { source: 'React.js', target: 'Node.js', strength: 0.9 },
      { source: 'Next.js', target: 'Node.js', strength: 0.8 },
      { source: 'React.js', target: 'TypeScript', strength: 0.8 },
      { source: 'React.js', target: 'Redux', strength: 0.7 },
      { source: 'Node.js', target: 'MongoDB', strength: 0.8 },
      { source: 'Node.js', target: 'Neo4j', strength: 0.6 },
      { source: 'Express.js', target: 'MongoDB', strength: 0.8 },
      { source: 'FastAPI', target: 'MySQL', strength: 0.7 },
      { source: 'REST APIs', target: 'Node.js', strength: 0.9 },
      { source: 'REST APIs', target: 'Express.js', strength: 0.8 },
      { source: 'GraphQL', target: 'Node.js', strength: 0.7 },
      { source: 'OpenAI', target: 'LangChain', strength: 0.8 },
      { source: 'LangChain', target: 'OpenAI', strength: 0.8 },
      { source: 'MongoDB', target: 'Neo4j', strength: 0.5 },
      { source: 'MySQL', target: 'Node.js', strength: 0.6 },
      { source: 'GitHub', target: 'React.js', strength: 0.6 },
      { source: 'GitHub', target: 'Node.js', strength: 0.6 },
      { source: 'VS Code', target: 'TypeScript', strength: 0.7 },
      { source: 'Postman', target: 'REST APIs', strength: 0.8 }
    );
    Object.values(skillsData).forEach(categoryData => {
      categoryData.skills.forEach(skill => {
        connections.push({
          source: skill.name,
          target: `center-${categoryData.title.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`,
          strength: 0.5
        });
      });
    });
    connections.push(
      { source: 'center-frontend', target: 'center-backend', strength: 0.7 },
      { source: 'center-backend', target: 'center-databases', strength: 0.8 },
      { source: 'center-databases', target: 'center-tools', strength: 0.5 },
      { source: 'center-tools', target: 'center-frontend', strength: 0.4 },
      { source: 'center-backend', target: 'center-ai', strength: 0.6 },
      { source: 'center-frontend', target: 'center-ai', strength: 0.5 }
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
  const needsWhiteBackground = ['Next.js', 'Express.js', 'GitHub', 'VS Code', 'Jira', 'Figma', 'Postman', 'OpenAI', 'LangChain', 'TensorFlow', 'PyTorch', 'Redux', 'TypeScript'];

  // RESTORED PROFESSIONAL INFORMATION PANEL WITH FIXED FOOTER
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
          // DYNAMIC HEIGHT LOGIC:
          height: 'auto', 
          maxHeight: 'calc(100% - 3rem)', // Ensures it never leaves the graph box
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
        {/* 1. FIXED HEADER */}
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
                {isCenterNode ? 'Cluster Head' : 'Technology'}
              </span>
            </div>
          </div>
        </div>
        
        {/* 2. DYNAMIC SCROLLABLE BODY */}
        <div style={{ 
          flex: '1 1 auto', // Allows growth but respects parent constraints
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

        {/* 3. FIXED FOOTER */}
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
              📚 Documentation
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
              <text textAnchor="middle" y={radius + 18} fill="#fff" fontSize="10" style={{ pointerEvents: 'none', opacity: 0.7 }}>{isCenterNode ? node.name : node.name.split(' ')[0]}</text>
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
          <h1 style={{ fontSize: '3rem', fontWeight: 800, color: theme.text }}>Skill's Graph</h1>
          <p style={{ color: theme.textSecondary }}>Click on any node to see detailed information</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem' }}>
          <div style={{ background: theme.cardBg, borderRadius: '20px', padding: '2rem', border: `1px solid ${theme.border}` }}>
            <h3 style={{ color: theme.accent, fontSize: '0.9rem', marginBottom: '1rem' }}>CATEGORIES</h3>
            {Object.keys(skillsData).map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{ display: 'block', width: '100%', padding: '12px', background: activeCategory === cat ? `${theme.accent}20` : 'transparent', color: activeCategory === cat ? theme.accent : '#aaa', border: 'none', textAlign: 'left', cursor: 'pointer', borderRadius: '10px', fontSize: '0.9rem', fontWeight: 600 }}>{cat.toUpperCase()}</button>
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
  detailLabel: { fontSize: '0.7rem', fontWeight: 800, color: '#3b82f6', textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginBottom: '0.5rem' },
  detailText: { fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, margin: 0 },
  learnMoreBtn: { padding: '0.8rem', background: '#3b82f6', border: 'none', borderRadius: '10px', color: 'white', fontWeight: 700, cursor: 'pointer', width: '100%', transition: '0.3s' }
};

export default Skills;