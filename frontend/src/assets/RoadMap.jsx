import { useState } from 'react';

const RoadMap = () => {
  const [skillLevels, setSkillLevels] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [learningGoal, setLearningGoal] = useState('');
  const [timeCommitment, setTimeCommitment] = useState('');
  const [generatedRoadmap, setGeneratedRoadmap] = useState('');

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

  const Modal = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        width: '300px',
        maxHeight: '400px',
        overflow: 'auto'
      }}>
        <h3>Select Your Current Skill Levels</h3>
        {skillOptions.map(skill => (
          <div key={skill} style={{ marginBottom: '10px' }}>
            <label style={{ display: 'flex', alignItems: 'center' }}>
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
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
          <button
            onClick={() => setIsModalOpen(false)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Left Window */}
      <div style={{ flex: 1, padding: '20px', borderRight: '1px solid #ccc' }}>
        <h2>Generate Personalized Learning Path</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label>Current Skill Level:</label>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
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

      {/* Modal */}
      {isModalOpen && <Modal />}
    </div>
  );
};

export default RoadMap;