// @ts-nocheck
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './home/Home';
import About from './pages/About';
import Work from './pages/Work';
import Contact from './pages/contact'; // Changed to lowercase 'c' to match your file
import Navigation from './components/Navbar';

function App() {
  useEffect(() => {
    document.title = 'Saketh | Portfolio';
  }, []);

  // Professional Apple-inspired Dark Theme
  const theme = {
    bg: '#000000', // Pure black for seamless edges
    text: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.45)',
    cardBg: 'rgba(255, 255, 255, 0.03)',
    border: 'rgba(255, 255, 255, 0.08)',
    headerBg: 'rgba(0, 0, 0, 0.8)',
    accent: '#3b82f6',
    accentLight: '#60a5fa',
  };

  return (
    <Router>
      <div className="App" style={{ 
        backgroundColor: theme.bg, 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column' 
      }}>
        <Navigation theme={theme} />

        {/* Main Content Area */}
        <main style={{ flex: 1, position: 'relative' }}>
          <Routes>
            <Route path="/" element={<Home theme={theme} />} />
            <Route path="/about" element={<About theme={theme} />} /> 
            <Route path="/work" element={<Work theme={theme} />} />
            <Route path="/contact" element={<Contact theme={theme} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;