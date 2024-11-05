import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, message } from 'antd';
import { useUser } from '../components/UserContext'; // Import the UserContext
import axios from 'axios';
import qs from 'qs'; // Import qs for URL encoding

const Login = ({ setIsAuthenticated, setRole }) => { // Add setRole as a prop
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }

    try {
      const response = await axios.post('http://172.18.7.93:7002/auth', 
        qs.stringify({
          grant_type: 'password',
          username: username,
          password: password,
          scope: '', 
          client_id: '', 
          client_secret: '', 
        }), 
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      if (response.data && response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token);
        
        const userRole = response.data.role.role; // Assuming 'role' is part of the response
        setUser({ username, role: userRole }); // Update user context
        setRole(userRole); // Set role in state

        message.success('Login successful');
        console.log("User Role:", userRole);

        setIsAuthenticated(true);
        
        // Navigate based on user role
        if (userRole.toLowerCase() === 'admin') {
          navigate('/admin/dashboard', { replace: true });
        } else if (userRole.toLowerCase() === 'user') {
          navigate('/user/dashboard', { replace: true });
        } else {
          console.error("Unknown user role:", userRole);
          setError('Invalid role. Access denied.');
        }
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Login failed. Please try again.');
      }
      console.error('There was an error during the login process:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ background: 'linear-gradient(to bottom, #f5f7fa, #eaeef4, #d0dbe7, #a6bcd3, #7799b9)' }} p-4>
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-6 text-center text-gray-800">Login</h2>
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
        <Button className="text-white hover:text-cornflower-500 bg-cornflower-600 w-full" onClick={handleLogin}>Login</Button>
        <div className="text-center mt-4">
          <Link to="/signup" className="text-cornflower-500 hover:text-cornflower-800">Don't have an account? Signup</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
