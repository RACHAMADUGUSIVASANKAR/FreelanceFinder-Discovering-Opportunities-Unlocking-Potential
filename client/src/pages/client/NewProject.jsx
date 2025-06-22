import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/client/newProject.css';
import { motion } from 'framer-motion';

const NewProject = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState(0);
  const [skills, setSkills] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await axios
      .post('http://localhost:6001/new-project', {
        title,
        description,
        budget,
        skills,
        clientId: localStorage.getItem('userId'),
        clientName: localStorage.getItem('username'),
        clientEmail: localStorage.getItem('email'),
      })
      .then(() => {
        alert('New project added!');
        setTitle('');
        setDescription('');
        setBudget(0);
        setSkills('');
        navigate('/client');
      })
      .catch((err) => {
        alert('Operation failed!');
      });
  };

  return (
    <motion.div
      className="new-project-page"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3>Post New Project</h3>

      <motion.div
        className="new-project-form"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="form-floating">
          <motion.input
            type="text"
            className="form-control mb-3"
            id="floatingTitle"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            whileFocus={{ scale: 1.02 }}
          />
          <label htmlFor="floatingTitle">Project Title</label>
        </div>

        <div className="form-floating">
          <motion.textarea
            type="text"
            className="form-control mb-3"
            id="floatingDesc"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            whileFocus={{ scale: 1.02 }}
          />
          <label htmlFor="floatingDesc">Description</label>
        </div>

        <span>
          <div className="form-floating">
            <motion.input
              type="number"
              className="form-control mb-3"
              id="floatingBudget"
              placeholder="Budget"
              onChange={(e) => setBudget(e.target.value)}
              whileFocus={{ scale: 1.02 }}
            />
            <label htmlFor="floatingBudget">Budget (₹)</label>
          </div>

          <div className="form-floating">
            <motion.input
              type="text"
              className="form-control mb-3"
              id="floatingSkills"
              placeholder="Skills"
              onChange={(e) => setSkills(e.target.value)}
              whileFocus={{ scale: 1.02 }}
            />
            <label htmlFor="floatingSkills">Skills (comma separated)</label>
          </div>
        </span>

        <motion.button
          className="btn"
          onClick={handleSubmit}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default NewProject;
