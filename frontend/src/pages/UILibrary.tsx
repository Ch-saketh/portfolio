import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, Grid, Box, Microscope, Layers, Sparkles, Zap, ChevronRight } from "lucide-react";
import { allComponentDetails, getAllCategories } from "../components/componentData";

interface Theme {
  bg: string;
  text: string;
  textSecondary: string;
  cardBg: string;
  border: string;
  accent: string;
}

interface ComponentData {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  isNew?: boolean;
}

interface UILibraryProps {
  theme: Theme;
}

// --- MAIN COMPONENT ---
const UILibrary: React.FC<UILibraryProps> = ({ theme }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", ...getAllCategories()];

  const filtered = useMemo(() => {
    return allComponentDetails.filter((comp: ComponentData) => {
      const matchesCategory = activeCategory === "All" || comp.category === activeCategory;
      const matchesSearch = comp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          comp.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="flex min-h-screen pt-20 transition-all duration-700 font-sans" style={{ backgroundColor: theme.bg, color: theme.text }}>
      
      {/* 1. APPLE SIDEBAR: Frosted Glass & Vibrancy */}
      <aside className="fixed left-0 top-20 h-[calc(100vh-80px)] w-72 p-8 z-40 
                        bg-white/80 dark:bg-black/60 backdrop-blur-3xl 
                        border-r border-black/5 dark:border-white/10">
        <div className="flex items-center gap-3 mb-12 px-2">
          <motion.div 
            whileHover={{ rotate: 15 }}
            className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg" 
            style={{ backgroundColor: theme.accent }}
          >
            <Microscope size={18} className="text-white" />
          </motion.div>
          <h2 className="text-[10px] font-black tracking-[0.3em] uppercase opacity-60">
            Design Lab
          </h2>
        </div>

        <nav className="space-y-1.5">
          {categories.map((cat: string) => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-[13px] font-bold transition-all duration-500
                         ${activeCategory === cat ? 'translate-x-1' : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-50 hover:opacity-100'}`}
              style={{ 
                backgroundColor: activeCategory === cat ? `${theme.accent}15` : 'transparent',
                color: activeCategory === cat ? theme.accent : 'inherit'
              }}
            >
              <span className={activeCategory === cat ? "scale-110 transition-transform" : ""}>
                {cat === "All" ? <Grid size={18} /> : 
                 cat.toLowerCase().includes("anim") ? <Zap size={18} /> : <Box size={18} />}
              </span>
              <span className="tracking-tight">{cat}</span>
              {activeCategory === cat && (
                <motion.div 
                  layoutId="active-pill" 
                  className="ml-auto w-1 h-4 rounded-full" 
                  style={{ backgroundColor: theme.accent }} 
                />
              )}
            </button>
          ))}
        </nav>
      </aside>

      {/* 2. MAIN CONTENT: Adaptive Bento Grid */}
      <main className="flex-1 ml-72 p-10 lg:p-20 max-w-[1700px]">
        <header className="mb-20 space-y-10">
          <div className="relative max-w-2xl group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-100 transition-opacity" size={20} />
            <input 
              type="text" 
              placeholder="Search the library..." 
              className="w-full pl-16 pr-8 py-5 rounded-[22px] bg-black/5 dark:bg-white/5 
                         border border-transparent focus:border-black/10 dark:focus:border-white/10
                         outline-none transition-all text-lg font-medium"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 text-[11px] font-bold tracking-widest opacity-30 uppercase">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.accent }} />
            {filtered.length} Components in Registry
          </div>
        </header>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filtered.map((comp: ComponentData) => (
              <ComponentCard key={comp.id} comp={comp} theme={theme} />
            ))}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
};

// --- COMPONENT CARD HELPER ---
interface ComponentCardProps {
  comp: ComponentData;
  theme: Theme;
}

const ComponentCard: React.FC<ComponentCardProps> = ({ comp, theme }) => {
  if (!comp.id) return null;

  return (
    <Link to={`/component/${comp.id}`} className="block no-underline">
      <motion.div 
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        whileHover={{ y: -10 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="group relative flex flex-col rounded-[38px] overflow-hidden 
                   bg-white dark:bg-[#0A0A0A] border border-black/[0.03] dark:border-white/[0.03]
                   shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-shadow
                   cursor-pointer"
      >
        {/* Preview Area with Glass Reflection */}
        <div className="h-60 bg-[#FBFBFD] dark:bg-[#111] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000
                          bg-gradient-to-tr from-transparent via-white/20 to-transparent" />
          <div className="w-32 h-32 rounded-full blur-[80px] opacity-10 absolute" style={{ backgroundColor: theme.accent }} />
          <Layers size={54} className="opacity-10 group-hover:opacity-40 transition-all duration-700 group-hover:scale-110" style={{ color: theme.accent }} />
        </div>
        
        <div className="p-10">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold tracking-tight">{comp.title}</h3>
            <Sparkles size={18} style={{ color: theme.accent }} className="opacity-40 group-hover:opacity-100 transition-opacity" />
            {comp.isNew && (
              <span className="px-2 py-1 text-xs font-bold rounded-full" style={{ backgroundColor: theme.accent, color: 'white' }}>
                NEW
              </span>
            )}
          </div>
          <p className="text-sm leading-relaxed opacity-40 group-hover:opacity-60 transition-opacity mb-10 line-clamp-2">
            {comp.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {comp.tags.slice(0, 2).map((tag: string) => (
                <span key={tag} className="text-[9px] font-black px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 uppercase tracking-widest opacity-60">
                  {tag}
                </span>
              ))}
            </div>
            <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center 
                            opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500">
              <ChevronRight size={18} style={{ color: theme.accent }} />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default UILibrary;