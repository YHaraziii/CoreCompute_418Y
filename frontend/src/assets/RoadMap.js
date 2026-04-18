import { useState } from 'react';

const RoadMap = () => {
  const [skillLevel, setSkillLevel] = useState('');
  const [learningGoal, setLearningGoal] = useState('');
  const [timeCommitment, setTimeCommitment] = useState('');
  const [generatedRoadmap, setGeneratedRoadmap] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for generating roadmap
    setGeneratedRoadmap(`Generated roadmap for ${skillLevel} level, goal: ${learningGoal}, time: ${timeCommitment}`);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Left Window */}
      <div style={{ flex: 1, padding: '20px', borderRight: '1px solid #ccc' }}>
        <h2>Generate Personalized Learning Path</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="skillLevel">Current Skill Level:</label>
            <select
              id="skillLevel"
              value={skillLevel}
              onChange={(e) => setSkillLevel(e.target.value)}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            >
              <option value="">Select Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
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

export default RoadMap;