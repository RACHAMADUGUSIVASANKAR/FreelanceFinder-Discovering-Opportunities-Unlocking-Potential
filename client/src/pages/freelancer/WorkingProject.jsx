import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/freelancer/WorkingProject.css'; // ✅ Create this CSS file

const WorkingProject = () => {
  return (
    <motion.div 
      className="working-project-page"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>🛠️ Ongoing Project</h2>
      
      <div className="project-progress-box">
        <h4>Project Title: Sample Project</h4>
        <p><b>Status:</b> In Progress</p>
        <p><b>Due Date:</b> 3 days remaining</p>
        <p><b>Freelancer Notes:</b> Currently integrating the API endpoints.</p>
      </div>

      <div className="submission-status">
        <h4>Submission</h4>
        <p>Not submitted yet. Use the "Submit Project" tab once completed.</p>
      </div>
    </motion.div>
  );
};

export default WorkingProject;
