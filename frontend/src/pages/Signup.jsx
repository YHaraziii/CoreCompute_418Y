import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [monkeyPassword, setMonkeyPassword] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    // 1. Generate 50 random stars
    const stars = useMemo(() => {
        return Array.from({ length: 50 }).map(() => ({
            id: Math.random(),
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 1 + 0.5}s`,
        }));
    }, []);

    // 2. Listen for keystrokes
    useEffect(() => {
        if (name !== '' || email !== '' || monkeyPassword !== '') {
            setIsTyping(true);
            const timeout = setTimeout(() => setIsTyping(false), 800);
            return () => clearTimeout(timeout);
        }
    }, [name, email, monkeyPassword]);

    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:9000/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Name: name, Email: email, Password: monkeyPassword })
            });
            const message = await response.text();
            alert(message); 
        } catch (error) {
            alert("Could not connect to the server!");
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-[80vh] overflow-hidden">
            <style>{`
                @keyframes twinkle {
                    0%, 100% { transform: scale(0.5); opacity: 0.2; }
                    50% { transform: scale(1.5); opacity: 1; }
                }
                .star {
                    animation: twinkle var(--twinkle-speed) ease-in-out infinite;
                }
            `}</style>

            {/* Render the Stars */}
            {stars.map((star) => (
                <div
                    key={star.id}
                    className={`absolute w-1 h-1 bg-white rounded-full transition-opacity duration-700 ${
                        isTyping ? 'opacity-100 star' : 'opacity-0'
                    }`}
                    style={{
                        top: star.top,
                        left: star.left,
                        '--twinkle-speed': star.animationDuration,
                    }}
                />
            ))}

            {/* Signup Card */}
            <div className="relative z-10 bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-700">
                <h2 className="text-3xl font-bold text-center text-white mb-6 tracking-wide">
                    Create Account
                </h2>
                
                <form onSubmit={handleSignup} className="space-y-5">
                    <div>
                        <label className="block text-gray-300 text-sm font-semibold mb-2">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors relative z-20"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 text-sm font-semibold mb-2">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors relative z-20"
                            placeholder="Enter your email"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-gray-300 text-sm font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            value={monkeyPassword}
                            onChange={(e) => setMonkeyPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors relative z-20"
                            placeholder="Create a password"
                        />
                    </div>
                    
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 shadow-md mt-2 relative z-20"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-400 text-sm relative z-20">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-500 hover:text-blue-400 font-semibold transition-colors">
                        Log in here
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;