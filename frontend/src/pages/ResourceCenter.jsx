import React, { useState } from 'react';

function ResourceCenter() {
  const [activeFilter, setActiveFilter] = useState('All');

  // Dummy data representing your MongoDB collection
  const resources = [
    { id: 1, title: 'Big-O Notation Cheatsheet', category: 'Theory', type: 'Article' },
    { id: 2, title: 'Two-Pointer Technique', category: 'Practice Problems', type: 'Interactive' },
    { id: 3, title: 'Top 50 Systems Design Questions', category: 'Interview Prep', type: 'Guide' },
    { id: 4, title: 'Understanding Virtual Memory', category: 'Theory', type: 'Video' },
    { id: 5, title: 'Mock Technical Interview: Arrays', category: 'Interview Prep', type: 'Video' },
    { id: 6, title: 'Binary Tree Traversal', category: 'Practice Problems', type: 'Interactive' },
  ];

  // Filter logic
  const filteredResources = activeFilter === 'All' 
    ? resources 
    : resources.filter(resource => resource.category === activeFilter);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-blue-400 mb-8">Resource Center</h1>
      
      {/* Filter Controls */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 mb-8">
        <h2 className="text-gray-300 font-semibold mb-4 border-b border-gray-700 pb-2">Filter Materials</h2>
        <div className="flex flex-wrap gap-3">
          {['All', 'Theory', 'Practice Problems', 'Interview Prep'].map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded font-medium transition-colors ${
                activeFilter === filter 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Resource List */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
        <div className="space-y-4">
          {filteredResources.map(resource => (
            <div key={resource.id} className="flex justify-between items-center p-4 bg-gray-750 rounded-lg hover:bg-gray-700 transition-colors border border-gray-600 hover:border-blue-500 cursor-pointer">
              <div>
                <h3 className="text-lg font-semibold text-gray-100">{resource.title}</h3>
                <span className="text-sm text-gray-400">{resource.type}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold px-3 py-1 bg-gray-900 text-blue-400 rounded-full border border-blue-900">
                  {resource.category}
                </span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
          
          {filteredResources.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No resources found for this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResourceCenter;