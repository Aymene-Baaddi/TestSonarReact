import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './login.css'; // Optional: for your custom styles

function Login() { 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:2002/Owner', {
        name: name,
        email: email,
        password: password,
      });

      if (response.data) {
        // Successfully created the owner, navigate to the home page or wherever
        navigate('/home');
      } else {
        setErrorMessage('Registration failed');
      }
    } catch (error) {
      setErrorMessage('An error occurred during registration');
      console.error('An error occurred during registration:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="text-center">Register New Owner</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Register
          </button>
        </form>
        <div className="text-center mt-3">
          <span>Already have an account?</span>{' '}
          <span
            onClick={() => navigate(`/login`)}
            className="btn btn-link"
            style={{ color: 'black', textDecoration: 'none' }}
          >
            <span style={{ color: "#323e5b" }}>Login</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
