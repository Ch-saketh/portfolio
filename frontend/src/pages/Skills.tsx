import React, { useState, useEffect, useMemo } from 'react';

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
}

const Skills: React.FC<SkillsProps> = ({ theme }) => {
  const [activeCategory, setActiveCategory] = useState<string>('programming');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  // High-fidelity icons to match the premium look
  const categoryIcons: Record<string, string> = {
    'programming': 'https://cdn-icons-png.flaticon.com/512/2721/2721614.png',
    'frontend': 'https://cdn-icons-png.flaticon.com/512/5968/5968292.png',
    'backend': 'https://cdn-icons-png.flaticon.com/512/1086/1086581.png',
    'databases': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    'ai': 'https://cdn-icons-png.flaticon.com/512/2103/2103791.png',
    'tools': 'https://cdn-icons-png.flaticon.com/512/3248/3248193.png'
  };

  const techIcons: Record<string, string> = {
    'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    'Java': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    'C': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
    'React.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'Vite': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg',
    'TailwindCSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
    'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    'Express.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    'FastAPI': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
    'Flask': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',
    'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    'Neo4j': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/neo4j/neo4j-original.svg',
    'PostgreSQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    'Supabase': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg',
    'IBM Qiskit': 'https://avatars.githubusercontent.com/u/31031201?s=200&v=4',
    'Scikit-learn': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
    'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    'Linux': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
    'VS Code': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
    'Postman': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg'
  };

  const skillsData = {
    'programming': { title: 'Languages', skills: [{ name: 'Python', color: '#3776AB' }, { name: 'Java', color: '#007396' }, { name: 'JavaScript', color: '#F7DF1E' }, { name: 'C', color: '#A8B9CC' }] },
    'frontend': { title: 'Frontend', skills: [{ name: 'React.js', color: '#61DAFB' }, { name: 'Vite', color: '#646CFF' }, { name: 'TailwindCSS', color: '#38B2AC' }, { name: 'Electron.js', color: '#47848F' }] },
    'backend': { title: 'Backend', skills: [{ name: 'Node.js', color: '#339933' }, { name: 'Express.js', color: '#ffffff' }, { name: 'FastAPI', color: '#05998B' }, { name: 'Flask', color: '#ffffff' }] },
    'databases': { title: 'Databases', skills: [{ name: 'MongoDB', color: '#47A248' }, { name: 'Neo4j', color: '#008CC1' }, { name: 'PostgreSQL', color: '#336791' }, { name: 'Supabase', color: '#3ECF8E' }] },
    'ai': { title: 'AI & Quantum', skills: [{ name: 'Scikit-learn', color: '#F7931E' }, { name: 'NLP', color: '#412991' }, { name: 'IBM Qiskit', color: '#6929C4' }, { name: 'Cosine Similarity', color: '#3b82f6' }] },
    'tools': { title: 'Tools', skills: [{ name: 'Git', color: '#F05032' }, { name: 'Linux', color: '#FCC624' }, { name: 'VS Code', color: '#007ACC' }, { name: 'Postman', color: '#FF6C37' }] }
  };

  const graphData = useMemo(() => {
    const nodes: GraphNode[] = [];
    const categoryCenters = [
      { id: 'center-programming', name: 'Languages', color: '#8E8E93', category: 'programming', x: 450, y: 120 },
      { id: 'center-frontend', name: 'Frontend', color: '#007AFF', category: 'frontend', x: 220, y: 280 },
      { id: 'center-backend', name: 'Backend', color: '#34C759', category: 'backend', x: 680, y: 280 },
      { id: 'center-databases', name: 'Databases', color: '#FF3B30', category: 'databases', x: 680, y: 520 },
      { id: 'center-tools', name: 'Tools', color: '#AF52DE', category: 'tools', x: 220, y: 520 },
      { id: 'center-ai', name: 'AI & Quantum', color: '#FF9500', category: 'ai', x: 450, y: 380 }
    ];

    categoryCenters.forEach(c => nodes.push(c));

    Object.entries(skillsData).forEach(([category, data]) => {
      const center = categoryCenters.find(c => c.category === category);
      if (!center) return;
      const radius = 120;
      const angleStep = (2 * Math.PI) / data.skills.length;
      data.skills.forEach((skill, index) => {
        const angle = (-Math.PI / 2) + (angleStep * index);
        nodes.push({
          id: skill.name,
          name: skill.name,
          color: skill.color,
          category,
          x: center.x + radius * Math.cos(angle),
          y: center.y + radius * Math.sin(angle)
        });
      });
    });

    return nodes;
  }, []);

  const selectedNode = graphData.find(n => n.id === selectedSkill);

  return (
    <section id="skills" style={{ ...styles.section, backgroundColor: theme.bg }}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={{ ...styles.title, color: theme.text }}>Technical Ecosystem</h1>
          <p style={styles.subtitle}>A visualization of core competencies and specialized expertise.</p>
        </div>

        <div style={styles.layout}>
          {/* APPLE SIDEBAR */}
          <aside style={{ ...styles.sidebar, background: theme.cardBg }}>
            <span style={styles.sidebarLabel}>CATEGORIES</span>
            {Object.keys(skillsData).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  ...styles.sideBtn,
                  background: activeCategory === cat ? 'rgba(255,255,255,0.08)' : 'transparent',
                  color: activeCategory === cat ? theme.accent : 'rgba(255,255,255,0.5)'
                }}
              >
                <img src={categoryIcons[cat]} style={{ ...styles.sideIcon, opacity: activeCategory === cat ? 1 : 0.4 }} alt="" />
                {cat.toUpperCase()}
              </button>
            ))}
          </aside>

          {/* THE GRAPH BOX */}
          <div style={{ ...styles.graphBox, background: theme.cardBg, borderColor: theme.border }}>
            <svg width="100%" height="100%" viewBox="0 0 900 700">
              {/* Lines - Very subtle Apple Grey */}
              {graphData.filter(n => !n.id.startsWith('center-') && n.category === activeCategory).map(node => (
                <line
                  key={`line-${node.id}`}
                  x1={node.x} y1={node.y}
                  x2={graphData.find(c => c.id === `center-${node.category}`)?.x}
                  y2={graphData.find(c => c.id === `center-${node.category}`)?.y}
                  stroke="rgba(255,255,255,0.05)" strokeWidth="1"
                />
              ))}

              {/* Nodes */}
              {graphData.filter(n => n.id.startsWith('center-') || n.category === activeCategory).map(node => {
                const isCenter = node.id.startsWith('center-');
                const isSelected = selectedSkill === node.id;
                const radius = isCenter ? 35 : 22;

                return (
                  <g key={node.id} onClick={() => setSelectedSkill(node.id)} style={{ cursor: 'pointer' }}>
                    {isSelected && <circle r={radius + 15} fill={node.color} opacity="0.1" className="pulse" />}
                    <circle 
                      r={radius} 
                      fill="rgba(0,0,0,0.3)" 
                      stroke={isSelected ? theme.accent : 'rgba(255,255,255,0.1)'} 
                      strokeWidth={isSelected ? 3 : 1}
                      style={{ backdropFilter: 'blur(10px)' }}
                    />
                    <image 
                      href={isCenter ? categoryIcons[node.category] : techIcons[node.name]} 
                      x={isCenter ? -18 : -12} y={isCenter ? -18 : -12} 
                      width={isCenter ? 36 : 24} height={isCenter ? 36 : 24} 
                      style={{ filter: isSelected ? 'none' : 'grayscale(0.5)' }}
                    />
                    <text textAnchor="middle" y={radius + 18} fill="rgba(255,255,255,0.6)" fontSize="9" fontWeight="500">{node.name}</text>
                  </g>
                );
              })}
            </svg>

            {/* APPLE STYLE FLOATING INFO PANEL */}
            {selectedNode && (
              <div style={{ ...styles.infoPanel, borderColor: theme.border }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#fff' }}>{selectedNode.name}</h3>
                <div style={{ height: '2px', width: '30px', background: theme.accent, marginBottom: '12px' }} />
                <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
                  Expertise in {selectedNode.name} utilized for high-performance engineering and AI logic.
                </p>
                <button onClick={() => setSelectedSkill(null)} style={styles.closeBtn}>✕</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .pulse { animation: pulseAnim 2s infinite; }
        @keyframes pulseAnim { 0% { transform: scale(0.95); opacity: 0.1; } 50% { transform: scale(1.05); opacity: 0.2; } 100% { transform: scale(0.95); opacity: 0.1; } }
      `}</style>
    </section>
  );
};

const styles = {
  section: { minHeight: '100vh', padding: '100px 40px', display: 'flex', justifyContent: 'center' },
  container: { maxWidth: '1300px', width: '100%' },
  header: { textAlign: 'center' as const, marginBottom: '60px' },
  title: { fontSize: '42px', fontWeight: 800, letterSpacing: '-0.04em', margin: '0 0 10px 0' },
  subtitle: { fontSize: '16px', color: 'rgba(255,255,255,0.4)', fontWeight: 400 },
  layout: { display: 'grid', gridTemplateColumns: '260px 1fr', gap: '30px' },
  sidebar: { padding: '24px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', height: 'fit-content' },
  sidebarLabel: { fontSize: '10px', fontWeight: 800, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', display: 'block', marginBottom: '20px' },
  sideBtn: { width: '100%', padding: '12px 16px', border: 'none', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', marginBottom: '8px', transition: '0.2s' },
  sideIcon: { width: '18px', height: '18px' },
  graphBox: { borderRadius: '32px', border: '1px solid', position: 'relative' as const, height: '700px', overflow: 'hidden' },
  infoPanel: { position: 'absolute' as const, top: '24px', right: '24px', width: '280px', padding: '24px', background: 'rgba(20,20,25,0.8)', border: '1px solid', borderRadius: '24px', backdropFilter: 'blur(40px)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' },
  closeBtn: { position: 'absolute' as const, top: '16px', right: '16px', background: 'none', border: 'none', color: '#fff', opacity: 0.3, cursor: 'pointer' }
};

export default Skills;