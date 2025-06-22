import React, { useContext } from 'react';
import { GeneralContext } from '../context/GeneralContext';
import '../styles/authenticate.css';

const Login = ({ setAuthType }) => {
  const { setEmail, setPassword, login } = useContext(GeneralContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    await login();
  };

  return (
    <div className="auth-box">
<h2 className="auth-title">🔐 Login</h2>

      <form className="authForm" onSubmit={handleLogin}>
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

        <button type="submit" className="auth-btn">🚀 Sign In</button>
      </form>

      <p className="auth-toggle">
        New to SB Works?{' '}
        <span onClick={() => setAuthType('register')}>Create an account</span>
      </p>
    </div>
  );
};

export default Login;
