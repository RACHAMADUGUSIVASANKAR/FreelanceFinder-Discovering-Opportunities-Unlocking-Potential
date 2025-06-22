import React, { useContext, useState } from 'react';
import { GeneralContext } from '../context/GeneralContext';
import '../styles/authenticate.css';

const Register = ({ setAuthType }) => {
  const { register, setUsername, setEmail, setPassword, setUsertype } = useContext(GeneralContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    await register(); // this works with your context now
  };

  return (
    <div className="auth-box">
      <h2 className="auth-title">📝 Create Account</h2>

      <form className="authForm" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          className="auth-input"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email address"
          className="auth-input"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="auth-input"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select
          className="auth-input"
          onChange={(e) => setUsertype(e.target.value)}
          required
        >
          <option value="">Select User Type</option>
          <option value="freelancer">Freelancer</option>
          <option value="client">Client</option>
        </select>

        <button type="submit" className="auth-btn">✅ Register</button>
      </form>

      <p className="auth-toggle">
        Already have an account?{' '}
        <span onClick={() => setAuthType('login')}>Sign In</span>
      </p>
    </div>
  );
};

export default Register;
