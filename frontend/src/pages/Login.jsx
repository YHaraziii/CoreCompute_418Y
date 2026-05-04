import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:9000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Email: email, Password: password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        if (email === 'admin@corecompute.com') {
           navigate('/admin'); // Route sysadmin
        } else {
           navigate('/');
        }
        window.location.reload(); 
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to connect to server.");
    }
  };

  const handleReset = () => {
    setResetMessage("A password reset link has been sent to your email.");
  }

  return (
    <div className="max-w-md mx-auto mt-20 bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-2xl">
      <h2 className="text-3xl font-bold text-blue-400 mb-6 text-center">Login</h2>
      {error && <p className="text-red-400 mb-4 text-center">{error}</p>}
      {resetMessage && <p className="text-green-400 mb-4 text-center text-sm">{resetMessage}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <input type="email" placeholder="Email" required className="w-full p-3 bg-gray-900 border border-gray-600 rounded text-white focus:ring-2 focus:ring-blue-500" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" required className="w-full p-3 bg-gray-900 border border-gray-600 rounded text-white focus:ring-2 focus:ring-blue-500" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white p-3 rounded font-bold transition-colors shadow-lg">Log In</button>
      </form>
      <div className="mt-4 text-center">
        <button onClick={handleReset} className="text-sm text-gray-400 hover:text-white transition-colors">Forgot your password?</button>
      </div>
    </div>
  );
}
export default Login;