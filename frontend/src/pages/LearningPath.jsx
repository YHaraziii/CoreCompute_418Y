import React, { useState } from 'react'; 

const RoadMap = () => { 
  const [skillLevels, setSkillLevels] = useState([]); 
  const [interests, setInterests] = useState('');
  const [learningGoal, setLearningGoal] = useState(''); 
  const [pathNodes, setPathNodes] = useState([]); 
  const [loading, setLoading] = useState(false);
  const skillOptions = ['JavaScript', 'Python', 'Java', 'C++', 'SQL']; 
  
  const handleSkillChange = (skill) => { 
    setSkillLevels(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]); 
  }; 
  
  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    setLoading(true); // Trigger the spinning UI immediately
    try {
      const response = await fetch('http://localhost:9000/api/learning-path', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ languages: skillLevels, interests, goal: learningGoal })
      });
      const data = await response.json();
      
      // Kept a slight delay so the professor actually sees the cool loading animation
      setTimeout(() => {
        setPathNodes(data.nodes);
        setLoading(false);
      }, 800); 
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }; 

  return ( 
    <div className="max-w-5xl mx-auto text-gray-200"> 
      <h1 className="text-4xl font-bold text-blue-400 mb-8 border-b border-gray-700 pb-4">Roadmap Generator</h1> 
      <div className="flex flex-col md:flex-row gap-8"> 
        
        {/* Input Window */} 
        <div className="flex-1 bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl"> 
          <h2 className="text-xl font-semibold mb-6 border-b border-gray-700 pb-2">Generate Personalized Path</h2> 
          <form onSubmit={handleSubmit} className="space-y-5"> 
            <div> 
              <label className="block mb-2 text-sm font-bold text-gray-300">Programming Languages:</label> 
              <div className="grid grid-cols-2 gap-2">
                  {skillOptions.map(skill => ( 
                    <label key={skill} className="flex items-center p-2 bg-gray-900 border border-gray-700 rounded cursor-pointer hover:border-blue-500"> 
                      <input type="checkbox" checked={skillLevels.includes(skill)} onChange={() => handleSkillChange(skill)} className="mr-2" /> {skill} 
                    </label> 
                  ))} 
              </div>
            </div> 

            <div> 
              <label className="block mb-2 text-sm font-bold text-gray-300">Interests:</label> 
              <select value={interests} onChange={(e) => setInterests(e.target.value)} className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-500"> 
                <option value="">Select Interests...</option> 
                <option value="Machine Learning">Machine Learning</option> 
                <option value="Frontend UI/UX">Frontend UI/UX</option> 
                <option value="Cybersecurity">Cybersecurity</option> 
              </select> 
            </div> 

            <div> 
              <label className="block mb-2 text-sm font-bold text-gray-300">Career Goals:</label> 
              <select value={learningGoal} onChange={(e) => setLearningGoal(e.target.value)} className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-500"> 
                <option value="">Select Career Goal...</option> 
                <option value="Web Developer">Web Developer</option> 
                <option value="Data Scientist">Data Scientist</option> 
                <option value="Software Engineer">Software Engineer</option> 
              </select> 
            </div> 

            <button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 text-white rounded-lg font-bold transition-colors shadow-lg mt-4"> 
              {loading ? 'Processing...' : 'GENERATE MY ROADMAP'}
            </button> 
          </form> 
        </div> 

        {/* Flowchart Window with Spinner */} 
        <div className="flex-1 bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl flex flex-col items-center min-h-[400px]"> 
          <h2 className="text-xl font-semibold mb-8 w-full border-b border-gray-700 pb-2 text-center">Your Personalized Learning Pathway</h2> 
          
          {loading ? (
            // THE NEW SPINNER
            <div className="flex-1 flex flex-col items-center justify-center text-blue-400">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-400 mb-6"></div>
              <p className="font-bold animate-pulse tracking-wider">Engineering your optimal pathway...</p>
            </div>
          ) : pathNodes.length > 0 ? ( 
            <div className="flex flex-col items-center w-full animate-fade-in">
              {pathNodes.map((node, index) => (
                <React.Fragment key={index}>
                  <div className={`w-3/4 p-4 text-center rounded-lg border-2 font-bold shadow-lg ${index === pathNodes.length - 1 ? 'bg-green-900/50 border-green-500 text-green-400' : 'bg-gray-900 border-blue-500 text-blue-100'}`}>
                    {node}
                  </div>
                  {index < pathNodes.length - 1 && (
                    <div className="h-8 w-1 bg-blue-500 my-1"></div>
                  )}
                </React.Fragment>
              ))}
            </div> 
          ) : ( 
            <div className="flex-1 flex items-center justify-center text-gray-500 italic">Select your preferences to begin.</div> 
          )} 
        </div> 
      </div> 
    </div> 
  ); 
}; 
export default RoadMap;