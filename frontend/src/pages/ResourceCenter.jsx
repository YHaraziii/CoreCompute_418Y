import React, { useState, useEffect } from 'react';

function ResourceCenter() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [resources, setResources] = useState([]);
  const [streak, setStreak] = useState(0);
  const [favorites, setFavorites] = useState([]); // Favorites State

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const url = activeFilter === 'All' ? 'http://localhost:9000/api/resources' : `http://localhost:9000/api/resources?category=${encodeURIComponent(activeFilter)}`;
        const res = await fetch(url);
        const data = await res.json();
        setResources(data);
      } catch (err) { console.error(err); }
    };
    fetchResources();
  }, [activeFilter]);

  useEffect(() => {
    fetch('http://localhost:9000/api/resources/streak')
      .then(res => res.json())
      .then(data => setStreak(data.streak));
  }, []);

  const toggleFavorite = (e, id) => {
    e.preventDefault(); // Stop the link from opening when clicking the heart
    setFavorites(prev => prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-blue-400 mb-2">Resource Center</h1>
      
      <div className="mb-8 flex items-center gap-3 bg-gray-800 border border-gray-700 rounded-xl px-6 py-3 shadow-lg">
        <span className="text-2xl">🔥</span>
        <span className="text-gray-300 font-medium">Learning Streak: <span className="text-blue-400 font-bold">{streak} Days Maintained!</span></span>
      </div>

      <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 mb-8">
        <div className="flex flex-wrap gap-3">
          {['All', 'Theory', 'Practice Problems', 'Interview Prep'].map((filter) => (
            <button key={filter} onClick={() => setActiveFilter(filter)} className={`px-4 py-2 rounded font-bold transition-colors ${activeFilter === filter ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
        <div className="space-y-4">
          {resources.map((resource) => (
            <a key={resource._id} href={resource.url} target="_blank" rel="noopener noreferrer" className="flex justify-between items-center p-4 bg-gray-900 rounded-lg hover:bg-gray-750 transition-colors border border-gray-600 hover:border-blue-500 group block">
              <div>
                <h3 className="text-lg font-bold text-gray-100 group-hover:text-blue-400 transition-colors">{resource.title}</h3>
                <span className="text-sm text-gray-400 flex items-center gap-2">🔗 External {resource.type}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold px-3 py-1 bg-gray-800 text-blue-400 rounded-full border border-blue-900">{resource.category}</span>
                <button onClick={(e) => toggleFavorite(e, resource._id)} className="text-2xl hover:scale-110 transition-transform">
                  {favorites.includes(resource._id) ? '❤️' : '🤍'}
                </button>
              </div>
            </a>
          ))}
          {resources.length === 0 && <div className="text-center py-8 text-gray-400 italic">No resources found.</div>}
        </div>
      </div>
    </div>
  );
}
export default ResourceCenter;