import React, { useState } from 'react';

function KnowledgeGap() {
  const [targetRole, setTargetRole] = useState('');
  const [analyzed, setAnalyzed] = useState(false);

  // Dummy data for the prototype
  const missingSkills = [
    { id: 1, name: 'Advanced Graph Algorithms', category: 'Data Structures' },
    { id: 2, name: 'System Design Principles', category: 'Architecture' },
    { id: 3, name: 'Docker & Containerization', category: 'DevOps' }
  ];

  const handleAnalyze = () => {
    if (targetRole) setAnalyzed(true);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-blue-400 mb-8">Knowledge Gap Analyzer</h1>
      
      {/* Input Section */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 mb-8">
        <label className="block text-gray-300 text-sm font-bold mb-2">
          Target Career Role
        </label>
        <div className="flex gap-4">
          <input 
            type="text" 
            placeholder="e.g., Backend Software Engineer"
            className="flex-1 bg-gray-700 text-white border border-gray-600 rounded p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
          />
          <button 
            onClick={handleAnalyze}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded transition-colors"
          >
            Analyze
          </button>
        </div>
      </div>

      {/* Results Section */}
      {analyzed && (
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 animate-fade-in">
          <h2 className="text-xl font-semibold mb-4 text-red-400">Missing Skills Identified</h2>
          <p className="text-gray-400 mb-4">Based on your current "Mastered" topics, you need to acquire the following skills to reach your goal of <strong>{targetRole}</strong>:</p>
          
          <ul className="space-y-3">
            {missingSkills.map(skill => (
              <li key={skill.id} className="flex items-center p-3 bg-gray-750 rounded-lg border-l-4 border-red-500">
                <span className="text-gray-200 font-medium">{skill.name}</span>
                <span className="ml-auto text-xs font-bold px-2 py-1 bg-gray-600 text-gray-300 rounded uppercase tracking-wider">
                  {skill.category}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default KnowledgeGap;