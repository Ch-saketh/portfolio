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
    'Scikit-learn': 'https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg',
    'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    'Linux': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
    'VS Code': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
    'Postman': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg'
  };

  const skillsData = {
    'programming': { title: 'Languages', skills: [{ name: 'Python', color: '#3776AB', d: 'AI & Backend core' }, { name: 'Java', color: '#5382a1', d: 'Enterprise logic' }, { name: 'JavaScript', color: '#F7DF1E', d: 'Web core' }, { name: 'C', color: '#A8B9CC', d: 'Systems logic' }] },
    'frontend': { title: 'Frontend', skills: [{ name: 'React.js', color: '#61DAFB', d: 'UI Library' }, { name: 'Vite', color: '#646CFF', d: 'Build Tool' }, { name: 'TailwindCSS', color: '#38B2AC', d: 'Styling' }] },
    'backend': { title: 'Backend', skills: [{ name: 'Node.js', color: '#339933', d: 'Runtime' }, { name: 'Express.js', color: '#828282', d: 'Framework' }, { name: 'FastAPI', color: '#05998B', d: 'Python APIs' }, { name: 'Flask', color: '#ffffff', d: 'Micro-framework' }] },
    'databases': { title: 'Databases', skills: [{ name: 'MongoDB', color: '#47A248', d: 'NoSQL' }, { name: 'Neo4j', color: '#008CC1', d: 'Graph DB' }, { name: 'PostgreSQL', color: '#336791', d: 'SQL' }, { name: 'Supabase', color: '#3ECF8E', d: 'BaaS' }] },
    'ai': { title: 'AI & Quantum', skills: [{ name: 'Scikit-learn', color: '#F7931E', d: 'Machine Learning' }, { name: 'IBM Qiskit', color: '#6929C4', d: 'Quantum Computing' }] },
    'tools': { title: 'Tools', skills: [{ name: 'Git', color: '#F05032', d: 'Version Control' }, { name: 'Linux', color: '#FCC624', d: 'OS' }, { name: 'VS Code', color: '#007ACC', d: 'IDE' }, { name: 'Postman', color: '#FF6C37', d: 'API Testing' }] }
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
      const radius = 110;
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
          description: skill.d
        });
      });
    });
    return nodes;
  }, []);

  const selectedNode = graphNodes.find(n => n.id === selectedSkill);

  return (
    <section id="skills" style={{ ...styles.section, backgroundColor: theme.bg }}>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={{ ...styles.title, color: theme.text }}>Technical Ecosystem</h1>
          <p style={styles.subtitle}>Curated competencies mapped across the engineering lifecycle.</p>
        </header>

        <div style={styles.layout}>
          {/* APPLE SIDEBAR */}
          <aside style={{ ...styles.sidebar, background: theme.cardBg }}>
            <span style={styles.sidebarLabel}>REGISTRY</span>
            {Object.keys(skillsData).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  ...styles.sideBtn,
                  background: activeCategory === cat ? `${theme.accent}20` : 'transparent',
                  color: activeCategory === cat ? theme.accent : 'rgba(255,255,255,0.4)',
                  border: activeCategory === cat ? `1px solid ${theme.accent}40` : '1px solid transparent'
                }}
              >
                <img src={categoryIcons[cat]} style={{ width: '16px', height: '16px', filter: activeCategory === cat ? 'none' : 'grayscale(1)' }} alt="" />
                {cat.toUpperCase()}
              </button>
            ))}
          </aside>

          {/* VISUALIZATION BOX */}
          <div style={{ ...styles.graphBox, background: '#000', borderColor: theme.border }}>
            <svg width="100%" height="100%" viewBox="0 0 900 700">
              {/* Lines */}
              {graphNodes.filter(n => !n.id.startsWith('center-') && n.category === activeCategory).map(node => (
                <line
                  key={`line-${node.id}`}
                  x1={node.x} y1={node.y}
                  x2={graphNodes.find(c => c.id === `center-${node.category}`)?.x}
                  y2={graphNodes.find(c => c.id === `center-${node.category}`)?.y}
                  stroke={theme.accent} strokeWidth="1.5" opacity="0.15"
                />
              ))}

              {/* Nodes */}
              {graphNodes.filter(n => n.id.startsWith('center-') || n.category === activeCategory).map(node => {
                const isCenter = node.id.startsWith('center-');
                const isSelected = selectedSkill === node.id;
                const radius = isCenter ? 38 : 28;

                return (
                  <g key={node.id} onClick={() => setSelectedSkill(node.id)} style={{ cursor: 'pointer' }}>
                    {/* Outer Visibility Glow */}
                    <circle cx={node.x} cy={node.y} r={radius + 10} fill={node.color} opacity={isSelected ? 0.25 : 0.06} />
                    
                    {/* Glass Circle */}
                    <circle 
                      cx={node.x} cy={node.y} r={radius} 
                      fill="#111" 
                      stroke={isSelected ? theme.accent : `${node.color}80`} 
                      strokeWidth={isSelected ? 3 : 1.5}
                    />
                    
                    {/* Icon - Corrected Position */}
                    <image 
                       href={isCenter ? categoryIcons[node.category] : techIcons[node.name]} 
                       x={node.x - 14} y={node.y - 14} width="28" height="28" 
                    />

                    {/* Label */}
                    <text 
                      textAnchor="middle" 
                      x={node.x} y={node.y + radius + 18} 
                      fill="#fff" fontSize="10" fontWeight="600" opacity="0.9"
                    >
                      {node.name}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* INFO PANEL */}
            {selectedNode && (
              <div style={{ ...styles.infoPanel, background: theme.cardBg, borderColor: theme.border }}>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', color: theme.accent }}>{selectedNode.name}</h3>
                <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                  {selectedNode.description || `Specialized competency in ${selectedNode.name} architecture.`}
                </p>
                <button onClick={() => setSelectedSkill(null)} style={styles.closeBtn}>✕</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: { minHeight: '100vh', padding: '100px 20px', display: 'flex', justifyContent: 'center' },
  container: { maxWidth: '1250px', width: '100%' },
  header: { textAlign: 'center' as const, marginBottom: '60px' },
  title: { fontSize: '48px', fontWeight: 800, letterSpacing: '-0.05em', margin: '0' },
  subtitle: { fontSize: '16px', color: 'rgba(255,255,255,0.4)', marginTop: '8px' },
  layout: { display: 'grid', gridTemplateColumns: '240px 1fr', gap: '40px' },
  sidebar: { padding: '20px', borderRadius: '28px', border: '1px solid rgba(255,255,255,0.08)', height: 'fit-content' },
  sidebarLabel: { fontSize: '9px', fontWeight: 900, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', display: 'block', marginBottom: '20px', textAlign: 'center' as const },
  sideBtn: { width: '100%', padding: '14px', border: 'none', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', marginBottom: '10px', transition: '0.3s' },
  graphBox: { borderRadius: '40px', border: '1px solid', position: 'relative' as const, height: '700px', overflow: 'hidden', boxShadow: 'inset 0 0 100px rgba(0,0,0,0.5)' },
  infoPanel: { position: 'absolute' as const, bottom: '30px', right: '30px', width: '300px', padding: '24px', border: '1px solid', borderRadius: '32px', backdropFilter: 'blur(50px)', boxShadow: '0 30px 60px rgba(0,0,0,0.8)' },
  closeBtn: { position: 'absolute' as const, top: '20px', right: '20px', background: 'none', border: 'none', color: '#fff', opacity: 0.5, cursor: 'pointer' }
};

export default Skills;