import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [topics, setTopics] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetch('http://localhost:9000/api/topics')
      .then(res => res.json())
      .then(data => {
        const formattedData = data.map(item => ({
          id: item._id,
          name: item.name,
          status: item.status
        }));
        setTopics(formattedData);
      })
      .catch(err => console.error("Error fetching topics:", err));
  }, []);

  useEffect(() => {
    if (topics.length === 0) {
      setProgress(0);
      return;
    }
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

  const handleStatusChange = async (id, newStatus) => {
    setTopics(topics.map(topic =>
      topic.id === id ? { ...topic, status: newStatus } : topic
    ));
    try {
      await fetch(`http://localhost:9000/api/topics/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-blue-400 mb-8">Learning Dashboard</h1>

      <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-200">Overall Progress</h2>
        <div className="w-full bg-gray-700 rounded-full h-6 mb-2 border border-gray-600 overflow-hidden">
          <div
            className="bg-blue-500 h-6 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-right text-gray-400 font-medium">{progress}% Completed</p>
      </div>

      <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
        <h2 className="text-xl font-semibold mb-6 text-gray-200 border-b border-gray-700 pb-2">Your Topics</h2>
        <div className="space-y-4">
          {topics.map(topic => (
            <div key={topic.id} className="flex justify-between items-center p-4 bg-gray-750 rounded-lg hover:bg-gray-700 transition-colors border border-gray-600">
              <span className="text-lg text-gray-100 font-medium">{topic.name}</span>
              <select
                className={`bg-gray-900 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none
                ${topic.status === 'Mastered' ? 'text-green-400 font-bold border-green-500/50' : ''}
                ${topic.status === 'In-Progress' ? 'text-yellow-400 font-bold border-yellow-500/50' : ''}
                ${topic.status === 'Started' ? 'text-blue-400 font-bold border-blue-500/50' : ''}
                `}
                value={topic.status}
                onChange={(e) => handleStatusChange(topic.id, e.target.value)}
              >
                <option value="Not Started" className="text-gray-300">Not Started</option>
                <option value="Started" className="text-blue-400">Started</option>
                <option value="In-Progress" className="text-yellow-400">In-Progress</option>
                <option value="Mastered" className="text-green-400">Mastered</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;