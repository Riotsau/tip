import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';
import App from './App';
import { Home } from './pages/home';
import { About } from './pages/about';
import { Tip } from './pages/tip';
import { Navbar } from './components/navbar';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar/>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tip" element={<Tip />} />
          <Route path="/about" element={<About />} />
       </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

