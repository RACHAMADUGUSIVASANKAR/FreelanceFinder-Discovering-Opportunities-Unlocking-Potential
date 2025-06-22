import React, { useEffect, useState } from 'react';
import '../../styles/admin/allApplications.css';
import axios from 'axios';
import { motion } from 'framer-motion';

const AllApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get("http://localhost:6001/fetch-applications");
      setApplications(response.data.reverse());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="user-applications-page" style={{ backgroundColor: '#0b1f3a', padding: '30px', minHeight: '100vh' }}>
      <h3 style={{ color: 'white', marginBottom: '30px' }}>📁 All Applications</h3>

      <div className="user-applications-body">
        {applications.map((application, index) => (
          <motion.div
            className="user-application"
            key={application._id}
            style={{
              backgroundColor: '#ffffff0a',
              borderRadius: '12px',
              padding: '25px',
              marginBottom: '25px',
              color: 'white',
              boxShadow: '0 0 12px rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(5px)'
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, type: 'spring' }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="user-application-body" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              {/* Left Side */}
              <div className="user-application-half" style={{ flex: 1 }}>
                <h4>{application.title}</h4>
                <p>{application.description}</p>

                <h5>Skills</h5>
                <div className="application-skills" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {application.requiredSkills.map(skill => (
                    <span key={skill} style={{ background: '#1e3a8a', padding: '5px 10px', borderRadius: '8px' }}>
                      {skill}
                    </span>
                  ))}
                </div>

                <h6>Budget: ₹{application.budget}</h6>
                <p><b>Client:</b> {application.clientName}</p>
                <p><b>Client ID:</b> {application.clientId}</p>
                <p><b>Client Email:</b> {application.clientEmail}</p>
              </div>

              {/* Right Side */}
              <div className="user-application-half" style={{ flex: 1 }}>
                <h5>Proposal</h5>
                <p>{application.proposal}</p>

                <h5>Freelancer Skills</h5>
                <div className="application-skills" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {application.freelancerSkills.map(skill => (
                    <span key={skill} style={{ background: '#2563eb', padding: '5px 10px', borderRadius: '8px' }}>
                      {skill}
                    </span>
                  ))}
                </div>

                <h6>Proposed Budget: ₹{application.bidAmount}</h6>
                <p><b>Freelancer:</b> {application.freelancerName}</p>
                <p><b>ID:</b> {application.freelancerId}</p>
                <p><b>Email:</b> {application.freelancerEmail}</p>
                <p>
                  <b>Status:</b>{' '}
                  <span style={{
                    color:
                      application.status === 'Accepted'
                        ? 'lightgreen'
                        : application.status === 'Rejected'
                        ? 'red'
                        : 'orange'
                  }}>
                    {application.status}
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AllApplications;
