// @ts-nocheck
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './home/Home';
import Work from './pages/Work';
import Contact from './pages/contact';
import UILibrary from './pages/UILibrary';
import Navigation from './components/Navbar';

function App() {
  useEffect(() => {
    document.title = 'CS22';
  }, []);

  const theme = {
    bg: '#0f0f15',
    text: '#ffffff',
    textSecondary: '#a0a0a0',
    cardBg: '#1a1a25',
    border: '#2a2a35',
    headerBg: 'rgba(15, 15, 21, 0.95)',
    accent: '#3b82f6',
    accentLight: '#60a5fa',
  };

  return (
    <Router>
      <div className="App" style={{ backgroundColor: theme.bg, minHeight: '100vh' }}>
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
