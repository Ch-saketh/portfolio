import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SkillsProps { theme: any; }

interface GraphNode {
  id: string;
  name: string;
  color: string;
  category: string;
  x: number;
  y: number;
  intro: string;
  proficiency: number;
  years: number;
  details: {
    type: string;
    useCase: string;
    strengths: string[];
    projects: string[];
  };
}

const Skills: React.FC<SkillsProps> = ({ theme }) => {
  const [activeCategory, setActiveCategory] = useState<string>('programming');
  const [selectedSkill, setSelectedSkill] = useState<string | null>('Python');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Enhanced high-fidelity data with comprehensive details
  const techData: Record<string, any> = {
    'Python': {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      intro: 'Interpreted high-level programming language known for its simplicity and versatility.',
      proficiency: 95,
      years: 5,
      details: {
        type: 'General Purpose Programming',
        useCase: 'AI/ML Development, Backend Services, Automation',
        strengths: ['Rapid Development', 'Extensive Libraries', 'Strong Community Support', 'Cross-Platform Compatibility'],
        projects: ['Quantum Algorithm Simulator', 'ML-based Fraud Detection', 'REST API Microservices']
      }
    },
    'Java': {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
      intro: 'Object-oriented language designed for reliability and scalability in enterprise environments.',
      proficiency: 90,
      years: 4,
      details: {
        type: 'Enterprise Development',
        useCase: 'Large-scale Systems, Android Apps, Financial Applications',
        strengths: ['Platform Independence', 'Strong Memory Management', 'Multi-threading', 'Robust Security'],
        projects: ['Banking Transaction System', 'Android E-commerce App', 'Distributed Computing Framework']
      }
    },
    'JavaScript': {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      intro: 'The universal scripting language for interactive web applications and server-side development.',
      proficiency: 92,
      years: 5,
      details: {
        type: 'Web Development',
        useCase: 'Frontend Applications, Server-side (Node.js), Mobile Apps',
        strengths: ['Ubiquitous Browser Support', 'Asynchronous Programming', 'Rich Ecosystem', 'Real-time Applications'],
        projects: ['Real-time Dashboard', 'SPA with React', 'Node.js Microservices']
      }
    },
    'C': {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
      intro: 'Procedural language providing low-level access to memory and system resources.',
      proficiency: 85,
      years: 3,
      details: {
        type: 'Systems Programming',
        useCase: 'Operating Systems, Embedded Systems, Performance-critical Applications',
        strengths: ['Memory Control', 'Execution Speed', 'Hardware Access', 'Minimal Runtime'],
        projects: ['Custom Memory Allocator', 'Network Protocol Implementation', 'Embedded Device Drivers']
      }
    },
    'React.js': {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      intro: 'Declarative JavaScript library for building efficient and scalable user interfaces.',
      proficiency: 94,
      years: 4,
      details: {
        type: 'Frontend Library',
        useCase: 'Single Page Applications, Progressive Web Apps, Component-based UIs',
        strengths: ['Virtual DOM', 'Component Reusability', 'Strong Community', 'Rich Ecosystem'],
        projects: ['Enterprise Dashboard', 'Real-time Analytics Platform', 'Admin Portal System']
      }
    },
    'Vite': {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg',
      intro: 'Next-generation frontend tooling providing lightning-fast development experience.',
      proficiency: 88,
      years: 2,
      details: {
        type: 'Build Tool & Dev Server',
        useCase: 'Modern Web Development, Fast Refresh, Production Bundling',
        strengths: ['Instant Server Start', 'Hot Module Replacement', 'Optimized Builds', 'Plugin Ecosystem'],
        projects: ['High-performance Web App', 'Component Library', 'Static Site Generator']
      }
    },
    'TailwindCSS': {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
      intro: 'Utility-first CSS framework for rapid UI development with design consistency.',
      proficiency: 90,
      years: 3,
      details: {
        type: 'CSS Framework',
        useCase: 'Rapid Prototyping, Responsive Design, Design System Implementation',
        strengths: ['Developer Productivity', 'Consistent Design', 'Small Bundle Size', 'Customization'],
        projects: ['Design System Implementation', 'Responsive E-commerce', 'Admin Dashboard']
      }
    },
    'Node.js': {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      intro: 'JavaScript runtime built on Chrome\'s V8 engine for scalable network applications.',
      proficiency: 92,
      years: 4,
      details: {
        type: 'Runtime Environment',
        useCase: 'Server-side Applications, Real-time Services, APIs, Microservices',
        strengths: ['Non-blocking I/O', 'Single Programming Language', 'NPM Ecosystem', 'Scalability'],
        projects: ['Real-time Chat Application', 'RESTful API Gateway', 'WebSocket Server']
      }
    },
    'Express.js': {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
      intro: 'Minimal and flexible Node.js web application framework for robust APIs.',
      proficiency: 90,
      years: 4,
      details: {
        type: 'Web Application Framework',
        useCase: 'REST APIs, Web Applications, Microservices, Middleware Architecture',
        strengths: ['Minimalist', 'Middleware Support', 'Routing Flexibility', 'Large Community'],
        projects: ['E-commerce Backend', 'Authentication Service', 'Payment Processing API']
      }
    },
    'FastAPI': {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
      intro: 'Modern Python web framework for building APIs with automatic documentation.',
      proficiency: 88,
      years: 2,
      details: {
        type: 'API Framework',
        useCase: 'High-performance APIs, Machine Learning APIs, Real-time Applications',
        strengths: ['Fast Performance', 'Automatic Docs', 'Type Safety', 'Async Support'],
        projects: ['ML Model Serving API', 'Real-time Analytics API', 'Microservices Gateway']
      }
    },
    'Flask': {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',
      intro: 'Lightweight WSGI web application framework designed for simplicity and flexibility.',
      proficiency: 85,
      years: 3,
      details: {
        type: 'Micro Web Framework',
        useCase: 'Prototyping, Small to Medium Applications, REST APIs, Learning Projects',
        strengths: ['Simplicity', 'Flexibility', 'Minimal Overhead', 'Easy to Learn'],
        projects: ['Prototype Dashboard', 'Simple REST API', 'Internal Tools']
      }
    },
    'MongoDB': {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      intro: 'NoSQL document database designed for scalability and developer productivity.',
      proficiency: 87,
      years: 3,
      details: {
        type: 'Document Database',
        useCase: 'Real-time Applications, Content Management, Mobile Apps, IoT',
        strengths: ['Flexible Schema', 'Horizontal Scaling', 'JSON-like Documents', 'Aggregation Framework'],
        projects: ['Real-time Analytics Platform', 'Content Management System', 'User Profile Storage']
      }
    },
    'Neo4j': {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/neo4j/neo4j-original.svg',
      intro: 'Native graph database that efficiently stores and queries connected data.',
      proficiency: 82,
      years: 2,
      details: {
        type: 'Graph Database',
        useCase: 'Social Networks, Recommendation Engines, Fraud Detection, Network Analysis',
        strengths: ['Relationship Queries', 'Cypher Query Language', 'ACID Compliance', 'Visualization Tools'],
        projects: ['Social Network Analysis', 'Recommendation Engine', 'Fraud Detection System']
      }
    },
    'PostgreSQL': {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      intro: 'Advanced open-source relational database with strong ACID compliance.',
      proficiency: 89,
      years: 4,
      details: {
        type: 'Relational Database',
        useCase: 'Transactional Systems, Data Warehousing, Geospatial Data, Complex Queries',
        strengths: ['ACID Compliance', 'JSON Support', 'Extensions', 'Strong Community'],
        projects: ['Financial Transaction System', 'Geospatial Application', 'Analytics Platform']
      }
    },
    'Supabase': {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg',
      intro: 'Open-source Firebase alternative with real-time capabilities and PostgreSQL backend.',
      proficiency: 85,
      years: 2,
      details: {
        type: 'Backend-as-a-Service',
        useCase: 'Rapid Prototyping, Real-time Applications, Authentication, Serverless Functions',
        strengths: ['Real-time Subscriptions', 'Built-in Auth', 'PostgreSQL Power', 'Open Source'],
        projects: ['Real-time Dashboard', 'User Management System', 'Prototype Applications']
      }
    },
    'IBM Qiskit': {
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Qiskit-Logo.svg/1024px-Qiskit-Logo.svg.png',
      intro: 'Open-source SDK for working with quantum computers at the level of circuits and algorithms.',
      proficiency: 78,
      years: 1,
      details: {
        type: 'Quantum Computing SDK',
        useCase: 'Quantum Algorithm Development, Circuit Simulation, Quantum Research',
        strengths: ['Multiple Backends', 'Circuit Visualization', 'Algorithm Library', 'Active Development'],
        projects: ['Quantum Algorithm Research', 'Circuit Optimization', 'Quantum State Simulation']
      }
    },
    'Scikit-learn': {
      icon: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg',
      intro: 'Machine learning library for Python featuring simple and efficient tools for data analysis.',
      proficiency: 86,
      years: 3,
      details: {
        type: 'Machine Learning Library',
        useCase: 'Predictive Analytics, Classification, Regression, Clustering, Model Evaluation',
        strengths: ['Easy to Use', 'Comprehensive Algorithms', 'Integration with NumPy', 'Documentation'],
        projects: ['Predictive Maintenance', 'Customer Segmentation', 'Anomaly Detection']
      }
    },
    'Git': {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      intro: 'Distributed version control system for tracking changes in source code during development.',
      proficiency: 94,
      years: 5,
      details: {
        type: 'Version Control System',
        useCase: 'Source Code Management, Collaboration, Branching Strategies, CI/CD Integration',
        strengths: ['Branching & Merging', 'Distributed Architecture', 'Performance', 'Industry Standard'],
        projects: ['Enterprise Codebase Management', 'Open Source Contributions', 'Team Collaboration Workflows']
      }
    },
    'Linux': {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
      intro: 'Open-source Unix-like operating system based on the Linux kernel.',
      proficiency: 88,
      years: 5,
      details: {
        type: 'Operating System',
        useCase: 'Servers, Development Environments, Containers, Embedded Systems',
        strengths: ['Security', 'Stability', 'Customization', 'Command Line Power'],
        projects: ['Server Administration', 'Development Environment Setup', 'Docker Containerization']
      }
    },
    'VS Code': {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
      intro: 'Free source-code editor made by Microsoft with support for debugging and extensions.',
      proficiency: 95,
      years: 5,
      details: {
        type: 'Integrated Development Environment',
        useCase: 'Code Editing, Debugging, Version Control, Extensions',
        strengths: ['Lightweight', 'Extensions Marketplace', 'Integrated Terminal', 'IntelliSense'],
        projects: ['Multi-language Development', 'Team Coding Standards', 'Custom Development Workflow']
      }
    },
    'Postman': {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg',
      intro: 'API platform for building and using APIs with tools for every stage of the API lifecycle.',
      proficiency: 90,
      years: 4,
      details: {
        type: 'API Development Platform',
        useCase: 'API Testing, Documentation, Mock Servers, Automated Testing',
        strengths: ['Collection Runner', 'Environment Variables', 'Documentation Generation', 'Team Collaboration'],
        projects: ['API Testing Suite', 'API Documentation', 'Automated Integration Tests']
      }
    }
  };

  type SkillCategory = 'programming' | 'frontend' | 'backend' | 'databases' | 'ai' | 'tools';

  const skillsData: Record<SkillCategory, { title: string; color: string; skills: string[] }> = {
    'programming': { title: 'Languages', color: '#007AFF', skills: ['Python', 'Java', 'JavaScript', 'C'] },
    'frontend': { title: 'Frontend', color: '#5856D6', skills: ['React.js', 'Vite', 'TailwindCSS'] },
    'backend': { title: 'Backend', color: '#34C759', skills: ['Node.js', 'Express.js', 'FastAPI', 'Flask'] },
    'databases': { title: 'Databases', color: '#FF3B30', skills: ['MongoDB', 'Neo4j', 'PostgreSQL', 'Supabase'] },
    'ai': { title: 'AI & Quantum', color: '#FF9500', skills: ['Scikit-learn', 'IBM Qiskit'] },
    'tools': { title: 'Tools', color: '#AF52DE', skills: ['Git', 'Linux', 'VS Code', 'Postman'] }
  };

  const graphNodes = useMemo(() => {
    const nodes: GraphNode[] = [];
    const centers = [
      { id: 'center-programming', name: 'Core Languages', category: 'programming', x: 450, y: 110 },
      { id: 'center-frontend', name: 'UI/UX Stack', category: 'frontend', x: 200, y: 220 },
      { id: 'center-backend', name: 'Server Core', category: 'backend', x: 700, y: 220 },
      { id: 'center-databases', name: 'Data Layer', category: 'databases', x: 700, y: 460 },
      { id: 'center-tools', name: 'DevOps', category: 'tools', x: 200, y: 460 },
      { id: 'center-ai', name: 'Intelligent Systems', category: 'ai', x: 450, y: 340 }
    ];

    centers.forEach(c => nodes.push({ 
      ...c, 
      color: '#ffffff', 
      intro: '',
      proficiency: 100,
      years: 0,
      details: { type: '', useCase: '', strengths: [], projects: [] }
    }));

    Object.entries(skillsData).forEach(([category, data]) => {
      const center = centers.find(c => c.category === category);
      if (!center) return;
      const radius = 110;
      const angleStep = (2 * Math.PI) / data.skills.length;
      data.skills.forEach((skillName, index) => {
        const angle = (-Math.PI / 2) + (angleStep * index);
        const skillInfo = techData[skillName];
        nodes.push({
          id: skillName,
          name: skillName,
          color: data.color,
          category,
          x: center.x + radius * Math.cos(angle),
          y: center.y + radius * Math.sin(angle),
          intro: skillInfo?.intro || '',
          proficiency: skillInfo?.proficiency || 0,
          years: skillInfo?.years || 0,
          details: skillInfo?.details || { type: '', useCase: '', strengths: [], projects: [] }
        });
      });
    });
    return nodes;
  }, []);

  const selectedNode = graphNodes.find(n => n.id === selectedSkill);
  const hoveredNode = graphNodes.find(n => n.id === hoveredSkill);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section id="skills" style={{ ...styles.sectionMain, backgroundColor: theme.bg }}>
      <div style={styles.container}>
        <div style={styles.layout}>
          {/* LEFT NAVIGATION SIDEBAR - Apple Style */}
          <motion.aside 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ ...styles.sidebar, background: theme.cardBg }}
          >
            <div style={styles.sidebarHeader}>
              <span style={styles.label}>TECH STACK</span>
              <div style={styles.systemStatus}>
                <div style={styles.statusDot}></div>
                <span style={styles.statusText}>ACTIVE</span>
              </div>
            </div>
            
            {(Object.keys(skillsData) as SkillCategory[]).map((category: SkillCategory) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { setActiveCategory(category); setSelectedSkill(skillsData[category].skills[0]); }}
                style={{ 
                  ...styles.navBtn,
                  color: activeCategory === category ? '#ffffff' : 'rgba(255,255,255,0.5)',
                  background: activeCategory === category ? skillsData[category].color : 'transparent',
                  borderLeft: activeCategory === category ? `4px solid ${skillsData[category].color}` : '4px solid transparent'
                }}
              >
                <div style={styles.navBtnContent}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ ...styles.categoryDot, backgroundColor: skillsData[category].color }}></div>
                    <span style={styles.navBtnText}>{skillsData[category].title}</span>
                  </div>
                  <div style={styles.skillCount}>{skillsData[category].skills.length}</div>
                </div>
              </motion.button>
            ))}
          </motion.aside>

          {/* MAIN VISUALIZATION AREA */}
          <div style={{ ...styles.canvas, borderColor: theme.border }}>
            <svg ref={svgRef} width="100%" height="100%" viewBox="0 0 900 600">
              <defs>
                <filter id="appleGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur"/>
                  <feFlood floodColor="currentColor" floodOpacity="0.3" result="color"/>
                  <feComposite in="color" in2="blur" operator="in" result="glow"/>
                  <feMerge>
                    <feMergeNode in="glow"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                
                <linearGradient id="proficiencyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#007AFF" />
                  <stop offset="100%" stopColor="#34C759" />
                </linearGradient>
              </defs>

              {/* Connection lines */}
              {graphNodes
                .filter(n => !n.id.startsWith('center-') && n.category === activeCategory)
                .map(node => {
                  const center = graphNodes.find(c => c.id === `center-${node.category}`);
                  if (!center) return null;
                  return (
                    <motion.line
                      key={`line-${node.id}`}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.2 }}
                      x1={node.x} y1={node.y} 
                      x2={center.x} y2={center.y}
                      stroke={node.color} 
                      strokeWidth="1.5" 
                      opacity={hoveredSkill === node.id ? 0.4 : 0.15}
                      strokeDasharray="5,5"
                    />
                  );
                })}

              {/* Skill nodes */}
              {graphNodes
                .filter(n => n.id.startsWith('center-') || n.category === activeCategory)
                .map(node => {
                  const isCenter = node.id.startsWith('center-');
                  const isSelected = selectedSkill === node.id;
                  const isHovered = hoveredSkill === node.id;
                  const radius = isCenter ? 28 : 36;
                  const skillInfo = techData[node.name];
                  
                  return (
                    <g key={node.id} style={{ cursor: 'pointer' }}>
                      {/* Outer glow effect */}
                      {isSelected && (
                        <circle 
                          cx={node.x} 
                          cy={node.y} 
                          r={radius + 15} 
                          fill={node.color} 
                          opacity="0.1"
                          filter="url(#appleGlow)"
                        />
                      )}
                      
                      {/* Connection lines on hover */}
                      {isHovered && !isCenter && (
                        <line 
                          x1={node.x} 
                          y1={node.y} 
                          x2={graphNodes.find(c => c.id === `center-${node.category}`)?.x || node.x}
                          y2={graphNodes.find(c => c.id === `center-${node.category}`)?.y || node.y}
                          stroke={node.color}
                          strokeWidth="2"
                          opacity="0.3"
                          strokeDasharray="none"
                        />
                      )}
                      
                      {/* Main node circle */}
                      <motion.circle
                        onClick={() => setSelectedSkill(node.id)}
                        onMouseEnter={() => setHoveredSkill(node.id)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ 
                          scale: isHovered ? 1.1 : 1,
                          opacity: 1
                        }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 260, 
                          damping: 20,
                          scale: { duration: 0.2 }
                        }}
                        cx={node.x} 
                        cy={node.y} 
                        r={radius}
                        fill={isCenter ? "rgba(0,0,0,0.3)" : "#080808"}
                        stroke={isSelected ? theme.accent : node.color}
                        strokeWidth={isSelected ? 2.5 : isHovered ? 2 : 1.5}
                        style={{ 
                          filter: isSelected || isHovered ? "url(#appleGlow)" : "none",
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                      />
                      
                      {/* Center node text */}
                      {isCenter && (
                        <text 
                          x={node.x} 
                          y={node.y} 
                          textAnchor="middle" 
                          fill="#ffffff" 
                          fontSize="8" 
                          fontWeight="800" 
                          opacity="0.5"
                          letterSpacing="0.5px"
                        >
                          {node.name.toUpperCase()}
                        </text>
                      )}
                      
                      {/* Skill icon */}
                      {!isCenter && skillInfo?.icon && (
                        <image 
                          href={skillInfo.icon} 
                          x={node.x - 20} 
                          y={node.y - 20} 
                          width="40" 
                          height="40"
                          style={{ 
                            filter: isSelected ? 'brightness(1.2)' : 'brightness(1)',
                            transition: 'filter 0.3s ease'
                          }}
                        />
                      )}
                      
                      {/* Skill name label */}
                      <text 
                        x={node.x} 
                        y={node.y + radius + 20} 
                        textAnchor="middle" 
                        fill="#ffffff" 
                        fontSize="11" 
                        fontWeight="600"
                        opacity={isSelected ? 1 : isHovered ? 0.8 : 0.6}
                        style={{ pointerEvents: 'none' }}
                      >
                        {node.name}
                      </text>
                      
                      {/* Proficiency indicator */}
                      {!isCenter && isHovered && (
                        <g>
                          <circle 
                            cx={node.x} 
                            cy={node.y - radius - 15} 
                            r="12" 
                            fill="#080808" 
                            stroke={node.color}
                            strokeWidth="1"
                          />
                          <text 
                            x={node.x} 
                            y={node.y - radius - 11} 
                            textAnchor="middle" 
                            fill="#ffffff" 
                            fontSize="8" 
                            fontWeight="700"
                          >
                            {skillInfo?.proficiency || 0}%
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
            </svg>
          </div>

          {/* RIGHT DETAIL PANEL - Enhanced Apple Style */}
          <motion.aside 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ ...styles.detailPanel, background: theme.cardBg }}
          >
            <div style={styles.panelHeader}>
              <span style={styles.label}>TECHNICAL SPECIFICATION</span>
              <div style={styles.techBadge}>
                <span style={{ fontSize: '9px', fontWeight: 700, color: theme.accent }}>
                  {selectedNode?.category.toUpperCase() || 'SELECTED'}
                </span>
              </div>
            </div>
            
            <AnimatePresence mode="wait">
              {selectedNode && !selectedNode.id.startsWith('center-') && techData[selectedNode.name] ? (
                <motion.div
                  key={selectedNode.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  style={styles.detailContent}
                >
                  {/* Header with icon and title */}
                  <div style={styles.detailHeader}>
                    <div style={{ 
                      ...styles.iconContainer,
                      background: `linear-gradient(135deg, ${selectedNode.color}20, ${selectedNode.color}40)`,
                      borderColor: selectedNode.color
                    }}>
                      <img 
                        src={techData[selectedNode.name].icon} 
                        alt={selectedNode.name}
                        style={styles.techIcon}
                      />
                    </div>
                    <div style={styles.titleContainer}>
                      <h3 style={styles.techTitle}>{selectedNode.name}</h3>
                      <span style={{ 
                        ...styles.techType, 
                        color: selectedNode.color,
                        backgroundColor: `${selectedNode.color}15`
                      }}>
                        {techData[selectedNode.name].details.type}
                      </span>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p style={styles.description}>
                    {selectedNode.intro}
                  </p>
                  
                  {/* Stats */}
                  <div style={styles.statsGrid}>
                    <div style={styles.statItem}>
                      <div style={styles.statLabel}>PROFICIENCY</div>
                      <div style={styles.statValue}>
                        <div style={styles.progressBar}>
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${selectedNode.proficiency}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                            style={{ 
                              ...styles.progressFill, 
                              backgroundColor: selectedNode.color 
                            }}
                          />
                        </div>
                        <span style={styles.percentage}>{selectedNode.proficiency}%</span>
                      </div>
                    </div>
                    <div style={styles.statItem}>
                      <div style={styles.statLabel}>EXPERIENCE</div>
                      <div style={styles.statValue}>
                        <div style={styles.yearsBadge}>
                          {selectedNode.years} {selectedNode.years === 1 ? 'YEAR' : 'YEARS'}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Use Case */}
                  <div style={styles.section}>
                    <div style={styles.sectionHeader}>
                      <span style={styles.sectionTitle}>PRIMARY USE CASE</span>
                    </div>
                    <div style={styles.useCase}>
                      {techData[selectedNode.name].details.useCase}
                    </div>
                  </div>
                  
                  {/* Strengths */}
                  <div style={styles.section}>
                    <div style={styles.sectionHeader}>
                      <span style={styles.sectionTitle}>KEY STRENGTHS</span>
                    </div>
                    <div style={styles.strengthsGrid}>
                      {techData[selectedNode.name].details.strengths.map((strength: string, index: number) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          style={styles.strengthItem}
                        >
                          <div style={{ ...styles.strengthDot, backgroundColor: selectedNode.color }}></div>
                          <span style={styles.strengthText}>{strength}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Project Applications */}
                  <div style={styles.section}>
                    <div style={styles.sectionHeader}>
                      <span style={styles.sectionTitle}>PROJECT APPLICATIONS</span>
                    </div>
                    <div style={styles.projectsList}>
                      {techData[selectedNode.name].details.projects.map((project: string, index: number) => (
                        <div key={index} style={styles.projectItem}>
                          <div style={styles.projectMarker}>•</div>
                          <span style={styles.projectText}>{project}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  style={styles.idleState}
                >
                  <div style={styles.idleIcon}>💻</div>
                  <h4 style={styles.idleTitle}>SELECT A TECHNOLOGY</h4>
                  <p style={styles.idleText}>
                    Click on any technology node to view detailed specifications, use cases, and proficiency metrics.
                  </p>
                  <div style={styles.idleHint}>
                    <span style={styles.hintText}>Hover over nodes for quick preview</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

const styles = {
  sectionMain: { 
    minHeight: '100vh', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: '40px 0',
    overflow: 'hidden'
  },
  container: { 
    maxWidth: '1400px', 
    width: '100%', 
    padding: '0 30px' 
  },
  layout: { 
    display: 'grid', 
    gridTemplateColumns: '200px 1fr 380px', 
    gap: '25px', 
    height: '680px' 
  },
  sidebar: { 
    padding: '24px', 
    borderRadius: '20px', 
    border: '1px solid rgba(255,255,255,0.05)', 
    backdropFilter: 'blur(40px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column' as const
  },
  detailPanel: {
    padding: '24px',
    borderRadius: '20px',
    border: '1px solid rgba(255,255,255,0.05)',
    backdropFilter: 'blur(40px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden'
  },
  sidebarHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px'
  },
  label: { 
    fontSize: '10px', 
    fontWeight: 900, 
    color: 'rgba(255,255,255,0.3)', 
    letterSpacing: '1.5px', 
    display: 'block',
    textTransform: 'uppercase' as const
  },
  systemStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  statusDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#34C759',
    animation: 'pulse 2s infinite'
  },
  statusText: {
    fontSize: '9px',
    fontWeight: 700,
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: '0.5px'
  },
  navBtn: {
    width: '100%',
    padding: '16px 18px',
    border: 'none',
    borderRadius: '12px',
    textAlign: 'left' as const,
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    marginBottom: '8px',
    transition: 'all 0.3s ease',
    background: 'transparent'
  },
  navBtnContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  navBtnText: {
    fontSize: '13px',
    fontWeight: 600
  },
  categoryDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%'
  },
  skillCount: {
    fontSize: '11px',
    fontWeight: 700,
    color: 'rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: '2px 8px',
    borderRadius: '10px'
  },
  canvas: { 
    background: 'linear-gradient(135deg, #080808 0%, #0a0a0a 100%)', 
    borderRadius: '24px', 
    border: '1px solid rgba(255,255,255,0.03)', 
    position: 'relative' as const, 
    overflow: 'hidden',
    boxShadow: 'inset 0 2px 20px rgba(0, 0, 0, 0.5)'
  },
  panelHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px'
  },
  techBadge: {
    padding: '4px 10px',
    borderRadius: '6px',
    backgroundColor: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.05)'
  },
  detailContent: {
    height: '100%',
    overflowY: 'auto' as const,
    paddingRight: '8px'
  },
  detailHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '24px'
  },
  iconContainer: {
    width: '56px',
    height: '56px',
    borderRadius: '14px',
    border: '1px solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(10px)'
  },
  techIcon: {
    width: '32px',
    height: '32px',
    filter: 'brightness(1.1)'
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px'
  },
  techTitle: {
    color: '#ffffff',
    margin: 0,
    fontSize: '22px',
    fontWeight: 700,
    letterSpacing: '-0.3px'
  },
  techType: {
    fontSize: '10px',
    fontWeight: 700,
    padding: '4px 10px',
    borderRadius: '12px',
    width: 'fit-content',
    letterSpacing: '0.5px'
  },
  description: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: '14px',
    lineHeight: '1.6',
    margin: '0 0 28px 0'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    marginBottom: '32px'
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px'
  },
  statLabel: {
    fontSize: '10px',
    color: 'rgba(255,255,255,0.4)',
    fontWeight: 700,
    letterSpacing: '0.5px'
  },
  statValue: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  progressBar: {
    flex: 1,
    height: '6px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '3px',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    borderRadius: '3px',
    transition: 'width 0.3s ease'
  },
  percentage: {
    fontSize: '13px',
    fontWeight: 700,
    color: '#ffffff',
    minWidth: '35px'
  },
  yearsBadge: {
    fontSize: '13px',
    fontWeight: 700,
    color: '#ffffff',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: '6px 12px',
    borderRadius: '8px'
  },
  section: {
    marginBottom: '28px'
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '14px'
  },
  sectionTitle: {
    fontSize: '10px',
    color: 'rgba(255,255,255,0.4)',
    fontWeight: 700,
    letterSpacing: '0.5px'
  },
  useCase: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: '13px',
    lineHeight: '1.5',
    backgroundColor: 'rgba(255,255,255,0.02)',
    padding: '14px',
    borderRadius: '10px',
    border: '1px solid rgba(255,255,255,0.03)'
  },
  strengthsGrid: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px'
  },
  strengthItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  strengthDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%'
  },
  strengthText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: '13px',
    flex: 1
  },
  projectsList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px'
  },
  projectItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px'
  },
  projectMarker: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: '14px',
    marginTop: '2px'
  },
  projectText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: '12px',
    lineHeight: '1.5',
    flex: 1
  },
  idleState: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    textAlign: 'center' as const,
    padding: '40px 20px'
  },
  idleIcon: {
    fontSize: '48px',
    marginBottom: '20px',
    opacity: 0.3
  },
  idleTitle: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: '16px',
    fontWeight: 700,
    marginBottom: '12px',
    letterSpacing: '0.5px'
  },
  idleText: {
    color: 'rgba(255,255,255,0.2)',
    fontSize: '13px',
    lineHeight: '1.6',
    maxWidth: '280px',
    marginBottom: '24px'
  },
  idleHint: {
    padding: '8px 16px',
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.03)'
  },
  hintText: {
    color: 'rgba(255,255,255,0.15)',
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.5px'
  }
};

// Add keyframes for pulse animation
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`, styleSheet.cssRules.length);

export default Skills;