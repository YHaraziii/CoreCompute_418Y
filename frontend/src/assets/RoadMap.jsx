import { useState, useRef, useEffect } from 'react';
import './Style.css';

const RoadMap = () => {
  const [skillLevels, setSkillLevels] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [learningGoal, setLearningGoal] = useState('');
  const [timeCommitment, setTimeCommitment] = useState('');
  const [generatedRoadmap, setGeneratedRoadmap] = useState('');
  const dropdownRef = useRef(null);

  const skillOptions = ['Beginner', 'Intermediate', 'Advanced'];

  const handleSkillChange = (skill) => {
    setSkillLevels(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for generating roadmap
    const skillsText = skillLevels.length > 0 ? skillLevels.join(', ') : 'No skills selected';
    setGeneratedRoadmap(`Generated roadmap for ${skillsText} level(s), goal: ${learningGoal}, time: ${timeCommitment}`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Left Window */}
      <div style={{ flex: 1, padding: '20px', borderRight: '1px solid #ccc' }}>
        <h2>Generate Personalized Learning Path</h2>
        <form onSubmit={handleSubmit}>

          <div style={{ marginBottom: '10px', position: 'relative' }} ref={dropdownRef}>
            <label>Current Skill Level:</label>
            <button
              type="button"
              onClick={() => setIsDropdownOpen((open) => !open)}
              style={{
                width: '100%',
                padding: '8px',
                marginTop: '5px',
                backgroundColor: '#f8f9fa',
                border: '1px solid #ced4da',
                borderRadius: '4px',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              {skillLevels.length > 0 ? skillLevels.join(', ') : 'Select skill levels...'}
            </button>
            {isDropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                marginTop: '5px',
                backgroundColor: 'white',
                border: '1px solid #ced4da',
                borderRadius: '4px',
                boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
                zIndex: 10,
                padding: '10px'
              }}>
                {skillOptions.map(skill => (
                  <div key={skill} style={{ marginBottom: '8px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={skillLevels.includes(skill)}
                        onChange={() => handleSkillChange(skill)}
                        style={{ marginRight: '8px' }}
                      />
                      {skill}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="learningGoal">Learning Goal:</label>
            <select
              id="learningGoal"
              value={learningGoal}
              onChange={(e) => setLearningGoal(e.target.value)}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            >
              <option value="">Select Goal</option>
              <option value="Web Development">Web Development</option>
              <option value="Data Science">Data Science</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="Mobile Development">Mobile Development</option>
            </select>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="timeCommitment">Time Commitment:</label>
            <select
              id="timeCommitment"
              value={timeCommitment}
              onChange={(e) => setTimeCommitment(e.target.value)}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            >
              <option value="">Select Time</option>
              <option value="1-2 hours/week">1-2 hours/week</option>
              <option value="3-5 hours/week">3-5 hours/week</option>
              <option value="6-10 hours/week">6-10 hours/week</option>
              <option value="Full-time">Full-time</option>
            </select>
          </div>
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Generate My RoadMap
          </button>
        </form>
      </div>

      {/* Right Window */}
      <div style={{ flex: 1, padding: '20px' }}>
        <h2>Your Personalized Learning Path</h2>
        {generatedRoadmap ? (
          <p>{generatedRoadmap}</p>
        ) : (
          <p>Select your preferences and click "Generate My RoadMap" to see your personalized learning path.</p>
        )}
      </div>
    </div>
  );
};

//     <div style={{ display: 'flex', height: '100vh' }}>
//       {/* Left Window */}
//       <div style={{ flex: 1, padding: '20px', borderRight: '1px solid #ccc' }}>
//         <h2>Generate Personalized Learning Path</h2>
//         <form onSubmit={handleSubmit}>

//           <div style={{ marginBottom: '10px' }}>
//             <label>Current Skill Level:</label>
//             <button
//               type="button"
//               onClick={() => setIsModalOpen(true)}
//               style={{
//                 width: '100%',
//                 padding: '8px',
//                 marginTop: '5px',
//                 backgroundColor: '#f8f9fa',
//                 border: '1px solid #ced4da',
//                 borderRadius: '4px',
//                 cursor: 'pointer',
//                 textAlign: 'left'
//               }}
//             >
//               {skillLevels.length > 0 ? skillLevels.join(', ') : 'Select skill levels...'}
//             </button>
//           </div>
//           <div style={{ marginBottom: '10px' }}>
//             <label htmlFor="learningGoal">Learning Goal:</label>
//             <select
//               id="learningGoal"
//               value={learningGoal}
//               onChange={(e) => setLearningGoal(e.target.value)}
//               style={{ width: '100%', padding: '8px', marginTop: '5px' }}
//             >
//               <option value="">Select Goal</option>
//               <option value="Web Development">Web Development</option>
//               <option value="Data Science">Data Science</option>
//               <option value="Machine Learning">Machine Learning</option>
//               <option value="Mobile Development">Mobile Development</option>
//             </select>
//           </div>
//           <div style={{ marginBottom: '20px' }}>
//             <label htmlFor="timeCommitment">Time Commitment:</label>
//             <select
//               id="timeCommitment"
//               value={timeCommitment}
//               onChange={(e) => setTimeCommitment(e.target.value)}
//               style={{ width: '100%', padding: '8px', marginTop: '5px' }}
//             >
//               <option value="">Select Time</option>
//               <option value="1-2 hours/week">1-2 hours/week</option>
//               <option value="3-5 hours/week">3-5 hours/week</option>
//               <option value="6-10 hours/week">6-10 hours/week</option>
//               <option value="Full-time">Full-time</option>
//             </select>
//           </div>
//           <button
//             type="submit"
//             style={{
//               padding: '10px 20px',
//               backgroundColor: '#007bff',
//               color: 'white',
//               border: 'none',
//               borderRadius: '5px',
//               cursor: 'pointer'
//             }}
//           >
//             Generate My RoadMap
//           </button>
//         </form>
//       </div>

//       {/* Right Window */}
//       <div style={{ flex: 1, padding: '20px' }}>
//         <h2>Your Personalized Learning Path</h2>
//         {generatedRoadmap ? (
//           <p>{generatedRoadmap}</p>
//         ) : (
//           <p>Select your preferences and click "Generate My RoadMap" to see your personalized learning path.</p>
//         )}
//       </div>

//       {/* Modal */}
//       {isModalOpen && <Modal />}
//     </div>
//   );
// };



export default RoadMap;