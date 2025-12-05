import React from 'react';
import { HashRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Calculator } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Analysis from './components/Analysis';
import InvestmentCalculator from './components/Calculator';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header glass-card" style={{ borderRadius: 0, borderTop: 0, borderLeft: 0, borderRight: 0, margin: 0, marginBottom: '2rem' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="logo">
              <h1 style={{ fontSize: '1.5rem', margin: 0 }} className="text-gradient">BTC Master</h1>
            </div>
            <nav style={{ display: 'flex', gap: '1rem' }}>
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <LayoutDashboard size={18} /> Dashboard
              </NavLink>
              <NavLink to="/analysis" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BookOpen size={18} /> Analysis
              </NavLink>
              <NavLink to="/calculator" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calculator size={18} /> Simulator
              </NavLink>
            </nav>
          </div>
        </header>

        <main className="container animate-fade-in">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/calculator" element={<InvestmentCalculator />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
