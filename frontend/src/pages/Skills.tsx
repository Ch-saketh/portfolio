import React, { useState, useMemo, useEffect } from 'react';

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
  url?: string;
}

const Skills: React.FC<SkillsProps> = ({ theme }) => {
  const [activeCategory, setActiveCategory] = useState<string>('programming');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  // Resume data mapped to high-quality SVG logos
  const techData: Record<string, { icon: string; url: string; desc: string }> = {
    'Python': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', url: 'https://www.python.org/', desc: 'Primary language for AI/ML and Backend development.' },
    'Java': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', url: 'https://www.java.com/', desc: 'High-performance object-oriented programming for enterprise logic.' },
    'JavaScript': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', desc: 'Core language for interactive web and Electron development.' },
    'C': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg', url: 'https://en.cppreference.com/w/c', desc: 'Foundational systems programming and hardware-level logic.' },
    'React.js': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', url: 'https://react.dev/', desc: 'Main library for building dynamic and responsive user interfaces.' },
    'Vite': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg', url: 'https://vitejs.dev/', desc: 'Next-generation frontend tool providing fast builds.' },
    'TailwindCSS': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', url: 'https://tailwindcss.com/', desc: 'Utility-first CSS framework for modern styling.' },
    'Node.js': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', url: 'https://nodejs.org/', desc: 'JavaScript runtime built on Chrome\'s V8 engine.' },
    'Express.js': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', url: 'https://expressjs.com/', desc: 'Minimalist web framework for Node.js.' },
    'FastAPI': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg', url: 'https://fastapi.tiangolo.com/', desc: 'High-performance Python API framework.' },
    'Flask': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg', url: 'https://flask.palletsprojects.com/', desc: 'Lightweight WSGI web application framework.' },
    'MongoDB': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', url: 'https://www.mongodb.com/', desc: 'NoSQL document database for scalable data storage.' },
    'Neo4j': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/neo4j/neo4j-original.svg', url: 'https://neo4j.com/', desc: 'Graph database optimized for relationship-heavy data.' },
    'PostgreSQL': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', url: 'https://www.postgresql.org/', desc: 'Advanced open-source relational database.' },
    'Supabase': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg', url: 'https://supabase.com/', desc: 'Open source Firebase alternative for database and auth.' },
    'IBM Qiskit': { icon: 'https://avatars.githubusercontent.com/u/31031201?s=200&v=4', url: 'https://qiskit.org/', desc: 'Quantum Computing SDK for circuit design and simulation.' },
    'Scikit-learn': { icon: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg', url: 'https://scikit-learn.org/', desc: 'Machine Learning library for predictive data analysis.' },
    'Git': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', url: 'https://git-scm.com/', desc: 'Distributed version control system.' },
    'Linux': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', url: 'https://www.linux.org/', desc: 'Secure and open-source operating system environment.' },
    'VS Code': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', url: 'https://code.visualstudio.com/', desc: 'Primary code editor for modern development.' },
    'Postman': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg', url: 'https://www.postman.com/', desc: 'Platform for building and testing APIs.' }
  };

  const skillsData = {
    'programming': { title: 'Languages', skills: ['Python', 'Java', 'JavaScript', 'C'] },
    'frontend': { title: 'Frontend', skills: ['React.js', 'Vite', 'TailwindCSS'] },
    'backend': { title: 'Backend', skills: ['Node.js', 'Express.js', 'FastAPI', 'Flask'] },
    'databases': { title: 'Databases', skills: ['MongoDB', 'Neo4j', 'PostgreSQL', 'Supabase'] },
    'ai': { title: 'AI & Quantum', skills: ['Scikit-learn', 'IBM Qiskit'] },
    'tools': { title: 'Tools', skills: ['Git', 'Linux', 'VS Code', 'Postman'] }
  };

  const graphNodes = useMemo(() => {
    const nodes: GraphNode[] = [];
    const centers = [
      { id: 'center-programming', name: 'Languages', color: '#8E8E93', category: 'programming', x: 450, y: 150 },
      { id: 'center-frontend', name: 'Frontend', color: '#007AFF', category: 'frontend', x: 200, y: 300 },
      { id: 'center-backend', name: 'Backend', color: '#34C759', category: 'backend', x: 700, y: 300 },
      { id: 'center-databases', name: 'Databases', color: '#FF3B30', category: 'databases', x: 700, y: 550 },
      { id: 'center-tools', name: 'Tools', color: '#AF52DE', category: 'tools', x: 200, y: 550 },
      { id: 'center-ai', name: 'AI & Quantum', color: '#FF9500', category: 'ai', x: 450, y: 400 }
    ];

    centers.forEach(c => nodes.push(c));

    Object.entries(skillsData).forEach(([category, data]) => {
      const center = centers.find(c => c.category === category);
      if (!center) return;
      const radius = 115;
      const angleStep = (2 * Math.PI) / data.skills.length;
      data.skills.forEach((skillName, index) => {
        const angle = (-Math.PI / 2) + (angleStep * index);
        nodes.push({
          id: skillName,
          name: skillName,
          color: centers.find(c => c.category === category)?.color || '#fff',
          category,
          x: center.x + radius * Math.cos(angle),
          y: center.y + radius * Math.sin(angle),
          description: techData[skillName]?.desc,
          url: techData[skillName]?.url
        });
      });
    });
    return nodes;
  }, []);

  const selectedNode = graphNodes.find(n => n.id === selectedSkill);

  return (
    <section id="skills" style={{ ...styles.section, backgroundColor: theme.bg }}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={{ ...styles.title, color: theme.text }}>Technical Registry</h1>
          <p style={styles.subtitle}>Click a node to view technical specifications and documentation.</p>
        </div>

        <div style={styles.layout}>
          {/* LEFT: FILTER CATEGORIES */}
          <aside style={{ ...styles.sidebar, background: theme.cardBg }}>
            <span style={styles.sidebarLabel}>FILTER_BY_DOMAIN</span>
            {Object.keys(skillsData).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  ...styles.sideBtn,
                  background: activeCategory === cat ? `${theme.accent}15` : 'transparent',
                  color: activeCategory === cat ? theme.accent : 'rgba(255,255,255,0.4)',
                  borderColor: activeCategory === cat ? `${theme.accent}40` : 'transparent'
                }}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </aside>

          {/* CENTER: GRAPH VISUALIZER */}
          <div style={{ ...styles.graphBox, background: '#000', borderColor: theme.border }}>
            <svg width="100%" height="100%" viewBox="0 0 900 700">
              {graphNodes.filter(n => !n.id.startsWith('center-') && n.category === activeCategory).map(node => (
                <line
                  key={`line-${node.id}`}
                  x1={node.x} y1={node.y}
                  x2={graphNodes.find(c => c.id === `center-${node.category}`)?.x}
                  y2={graphNodes.find(c => c.id === `center-${node.category}`)?.y}
                  stroke={node.color} strokeWidth="1" opacity="0.1"
                />
              ))}

              {graphNodes.filter(n => n.id.startsWith('center-') || n.category === activeCategory).map(node => {
                const isCenter = node.id.startsWith('center-');
                const isSelected = selectedSkill === node.id;
                const radius = isCenter ? 36 : 28;

                return (
                  <g key={node.id} onClick={() => setSelectedSkill(node.id)} style={{ cursor: 'pointer' }} className="node-group">
                    <circle cx={node.x} cy={node.y} r={radius + 8} fill={node.color} opacity={isSelected ? 0.3 : 0.05} />
                    <circle cx={node.x} cy={node.y} r={radius} fill="#111" stroke={isSelected ? theme.accent : `${node.color}80`} strokeWidth={isSelected ? 3 : 1} />
                    
                    {!isCenter && techData[node.name] && (
                      <image href={techData[node.name].icon} x={node.x - 14} y={node.y - 14} width="28" height="28" />
                    )}
                    
                    {isCenter && (
                      <text x={node.x} y={node.y + 4} textAnchor="middle" fill="#fff" fontSize="10" fontWeight="800" letterSpacing="1px">{node.name.substring(0, 3).toUpperCase()}</text>
                    )}

                    <text x={node.x} y={node.y + radius + 18} textAnchor="middle" fill="#fff" fontSize="10" fontWeight="600" opacity="0.8">{node.name}</text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* RIGHT: PERSISTENT INFO PANEL */}
          <aside style={{ ...styles.sidebar, width: '300px', background: theme.cardBg }}>
            <span style={styles.sidebarLabel}>TECHNICAL_SPECIFICATIONS</span>
            {selectedNode && !selectedNode.id.startsWith('center-') ? (
              <div style={styles.infoContent}>
                <div style={styles.infoHeader}>
                   <img src={techData[selectedNode.name].icon} style={{ width: '40px' }} alt="" />
                   <h3 style={{ color: theme.accent, margin: 0 }}>{selectedNode.name}</h3>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', lineHeight: '1.6', margin: '15px 0' }}>
                  {selectedNode.description}
                </p>
                <button 
                  onClick={() => window.open(selectedNode.url, '_blank')}
                  style={{ ...styles.docBtn, background: theme.accent }}
                >
                  Visit Official Docs
                </button>
                <div style={styles.statusFooter}>
                  <span>STATUS: VERIFIED</span>
                  <span>ID: {selectedNode.id.toUpperCase()}</span>
                </div>
              </div>
            ) : (
              <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: '12px', textAlign: 'center', marginTop: '60px', letterSpacing: '1px' }}>
                SELECT A NODE TO FETCH RELEVANT DATA
              </div>
            )}
          </aside>
        </div>
      </div>

      <style>{`
        .node-group { transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1); }
        .node-group:hover { transform: scale(1.05); }
      `}</style>
    </section>
  );
};

const styles = {
  section: { minHeight: '100vh', padding: '100px 20px', display: 'flex', justifyContent: 'center' },
  container: { maxWidth: '1400px', width: '100%' },
  header: { textAlign: 'center' as const, marginBottom: '60px' },
  title: { fontSize: '48px', fontWeight: 800, letterSpacing: '-0.05em', margin: 0 },
  subtitle: { fontSize: '15px', color: 'rgba(255,255,255,0.4)', marginTop: '8px' },
  layout: { display: 'grid', gridTemplateColumns: '200px 1fr 300px', gap: '20px' },
  sidebar: { padding: '24px', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)', height: '700px', display: 'flex', flexDirection: 'column' as const },
  sidebarLabel: { fontSize: '9px', fontWeight: 900, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', display: 'block', marginBottom: '25px' },
  sideBtn: { width: '100%', padding: '14px', border: '1px solid transparent', borderRadius: '16px', textAlign: 'left' as const, fontSize: '11px', fontWeight: 700, cursor: 'pointer', marginBottom: '8px', transition: '0.3s' },
  graphBox: { borderRadius: '40px', border: '1px solid', position: 'relative' as const, height: '700px', overflow: 'hidden' },
  infoContent: { display: 'flex', flexDirection: 'column' as const, animation: 'fadeIn 0.4s ease-out' },
  infoHeader: { display: 'flex', alignItems: 'center', gap: '15px' },
  docBtn: { padding: '12px', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: 700, fontSize: '12px', cursor: 'pointer', marginTop: '10px' },
  statusFooter: { marginTop: '30px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px', display: 'flex', flexDirection: 'column' as const, gap: '5px', fontSize: '9px', color: 'rgba(255,255,255,0.2)', letterSpacing: '1px' }
};

export default Skills;