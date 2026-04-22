import { useState } from 'react';

function Login() {
    // State variables to store what the user types into the boxes
    const [email, setEmail] = useState('');
    const [monkeyPassword, setMonkeyPassword] = useState('');

    // This function runs when the user clicks the login button
    const handleLogin = async (event) => {
        event.preventDefault(); // Stops the page from reloading

        try {
            // Send the data to your backend server
            const response = await fetch('http://localhost:9000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Email: email,
                    Password: monkeyPassword
                })
            });

            // Read the message sent back from the backend
            const message = await response.text();
            alert(message); // Pop up a browser alert with the result

        } catch (error) {
            alert("Could not connect to the server!");
        }
    };

    return (
        <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
            <h2>Login to CoreCompute</h2>
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Email: </label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Password: </label>
                    <input 
                        type="password" 
                        value={monkeyPassword} 
                        onChange={(e) => setMonkeyPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Secure Login</button>
            </form>
        </div>
    );
}

export default Login;