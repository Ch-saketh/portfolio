import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './home/Home';
import Work from './pages/Work';
import Contact from './pages/contact';
import Navigation from './components/Navbar';
import UILibrary from './pages/UILibrary';

/* ---------------- THEME TYPE ---------------- */
type Theme = {
  bg: string;
  text: string;
  textSecondary: string;
  cardBg: string;
  border: string;
  headerBg: string;
  accent: string;
  accentLight: string;
};

function App() {
  useEffect(() => {
    document.title = 'CS22';
  }, []);

  /* ---------------- THEME OBJECT ---------------- */
  const theme: Theme = {
    bg: '#0f0f15',
    text: '#ffffff',
    textSecondary: '#a0a0a0',
    cardBg: '#1a1a25',
    border: '#2a2a35',
    headerBg: 'rgba(15, 15, 21, 0.95)',
    accent: '#3b82f6',
    accentLight: '#60a5fa',
  };

  /* ---------------- TYPE-SAFE COMPONENT CASTING ---------------- */
  const NavigationWithTheme = Navigation as React.FC<{ theme: Theme }>;
  const WorkWithTheme = Work as React.FC<{ theme: Theme }>;
  const ContactWithTheme = Contact as React.FC<{ theme: Theme }>;
  const UILibraryWithTheme = UILibrary as React.FC<{ theme: Theme }>;

  return (
    <Router>
      <div className="App" style={{ backgroundColor: theme.bg, minHeight: '100vh' }}>
        {/* Navigation visible on all pages */}
        <NavigationWithTheme theme={theme} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<WorkWithTheme theme={theme} />} />
          <Route path="/contact" element={<ContactWithTheme theme={theme} />} />
          <Route path="/ui-library" element={<UILibraryWithTheme theme={theme} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
