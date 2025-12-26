import React, { useState, useMemo, useEffect } from 'react';

interface SkillsProps { theme: any; }

interface GraphNode {
  id: string;
  name: string;
  color: string;
  category: string;
  x: number;
  y: number;
  intro: string;
}

const Skills: React.FC<SkillsProps> = ({ theme }) => {
  const [activeCategory, setActiveCategory] = useState<string>('programming');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  // High-fidelity data with clear intros
  const techData: Record<string, { icon: string; intro: string }> = {
    'Python': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', intro: 'An interpreted high-level language serving as the core engine for AI/ML and modern backend services.' },
    'Java': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', intro: 'A robust, object-oriented language optimized for enterprise systems and high-concurrency architecture.' },
    'JavaScript': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', intro: 'The universal language of the web, driving interactivity and complex client-side application logic.' },
    'C': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg', intro: 'Foundational systems language used for low-level computing and performance-critical operations.' },
    'React.js': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', intro: 'A declarative component library for building modern, high-performance user interfaces.' },
    'Vite': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg', intro: 'Next-gen build tool providing an incredibly fast development environment and optimized bundles.' },
    'TailwindCSS': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', intro: 'Utility-first styling framework designed for rapid, modular, and consistent UI design.' },
    'Node.js': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', intro: 'High-performance JavaScript runtime built on the V8 engine for scalable network applications.' },
    'Express.js': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', intro: 'Minimalist and flexible web framework for Node.js, providing robust features for APIs.' },
    'FastAPI': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg', intro: 'Modern Python framework for building high-performance APIs based on standard type hints.' },
    'Flask': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg', intro: 'Lightweight WSGI web application framework designed for rapid deployment and modularity.' },
    'MongoDB': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', intro: 'Scalable NoSQL document database designed for ease of development and high availability.' },
    'Neo4j': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/neo4j/neo4j-original.svg', intro: 'Native graph database that optimizes relationship mapping for complex data structures.' },
    'PostgreSQL': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', intro: 'Advanced open-source relational database engine with 30+ years of proven reliability.' },
    'Supabase': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg', intro: 'Open-source Firebase alternative providing a complete backend stack with real-time capabilities.' },
    'IBM Qiskit': { icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Qiskit-Logo.svg/1024px-Qiskit-Logo.svg.png', intro: 'Open-source SDK for circuit design and algorithm development on quantum computers.' },
    'Scikit-learn': { icon: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg', intro: 'Essential library for predictive data analysis, providing robust machine learning tools for Python.' },
    'Git': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', intro: 'Industry-standard distributed version control system for tracking source code changes.' },
    'Linux': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', intro: 'Secure, open-source operating system that serves as the backbone of global server infrastructure.' },
    'VS Code': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', intro: 'Extensible code editor with professional support for debugging and modern development flows.' },
    'Postman': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg', intro: 'Leading API platform for developers to design, test, and collaborate on API development.' }
  };

  const skillsData = {
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
      { id: 'center-programming', name: 'Langs', category: 'programming', x: 450, y: 110 },
      { id: 'center-frontend', name: 'UI/UX', category: 'frontend', x: 200, y: 220 },
      { id: 'center-backend', name: 'Core', category: 'backend', x: 700, y: 220 },
      { id: 'center-databases', name: 'Data', category: 'databases', x: 700, y: 460 },
      { id: 'center-tools', name: 'DevOps', category: 'tools', x: 200, y: 460 },
      { id: 'center-ai', name: 'ML/Q', category: 'ai', x: 450, y: 340 }
    ];

    centers.forEach(c => nodes.push({ ...c, color: '#ffffff', intro: '' }));

    Object.entries(skillsData).forEach(([category, data]) => {
      const center = centers.find(c => c.category === category);
      if (!center) return;
      const radius = 95; 
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
          intro: techData[skillName]?.intro || ''
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
          {/* NAVIGATION SIDEBAR */}
          <aside style={{ ...styles.sidebar, background: theme.cardBg }}>
            <span style={styles.label}>REGISTRY</span>
            {Object.keys(skillsData).map(cat => (
              <button key={cat} onClick={() => {setActiveCategory(cat); setSelectedSkill(null);}}
                style={{ ...styles.navBtn, 
                  color: activeCategory === cat ? theme.accent : 'rgba(255,255,255,0.25)',
                  background: activeCategory === cat ? `${theme.accent}12` : 'transparent'
                }}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </aside>

          {/* VISUALIZATION CORE */}
          <div style={{ ...styles.canvas, borderColor: theme.border }}>
            <svg width="100%" height="100%" viewBox="0 0 900 600">
              <defs>
                <filter id="appleGlow"><feGaussianBlur stdDeviation="3.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              </defs>

              {graphNodes.filter(n => !n.id.startsWith('center-') && n.category === activeCategory).map(node => (
                <line key={`line-${node.id}`} x1={node.x} y1={node.y} 
                  x2={graphNodes.find(c => c.id === `center-${node.category}`)?.x}
                  y2={graphNodes.find(c => c.id === `center-${node.category}`)?.y}
                  stroke={node.color} strokeWidth="1" opacity="0.12" 
                />
              ))}

              {graphNodes.filter(n => n.id.startsWith('center-') || n.category === activeCategory).map(node => {
                const isCenter = node.id.startsWith('center-');
                const isSelected = selectedSkill === node.id;
                const radius = isCenter ? 26 : 32; 
                
                return (
                  <g key={node.id} onClick={() => setSelectedSkill(node.id)} style={{ cursor: 'pointer' }}>
                    <circle cx={node.x} cy={node.y} r={radius + 8} fill={node.color} opacity={isSelected ? 0.3 : 0.04} />
                    <circle cx={node.x} cy={node.y} r={radius} fill="#080808" stroke={isSelected ? theme.accent : `${node.color}40`} strokeWidth={isSelected ? 2.5 : 1} filter={isSelected ? "url(#appleGlow)" : ""} />
                    
                    {!isCenter && techData[node.name] && (
                      <image 
                        href={techData[node.name].icon} 
                        x={node.x - 17} 
                        y={node.y - 17} 
                        width="34" 
                        height="34" 
                      />
                    )}
                    
                    {isCenter && (
                      <text x={node.x} y={node.y + 4} textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="900" opacity="0.3" letterSpacing="1px">{node.name.toUpperCase()}</text>
                    )}
                    <text x={node.x} y={node.y + radius + 15} textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="700" opacity={isSelected ? 1 : 0.5}>{node.name}</text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* TECHNICAL BRIEF PANEL */}
          <aside style={{ ...styles.sidebar, width: '300px', background: theme.cardBg }}>
            <span style={styles.label}>TECHNICAL BRIEF</span>
            {selectedNode && !selectedNode.id.startsWith('center-') ? (
              <div style={styles.infoContent}>
                <div style={styles.briefHeader}>
                  <div style={{...styles.iconWrapper, backgroundColor: `${selectedNode.color}15`, borderColor: selectedNode.color }}>
                    <img src={techData[selectedNode.name].icon} style={{ width: '28px' }} alt="" />
                  </div>
                  <h3 style={{ color: '#ffffff', margin: 0, fontSize: '18px', fontWeight: 700 }}>{selectedNode.name}</h3>
                </div>
                
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', lineHeight: '1.7', marginTop: '22px' }}>
                  {selectedNode.intro}
                </p>

                <div style={styles.briefMetrics}>
                  <div style={styles.metricRow}>
                    <span style={styles.metricKey}>CATEGORY</span>
                    <span style={styles.metricVal}>{selectedNode.category.toUpperCase()}</span>
                  </div>
                  <div style={styles.metricRow}>
                    <span style={styles.metricKey}>ID_REG</span>
                    <span style={{...styles.metricVal, color: theme.accent }}>{selectedNode.id.toUpperCase().substring(0, 8)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div style={styles.idleState}>SELECT NODE TO INITIATE SYSTEM FETCH</div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  container: { maxWidth: '1400px', width: '100%', padding: '0 30px' },
  layout: { display: 'grid', gridTemplateColumns: '150px 1fr 300px', gap: '25px', height: '560px' },
  sidebar: { padding: '24px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.04)', backdropFilter: 'blur(40px)', position: 'relative' as const },
  label: { fontSize: '9px', fontWeight: 900, color: 'rgba(255,255,255,0.12)', letterSpacing: '2.5px', display: 'block', marginBottom: '35px' },
  navBtn: { width: '100%', padding: '14px', border: 'none', borderRadius: '15px', textAlign: 'left' as const, fontSize: '11px', fontWeight: 700, cursor: 'pointer', marginBottom: '10px', transition: '0.2s ease' },
  canvas: { background: '#000000', borderRadius: '40px', border: '1px solid', position: 'relative' as const, overflow: 'hidden' },
  infoContent: { animation: 'fadeIn 0.5s cubic-bezier(0.19, 1, 0.22, 1)' },
  briefHeader: { display: 'flex', alignItems: 'center', gap: '16px' },
  iconWrapper: { width: '48px', height: '48px', borderRadius: '14px', border: '1px solid', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  briefMetrics: { marginTop: '45px', display: 'flex', flexDirection: 'column' as const, gap: '16px' },
  metricRow: { display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '12px' },
  metricKey: { fontSize: '9px', color: 'rgba(255,255,255,0.18)', fontWeight: 800, letterSpacing: '0.5px' },
  metricVal: { fontSize: '10px', color: '#ffffff', fontWeight: 700 },
  idleState: { color: 'rgba(255,255,255,0.06)', fontSize: '11px', textAlign: 'center' as const, marginTop: '130px', letterSpacing: '1.2px', fontWeight: 700 }
};

export default Skills;