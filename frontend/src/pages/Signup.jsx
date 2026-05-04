import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:9000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Name: name, Email: email, Password: password })
      });
      if (res.ok) {
        navigate('/login'); 
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-gray-800 p-8 rounded-xl border border-gray-700">
      <h2 className="text-3xl font-bold text-blue-400 mb-6 text-center">Sign Up</h2>
      <form onSubmit={handleSignup} className="space-y-4">
        <input 
          type="text" placeholder="Full Name" required
          className="w-full p-3 bg-gray-900 border border-gray-600 rounded text-white"
          onChange={(e) => setName(e.target.value)}
        />
        <input 
          type="email" placeholder="Email" required
          className="w-full p-3 bg-gray-900 border border-gray-600 rounded text-white"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" placeholder="Password" required
          className="w-full p-3 bg-gray-900 border border-gray-600 rounded text-white"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-green-600 hover:bg-green-500 text-white p-3 rounded font-bold transition-colors">
          Create Account
        </button>
      </form>
    </div>
  );
}

export default Signup;