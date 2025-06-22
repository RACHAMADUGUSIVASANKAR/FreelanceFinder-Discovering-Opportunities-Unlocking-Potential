import React, { useEffect, useState } from 'react';
import '../../styles/client/ClientApplications.css';
import axios from 'axios';
import { motion } from 'framer-motion';

const ProjectApplications = () => {
  const [applications, setApplications] = useState([]);
  const [displayApplications, setDisplayApplications] = useState([]);
  const [projectTitles, setProjectTitles] = useState([]);
  const [projectFilter, setProjectFilter] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    await axios
      .get('http://localhost:6001/fetch-applications')
      .then((response) => {
        const apps = response.data.filter(
          (app) => app.clientId === localStorage.getItem('userId')
        );
        setApplications(apps);
        setDisplayApplications(apps.reverse());
        setProjectTitles([...new Set(apps.map((a) => a.title))]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleApprove = async (id) => {
    await axios
      .get(`http://localhost:6001/approve-application/${id}`)
      .then(() => {
        alert('Application approved');
        fetchApplications();
      })
      .catch(() => {
        alert('Operation failed!!');
      });
  };

  const handleReject = async (id) => {
    await axios
      .get(`http://localhost:6001/reject-application/${id}`)
      .then(() => {
        alert('Application rejected!!');
        fetchApplications();
      })
      .catch(() => {
        alert('Operation failed!!');
      });
  };

  const handleFilterChange = (value) => {
    if (value === '') {
      setDisplayApplications(applications.reverse());
    } else {
      setDisplayApplications(
        applications.filter((application) => application.title === value).reverse()
      );
    }
  };

  return (
    <motion.div
      className="client-applications-page"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {projectTitles.length > 0 && (
        <span>
          <h3>Applications</h3>
          <select className="form-control" onChange={(e) => handleFilterChange(e.target.value)}>
            <option value="">All Projects</option>
            {projectTitles.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
        </span>
      )}

      <div className="client-applications-body">
        {displayApplications.map((application) => (
          <motion.div
            className="client-application"
            key={application._id}
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <div className="client-application-body">
              <div className="client-application-half">
                <h4>{application.title}</h4>
                <p>{application.description}</p>
                <span>
                  <h5>Skills</h5>
                  <div className="application-skills">
                    {application.requiredSkills.map((skill) => (
                      <p key={skill}>{skill}</p>
                    ))}
                  </div>
                </span>
                <h6>Budget - ₹ {application.budget}</h6>
              </div>

              <div className="vertical-line"></div>

              <div className="client-application-half">
                <span>
                  <h5>Proposal</h5>
                  <p>{application.proposal}</p>
                </span>
                <span>
                  <h5>Skills</h5>
                  <div className="application-skills">
                    {application.freelancerSkills.map((skill) => (
                      <p key={skill}>{skill}</p>
                    ))}
                  </div>
                </span>
                <h6>Proposed Budget - ₹ {application.bidAmount}</h6>
                <div className="approve-btns">
                  {application.status === 'Pending' ? (
                    <>
                      <button
                        className="btn btn-success"
                        onClick={() => handleApprove(application._id)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleReject(application._id)}
                      >
                        Decline
                      </button>
                    </>
                  ) : (
                    <h6>
                      Status: <b>{application.status}</b>
                    </h6>
                  )}
                </div>
              </div>
            </div>
            <hr />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectApplications;
