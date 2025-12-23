import React, { useState } from "react";
import { allComponents, categories } from "../components/componentsData"; // Matches renamed export
import { Search, Grid, Cpu, Layout, Box, Sparkles, Terminal } from "lucide-react";

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

  const filtered = allComponents.filter((comp) => {
    const matchesCategory = activeCategory === "All" || comp.category === activeCategory;
    const matchesSearch = comp.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ ...styles.container, backgroundColor: theme.bg, color: theme.text }}>
      {/* SIDEBAR */}
      <aside style={{ ...styles.sidebar, borderRight: `1px solid ${theme.border}` }}>
        <div style={styles.sidebarHeader}>
          <Sparkles size={18} color={theme.accent} />
          <h2 style={styles.sidebarTitle}>LABORATORY</h2>
        </div>
        
        <nav style={styles.navStack}>
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                ...styles.navItem,
                color: activeCategory === cat ? theme.accent : theme.textSecondary,
                backgroundColor: activeCategory === cat ? `${theme.accent}10` : "transparent",
              }}
            >
              {cat === "All" && <Grid size={16} />}
              {cat === "Animations" && <Cpu size={16} />}
              {cat === "Layouts" && <Layout size={16} />}
              {cat === "Components" && <Box size={16} />}
              <span style={{ marginLeft: "12px" }}>{cat}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* MAIN VIEWPORT */}
      <main style={styles.mainContent}>
        <header style={styles.header}>
          <div style={styles.searchWrapper}>
            <Search size={18} style={styles.searchIcon} color={theme.textSecondary} />
            <input 
              type="text" 
              placeholder="Search components..." 
              style={{ ...styles.searchInput, borderColor: theme.border, color: theme.text }}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        <div style={styles.grid}>
          {filtered.map((comp, index) => (
            <div 
              key={comp.id} 
              className="component-card"
              style={{ 
                ...styles.card, 
                backgroundColor: theme.cardBg, 
                borderColor: theme.border,
                animationDelay: `${index * 0.08}s`
              }}
            >
              <div style={styles.previewArea}>
                <div style={{ ...styles.accentGlow, background: theme.accent }} />
                <Terminal size={40} color={theme.accent} style={{ opacity: 0.2 }} />
              </div>
              
              <div style={styles.cardInfo}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardTitle}>{comp.title}</h3>
                  {comp.isNew && <span style={{ ...styles.newBadge, background: theme.accent }}>NEW</span>}
                </div>
                <p style={{ ...styles.cardDesc, color: theme.textSecondary }}>{comp.description}</p>
                <div style={styles.tagList}>
                  {comp.tags.map(tag => (
                    <span key={tag} style={{ ...styles.tag, borderColor: theme.border }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <style>{`
        .component-card {
          animation: revealCard 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.4s ease;
        }
        .component-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
          border-color: ${theme.accent} !important;
        }
        @keyframes revealCard { to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

const styles = {
  container: { display: "flex", minHeight: "100vh", paddingTop: "80px" },
  sidebar: { width: "260px", padding: "2rem", position: "fixed" as const, height: "calc(100vh - 80px)" },
  sidebarHeader: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "2.5rem" },
  sidebarTitle: { fontSize: "12px", fontWeight: 800, letterSpacing: "3px", margin: 0, opacity: 0.8 },
  navStack: { display: "flex", flexDirection: "column" as const, gap: "10px" },
  navItem: { display: "flex", alignItems: "center", padding: "14px 18px", borderRadius: "12px", border: "none", cursor: "pointer", transition: "0.3s", fontWeight: 600, fontSize: "14px", textAlign: "left" as const },
  mainContent: { flex: 1, marginLeft: "260px", padding: "3rem 5rem" },
  header: { marginBottom: "4rem" },
  searchWrapper: { position: "relative" as const, maxWidth: "600px" },
  searchIcon: { position: "absolute" as const, left: "20px", top: "50%", transform: "translateY(-50%)" },
  searchInput: { width: "100%", padding: "16px 20px 16px 56px", borderRadius: "14px", background: "rgba(255,255,255,0.03)", border: "1px solid", outline: "none", fontSize: "15px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "2.5rem" },
  card: { borderRadius: "20px", border: "1px solid", overflow: "hidden", cursor: "pointer" },
  previewArea: { height: "200px", background: "linear-gradient(180deg, #000 0%, #050505 100%)", position: "relative" as const, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" },
  accentGlow: { position: "absolute" as const, width: "120px", height: "120px", borderRadius: "50%", filter: "blur(70px)", opacity: 0.12 },
  cardInfo: { padding: "1.8rem" },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" },
  cardTitle: { fontSize: "18px", fontWeight: 700, margin: 0 },
  newBadge: { fontSize: "9px", padding: "3px 8px", borderRadius: "6px", fontWeight: 900, color: "#fff" },
  cardDesc: { fontSize: "14px", lineHeight: "1.6", margin: "0 0 20px 0", opacity: 0.7 },
  tagList: { display: "flex", flexWrap: "wrap" as const, gap: "8px" },
  tag: { fontSize: "10px", padding: "4px 10px", borderRadius: "8px", border: "1px solid", opacity: 0.5, fontWeight: 600 },
};

export default UILibrary;