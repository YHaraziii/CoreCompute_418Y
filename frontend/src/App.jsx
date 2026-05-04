import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LearningPath from './pages/LearningPath';
import KnowledgeGap from './pages/KnowledgeGap';
import ResourceCenter from './pages/ResourceCenter';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';

const isAuthenticated = () => !!localStorage.getItem('token');

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white font-sans">
        <nav className="bg-gray-800 border-b border-gray-700 p-4 shadow-md mb-8">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-500 tracking-wide">CoreCompute</div>
            <div className="space-x-6 flex items-center">
              {isAuthenticated() ? (
                <>
                  <Link to="/" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link>
                  <Link to="/learning-path" className="text-gray-300 hover:text-white transition-colors">Learning Path</Link>
                  <Link to="/knowledge-gap" className="text-gray-300 hover:text-white transition-colors">Knowledge Gap</Link>
                  <Link to="/resources" className="text-gray-300 hover:text-white transition-colors">Resource Center</Link>
                  <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded text-sm hover:bg-red-500">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-300 hover:text-white">Login</Link>
                  <Link to="/signup" className="text-gray-300 hover:text-white">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        </nav>
        <div className="p-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/learning-path" element={<ProtectedRoute><LearningPath /></ProtectedRoute>} />
            <Route path="/knowledge-gap" element={<ProtectedRoute><KnowledgeGap /></ProtectedRoute>} />
            <Route path="/resources" element={<ProtectedRoute><ResourceCenter /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;