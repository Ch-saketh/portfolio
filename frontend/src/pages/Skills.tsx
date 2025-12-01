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

  // Technology icon URLs - FIXED VERSIONS
  const techIcons: Record<string, string> = {
    // Frontend Icons
    'React.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    'Tailwind CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
    'Redux': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
    
    // Backend Icons
    'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    'Express.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    'FastAPI': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg',
    'REST APIs': 'https://cdn-icons-png.flaticon.com/512/2165/2165004.png',
    'GraphQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
    
    // Database Icons
    'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    'Neo4j': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/neo4j/neo4j-original.svg',
    'MySQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    'Firebase': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
    
    // Tools Icons
    'GitHub': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    'VS Code': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
    'Jira': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg',
    'Figma': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    'Postman': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg',
    
    // AI Icons
    'OpenAI': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/openai/openai-original.svg',
    'LangChain': 'https://avatars.githubusercontent.com/u/126733545?s=200&v=4',
    'TensorFlow': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
    'PyTorch': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
    'Computer Vision': 'https://cdn-icons-png.flaticon.com/512/2103/2103791.png'
  };

  // Detailed technology information - COMPLETE WITH ALL TECHNOLOGIES
  const techDetails: Record<string, TechDetail> = {
    'React.js': {
      title: 'React.js',
      description: 'A declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small, isolated pieces of code called components.',
      useCases: [
        'Single Page Applications (SPAs)',
        'Progressive Web Apps (PWAs)',
        'Complex dashboard interfaces',
        'Real-time data visualization'
      ],
      experience: '3+ years of professional experience building enterprise applications with React, including state management with Context API and Redux.',
      url: 'https://reactjs.org'
    },
    'TypeScript': {
      title: 'TypeScript',
      description: 'A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. TypeScript adds optional types to JavaScript that support tools for large-scale JavaScript applications.',
      useCases: [
        'Large-scale applications',
        'Team collaboration projects',
        'Enterprise software development',
        'API type definitions'
      ],
      experience: '2+ years of experience using TypeScript in production applications. Strong understanding of interfaces, generics, and type inference.',
      url: 'https://www.typescriptlang.org'
    },
    'Next.js': {
      title: 'Next.js',
      description: 'The React Framework for Production. Next.js gives you the best developer experience with all the features you need for production: hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more.',
      useCases: [
        'Server-side rendered applications',
        'Static website generation',
        'E-commerce platforms',
        'Marketing websites'
      ],
      experience: '2 years building SEO-optimized applications with Next.js, implementing both static generation and server-side rendering patterns.',
      url: 'https://nextjs.org'
    },
    'Node.js': {
      title: 'Node.js',
      description: 'A JavaScript runtime built on Chrome\'s V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices.',
      useCases: [
        'RESTful API development',
        'Real-time applications',
        'Microservices architecture',
        'Backend for mobile apps'
      ],
      experience: '3+ years building scalable backend services, API gateways, and microservices with Node.js and Express.',
      url: 'https://nodejs.org'
    },
    'Express.js': {
      title: 'Express.js',
      description: 'Fast, unopinionated, minimalist web framework for Node.js. Express provides a robust set of features for web and mobile applications.',
      useCases: [
        'REST API development',
        'Web applications',
        'Middleware implementation',
        'Server-side rendering'
      ],
      experience: '3+ years building RESTful APIs and web applications with Express.js.',
      url: 'https://expressjs.com'
    },
    'FastAPI': {
      title: 'FastAPI',
      description: 'Modern, fast web framework for building APIs with Python 3.7+ based on standard Python type hints.',
      useCases: [
        'High-performance APIs',
        'Microservices',
        'Real-time applications',
        'Data validation'
      ],
      experience: 'Experience building fast and efficient APIs with automatic documentation.',
      url: 'https://fastapi.tiangolo.com'
    },
    'MongoDB': {
      title: 'MongoDB',
      description: 'A source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas.',
      useCases: [
        'Content management systems',
        'Real-time analytics',
        'Mobile applications',
        'Catalogs and inventories'
      ],
      experience: '2+ years working with MongoDB in production environments, including schema design, indexing, and aggregation pipelines.',
      url: 'https://www.mongodb.com'
    },
    'Neo4j': {
      title: 'Neo4j',
      description: 'A native graph database that leverages data relationships as first-class entities, helping enterprises build intelligent applications to meet today\'s evolving data challenges.',
      useCases: [
        'Social networks',
        'Recommendation engines',
        'Fraud detection',
        'Network and IT operations'
      ],
      experience: 'Experience with graph database modeling and Cypher query language for complex relationship-based queries.',
      url: 'https://neo4j.com'
    },
    'MySQL': {
      title: 'MySQL',
      description: 'An open-source relational database management system. Its name is a combination of "My", the name of co-founder Michael Widenius\'s daughter, and "SQL", the abbreviation for Structured Query Language.',
      useCases: [
        'Web applications',
        'E-commerce platforms',
        'Data warehousing',
        'Logging applications'
      ],
      experience: '2+ years of experience with MySQL including database design, optimization, and administration.',
      url: 'https://www.mysql.com'
    },
    'Firebase': {
      title: 'Firebase',
      description: 'Backend-as-a-Service platform by Google that provides tools and infrastructure for building web and mobile applications.',
      useCases: [
        'Real-time databases',
        'Authentication',
        'Hosting',
        'Cloud functions'
      ],
      experience: 'Experience with Firebase for real-time applications and serverless backend solutions.',
      url: 'https://firebase.google.com'
    },
    'OpenAI': {
      title: 'OpenAI',
      description: 'AI research and deployment company, creator of GPT models and API. Specializing in developing advanced AI models and making them accessible through APIs.',
      useCases: [
        'Natural Language Processing',
        'Chatbots and virtual assistants',
        'Content generation',
        'Code generation and assistance'
      ],
      experience: '1+ year working with OpenAI APIs for various AI-powered applications.',
      url: 'https://openai.com'
    },
    'TensorFlow': {
      title: 'TensorFlow',
      description: 'An end-to-end open source platform for machine learning. It has a comprehensive, flexible ecosystem of tools, libraries, and community resources.',
      useCases: [
        'Machine Learning models',
        'Neural networks',
        'Computer vision applications',
        'Natural language processing'
      ],
      experience: 'Experience with building and training ML models using TensorFlow.',
      url: 'https://www.tensorflow.org'
    },
    'LangChain': {
      title: 'LangChain',
      description: 'A framework for developing applications powered by language models. It enables applications that are data-aware and agentic, allowing language models to interact with their environment.',
      useCases: [
        'Chatbots with memory',
        'Document question answering',
        'Intelligent agents',
        'Workflow automation'
      ],
      experience: 'Experience building AI-powered applications using LangChain framework.',
      url: 'https://www.langchain.com'
    },
    'PyTorch': {
      title: 'PyTorch',
      description: 'An open source machine learning framework that accelerates the path from research prototyping to production deployment.',
      useCases: [
        'Deep learning research',
        'Computer vision',
        'Natural language processing',
        'Reinforcement learning'
      ],
      experience: 'Experience with PyTorch for building and training neural networks.',
      url: 'https://pytorch.org'
    },
    'Redux': {
      title: 'Redux',
      description: 'A predictable state container for JavaScript apps. It helps you write applications that behave consistently, run in different environments, and are easy to test.',
      useCases: [
        'Complex state management',
        'Large-scale applications',
        'Time-travel debugging',
        'State persistence'
      ],
      experience: '2+ years using Redux for state management in large React applications.',
      url: 'https://redux.js.org'
    },
    'GraphQL': {
      title: 'GraphQL',
      description: 'A query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API.',
      useCases: [
        'Mobile applications',
        'Complex data requirements',
        'Microservices aggregation'
      ],
      experience: 'Experience building GraphQL APIs with Apollo Server and Client.',
      url: 'https://graphql.org'
    },
    'Tailwind CSS': {
      title: 'Tailwind CSS',
      description: 'A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.',
      useCases: [
        'Rapid UI development',
        'Custom design systems',
        'Responsive web design',
        'Prototyping'
      ],
      experience: '2+ years using Tailwind CSS for building modern, responsive user interfaces.',
      url: 'https://tailwindcss.com'
    },
    'REST APIs': {
      title: 'REST APIs',
      description: 'Representational State Transfer API design architecture for building web services that use HTTP requests to access and use data.',
      useCases: [
        'Web service development',
        'Mobile app backends',
        'Third-party integrations',
        'Microservices communication'
      ],
      experience: '3+ years designing and implementing RESTful APIs for various applications.',
      url: 'https://restfulapi.net'
    },
    'GitHub': {
      title: 'GitHub',
      description: 'A platform for version control and collaboration that lets developers work together on projects from anywhere.',
      useCases: [
        'Version control',
        'Collaborative development',
        'Code review',
        'CI/CD pipelines'
      ],
      experience: '4+ years using GitHub for personal and professional projects.',
      url: 'https://github.com'
    },
    'VS Code': {
      title: 'VS Code',
      description: 'A free, lightweight but powerful source code editor that runs on your desktop and is available for Windows, macOS and Linux.',
      useCases: [
        'Code editing',
        'Debugging',
        'Git integration',
        'Extension ecosystem'
      ],
      experience: 'Primary code editor for all development work for 3+ years.',
      url: 'https://code.visualstudio.com'
    },
    'Jira': {
      title: 'Jira',
      description: 'A proprietary issue tracking product developed by Atlassian that allows bug tracking and agile project management.',
      useCases: [
        'Project management',
        'Bug tracking',
        'Agile development',
        'Task management'
      ],
      experience: '2+ years using Jira in professional team environments.',
      url: 'https://www.atlassian.com/software/jira'
    },
    'Figma': {
      title: 'Figma',
      description: 'A collaborative web application for interface design, with additional offline features enabled by desktop applications.',
      useCases: [
        'UI/UX design',
        'Prototyping',
        'Design systems',
        'Collaborative design'
      ],
      experience: '2+ years using Figma for design collaboration and prototyping.',
      url: 'https://www.figma.com'
    },
    'Postman': {
      title: 'Postman',
      description: 'An API platform for building and using APIs. Postman simplifies each step of the API lifecycle and streamlines collaboration.',
      useCases: [
        'API testing',
        'API documentation',
        'Mock servers',
        'API monitoring'
      ],
      experience: '3+ years using Postman for API development and testing.',
      url: 'https://www.postman.com'
    },
    'Computer Vision': {
      title: 'Computer Vision',
      description: 'A field of artificial intelligence that trains computers to interpret and understand the visual world.',
      useCases: [
        'Image recognition',
        'Object detection',
        'Facial recognition',
        'Autonomous vehicles'
      ],
      experience: 'Experience with computer vision algorithms and applications.',
      url: 'https://opencv.org'
    }
  };

  // Skills data
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

  // Create node positions
  const createLayout = (): GraphNode[] => {
    const nodes: GraphNode[] = [];
    
    // Category center positions with proper descriptions
    const categoryCenters = [
      { 
        id: 'center-frontend', 
        name: 'Frontend', 
        color: '#3b82f6', 
        category: 'frontend', 
        x: 300, y: 200,
        description: 'Technologies for building user interfaces and client-side applications.',
        learnMoreUrl: '#'
      },
      { 
        id: 'center-backend', 
        name: 'Backend', 
        color: '#10b981', 
        category: 'backend', 
        x: 600, y: 200,
        description: 'Server-side technologies for building APIs, services, and application logic.',
        learnMoreUrl: '#'
      },
      { 
        id: 'center-databases', 
        name: 'Databases', 
        color: '#ef4444', 
        category: 'databases', 
        x: 600, y: 450,
        description: 'Database technologies for data storage, retrieval, and management.',
        learnMoreUrl: '#'
      },
      { 
        id: 'center-tools', 
        name: 'Tools', 
        color: '#8b5cf6', 
        category: 'tools', 
        x: 300, y: 450,
        description: 'Development tools for version control, collaboration, and workflow.',
        learnMoreUrl: '#'
      },
      { 
        id: 'center-ai', 
        name: 'AI & ML', 
        color: '#f59e0b', 
        category: 'ai', 
        x: 450, y: 325,
        description: 'Artificial Intelligence and Machine Learning technologies.',
        learnMoreUrl: '#'
      }
    ];

    // Add category centers
    categoryCenters.forEach(center => {
      nodes.push(center);
    });

    // Add technology nodes around their category centers
    Object.entries(skillsData).forEach(([category, data]) => {
      const center = categoryCenters.find(c => c.category === category);
      if (!center) return;

      const radius = 140;
      const angleStep = (2 * Math.PI) / data.skills.length;
      const startAngle = -Math.PI / 2;
      
      data.skills.forEach((skill, index) => {
        const angle = startAngle + (angleStep * index);
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

  // Define connections
  const getTechnologyConnections = (): GraphLink[] => {
    const connections: GraphLink[] = [];
    
    // Core connections
    connections.push(
      // Frontend-Backend
      { source: 'React.js', target: 'Node.js', strength: 0.9 },
      { source: 'Next.js', target: 'Node.js', strength: 0.8 },
      { source: 'React.js', target: 'TypeScript', strength: 0.8 },
      { source: 'React.js', target: 'Redux', strength: 0.7 },
      
      // Backend-Database
      { source: 'Node.js', target: 'MongoDB', strength: 0.8 },
      { source: 'Node.js', target: 'Neo4j', strength: 0.6 },
      { source: 'Express.js', target: 'MongoDB', strength: 0.8 },
      { source: 'FastAPI', target: 'MySQL', strength: 0.7 },
      
      // API connections
      { source: 'REST APIs', target: 'Node.js', strength: 0.9 },
      { source: 'REST APIs', target: 'Express.js', strength: 0.8 },
      { source: 'GraphQL', target: 'Node.js', strength: 0.7 },
      
      // AI connections
      { source: 'OpenAI', target: 'LangChain', strength: 0.8 },
      { source: 'LangChain', target: 'OpenAI', strength: 0.8 },
      
      // Database connections
      { source: 'MongoDB', target: 'Neo4j', strength: 0.5 },
      { source: 'MySQL', target: 'Node.js', strength: 0.6 },
      
      // Tool connections
      { source: 'GitHub', target: 'React.js', strength: 0.6 },
      { source: 'GitHub', target: 'Node.js', strength: 0.6 },
      { source: 'VS Code', target: 'TypeScript', strength: 0.7 },
      { source: 'Postman', target: 'REST APIs', strength: 0.8 }
    );
    
    // Connect each technology to its category center
    Object.values(skillsData).forEach(categoryData => {
      categoryData.skills.forEach(skill => {
        connections.push({
          source: skill.name,
          target: `center-${categoryData.title.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`,
          strength: 0.5
        });
      });
    });
    
    // Connect category centers
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

  // Initialize graph data
  useEffect(() => {
    const nodes = createLayout();
    const links = getTechnologyConnections();
    setGraphData({ nodes, links });
    
    const timer = setTimeout(() => {
      setIsInitialAnimation(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle node click
  const handleNodeClick = (nodeId: string) => {
    setSelectedSkill(nodeId);
    setShowInfo(true);
  };

  // Handle hover (just for visual effect, not to show info)
  const handleMouseEnter = (nodeId: string) => {
    setHoveredSkill(nodeId);
  };

  const handleMouseLeave = () => {
    setHoveredSkill(null);
  };

  // Get connected nodes for selected node
  const getConnectedNodes = (nodeId: string): string[] => {
    const connections = graphData.links.filter(link => 
      link.source === nodeId || link.target === nodeId
    );
    const connectedNodes = new Set<string>();
    
    connections.forEach(link => {
      if (link.source === nodeId) connectedNodes.add(link.target);
      if (link.target === nodeId) connectedNodes.add(link.source);
    });
    
    return Array.from(connectedNodes);
  };

  // Filter nodes based on active category
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

  // Get selected node details
  const selectedNode = selectedSkill ? graphData.nodes.find(n => n.id === selectedSkill) : null;
  const connectedNodes = selectedSkill ? getConnectedNodes(selectedSkill) : [];
  const techDetail = selectedSkill ? techDetails[selectedSkill] : null;

  // Close info panel
  const closeInfoPanel = () => {
    setShowInfo(false);
    setSelectedSkill(null);
  };

  // List of nodes that need white background for better visibility
  const needsWhiteBackground = [
    'Next.js', 'Express.js', 'GitHub', 'VS Code', 'Jira', 'Figma', 'Postman',
    'OpenAI', 'LangChain', 'TensorFlow', 'PyTorch', 'Redux', 'TypeScript'
  ];

  // Information Panel Component
  const InformationPanel = () => {
    if (!selectedSkill || !showInfo || !selectedNode) return null;

    const isCenterNode = selectedNode.id.startsWith('center-');
    const detail = techDetails[selectedSkill];

    return (
      <div style={{
        position: 'absolute',
        right: '2rem',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '350px',
        maxHeight: '80vh',
        overflowY: 'auto',
        background: theme.cardBg,
        borderRadius: '16px',
        padding: '1.5rem',
        border: `1px solid ${theme.border}`,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
        zIndex: 1000,
        backdropFilter: 'blur(10px)',
        animation: 'fadeIn 0.2s ease'
      }}>
        {/* Close Button */}
        <button
          onClick={closeInfoPanel}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'transparent',
            border: 'none',
            color: theme.textSecondary,
            fontSize: '1.2rem',
            cursor: 'pointer',
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = `${theme.accent}20`;
            e.currentTarget.style.color = theme.accent;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = theme.textSecondary;
          }}
        >
          ✕
        </button>
        
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1rem',
          paddingRight: '2rem'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '10px',
            background: isCenterNode ? selectedNode.color : 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <img 
              src={isCenterNode ? categoryIcons[selectedNode.category] : techIcons[selectedNode.name]} 
              alt={selectedNode.name}
              style={{ 
                width: '100%', 
                height: '100%',
                objectFit: 'contain'
              }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = `
                  <div style="color: ${isCenterNode ? 'white' : selectedNode.color}; font-size: 1.2rem; font-weight: bold;">
                    ${selectedNode.name.charAt(0)}
                  </div>
                `;
              }}
            />
          </div>
          <div>
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: 700,
              color: theme.text,
              margin: 0,
              marginBottom: '0.25rem'
            }}>
              {selectedNode.name}
            </h3>
            <div style={{
              padding: '0.2rem 0.6rem',
              background: `${selectedNode.color}20`,
              borderRadius: '12px',
              display: 'inline-block',
              fontSize: '0.8rem',
              color: selectedNode.color,
              fontWeight: 600
            }}>
              {isCenterNode ? 'Category Center' : skillsData[selectedNode.category as keyof typeof skillsData]?.title || 'Technology'}
            </div>
          </div>
        </div>
        
        {/* Description - ALWAYS SHOW */}
        <div style={{
          marginBottom: '1rem'
        }}>
          <h4 style={{
            fontSize: '0.85rem',
            fontWeight: 600,
            color: theme.accent,
            marginBottom: '0.5rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Description
          </h4>
          <p style={{
            fontSize: '0.9rem',
            color: theme.text,
            lineHeight: '1.5',
            margin: 0
          }}>
            {detail ? detail.description : selectedNode.description || `${selectedNode.name} technology`}
          </p>
        </div>
        
        {/* Use Cases */}
        {(detail?.useCases?.length > 0) && (
          <div style={{
            marginBottom: '1rem'
          }}>
            <h4 style={{
              fontSize: '0.85rem',
              fontWeight: 600,
              color: theme.accent,
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Use Cases
            </h4>
            <ul style={{
              margin: 0,
              paddingLeft: '1rem'
            }}>
              {detail.useCases.slice(0, 3).map((useCase, index) => (
                <li key={index} style={{
                  color: theme.text,
                  marginBottom: '0.4rem',
                  fontSize: '0.9rem',
                  lineHeight: '1.4'
                }}>
                  {useCase}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Experience */}
        {detail?.experience && (
          <div style={{
            marginBottom: '1.5rem'
          }}>
            <h4 style={{
              fontSize: '0.85rem',
              fontWeight: 600,
              color: theme.accent,
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Experience
            </h4>
            <p style={{
              fontSize: '0.9rem',
              color: theme.text,
              lineHeight: '1.5',
              margin: 0
            }}>
              {detail.experience}
            </p>
          </div>
        )}
        
        {/* Connections */}
        {connectedNodes.length > 0 && (
          <div style={{
            marginBottom: '1.5rem'
          }}>
            <h4 style={{
              fontSize: '0.85rem',
              fontWeight: 600,
              color: theme.accent,
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Connected to {connectedNodes.length} nodes
            </h4>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}>
              {connectedNodes.slice(0, 5).map((nodeId, index) => {
                const node = graphData.nodes.find(n => n.id === nodeId);
                if (!node) return null;
                
                return (
                  <div
                    key={index}
                    style={{
                      padding: '0.4rem 0.8rem',
                      background: `${node.color}20`,
                      border: `1px solid ${node.color}40`,
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      color: theme.text,
                      fontWeight: 500,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: node.color
                    }}></div>
                    {node.name.split(' ')[0]}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {/* Learn More Button */}
        {(detail?.url || selectedNode.learnMoreUrl) && (
          <div>
            <button
              onClick={() => window.open(detail?.url || selectedNode!.learnMoreUrl, '_blank')}
              style={{
                padding: '0.8rem 1.5rem',
                background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentLight})`,
                border: 'none',
                borderRadius: '10px',
                color: 'white',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: `0 4px 15px ${theme.accent}40`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 8px 20px ${theme.accent}60`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 4px 15px ${theme.accent}40`;
              }}
            >
              <span>📚</span>
              Learn More
            </button>
          </div>
        )}
      </div>
    );
  };

  // Render the graph
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
          <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="hover-glow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="selected-glow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur"/>
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
          const isConnectedLink = connectedNodes.includes(link.source) || connectedNodes.includes(link.target);
          
          return (
            <line
              key={`${link.source}-${link.target}-${index}`}
              x1={sourceNode.x}
              y1={sourceNode.y}
              x2={targetNode.x}
              y2={targetNode.y}
              stroke={isSelectedLink ? theme.accent : isConnectedLink ? `${theme.accent}60` : `${theme.accent}20`}
              strokeWidth={isSelectedLink ? 4 : isConnectedLink ? 2.5 : link.strength * 2}
              opacity={isSelectedLink ? 0.9 : isConnectedLink ? 0.6 : 0.3}
              style={{
                transition: 'all 0.3s ease'
              }}
            />
          );
        })}

        {/* Render nodes */}
        {filteredNodes.map((node) => {
          const isCenterNode = node.id.startsWith('center-');
          const isHovered = hoveredSkill === node.id;
          const isSelected = selectedSkill === node.id;
          const isConnected = connectedNodes.includes(node.id);
          const radius = isCenterNode ? 40 : 22;
          const fontSize = isCenterNode ? 12 : 10;
          const needsBg = needsWhiteBackground.includes(node.name);
          const hasIcon = techIcons[node.name] || (isCenterNode && categoryIcons[node.category]);
          
          return (
            <g 
              key={node.id}
              style={{ 
                cursor: 'pointer',
                transition: isInitialAnimation ? 'none' : 'transform 0.3s ease'
              }}
              transform={`translate(${node.x}, ${node.y})`}
              onMouseEnter={() => handleMouseEnter(node.id)}
              onMouseLeave={() => handleMouseLeave()}
              onClick={() => handleNodeClick(node.id)}
            >
              {/* Glow for selected node */}
              {isSelected && (
                <circle
                  r={radius + 20}
                  fill={node.color}
                  opacity="0.3"
                  filter="url(#selected-glow)"
                />
              )}
              
              {/* Glow for hovered node */}
              {isHovered && !isSelected && (
                <circle
                  r={radius + 10}
                  fill={node.color}
                  opacity="0.2"
                  filter="url(#hover-glow)"
                />
              )}
              
              {/* Glow for connected nodes */}
              {isConnected && !isSelected && (
                <circle
                  r={radius + 8}
                  fill={node.color}
                  opacity="0.15"
                />
              )}
              
              {/* White background for nodes with dark/colored icons */}
              {needsBg && !isCenterNode && hasIcon && (
                <circle
                  r={radius - 4}
                  fill="white"
                  opacity="0.9"
                />
              )}
              
              {/* Node circle */}
              <circle
                r={radius}
                fill={node.color}
                stroke={isSelected ? 'white' : isHovered ? theme.bg : isConnected ? theme.border : theme.border}
                strokeWidth={isSelected ? 5 : isHovered ? 3 : isConnected ? 2 : 2}
                filter={isSelected ? "url(#selected-glow)" : isHovered ? "url(#hover-glow)" : "url(#node-glow)"}
                style={{
                  transform: isSelected ? 'scale(1.3)' : isHovered ? 'scale(1.1)' : isConnected ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.3s ease'
                }}
              />
              
              {/* Icon for center nodes */}
              {isCenterNode && categoryIcons[node.category] && (
                <image
                  href={categoryIcons[node.category]}
                  x="-18"
                  y="-18"
                  width="36"
                  height="36"
                  style={{ pointerEvents: 'none' }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
              
              {/* Icon for tech nodes */}
              {!isCenterNode && techIcons[node.name] && (
                <image
                  href={techIcons[node.name]}
                  x="-14"
                  y="-14"
                  width="28"
                  height="28"
                  style={{ 
                    pointerEvents: 'none'
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
              
              {/* Label */}
              <text
                textAnchor="middle"
                y={radius + 18}
                fill={isSelected ? theme.accent : isHovered ? theme.text : isConnected ? theme.text : theme.textSecondary}
                fontSize={fontSize}
                fontWeight={isSelected ? 'bold' : isHovered ? '600' : isConnected ? '500' : 'normal'}
                style={{ 
                  pointerEvents: 'none',
                  textShadow: isSelected ? '0 2px 4px rgba(0,0,0,0.3)' : isHovered ? '0 1px 3px rgba(0,0,0,0.3)' : '0 1px 2px rgba(0,0,0,0.2)',
                  transition: 'all 0.3s ease'
                }}
              >
                {isCenterNode ? node.name : node.name.split(' ')[0]}
              </text>
              
              {/* Selection indicator */}
              {isSelected && (
                <circle
                  r={radius + 6}
                  fill="transparent"
                  stroke={theme.accent}
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  opacity="0.8"
                  style={{
                    animation: 'rotate 3s linear infinite'
                  }}
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
      {/* Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 30%, ${theme.accent}05 0%, transparent 30%),
          radial-gradient(circle at 80% 70%, ${theme.accentLight}05 0%, transparent 30%)
        `,
        pointerEvents: 'none'
      }}></div>

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 800,
            marginBottom: '0.5rem',
            background: `linear-gradient(135deg, ${theme.text}, ${theme.accentLight})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em'
          }}>
            Technology Graph
          </h1>
          
          <p style={{
            fontSize: '1.1rem',
            color: theme.textSecondary,
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Click on any technology to see detailed information
          </p>
        </div>

        {/* Main Dashboard */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '250px 1fr',
          gap: '2rem',
          minHeight: '600px'
        }}>
          {/* Sidebar */}
          <div style={{
            background: theme.cardBg,
            borderRadius: '20px',
            padding: '2rem 1.5rem',
            border: `1px solid ${theme.border}`,
            backdropFilter: 'blur(10px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem'
          }}>
            {/* Categories */}
            <div>
              <h3 style={{
                fontSize: '0.9rem',
                fontWeight: 600,
                color: theme.accent,
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Categories
              </h3>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                {Object.keys(skillsData).map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setActiveCategory(category);
                      setSelectedSkill(null);
                      setShowInfo(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem 1rem',
                      background: activeCategory === category 
                        ? `${theme.accent}15` 
                        : 'transparent',
                      border: `1px solid ${activeCategory === category ? theme.accent : 'transparent'}`,
                      borderRadius: '10px',
                      color: activeCategory === category ? theme.accent : theme.textSecondary,
                      fontSize: '0.9rem',
                      fontWeight: activeCategory === category ? 600 : 400,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      textAlign: 'left'
                    }}
                  >
                    <img 
                      src={categoryIcons[category]} 
                      alt=""
                      style={{ 
                        width: '18px', 
                        height: '18px',
                        opacity: activeCategory === category ? 1 : 0.7
                      }}
                    />
                    <span>
                      {skillsData[category as keyof typeof skillsData]?.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div>
              <h3 style={{
                fontSize: '0.9rem',
                fontWeight: 600,
                color: theme.accent,
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Graph Stats
              </h3>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                <div style={{
                  background: `${theme.accent}10`,
                  borderRadius: '10px',
                  padding: '1rem',
                  border: `1px solid ${theme.accent}20`
                }}>
                  <div style={{
                    fontSize: '2rem',
                    fontWeight: 800,
                    background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentLight})`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1
                  }}>
                    {Object.values(skillsData).reduce((acc, cat) => acc + cat.skills.length, 0) + Object.keys(skillsData).length}
                  </div>
                  <div style={{
                    fontSize: '0.8rem',
                    color: theme.textSecondary,
                    fontWeight: 500
                  }}>
                    NODES
                  </div>
                </div>
                
                <div style={{
                  background: `${theme.accentLight}10`,
                  borderRadius: '10px',
                  padding: '1rem',
                  border: `1px solid ${theme.accentLight}20`
                }}>
                  <div style={{
                    fontSize: '2rem',
                    fontWeight: 800,
                    background: `linear-gradient(135deg, ${theme.accentLight}, ${theme.accent})`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1
                  }}>
                    {Object.keys(skillsData).length}
                  </div>
                  <div style={{
                    fontSize: '0.8rem',
                    color: theme.textSecondary,
                    fontWeight: 500
                  }}>
                    CLUSTERS
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Node Info */}
            {selectedSkill && (
              <div style={{
                background: `${theme.accent}10`,
                borderRadius: '12px',
                padding: '1rem',
                border: `1px solid ${theme.accent}30`
              }}>
                <h3 style={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: theme.accent,
                  marginBottom: '0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Selected
                </h3>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: selectedNode?.color || theme.accent
                  }}></div>
                  <span style={{ fontSize: '0.9rem', color: theme.text, fontWeight: 500 }}>
                    {selectedSkill}
                  </span>
                </div>
                <button
                  onClick={closeInfoPanel}
                  style={{
                    marginTop: '0.75rem',
                    padding: '0.4rem 0.8rem',
                    background: 'transparent',
                    border: `1px solid ${theme.accent}`,
                    borderRadius: '6px',
                    color: theme.accent,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    width: '100%',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = theme.accent;
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = theme.accent;
                  }}
                >
                  Clear Selection
                </button>
              </div>
            )}

            {/* Legend */}
            <div>
              <h3 style={{
                fontSize: '0.9rem',
                fontWeight: 600,
                color: theme.accent,
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Legend
              </h3>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                {Object.entries(skillsData).map(([category, data]) => (
                  <div key={category} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: category === 'frontend' ? '#3b82f6' :
                                 category === 'backend' ? '#10b981' :
                                 category === 'databases' ? '#ef4444' :
                                 category === 'tools' ? '#8b5cf6' : '#f59e0b'
                    }}></div>
                    <span style={{ fontSize: '0.85rem', color: theme.textSecondary }}>{data.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Graph Visualization */}
          <div style={{
            background: theme.cardBg,
            borderRadius: '20px',
            border: `1px solid ${theme.border}`,
            overflow: 'hidden',
            position: 'relative',
            height: '700px'
          }}>
            {/* Graph Header */}
            <div style={{
              padding: '1.5rem 2rem',
              borderBottom: `1px solid ${theme.border}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: theme.text,
                  marginBottom: '0.25rem'
                }}>
                  {selectedSkill 
                    ? `${selectedSkill} Details`
                    : skillsData[activeCategory as keyof typeof skillsData]?.title}
                </h2>
                <p style={{
                  color: theme.textSecondary,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{
                    display: 'inline-block',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: theme.accent,
                    animation: selectedSkill ? 'pulse 1s infinite' : 'none'
                  }}></span>
                  {selectedSkill 
                    ? 'Click outside or use clear button to deselect'
                    : `Click on any node to see detailed information`}
                </p>
              </div>
              
              {/* Interaction Guide */}
              <div style={{
                padding: '0.5rem 1rem',
                background: `${theme.accent}10`,
                borderRadius: '20px',
                border: `1px solid ${theme.accent}30`,
                fontSize: '0.8rem',
                color: theme.accent,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <div style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: theme.accent,
                  animation: isInitialAnimation ? 'pulse 0.5s infinite' : 'none'
                }}></div>
                Click nodes for details
              </div>
            </div>

            {/* Graph Container */}
            <div style={{
              height: 'calc(100% - 80px)',
              padding: '1rem',
              position: 'relative'
            }}>
              {renderGraph()}
              <InformationPanel />
              
              {/* Tools section more info button */}
              {activeCategory === 'tools' && !selectedSkill && (
                <div style={{
                  position: 'absolute',
                  bottom: '1rem',
                  right: '1rem',
                  zIndex: 10
                }}>
                  <button
                    onClick={() => setShowMoreInfo(!showMoreInfo)}
                    style={{
                      padding: '0.5rem 1rem',
                      background: theme.accent,
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: 600
                    }}
                  >
                    {showMoreInfo ? 'Hide Details' : 'Show Tools Info'}
                  </button>
                  
                  {showMoreInfo && (
                    <div style={{
                      position: 'absolute',
                      bottom: '100%',
                      right: 0,
                      width: '300px',
                      background: theme.cardBg,
                      padding: '1rem',
                      borderRadius: '12px',
                      border: `1px solid ${theme.border}`,
                      marginBottom: '0.5rem',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                    }}>
                      <h4 style={{ margin: '0 0 0.5rem 0', color: theme.text }}>
                        Development Tools
                      </h4>
                      <p style={{ fontSize: '0.9rem', color: theme.textSecondary, margin: 0 }}>
                        This section includes essential development tools for version control, 
                        collaboration, testing, and design that I use in my workflow.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px) translateY(-50%);
          }
          to {
            opacity: 1;
            transform: translateY(0) translateY(-50%);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.05);
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

        /* Custom Scrollbar */
        #skills ::-webkit-scrollbar {
          width: 8px;
        }
        
        #skills ::-webkit-scrollbar-track {
          background: ${theme.border}20;
          border-radius: 4px;
        }
        
        #skills ::-webkit-scrollbar-thumb {
          background: ${theme.accent}60;
          border-radius: 4px;
        }
        
        #skills ::-webkit-scrollbar-thumb:hover {
          background: ${theme.accent};
        }

        /* Ensure info panel is on top */
        #skills .info-panel {
          z-index: 1000 !important;
        }
        
        #skills button {
          position: relative;
          z-index: 1001;
        }
      `}</style>
    </section>
  );
};

export default Skills;