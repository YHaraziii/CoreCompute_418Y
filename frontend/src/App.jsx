import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LearningPath from './pages/LearningPath';
import KnowledgeGap from './pages/KnowledgeGap';
import ResourceCenter from './pages/ResourceCenter'; // <-- New import

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white font-sans">
        
        {/* Global Navigation Bar */}
        <nav className="bg-gray-800 border-b border-gray-700 p-4 shadow-md mb-8">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-500 tracking-wide">CoreCompute</div>
            <div className="space-x-6">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link>
              <Link to="/learning-path" className="text-gray-300 hover:text-white transition-colors">Learning Path</Link>
              <Link to="/knowledge-gap" className="text-gray-300 hover:text-white transition-colors">Knowledge Gap</Link>
              <Link to="/resources" className="text-gray-300 hover:text-white transition-colors">Resource Center</Link> {/* <-- New link */}
            </div>
          </div>
        </nav>

        {/* Dynamic Page Content */}
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/learning-path" element={<LearningPath />} />
            <Route path="/knowledge-gap" element={<KnowledgeGap />} />
            <Route path="/resources" element={<ResourceCenter />} /> {/* <-- New route */}
          </Routes>
        </div>

      </div>
    </Router>
  );
}

export default App; 