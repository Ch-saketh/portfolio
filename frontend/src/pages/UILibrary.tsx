import React, { useState, useMemo } from "react";
import { allComponents, categories } from "../components/componentsData";
import { Search, Grid, Cpu, Layout, Box, Microscope, Terminal, Layers, Sparkles, Zap } from "lucide-react";

interface UILibraryProps {
  theme: {
    bg: string;
    text: string;
    textSecondary: string;
    cardBg: string;
    border: string;
    accent: string;
  };
}

const UILibrary: React.FC<UILibraryProps> = ({ theme }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return allComponents.filter((comp) => {
      const matchesCategory = activeCategory === "All" || comp.category === activeCategory;
      const matchesSearch = comp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           comp.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div style={{ ...styles.container, backgroundColor: theme.bg, color: theme.text }}>
      {/* FIXED SIDEBAR NAVIGATION */}
      <aside style={{ ...styles.sidebar, borderRight: `1px solid ${theme.border}`, backgroundColor: theme.bg }}>
        <div style={styles.sidebarHeader}>
          <div style={{ ...styles.labIcon, background: theme.accent }}>
            <Microscope size={14} color="#fff" />
          </div>
          <h2 style={styles.sidebarTitle}>COMPONENT LAB</h2>
        </div>
        
        <nav style={styles.navStack}>
          <button
            onClick={() => setActiveCategory("All")}
            style={{
              ...styles.navItem,
              color: activeCategory === "All" ? theme.accent : theme.textSecondary,
              backgroundColor: activeCategory === "All" ? `${theme.accent}15` : "transparent",
            }}
          >
            <Grid size={16} />
            <span style={{ marginLeft: "12px" }}>All Assets</span>
          </button>
          
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                ...styles.navItem,
                color: activeCategory === cat ? theme.accent : theme.textSecondary,
                backgroundColor: activeCategory === cat ? `${theme.accent}15` : "transparent",
              }}
            >
              {cat.toLowerCase().includes("animation") ? <Zap size={16} /> : 
               cat.toLowerCase().includes("layout") ? <Layout size={16} /> : 
               cat.toLowerCase().includes("component") ? <Box size={16} /> : <Layers size={16} />}
              <span style={{ marginLeft: "12px" }}>{cat}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* SCROLLABLE MAIN CONTENT */}
      <main style={styles.mainContent}>
        <header style={styles.header}>
          <div style={styles.searchWrapper}>
            <Search size={18} style={styles.searchIcon} color={theme.textSecondary} />
            <input 
              type="text" 
              placeholder="Search assets (e.g. GSAP, Split, Motion)..." 
              style={{ ...styles.searchInput, borderColor: theme.border, color: theme.text }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div style={{ fontSize: '11px', opacity: 0.4, marginTop: '12px', letterSpacing: '1px' }}>
            REGISTRY_COUNT: {filtered.length} UNITS
          </div>
        </header>

        {/* COMPONENT GRID */}
        <div style={styles.grid}>
          {filtered.map((comp, index) => (
            <div 
              key={comp.id} 
              className="lab-card"
              style={{ 
                ...styles.card, 
                backgroundColor: theme.cardBg, 
                borderColor: theme.border,
                animationDelay: `${index * 0.05}s`
              }}
            >
              <div style={styles.previewArea}>
                <div className="glow-orb" style={{ background: theme.accent }} />
                <Terminal size={32} color={theme.accent} style={{ opacity: 0.2 }} />
                <div style={styles.previewLabel}>UID::{comp.id.toUpperCase().replace(/-/g, '_')}</div>
              </div>
              
              <div style={styles.cardInfo}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardTitle}>{comp.title}</h3>
                  <Sparkles size={14} color={theme.accent} style={{ opacity: 0.8 }} />
                </div>
                <p style={{ ...styles.cardDesc, color: theme.textSecondary }}>{comp.description}</p>
                <div style={styles.tagList}>
                  {comp.tags.slice(0, 3).map(tag => (
                    <span key={tag} style={{ ...styles.tag, borderColor: theme.border }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <style>{`
        .lab-card {
          animation: cardReveal 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .lab-card:hover {
          transform: translateY(-12px);
          border-color: ${theme.accent} !important;
          box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.6);
        }
        .glow-orb {
          position: absolute;
          width: 150px; height: 150px;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.12;
        }
        @keyframes cardReveal { to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

const styles = {
  container: { display: "flex", minHeight: "100vh", paddingTop: "80px" },
  sidebar: { width: "280px", padding: "2.5rem 2rem", position: "fixed" as const, height: "calc(100vh - 80px)", zIndex: 10 },
  sidebarHeader: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "3rem" },
  labIcon: { width: "28px", height: "28px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" },
  sidebarTitle: { fontSize: "11px", fontWeight: 900, letterSpacing: "3px", margin: 0 },
  navStack: { display: "flex", flexDirection: "column" as const, gap: "10px" },
  navItem: { display: "flex", alignItems: "center", padding: "14px 16px", borderRadius: "14px", border: "none", cursor: "pointer", transition: "0.2s", fontWeight: 700, fontSize: "13px", textAlign: "left" as const },
  mainContent: { flex: 1, marginLeft: "280px", padding: "4rem 6rem" },
  header: { marginBottom: "4rem" },
  searchWrapper: { position: "relative" as const, maxWidth: "650px" },
  searchIcon: { position: "absolute" as const, left: "20px", top: "50%", transform: "translateY(-50%)" },
  searchInput: { width: "100%", padding: "18px 24px 18px 60px", borderRadius: "16px", background: "rgba(255,255,255,0.03)", border: "1px solid", outline: "none", fontSize: "15px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "3rem" },
  card: { borderRadius: "24px", border: "1px solid", overflow: "hidden", cursor: "pointer", position: 'relative' as const },
  previewArea: { height: "220px", background: "#050505", position: "relative" as const, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" },
  previewLabel: { position: "absolute" as const, bottom: "16px", right: "20px", fontSize: "8px", opacity: 0.2, letterSpacing: "2px", fontFamily: 'monospace' },
  cardInfo: { padding: "2.2rem" },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" },
  cardTitle: { fontSize: "19px", fontWeight: 800, margin: 0, letterSpacing: '-0.02em' },
  cardDesc: { fontSize: "14px", lineHeight: "1.6", margin: "0 0 24px 0", opacity: 0.5 },
  tagList: { display: "flex", flexWrap: "wrap" as const, gap: "8px" },
  tag: { fontSize: "9px", padding: "4px 12px", borderRadius: "8px", border: "1px solid", opacity: 0.4, fontWeight: 700, textTransform: "uppercase" as const },
};

export default UILibrary;