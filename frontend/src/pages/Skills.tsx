import React, { useState, useMemo, useEffect } from 'react';

interface SkillsProps { theme: any; }

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

  const techData: Record<string, { icon: string; url: string; desc: string }> = {
    'Python': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', url: 'https://www.python.org/', desc: 'Core language for AI/ML and backend architecture.' },
    'Java': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', url: 'https://www.java.com/', desc: 'Enterprise-grade logic and systems engineering.' },
    'JavaScript': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', url: 'https://developer.mozilla.org', desc: 'Core web engine for interactive environments.' },
    'C': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg', url: 'https://en.cppreference.com/w/c', desc: 'Low-level systems and foundational logic.' },
    'React.js': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', url: 'https://react.dev/', desc: 'Declarative UI library for complex interfaces.' },
    'Vite': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg', url: 'https://vitejs.dev/', desc: 'High-speed frontend build tooling.' },
    'TailwindCSS': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', url: 'https://tailwindcss.com/', desc: 'Utility-first CSS framework for modern design.' },
    'Node.js': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', url: 'https://nodejs.org/', desc: 'High-performance JavaScript runtime.' },
    'Express.js': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', url: 'https://expressjs.com/', desc: 'Lightweight web framework for Node.js.' },
    'FastAPI': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg', url: 'https://fastapi.tiangolo.com/', desc: 'Modern, high-speed Python API framework.' },
    'Flask': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg', url: 'https://flask.palletsprojects.com/', desc: 'Micro web framework for rapid development.' },
    'MongoDB': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', url: 'https://www.mongodb.com/', desc: 'Scalable NoSQL document database.' },
    'Neo4j': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/neo4j/neo4j-original.svg', url: 'https://neo4j.com/', desc: 'Native graph database for relationship mapping.' },
    'PostgreSQL': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', url: 'https://www.postgresql.org/', desc: 'Advanced relational database engine.' },
    'Supabase': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg', url: 'https://supabase.com/', desc: 'Open-source Firebase alternative.' },
    'IBM Qiskit': { icon: 'https://avatars.githubusercontent.com/u/31031201?s=200&v=4', url: 'https://qiskit.org/', desc: 'Quantum Computing SDK for algorithm design.' },
    'Scikit-learn': { icon: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg', url: 'https://scikit-learn.org/', desc: 'Machine learning library for Python.' },
    'Git': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', url: 'https://git-scm.com/', desc: 'Distributed version control system.' },
    'Linux': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', url: 'https://linux.org/', desc: 'Robust open-source operating system.' },
    'VS Code': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', url: 'https://code.visualstudio.com/', desc: 'Industry-standard development environment.' },
    'Postman': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg', url: 'https://postman.com/', desc: 'API development and testing platform.' }
  };

  const skillsData = {
    'programming': { title: 'Languages', color: '#8E8E93', skills: ['Python', 'Java', 'JavaScript', 'C'] },
    'frontend': { title: 'Frontend', color: '#007AFF', skills: ['React.js', 'Vite', 'TailwindCSS'] },
    'backend': { title: 'Backend', color: '#34C759', skills: ['Node.js', 'Express.js', 'FastAPI', 'Flask'] },
    'databases': { title: 'Databases', color: '#FF3B30', skills: ['MongoDB', 'Neo4j', 'PostgreSQL', 'Supabase'] },
    'ai': { title: 'AI & Quantum', color: '#FF9500', skills: ['Scikit-learn', 'IBM Qiskit'] },
    'tools': { title: 'Tools', color: '#AF52DE', skills: ['Git', 'Linux', 'VS Code', 'Postman'] }
  };

  const graphNodes = useMemo(() => {
    const nodes: GraphNode[] = [];
    const centers = [
      { id: 'center-programming', name: 'Languages', category: 'programming', x: 450, y: 120 },
      { id: 'center-frontend', name: 'Frontend', category: 'frontend', x: 220, y: 240 },
      { id: 'center-backend', name: 'Backend', category: 'backend', x: 680, y: 240 },
      { id: 'center-databases', name: 'Databases', category: 'databases', x: 680, y: 440 },
      { id: 'center-tools', name: 'Tools', category: 'tools', x: 220, y: 440 },
      { id: 'center-ai', name: 'AI & Quantum', category: 'ai', x: 450, y: 320 }
    ];

    centers.forEach(c => nodes.push({ ...c, color: skillsData[c.category as keyof typeof skillsData].color }));

    Object.entries(skillsData).forEach(([category, data]) => {
      const center = centers.find(c => c.category === category);
      if (!center) return;
      const radius = 95; // Compacted for zero-scroll
      const angleStep = (2 * Math.PI) / data.skills.length;
      data.skills.forEach((skillName, index) => {
        const angle = (-Math.PI / 2) + (angleStep * index);
        nodes.push({
          id: skillName,
          name: skillName,
          color: data.color,
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
        <div style={styles.layout}>
          {/* LEFT: NAV */}
          <aside style={{ ...styles.sidebar, background: theme.cardBg }}>
            <span style={styles.label}>REGISTRY</span>
            {Object.keys(skillsData).map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                style={{ ...styles.navBtn, 
                  color: activeCategory === cat ? theme.accent : 'rgba(255,255,255,0.3)',
                  background: activeCategory === cat ? `${theme.accent}15` : 'transparent'
                }}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </aside>

          {/* CENTER: CANVAS */}
          <div style={{ ...styles.canvas, borderColor: theme.border }}>
            <svg width="100%" height="100%" viewBox="0 0 900 600">
              {graphNodes.filter(n => !n.id.startsWith('center-') && n.category === activeCategory).map(node => (
                <line key={node.id} x1={node.x} y1={node.y} 
                  x2={graphNodes.find(c => c.id === `center-${node.category}`)?.x}
                  y2={graphNodes.find(c => c.id === `center-${node.category}`)?.y}
                  stroke={theme.accent} strokeWidth="1" opacity="0.1" 
                />
              ))}

              {graphNodes.filter(n => n.id.startsWith('center-') || n.category === activeCategory).map(node => {
                const isCenter = node.id.startsWith('center-');
                const isSelected = selectedSkill === node.id;
                const radius = isCenter ? 32 : 24;
                return (
                  <g key={node.id} onClick={() => setSelectedSkill(node.id)} style={{ cursor: 'pointer' }}>
                    <circle cx={node.x} cy={node.y} r={radius + 6} fill={node.color} opacity={isSelected ? 0.3 : 0.05} />
                    <circle cx={node.x} cy={node.y} r={radius} fill="#0a0a0c" stroke={isSelected ? theme.accent : `${node.color}50`} strokeWidth={isSelected ? 2 : 1} />
                    {!isCenter && techData[node.name] && (
                      <image href={techData[node.name].icon} x={node.x - 12} y={node.y - 12} width="24" height="24" />
                    )}
                    {isCenter && (
                      <text x={node.x} y={node.y + 4} textAnchor="middle" fill="#fff" fontSize="8" fontWeight="800" opacity="0.4">{node.name.substring(0, 3)}</text>
                    )}
                    <text x={node.x} y={node.y + radius + 15} textAnchor="middle" fill="#fff" fontSize="9" fontWeight="600" opacity="0.7">{node.name}</text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* RIGHT: INFO PANEL */}
          <aside style={{ ...styles.sidebar, width: '280px', background: theme.cardBg }}>
            <span style={styles.label}>SPECIFICATIONS</span>
            {selectedNode && !selectedNode.id.startsWith('center-') ? (
              <div style={styles.specContent}>
                <h3 style={{ color: theme.accent, margin: '0 0 10px 0', fontSize: '18px' }}>{selectedNode.name}</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', lineHeight: '1.6' }}>{selectedNode.description}</p>
                <button onClick={() => window.open(selectedNode.url, '_blank')} style={styles.linkBtn}>
                  Official Documentation ↗
                </button>
                <div style={styles.footer}>
                  <span>ENGINE_STATUS: NOMINAL</span>
                  <span>ID: {selectedNode.id.toUpperCase()}</span>
                </div>
              </div>
            ) : (
              <div style={styles.emptyState}>FETCHING_DATA...</div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  container: { maxWidth: '1300px', width: '100%', padding: '0 20px' },
  layout: { display: 'grid', gridTemplateColumns: '180px 1fr 280px', gap: '20px', height: '600px' },
  sidebar: { padding: '20px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(30px)' },
  label: { fontSize: '8px', fontWeight: 900, color: 'rgba(255,255,255,0.2)', letterSpacing: '2px', display: 'block', marginBottom: '20px' },
  navBtn: { width: '100%', padding: '12px', border: 'none', borderRadius: '12px', textAlign: 'left' as const, fontSize: '10px', fontWeight: 800, cursor: 'pointer', marginBottom: '6px', transition: '0.2s' },
  canvas: { background: '#000', borderRadius: '32px', border: '1px solid', position: 'relative' as const, boxShadow: 'inset 0 0 80px rgba(0,0,0,0.8)' },
  specContent: { animation: 'fadeIn 0.4s ease-out' },
  linkBtn: { marginTop: '20px', padding: '10px', width: '100%', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#fff', fontSize: '10px', fontWeight: 700, cursor: 'pointer' },
  footer: { marginTop: '40px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px', display: 'flex', flexDirection: 'column' as const, gap: '4px', fontSize: '8px', color: 'rgba(255,255,255,0.15)', letterSpacing: '1px' },
  emptyState: { color: 'rgba(255,255,255,0.1)', fontSize: '10px', textAlign: 'center' as const, marginTop: '100px', letterSpacing: '1px' }
};

export default Skills;