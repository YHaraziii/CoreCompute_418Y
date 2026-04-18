import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [topics, setTopics] = useState([
    { id: 1, name: 'Data Structures', status: 'Mastered' },
    { id: 2, name: 'Algorithms', status: 'In-Progress' },
    { id: 3, name: 'Operating Systems', status: 'Started' },
    { id: 4, name: 'Database Systems', status: 'In-Progress' },
    { id: 5, name: 'Computer Networks', status: 'Started' },
    { id: 6, name: 'Discrete Mathematics', status: 'Mastered' },
  ]);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalTopics = topics.length;
    const calculatedScore = topics.reduce((acc, topic) => {
      if (topic.status === 'Mastered') return acc + 1;
      if (topic.status === 'In-Progress') return acc + 0.5;
      if (topic.status === 'Started') return acc + 0.25;
      return acc;
    }, 0);
    
    const percentage = Math.round((calculatedScore / totalTopics) * 100);
    setProgress(percentage);
  }, [topics]);

  const handleStatusChange = (id, newStatus) => {
    setTopics(topics.map(topic => 
      topic.id === id ? { ...topic, status: newStatus } : topic
    ));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-blue-400 mb-8">My Dashboard</h1>
      
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8 border border-gray-700">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold">Overall Course Progress</h2>
          <span className="text-2xl font-bold text-blue-400">{progress}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
          <div 
            className="bg-blue-500 h-4 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-300 border-b border-gray-700 pb-2">Computer Science Topics</h3>
        <ul className="space-y-3">
          {topics.map((topic) => (
            <li key={topic.id} className="flex justify-between items-center p-3 hover:bg-gray-750 rounded-lg transition-colors">
              <span className="text-gray-200">{topic.name}</span>
              <select 
                value={topic.status}
                onChange={(e) => handleStatusChange(topic.id, e.target.value)}
                className="bg-gray-700 text-white border border-gray-600 rounded p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Not Started">Not Started</option>
                <option value="Started">Started</option>
                <option value="In-Progress">In-Progress</option>
                <option value="Mastered">Mastered</option>
              </select>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;