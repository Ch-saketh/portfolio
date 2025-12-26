import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// 1. IMPORT YOUR LOGO FROM ASSETS
import favicon from './assets/deep-learning.png'

// 2. DYNAMICALLY INJECT THE LOGO INTO THE BROWSER TAB
const link = (document.querySelector("link[rel~='icon']") as HTMLLinkElement) || document.createElement('link');
link.rel = 'icon';
link.href = favicon;
document.getElementsByTagName('head')[0].appendChild(link);

const rootElement = document.getElementById('root')

if (!rootElement) throw new Error('Root element not found')

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

export {} 
