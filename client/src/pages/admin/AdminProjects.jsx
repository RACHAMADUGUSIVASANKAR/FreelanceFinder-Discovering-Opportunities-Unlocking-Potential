import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/freelancer/AllProjects.css';
import { motion } from 'framer-motion';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [displayprojects, setDisplayProjects] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get('http://localhost:6001/fetch-projects');
      setProjects(res.data);
      setDisplayProjects(res.data.reverse());

      const skillsSet = new Set();
      res.data.forEach((project) => {
        project.skills.forEach((skill) => skillsSet.add(skill));
      });
      setAllSkills([...skillsSet]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCategoryCheckBox = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setCategoryFilter([...categoryFilter, value]);
    } else {
      setCategoryFilter(categoryFilter.filter((s) => s !== value));
    }
  };

  useEffect(() => {
    if (categoryFilter.length > 0) {
      setDisplayProjects(
        projects
          .filter((project) =>
            categoryFilter.every((skill) => project.skills.includes(skill))
          )
          .reverse()
      );
    } else {
      setDisplayProjects(projects.reverse());
    }
  }, [categoryFilter]);

  return (
    <div className="all-projects-page" style={{ backgroundColor: '#0a1f44', minHeight: '100vh', padding: '40px' }}>
      <div className="project-filters" style={{ color: 'white' }}>
        <h3>Filter by Skills</h3>
        <hr style={{ borderColor: '#ffffff30' }} />
        <div className="filters">
          {allSkills.map((skill) => (
            <div className="form-check" key={skill} style={{ color: 'white' }}>
              <input
                className="form-check-input"
                type="checkbox"
                value={skill}
                id={skill}
                onChange={handleCategoryCheckBox}
              />
              <label className="form-check-label" htmlFor={skill}>
                {skill}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="projects-list">
        <h3 style={{ color: 'white' }}>All Projects</h3>
        <hr style={{ borderColor: '#ffffff30' }} />

        {displayprojects.map((project, index) => (
          <motion.div
            className="listed-project"
            key={project._id}
            style={{
              backgroundColor: '#ffffff0a',
              color: 'white',
              padding: '20px',
              borderRadius: '12px',
              marginBottom: '20px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              backdropFilter: 'blur(4px)',
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5, type: 'spring' }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="listed-project-head" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>{project.title}</h3>
              <p>{String(project.postedDate).slice(0, 25)}</p>
            </div>
            <h5>Budget: ₹{project.budget}</h5>
            <h5>Client: {project.clientName}</h5>
            <h6>Email: {project.clientEmail}</h6>
            <p>{project.description}</p>
            <div className="skills" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {project.skills.map((skill) => (
                <span key={skill} style={{ backgroundColor: '#1e3a8a', padding: '5px 10px', borderRadius: '6px' }}>
                  {skill}
                </span>
              ))}
            </div>
            <div className="bids-data" style={{ marginTop: '10px' }}>
              <p>{project.bids.length} bids</p>
              <h6>
                Avg Bid: ₹
                {project.bids.length > 0
                  ? project.bidAmounts.reduce((acc, val) => acc + val, 0)
                  : 0}
              </h6>
            </div>
            <h5>Status: {project.status}</h5>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminProjects;
