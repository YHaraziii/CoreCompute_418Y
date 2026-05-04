import React, { useState } from 'react';

function KnowledgeGap() {
  const [targetRole, setTargetRole] = useState('');
  const [analyzed, setAnalyzed] = useState(false);
  const [missingSkills, setMissingSkills] = useState([]);
  const [masteredSkills, setMasteredSkills] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!targetRole) return;
    setLoading(true);
    try {
      const response = await fetch('http://localhost:9000/api/knowledge-gap/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: targetRole })
      });
      const data = await response.json();
      setTimeout(() => {
        setMissingSkills(data.missingSkills);
        setMasteredSkills(data.mastered);
        setAnalyzed(true);
        setLoading(false);
      }, 600); // Smooth loading effect
    } catch (error) { console.error(error); setLoading(false); }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-blue-400 mb-8">Knowledge Gap Analyzer</h1>

      <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 mb-8">
        <label className="block text-gray-300 text-sm font-bold mb-2">Select Target Career Role</label>
        <div className="flex gap-4">
          {/* NEW: Dropdown instead of Text Input */}
          <select className="flex-1 bg-gray-900 text-white border border-gray-600 rounded p-3 focus:ring-2 focus:ring-blue-500 outline-none font-medium" value={targetRole} onChange={(e) => setTargetRole(e.target.value)}>
            <option value="">-- Choose a Role --</option>
            <option value="Backend Software Engineer">Backend Software Engineer</option>
            <option value="Frontend UI/UX Developer">Frontend UI/UX Developer</option>
            <option value="Data Scientist">Data Scientist</option>
            <option value="Cybersecurity Analyst">Cybersecurity Analyst</option>
          </select>
          <button onClick={handleAnalyze} disabled={loading || !targetRole} className="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 text-white font-bold py-3 px-8 rounded transition-colors shadow-lg">
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
      </div>

      {analyzed && (
        <div className="flex flex-col md:flex-row gap-6 animate-fade-in">
          <div className="flex-1 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-green-400 border-b border-gray-700 pb-2">Mastered Skills</h2>
            <ul className="space-y-3">
              {masteredSkills.map((skill, i) => (
                <li key={i} className="p-3 bg-gray-900 rounded border border-green-500/30 text-gray-300 flex items-center gap-3 font-medium"><span className="text-green-500">✓</span> {skill}</li>
              ))}
              {masteredSkills.length === 0 && <li className="text-gray-500 italic">No mastered topics found.</li>}
            </ul>
          </div>

          <div className="flex-1 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-red-400 border-b border-gray-700 pb-2">Missing Skills Required</h2>
            <ul className="space-y-3">
              {missingSkills.map(skill => (
                <li key={skill.id} className="p-3 bg-gray-900 rounded border border-red-500/30 text-gray-300 flex justify-between items-center font-medium">
                  <span><span className="text-red-500 mr-2">•</span> {skill.name}</span>
                  <span className="text-xs px-2 py-1 bg-gray-700 rounded text-gray-400">{skill.category}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
export default KnowledgeGap;