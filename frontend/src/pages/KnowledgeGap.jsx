import React, { useState } from 'react';

const ROLES = [
  'backend engineer',
  'systems engineer',
];

function KnowledgeGap() {
  const [targetRole, setTargetRole] = useState('');
  const [missingSkills, setMissingSkills] = useState([]);
  const [roleAchieved, setRoleAchieved] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!targetRole) return;

    setLoading(true);
    setAnalyzed(false);
    setError('');
    setMissingSkills([]);
    setRoleAchieved(false);

    try {
      const res = await fetch(
        `http://localhost:9000/api/knowledge-gap/analyze?role=${encodeURIComponent(targetRole)}`
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        setAnalyzed(true);
        return;
      }

      setMissingSkills(data.missingSkills);
      setRoleAchieved(data.roleAchieved);
      setAnalyzed(true);
    } catch (err) {
      setError('Could not reach the server. Make sure your backend is running on port 9000.');
      setAnalyzed(true);
    } finally {
      setLoading(false);
    }
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
          <select
            className="flex-1 bg-gray-700 text-white border border-gray-600 rounded p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={targetRole}
            onChange={(e) => {
              setTargetRole(e.target.value);
              setAnalyzed(false);
              setMissingSkills([]);
              setRoleAchieved(false);
              setError('');
            }}
          >
            <option value="">Select a role...</option>
            {ROLES.map(role => (
              <option key={role} value={role}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </option>
            ))}
          </select>
          <button
            onClick={handleAnalyze}
            disabled={loading || !targetRole}
            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold py-3 px-6 rounded transition-colors"
          >
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
      </div>

      {/* Results Section */}
      {analyzed && (
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">

          {error && (
            <p className="text-red-400 font-medium">{error}</p>
          )}

          {!error && roleAchieved && (
            <div className="text-center py-4">
              <p className="text-3xl mb-2">🎉</p>
              <h2 className="text-xl font-semibold text-green-400 mb-2">Role Achieved!</h2>
              <p className="text-gray-300">
                You've mastered all required skills for <strong>{targetRole}</strong>. You're ready!
              </p>
            </div>
          )}

          {!error && !roleAchieved && (
            <>
              <h2 className="text-xl font-semibold mb-4 text-red-400">Missing Skills Identified</h2>
              <p className="text-gray-400 mb-4">
                You still need the following skills to reach <strong>{targetRole}</strong>:
              </p>
              <ul className="space-y-3">
                {missingSkills.map(skill => (
                  <li
                    key={skill.id}
                    className="flex items-center p-3 bg-gray-750 rounded-lg border-l-4 border-red-500"
                  >
                    <span className="text-gray-200 font-medium">{skill.name}</span>
                    <span className="ml-auto text-xs font-bold px-2 py-1 bg-gray-600 text-gray-300 rounded uppercase tracking-wider">
                      {skill.category}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}

        </div>
      )}
    </div>
  );
}

export default KnowledgeGap;