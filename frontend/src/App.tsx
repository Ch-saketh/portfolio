import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home/Home';
import Work from './pages/Work';
import Contact from './pages/contact';
import Navigation from './components/Navbar';
import UILibrary from './pages/UILibrary';

function App() {
  useEffect(() => {
    document.title = "CS22";
  }, []);

  // Theme for all pages
  const theme = {
    bg: '#0f0f15',
    text: '#ffffff',
    textSecondary: '#a0a0a0',
    cardBg: '#1a1a25',
    border: '#2a2a35',
    headerBg: 'rgba(15, 15, 21, 0.95)',
    accent: '#3b82f6',
    accentLight: '#60a5fa'
  };

  return (
    <Router>
      <div className="App" style={{ backgroundColor: theme.bg, minHeight: '100vh' }}>
        {/* Navigation is outside Routes so it shows on all pages */}
        <Navigation theme={theme} />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work theme={theme} />} />
          <Route path="/contact" element={<Contact theme={theme} />} />
          <Route path="/ui-library" element={<UILibrary theme={theme} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;