import React, { useState, useEffect } from 'react';

function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, masteredTopics: 0, uptime: "" });
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Theory');
  const [newUrl, setNewUrl] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    fetch('http://localhost:9000/api/admin/stats')
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  const handleAddResource = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:9000/api/admin/resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, category: newCategory, url: newUrl })
      });
      setStatusMsg("Resource successfully pushed to live database.");
      setNewTitle(''); setNewUrl('');
      setTimeout(() => setStatusMsg(''), 4000);
    } catch (err) { console.error(err); }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-purple-400 mb-8">System Administrator Portal</h1>
      
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg text-center">
          <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">Total Users</h3>
          <p className="text-4xl font-bold text-white">{stats.users}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg text-center">
          <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">Mastered Topics</h3>
          <p className="text-4xl font-bold text-green-400">{stats.masteredTopics}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg text-center">
          <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">System Uptime</h3>
          <p className="text-4xl font-bold text-blue-400">{stats.uptime}</p>
        </div>
      </div>

      <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
        <h2 className="text-xl font-bold mb-6 text-gray-200 border-b border-gray-700 pb-2">Publish New Resource</h2>
        {statusMsg && <div className="mb-6 p-4 bg-green-900/50 border border-green-500 text-green-400 rounded font-bold text-center animate-fade-in">{statusMsg}</div>}
        
        <form onSubmit={handleAddResource} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm text-gray-400 mb-1">Resource Title</label>
              <input type="text" placeholder="e.g., Advanced React Hooks" required value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full bg-gray-900 text-white border border-gray-600 rounded p-3 focus:ring-2 focus:ring-purple-500 outline-none" />
            </div>
            <div className="w-1/3">
              <label className="block text-sm text-gray-400 mb-1">Category</label>
              <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="w-full bg-gray-900 text-white border border-gray-600 rounded p-3 focus:ring-2 focus:ring-purple-500 outline-none">
                <option value="Theory">Theory</option>
                <option value="Practice Problems">Practice Problems</option>
                <option value="Interview Prep">Interview Prep</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Destination URL</label>
            <input type="url" placeholder="https://..." required value={newUrl} onChange={(e) => setNewUrl(e.target.value)} className="w-full bg-gray-900 text-white border border-gray-600 rounded p-3 focus:ring-2 focus:ring-purple-500 outline-none" />
          </div>
          <button type="submit" className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-6 rounded shadow-lg transition-colors mt-4">Push to Live Database</button>
        </form>
      </div>
    </div>
  );
}
export default AdminDashboard;