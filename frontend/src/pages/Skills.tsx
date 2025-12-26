import React, { useState, useMemo } from 'react';

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

  const techData: Record<string, { icon: string; intro: string }> = {
    'Python': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', intro: 'An interpreted high-level language that serves as the backbone for AI, data science, and modern backend engineering.' },
    'Java': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', intro: 'A robust, class-based object-oriented language designed for high-performance enterprise systems.' },
    'JavaScript': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', intro: 'The engine of the modern web, enabling complex interactivity and high-performance logic.' },
    'C': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg', intro: 'The foundational language of computing, used for systems programming and hardware interfacing.' },
    'React.js': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', intro: 'A declarative component-based library that revolutionized user interface development.' },
    'Vite': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg', intro: 'A lightning-fast build tool providing a superior developer experience and optimized production builds.' },
    'TailwindCSS': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', intro: 'A utility-first styling framework for rapid, modular design systems.' },
    'Node.js': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', intro: 'A cross-platform JavaScript runtime environment perfect for scalable network apps.' },
    'Express.js': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', intro: 'A minimalist web framework for Node.js, providing robust features for web development.' },
    'FastAPI': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg', intro: 'A modern, high-performance web framework for building APIs with Python 3.7+.' },
    'Flask': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg', intro: 'A lightweight WSGI web application framework designed for quick and easy start-ups.' },
    'MongoDB': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', intro: 'A leading NoSQL database designed for ease of development and scaling.' },
    'Neo4j': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/neo4j/neo4j-original.svg', intro: 'A high-performance graph database that treats relationships as first-class citizens.' },
    'PostgreSQL': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', intro: 'A powerful, open-source object-relational database system with over 30 years of development.' },
    'Supabase': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg', intro: 'An open-source Firebase alternative providing a complete backend solution.' },
    'IBM Qiskit': { icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Qiskit-Logo.svg/1024px-Qiskit-Logo.svg.png', intro: 'An open-source SDK for working with quantum computers at the level of circuits and algorithms.' },
    'Scikit-learn': { icon: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg', intro: 'Simple and efficient tools for predictive data analysis built on NumPy and SciPy.' },
    'Git': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', intro: 'A distributed version control system for tracking changes in source code during development.' },
    'Linux': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', intro: 'A family of open-source Unix-like operating systems serving as the foundation for global infrastructure.' },
    'VS Code': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', intro: 'A streamlined code editor with massive support for debugging and version control.' },
    'Postman': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg', intro: 'An API platform for developers to design, build, and test APIs efficiently.' }
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

    centers.forEach(c => nodes.push({ ...c, color: '#fff', intro: '' }));

    Object.entries(skillsData).forEach(([category, data]) => {
      const center = centers.find(c => c.category === category);
      if (!center) return;
      const radius = 90; 
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
          intro: techData[skillName]?.intro
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
          {/* LEFT SIDEBAR: CATEGORIES */}
          <aside style={{ ...styles.sidebar, background: theme.cardBg }}>
            <span style={styles.label}>REGISTRY</span>
            {Object.keys(skillsData).map(cat => (
              <button key={cat} onClick={() => {setActiveCategory(cat); setSelectedSkill(null);}}
                style={{ ...styles.navBtn, 
                  color: activeCategory === cat ? theme.accent : 'rgba(255,255,255,0.2)',
                  background: activeCategory === cat ? `${theme.accent}10` : 'transparent'
                }}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </aside>

          {/* CENTRAL CANVAS: THE GRAPH */}
          <div style={{ ...styles.canvas, borderColor: theme.border }}>
            <svg width="100%" height="100%" viewBox="0 0 900 600" style={{ display: 'block' }}>
              <defs>
                <filter id="glow"><feGaussianBlur stdDeviation="3" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              </defs>

              {/* Drawing lines only for active category */}
              {graphNodes.filter(n => !n.id.startsWith('center-') && n.category === activeCategory).map(node => (
                <line key={`line-${node.id}`} x1={node.x} y1={node.y} 
                  x2={graphNodes.find(c => c.id === `center-${node.category}`)?.x}
                  y2={graphNodes.find(c => c.id === `center-${node.category}`)?.y}
                  stroke={node.color} strokeWidth="1" opacity="0.1" 
                />
              ))}

              {/* Drawing Nodes */}
              {graphNodes.filter(n => n.id.startsWith('center-') || n.category === activeCategory).map(node => {
                const isCenter = node.id.startsWith('center-');
                const isSelected = selectedSkill === node.id;
                const radius = isCenter ? 26 : 30; // Consistent sizes
                
                return (
                  <g key={node.id} onClick={() => setSelectedSkill(node.id)} style={{ cursor: 'pointer' }}>
                    {/* Background Glow */}
                    <circle cx={node.x} cy={node.y} r={radius + 8} fill={node.color} opacity={isSelected ? 0.3 : 0.04} />
                    
                    {/* Main Circle */}
                    <circle cx={node.x} cy={node.y} r={radius} fill="#080808" stroke={isSelected ? theme.accent : `${node.color}40`} strokeWidth={isSelected ? 2 : 1} filter={isSelected ? "url(#glow)" : ""} />
                    
                    {/* LOGO CENTERING: icon size is 34x34, so offset is -17 */}
                    {!isCenter && techData[node.name] && (
                      <image 
                        href={techData[node.name].icon} 
                        x={node.x - 17} 
                        y={node.y - 17} 
                        width="34" 
                        height="34" 
                        style={{ pointerEvents: 'none' }}
                      />
                    )}
                    
                    {/* Center Text (for clusters) */}
                    {isCenter && (
                      <text x={node.x} y={node.y + 4} textAnchor="middle" fill="#fff" fontSize="8" fontWeight="900" opacity="0.2" style={{ pointerEvents: 'none' }}>{node.name.toUpperCase()}</text>
                    )}

                    {/* Node Label */}
                    <text x={node.x} y={node.y + radius + 16} textAnchor="middle" fill="#fff" fontSize="10" fontWeight="600" opacity={isSelected ? 1 : 0.4} style={{ pointerEvents: 'none' }}>{node.name}</text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* RIGHT SIDEBAR: TECHNICAL BRIEF */}
          <aside style={{ ...styles.sidebar, width: '300px', background: theme.cardBg }}>
            <span style={styles.label}>TECHNICAL BRIEF</span>
            {selectedNode && !selectedNode.id.startsWith('center-') ? (
              <div style={styles.infoContent}>
                <div style={styles.infoTitleBlock}>
                  <div style={{...styles.iconGlow, backgroundColor: `${selectedNode.color}20`, borderColor: selectedNode.color }}>
                    <img src={techData[selectedNode.name].icon} style={{ width: '28px' }} alt="" />
                  </div>
                  <h3 style={{ color: '#fff', margin: 0, fontSize: '18px', fontWeight: 700 }}>{selectedNode.name}</h3>
                </div>
                
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', lineHeight: '1.7', marginTop: '20px' }}>
                  {selectedNode.intro}
                </p>

                <div style={styles.metricsBox}>
                  <div style={styles.metricRow}>
                    <span style={styles.mLabel}>DOMAIN</span>
                    <span style={styles.mVal}>{selectedNode.category.toUpperCase()}</span>
                  </div>
                  <div style={styles.metricRow}>
                    <span style={styles.mLabel}>STATUS</span>
                    <span style={{...styles.mVal, color: theme.accent }}>OPERATIONAL</span>
                  </div>
                </div>
              </div>
            ) : (
              <div style={styles.emptyState}>INITIATE MODULE SELECTION</div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  container: { maxWidth: '1350px', width: '100%', padding: '0 30px' },
  layout: { display: 'grid', gridTemplateColumns: '150px 1fr 300px', gap: '25px', height: '560px' },
  sidebar: { padding: '24px', borderRadius: '28px', border: '1px solid rgba(255,255,255,0.04)', backdropFilter: 'blur(40px)', position: 'relative' as const },
  label: { fontSize: '9px', fontWeight: 900, color: 'rgba(255,255,255,0.1)', letterSpacing: '2px', display: 'block', marginBottom: '30px' },
  navBtn: { width: '100%', padding: '14px', border: 'none', borderRadius: '14px', textAlign: 'left' as const, fontSize: '11px', fontWeight: 700, cursor: 'pointer', marginBottom: '10px', transition: '0.3s' },
  canvas: { background: '#000', borderRadius: '40px', border: '1px solid', position: 'relative' as const, overflow: 'hidden' },
  infoContent: { animation: 'fadeIn 0.5s ease-out' },
  infoTitleBlock: { display: 'flex', alignItems: 'center', gap: '15px' },
  iconGlow: { width: '48px', height: '48px', borderRadius: '14px', border: '1px solid', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  metricsBox: { marginTop: '40px', display: 'flex', flexDirection: 'column' as const, gap: '15px' },
  metricRow: { display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '10px' },
  mLabel: { fontSize: '9px', color: 'rgba(255,255,255,0.15)', fontWeight: 800 },
  mVal: { fontSize: '10px', color: '#fff', fontWeight: 700 },
  emptyState: { color: 'rgba(255,255,255,0.04)', fontSize: '11px', textAlign: 'center' as const, marginTop: '120px', letterSpacing: '1px', fontWeight: 700 }
};

export default Skills;