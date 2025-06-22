import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/client/client.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // 🚀 Animation

const Client = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [displayProjects, setDisplayProjects] = useState([]);
  const [filterProject, setFilterProject] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    await axios
      .get('http://localhost:6001/fetch-projects')
      .then((response) => {
        let pros = response.data.filter((pro) => pro.clientId === localStorage.getItem('userId'));
        setProjects(pros);
        setDisplayProjects(pros.reverse());
      })
      .catch((err) => {
        console.log(err);
        fetchProjects();
      });
  };

  const handleFilterChange = (data) => {
    if (data === '') {
      setDisplayProjects(projects);
    } else if (data === 'Un Assigned') {
      setDisplayProjects(projects.filter((project) => project.status === 'Available').reverse());
    } else if (data === 'In Progress') {
      setDisplayProjects(projects.filter((project) => project.status === 'Assigned').reverse());
    } else if (data === 'Completed') {
      setDisplayProjects(projects.filter((project) => project.status === 'Completed').reverse());
    }
  };

  return (
    <motion.div
      className="client-projects-page"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="client-projects-list">
        <div className="client-projects-header">
          <h3>My projects</h3>
          <select
            className="form-control"
            placeholder="Project status"
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="">Choose project status</option>
            <option value="Un Assigned">Un Assigned</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <hr />

        {displayProjects.map((project) => (
          <motion.div
            className="listed-project"
            key={project._id}
            onClick={() => navigate(`/client-project/${project._id}`)}
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="listed-project-head">
              <h3>{project.title}</h3>
              <p>{String(project.postedDate).slice(0, 25)}</p>
            </div>
            <h5>Budget - ₹ {project.budget}</h5>
            <p>{project.description}</p>

            <div className="bids-data">
              <h6>Status - {project.status}</h6>
            </div>
            <hr />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Client;
