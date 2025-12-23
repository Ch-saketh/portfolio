import React, { useState, useEffect } from "react";
import { allComponents, ComponentItem } from "../components/componentsData";

// Define the standard professional theme based on your App.tsx
const defaultTheme = {
  bg: '#0f0f15',          // From your App.tsx
  surface: '#161620',     // Slightly lighter for depth
  panel: '#1a1a25',       // From your cardBg in App.tsx
  border: 'rgba(255, 255, 255, 0.08)', 
  text: '#ffffff',
  textMuted: '#a0a0a0',   // From your textSecondary in App.tsx
  accent: '#3b82f6',      // From your accent in App.tsx
  codeBg: '#050505',
};

type CodeLanguage = 'typescript' | 'javascript' | 'tailwind';

/**
 * COMPONENT PREVIEW (The Stage)
 * This is the "God-tier" view area with a grid background and floating glass tabs.
 */
const ComponentPreview: React.FC<{ component: ComponentItem; theme: typeof defaultTheme }> = ({ component, theme }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [activeLang, setActiveLang] = useState<CodeLanguage>('typescript');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* 1. THE STAGE: High-end visual area */}
      <div style={{
        position: 'relative',
        background: `radial-gradient(circle at 50% 50%, ${theme.surface} 0%, ${theme.bg} 100%)`,
        borderRadius: '24px',
        border: `1px solid ${theme.border}`,
        minHeight: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        boxShadow: '0 30px 60px -12px rgba(0,0,0,0.5)'
      }}>
        {/* Designer Grid Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)'
        }} />

        {/* Floating Glass Tab Switcher */}
        <div style={{
          position: 'absolute',
          top: '24px',
          display: 'flex',
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(12px)',
          padding: '4px',
          borderRadius: '12px',
          border: `1px solid ${theme.border}`,
          zIndex: 10
        }}>
          {['preview', 'code'].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t as any)}
              style={{
                padding: '8px 24px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === t ? theme.accent : 'transparent',
                color: '#fff',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: '0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Preview / Code Content */}
        <div style={{ position: 'relative', zIndex: 1, width: '100%', padding: '40px' }}>
          {activeTab === 'preview' ? (
            <div style={{ textAlign: 'center' }}>
               {/* Replace with actual component rendering */}
               <h2 style={{ fontSize: '4rem', fontWeight: 900, letterSpacing: '-3px' }}>{component.title}</h2>
               <p style={{ color: theme.textMuted }}>Interactive Preview coming soon...</p>
            </div>
          ) : (
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                {['typescript', 'javascript', 'tailwind'].map((l) => (
                  <button 
                    key={l}
                    onClick={() => setActiveLang(l as any)}
                    style={{
                      background: activeLang === l ? 'rgba(255,255,255,0.1)' : 'transparent',
                      border: `1px solid ${activeLang === l ? theme.accent : 'transparent'}`,
                      color: activeLang === l ? '#fff' : theme.textMuted,
                      padding: '4px 12px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      cursor: 'pointer'
                    }}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
              <pre style={{ 
                background: '#050505', 
                padding: '24px', 
                borderRadius: '16px', 
                border: `1px solid ${theme.border}`,
                fontFamily: 'Fira Code, monospace',
                fontSize: '13px',
                lineHeight: 1.6,
                overflowX: 'auto'
              }}>
                <code>{(component as any)[activeLang] || '// Component code here'}</code>
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* 2. PROPS REFERENCE: Clean, minimalist table */}
      <section>
        <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px' }}>Properties</h3>
        <div style={{ border: `1px solid ${theme.border}`, borderRadius: '16px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead style={{ background: 'rgba(255,255,255,0.02)', borderBottom: `1px solid ${theme.border}` }}>
              <tr>
                <th style={{ padding: '16px' }}>Property</th>
                <th style={{ padding: '16px' }}>Type</th>
                <th style={{ padding: '16px' }}>Default</th>
              </tr>
            </thead>
            <tbody>
              {component.props.map((prop, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${theme.border}` }}>
                  <td style={{ padding: '16px', color: theme.accent, fontFamily: 'monospace' }}>{prop.name}</td>
                  <td style={{ padding: '16px', color: theme.textMuted }}>{prop.type}</td>
                  <td style={{ padding: '16px', opacity: 0.8 }}>{prop.default}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

/**
 * UI LIBRARY MAIN DASHBOARD
 * Features a fixed glass sidebar and high-end typography.
 */
const UILibrary: React.FC = () => {
  const [selected, setSelected] = useState<ComponentItem>(allComponents[0]);
  const theme = defaultTheme;

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, color: theme.text, display: 'flex' }}>
      
      {/* LEFT SIDEBAR */}
      <aside style={{
        width: '300px',
        height: '100vh',
        position: 'fixed',
        borderRight: `1px solid ${theme.border}`,
        padding: '40px 24px',
        overflowY: 'auto',
        background: 'rgba(15, 15, 21, 0.5)',
        backdropFilter: 'blur(20px)'
      }}>
        <div style={{ marginBottom: '48px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '32px', height: '32px', background: theme.accent, borderRadius: '8px' }} />
          <span style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-1px' }}>REACT BITS</span>
        </div>

        <nav>
          <p style={{ fontSize: '10px', fontWeight: 800, color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>Components</p>
          {allComponents.map(item => (
            <button
              key={item.id}
              onClick={() => setSelected(item)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '10px 16px',
                marginBottom: '4px',
                background: selected.id === item.id ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                color: selected.id === item.id ? theme.accent : theme.textMuted,
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: '0.2s'
              }}
            >
              {item.title}
            </button>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main style={{ marginLeft: '300px', flex: 1, padding: '80px 60px' }}>
        <header style={{ marginBottom: '60px', maxWidth: '800px' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '16px', letterSpacing: '-3px' }}>
            {selected.title}
          </h1>
          <p style={{ fontSize: '1.1rem', color: theme.textMuted, lineHeight: 1.6 }}>
            {selected.description}
          </p>
        </header>

        <ComponentPreview component={selected} theme={theme} />
      </main>

      <style>{`
        body { margin: 0; font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: ${theme.border}; border-radius: 10px; }
        button:hover { opacity: 0.8; }
      `}</style>
    </div>
  );
};

export default UILibrary;