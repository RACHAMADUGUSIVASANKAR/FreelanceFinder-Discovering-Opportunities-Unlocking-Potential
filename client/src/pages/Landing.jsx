import React, { useEffect } from 'react';
import '../styles/landing.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const type = localStorage.getItem('usertype');
    if (type === 'freelancer') navigate('/freelancer');
    else if (type === 'client') navigate('/client');
    else if (type === 'admin') navigate('/admin');
  }, [navigate]);

  return (
    <motion.div className="landing-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}>
      <div className="landing-hero">
        <div className="landing-nav">
          <motion.div
            className="logo-title"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <img src="/logo.png" alt="SB Works Logo" className="logo-img" />
            <h3>Welcome to SB Works</h3>
          </motion.div>

          <motion.button
            onClick={() => navigate('/authenticate')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            🔐 Login Now
          </motion.button>
        </div>

        <motion.div
          className="landing-hero-text"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.h1 style={{ color: 'yellow' }}>
            Transform Your Passion Into Projects 💼
          </motion.h1>

          <br />
          <br />

          <motion.h5 transition={{ delay: 0.8 }}>
            From first-time freelancers to seasoned pros — SB Works helps you land gigs,
            <br /> show your talent, and build your dream career.
            <br />
            The future of freelancing starts here.
            <br />
            <br />
            <h3 style={{ color: 'yellow' }}>About SB Works</h3>
            <p>
              SB Works is a modern freelancing platform that connects clients with skilled freelancers across various industries.
              Whether you're a designer, developer, writer, or marketer — SB Works gives you a space to showcase your talent,
              apply to real projects, and grow your freelance career.
            </p>
            <p>
              Clients can post jobs, review freelancer profiles, and hire the best fit. Freelancers can apply to projects,
              submit work, and build strong portfolios with client reviews and ratings.
            </p>
          </motion.h5>

          <motion.button
            onClick={() => navigate('/authenticate')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            👋 Start Freelancing
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Landing;
