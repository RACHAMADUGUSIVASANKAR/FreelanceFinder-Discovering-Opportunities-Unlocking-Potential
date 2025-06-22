import React, { useEffect, useState } from 'react';
import '../../styles/freelancer/freelancer.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const Freelancer = () => {
  const [isDataUpdateOpen, setIsDataUpdateOpen] = useState(false);
  const navigate = useNavigate();

  const [freelancerData, setFreelancerData] = useState();
  const [skills, setSkills] = useState([]);
  const [description, setDescription] = useState('');
  const [freelancerId, setFreelancerId] = useState('');
  const [updateSkills, setUpdateSkills] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  const [applicationsCount, setApplicationsCount] = useState([]);

  useEffect(() => {
    fetchUserData(localStorage.getItem('userId'));
    fetchApplications();
  }, []);

  const fetchUserData = async (id) => {
    axios.get(`http://localhost:6001/fetch-freelancer/${id}`).then((response) => {
      setFreelancerData(response.data);
      if (response.data) {
        setFreelancerId(response.data._id);
        setSkills(response.data.skills);
        setDescription(response.data.description);
        setUpdateSkills(response.data.skills);
        setUpdateDescription(response.data.description);
      }
    });
  };

  const updateUserData = async () => {
    axios
      .post(`http://localhost:6001/update-freelancer`, {
        freelancerId,
        updateSkills,
        description: updateDescription,
      })
      .then(() => {
        fetchUserData();
        alert('User data updated');
      });
  };

  const fetchApplications = async () => {
    await axios
      .get('http://localhost:6001/fetch-applications')
      .then((response) => {
        setApplicationsCount(
          response.data.filter((application) => application.freelancerId === localStorage.getItem('userId'))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {freelancerData && (
        <motion.div
          className="freelancer-theme"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Top dashboard cards */}
          <div className="home-cards">
            <motion.div
              className="home-card"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h4>Current projects</h4>
              <p>{freelancerData.currentProjects.length}</p>
              <button onClick={() => navigate('/my-projects')}>View projects</button>
            </motion.div>

            <motion.div
              className="home-card"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h4>Completed projects</h4>
              <p>{freelancerData.completedProjects.length}</p>
              <button onClick={() => navigate('/my-projects')}>View projects</button>
            </motion.div>

            <motion.div
              className="home-card"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h4>Applications</h4>
              <p>{applicationsCount.length}</p>
              <button onClick={() => navigate('/myApplications')}>View Applications</button>
            </motion.div>

            <motion.div
              className="home-card"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h4>Funds</h4>
              <p>Available: ₹ {freelancerData.funds}</p>
            </motion.div>
          </div>

          {/* Skills and Description section */}
          <div className="freelancer-details">
            {!isDataUpdateOpen ? (
              <div className="freelancer-details-data">
                <span>
                  <h4>My Skills</h4>
                  <div className="skills">
                    {skills.length > 0 ? (
                      skills.map((skill, index) => (
                        <motion.h5
                          className="skill"
                          key={skill}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          {skill}
                        </motion.h5>
                      ))
                    ) : (
                      <p>No skills available</p>
                    )}
                  </div>
                </span>

                <span>
                  <h4>Description</h4>
                  <p>{description || 'Please add your description'}</p>
                </span>

                <button className="btn btn-outline-success" onClick={() => setIsDataUpdateOpen(true)}>
                  Update
                </button>
              </div>
            ) : (
              <div className="freelancer-details-update">
                <span>
                  <label htmlFor="mySkills">
                    <h4>My Skills</h4>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="mySkills"
                    placeholder="Enter skills"
                    value={updateSkills}
                    onChange={(e) => setUpdateSkills(e.target.value)}
                  />
                </span>

                <span>
                  <label htmlFor="description-textarea">
                    <h4>Description</h4>
                  </label>
                  <textarea
                    className="form-control"
                    id="description-textarea"
                    placeholder="Enter your description"
                    value={updateDescription}
                    onChange={(e) => setUpdateDescription(e.target.value)}
                  ></textarea>
                </span>

                <button className="btn btn-outline-success mt-3" onClick={updateUserData}>
                  Update
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Freelancer;
