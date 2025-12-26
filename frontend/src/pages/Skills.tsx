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

const Skills: React.FC<SkillsProps> = ({ theme }) => {
  const [activeCategory, setActiveCategory] = useState<string>('frontend');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [graphData, setGraphData] = useState<{ nodes: GraphNode[], links: GraphLink[] }>({ nodes: [], links: [] });
  const [showInfo, setShowInfo] = useState<boolean>(false);

  const categoryIcons: Record<string, string> = {
    'frontend': 'https://cdn-icons-png.flaticon.com/512/5968/5968292.png',
    'backend': 'https://cdn-icons-png.flaticon.com/512/1086/1086581.png',
    'databases': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    'tools': 'https://cdn-icons-png.flaticon.com/512/3248/3248193.png',
    'ai': 'https://cdn-icons-png.flaticon.com/512/2103/2103791.png',
    'programming': 'https://cdn-icons-png.flaticon.com/512/2721/2721614.png'
  };

  const techIcons: Record<string, string> = {
    'React.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'Vite': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg',
    'TailwindCSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
    'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    'Express.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    'FastAPI': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
    'Flask': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',
    'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    'Neo4j': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/neo4j/neo4j-original.svg',
    'PostgreSQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    'Supabase': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg',
    'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    'Java': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    'IBM Qiskit': 'https://avatars.githubusercontent.com/u/31031201?s=200&v=4',
    'NLP': 'https://cdn-icons-png.flaticon.com/512/2103/2103791.png',
    'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    'Linux': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
    'VS Code': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
    'Postman': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg'
  };

  const skillsData = {
    'programming': {
      title: 'Programming',
      skills: [
        { name: 'Python', color: '#3776AB', desc: 'Primary language for AI/ML and Backend.' },
        { name: 'Java', color: '#007396', desc: 'Object-oriented programming and enterprise logic.' },
        { name: 'JavaScript', color: '#F7DF1E', desc: 'Core language for Web technologies.' },
        { name: 'C', color: '#A8B9CC', desc: 'Systems programming and foundational logic.' }
      ]
    },
    'frontend': {
      title: 'Frontend',
      skills: [
        { name: 'React.js', color: '#61DAFB', desc: 'Building dynamic user interfaces.' },
        { name: 'Vite', color: '#646CFF', desc: 'Modern frontend tooling and fast builds.' },
        { name: 'TailwindCSS', color: '#38B2AC', desc: 'Utility-first CSS styling.' },
        { name: 'Electron.js', color: '#47848F', desc: 'Building cross-platform desktop apps.' }
      ]
    },
    'backend': {
      title: 'Backend',
      skills: [
        { name: 'Node.js', color: '#339933', desc: 'Asynchronous event-driven JS runtime.' },
        { name: 'Express.js', color: '#808080', desc: 'Minimalist web framework for Node.' },
        { name: 'FastAPI', color: '#05998B', desc: 'Modern high-performance Python APIs.' },
        { name: 'Flask', color: '#FFFFFF', desc: 'Lightweight WSGI web application framework.' }
      ]
    },
    'databases': {
      title: 'Databases',
      skills: [
        { name: 'MongoDB', color: '#47A248', desc: 'NoSQL document-oriented database.' },
        { name: 'Neo4j', color: '#008CC1', desc: 'Native graph database for relationships.' },
        { name: 'PostgreSQL', color: '#336791', desc: 'Advanced open source relational database.' },
        { name: 'Supabase', color: '#3ECF8E', desc: 'Open source Firebase alternative.' }
      ]
    },
    'ai': {
      title: 'AI & ML',
      skills: [
        { name: 'Scikit-learn', color: '#F7931E', desc: 'Machine Learning in Python.' },
        { name: 'NLP', color: '#412991', desc: 'Natural Language Processing and Text Analysis.' },
        { name: 'IBM Qiskit', color: '#6929C4', desc: 'Quantum Computing and SDK for IBM Quantum.' },
        { name: 'Cosine Similarity', color: '#3b82f6', desc: 'Mathematical approach for recommendation systems.' }
      ]
    },
    'tools': {
      title: 'Tools',
      skills: [
        { name: 'Git', color: '#F05032', desc: 'Distributed version control.' },
        { name: 'Linux', color: '#FCC624', desc: 'System administration and development.' },
        { name: 'VS Code', color: '#007ACC', desc: 'Primary integrated development environment.' },
        { name: 'Postman', color: '#FF6C37', desc: 'API development and testing platform.' }
      ]
    }
  };

  const createLayout = (): GraphNode[] => {
    const nodes: GraphNode[] = [];
    const categoryCenters = [
      { id: 'center-programming', name: 'Languages', color: '#6366f1', category: 'programming', x: 450, y: 100 },
      { id: 'center-frontend', name: 'Frontend', color: '#3b82f6', category: 'frontend', x: 250, y: 250 },
      { id: 'center-backend', name: 'Backend', color: '#10b981', category: 'backend', x: 650, y: 250 },
      { id: 'center-databases', name: 'Databases', color: '#ef4444', category: 'databases', x: 650, y: 500 },
      { id: 'center-tools', name: 'Tools', color: '#8b5cf6', category: 'tools', x: 250, y: 500 },
      { id: 'center-ai', name: 'AI & ML', color: '#f59e0b', category: 'ai', x: 450, y: 350 }
    ];

    categoryCenters.forEach(center => nodes.push({ ...center, description: `Skills related to ${center.name}`, learnMoreUrl: '#' }));

    Object.entries(skillsData).forEach(([category, data]) => {
      const center = categoryCenters.find(c => c.category === category);
      if (!center) return;
      const radius = 130;
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
          description: skill.desc
        });
      });
    });
    return nodes;
  };

  useEffect(() => {
    const nodes = createLayout();
    const links: GraphLink[] = [];
    
    // Auto-generate links to centers
    nodes.forEach(node => {
      if (!node.id.startsWith('center-')) {
        links.push({ source: node.id, target: `center-${node.category}`, strength: 0.5 });
      }
    });

    setGraphData({ nodes, links });
  }, []);

  const handleNodeClick = (nodeId: string) => { 
    setSelectedSkill(nodeId); 
    setShowInfo(true); 
  };

  const selectedNode = selectedSkill ? graphData.nodes.find(n => n.id === selectedSkill) : null;
  const needsWhiteBackground = ['Vite', 'Flask', 'Linux', 'VS Code', 'Postman', 'Git', 'IBM Qiskit'];

  return (
    <section id="skills" style={{ padding: '80px 2rem', backgroundColor: theme.bg, minHeight: '100vh', position: 'relative' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: theme.text, letterSpacing: '-0.03em' }}>Expertise Graph</h1>
          <p style={{ color: theme.textSecondary, fontSize: '1.1rem' }}>Technical landscape and core competencies</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '2rem' }}>
          {/* CATEGORY SELECTOR */}
          <div style={{ background: theme.cardBg, borderRadius: '24px', padding: '1.5rem', border: `1px solid ${theme.border}`, height: 'fit-content' }}>
            <h3 style={{ color: theme.accent, fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1rem', marginBottom: '1.5rem', textTransform: 'uppercase' }}>Filter Categories</h3>
            {Object.keys(skillsData).map(cat => (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)} 
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '12px 16px', 
                  background: activeCategory === cat ? `${theme.accent}15` : 'transparent', 
                  color: activeCategory === cat ? theme.accent : '#aaa', 
                  border: 'none', textAlign: 'left', cursor: 'pointer', borderRadius: '12px', 
                  fontSize: '0.9rem', fontWeight: 600, marginBottom: '8px', transition: '0.2s' 
                }}
              >
                <img src={categoryIcons[cat]} style={{ width: '18px', height: '18px', filter: activeCategory === cat ? 'none' : 'grayscale(1)' }} alt="" />
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          {/* GRAPH AREA */}
          <div style={{ background: theme.cardBg, borderRadius: '24px', border: `1px solid ${theme.border}`, position: 'relative', height: '700px', overflow: 'hidden' }}>
            <svg width="100%" height="100%" viewBox="0 0 900 700" style={{ background: `radial-gradient(circle at center, ${theme.cardBg} 0%, ${theme.bg} 100%)` }}>
              {graphData.links.filter(l => {
                const s = graphData.nodes.find(n => n.id === l.source);
                const t = graphData.nodes.find(n => n.id === l.target);
                return s?.category === activeCategory || t?.category === activeCategory;
              }).map((link, i) => {
                const s = graphData.nodes.find(n => n.id === link.source);
                const t = graphData.nodes.find(n => n.id === link.target);
                if (!s || !t) return null;
                return <line key={i} x1={s.x} y1={s.y} x2={t.x} y2={t.y} stroke={theme.accent} strokeWidth="1.5" opacity="0.15" />;
              })}
              
              {graphData.nodes.filter(n => n.id.startsWith('center-') || n.category === activeCategory).map((node) => {
                const isCenter = node.id.startsWith('center-');
                const isSelected = selectedSkill === node.id;
                const radius = isCenter ? 38 : 24;
                return (
                  <g key={node.id} style={{ cursor: 'pointer' }} onClick={() => handleNodeClick(node.id)}>
                    {isSelected && <circle r={radius + 12} fill={node.color} opacity="0.15" />}
                    {needsWhiteBackground.includes(node.name) && !isCenter && <circle r={radius-2} fill="white" />}
                    <circle r={radius} fill={isCenter ? node.color : `${node.color}20`} stroke={node.color} strokeWidth={isSelected ? 3 : 1.5} />
                    <image href={isCenter ? categoryIcons[node.category] : techIcons[node.name]} x={isCenter ? -18 : -14} y={isCenter ? -18 : -14} width={isCenter ? 36 : 28} height={isCenter ? 36 : 28} />
                    <text textAnchor="middle" y={radius + 20} fill="#fff" fontSize="10" fontWeight="500" opacity="0.8">{node.name}</text>
                  </g>
                );
              })}
            </svg>

            {/* INFO PANEL */}
            {showInfo && selectedNode && (
              <div className="info-panel" style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', width: '320px', background: 'rgba(15, 15, 20, 0.9)', borderRadius: '20px', border: `1px solid ${theme.border}`, padding: '1.5rem', backdropFilter: 'blur(20px)', animation: 'slideIn 0.3s ease-out' }}>
                <button onClick={() => setShowInfo(false)} style={{ float: 'right', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>✕</button>
                <h3 style={{ color: theme.accent, marginTop: 0 }}>{selectedNode.name}</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: 1.6 }}>{selectedNode.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>
    </section>
  );
};

export default Skills;