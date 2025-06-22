import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import '../../styles/admin/Admin.css'; // Optional if you want to style more

const Admin = () => {
  const navigate = useNavigate();

  const [projectsCount, setProjectsCount] = useState(0);
  const [completedProsCount, setCompletedProsCount] = useState(0);
  const [applicationsCount, setApplicationsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    fetchProjects();
    fetchApplications();
    fetchUsers();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get('http://localhost:6001/fetch-projects');
      setProjectsCount(res.data.length);
      const completed = res.data.filter((pro) => pro.status === 'Completed');
      setCompletedProsCount(completed.length);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await axios.get('http://localhost:6001/fetch-applications');
      setApplicationsCount(res.data.length);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:6001/fetch-users');
      setUsersCount(res.data.length);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="admin-page" style={{ background: '#0a1f44', minHeight: '100vh', padding: '40px' }}>
      <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '40px' }}>Welcome Admin 👋</h2>
      <div className="home-cards" style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {[ 
          { label: 'All Projects', value: projectsCount, path: '/admin-projects' },
          { label: 'Completed Projects', value: completedProsCount, path: '/admin-projects' },
          { label: 'Applications', value: applicationsCount, path: '/admin-applications' },
          { label: 'Users', value: usersCount, path: '/all-users' }
        ].map((card, index) => (
          <motion.div
            key={index}
            className="home-card"
            style={{
              background: 'white',
              padding: '30px',
              borderRadius: '10px',
              width: '260px',
              textAlign: 'center',
              boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5, type: 'spring', stiffness: 120 }}
            whileHover={{ scale: 1.05 }}
          >
            <h4 style={{ marginBottom: '10px', color: '#0a1f44' }}>{card.label}</h4>
            <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{card.value}</p>
            <button
              onClick={() => navigate(card.path)}
              style={{
                marginTop: '10px',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                background: '#0a1f44',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              View
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
