import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, message } from 'antd';
import { useUser } from '../components/UserContext'; // Import the UserContext

const Login = ({ setIsAuthenticated, setRole }) => { // Add setRole as a prop
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Default credentials
    const adminCredentials = { username: 'admin', password: 'admin' };
    const userCredentials = { username: 'use', password: 'use' };

    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }

    // Check credentials
    if (username === adminCredentials.username && password === adminCredentials.password) {
      const userRole = 'Admin';
      setUser({ username, role: userRole }); // Update user context
      setRole(userRole); // Set role in state
      message.success('Login successful');
      setIsAuthenticated(true);
      navigate('/admin/dashboard', { replace: true });
    } else if (username === userCredentials.username && password === userCredentials.password) {
      const userRole = 'User';
      setUser({ username, role: userRole }); // Update user context
      setRole(userRole); // Set role in state
      message.success('Login successful');
      setIsAuthenticated(true);
      navigate('/user/dashboard', { replace: true });
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ background: 'linear-gradient(to bottom, #f5f7fa, #eaeef4, #d0dbe7, #a6bcd3, #7799b9)' }} p-4>
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md ">
        <h2 className="text-2xl mb-6 text-center text-persian-green-90">Login</h2>
        <Input 
          placeholder="Username" 
          className="mb-4" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <Input.Password 
          placeholder="Password" 
          className="mb-6" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <Button className="text-white hover:text-persian-green-500 bg-persian-green-600 w-full" onClick={handleLogin}>Login</Button>
        <div className="text-center mt-4">
          <Link to="/signup" className="text-persian-green-500 hover:text-persian-green-800">Don't have an account? Signup</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;