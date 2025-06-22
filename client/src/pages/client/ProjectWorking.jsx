import React, { useContext, useEffect, useState } from 'react';
import '../../styles/client/ProjectWorking.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { GeneralContext } from '../../context/GeneralContext';
import { motion } from 'framer-motion';

const ProjectWorking = () => {
  const { socket } = useContext(GeneralContext);
  const params = useParams();

  const [project, setProject] = useState();
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState();

  useEffect(() => {
    fetchProject(params['id']);
    fetchChats();
    socket.emit('join-chat-room', { projectId: params['id'], freelancerId: '' });

    socket.on('message-from-user', () => {
      fetchChats();
    });
  }, [socket]);

  const fetchProject = async (id) => {
    await axios.get(`http://localhost:6001/fetch-project/${id}`).then((res) => {
      setProject(res.data);
    });
  };

  const handleApproveSubmission = async () => {
    await axios.get(`http://localhost:6001/approve-submission/${params['id']}`).then(() => {
      fetchProject(params['id']);
      alert('Submission approved!!');
    });
  };

  const handleRejectSubmission = async () => {
    await axios.get(`http://localhost:6001/reject-submission/${params['id']}`).then(() => {
      fetchProject(params['id']);
      alert('Submission rejected!!');
    });
  };

  const handleMessageSend = async () => {
    socket.emit('new-message', {
      projectId: params['id'],
      senderId: localStorage.getItem('userId'),
      message,
      time: new Date()
    });
    setMessage('');
    fetchChats();
  };

  const fetchChats = async () => {
    await axios.get(`http://localhost:6001/fetch-chats/${params['id']}`).then((res) => {
      setChats(res.data);
    });
  };

  return (
    <>
      {project && (
        <motion.div
          className="project-data-page"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="project-data-container">
            <div className="project-data">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <span>
                <h5>Required skills</h5>
                <div className="required-skills">
                  {project.skills.map((skill) => (
                    <p key={skill}>{skill}</p>
                  ))}
                </div>
              </span>
              <span>
                <h5>Budget</h5>
                <h6>₹ {project.budget}</h6>
              </span>
            </div>

            {project.freelancerId && (
              <motion.div
                className="project-submissions-container"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 150 }}
              >
                <h4>Submission</h4>

                <div className="project-submissions">
                  {project.submission ? (
                    <div className="project-submission">
                      <span>
                        <h5>Project Link: </h5>
                        <a href={project.projectLink} target="_blank" rel="noopener noreferrer">
                          {project.projectLink}
                        </a>
                      </span>

                      <span>
                        <h5>Manual Link: </h5>
                        <a href={project.manulaLink} target="_blank" rel="noopener noreferrer">
                          {project.manulaLink}
                        </a>
                      </span>

                      <h5>Description for work</h5>
                      <p>{project.submissionDescription}</p>

                      {project.submissionAccepted ? (
                        <h5 style={{ color: 'lightgreen' }}>✅ Project completed</h5>
                      ) : (
                        <div className="submission-btns">
                          <button className="btn btn-success" onClick={handleApproveSubmission}>
                            Approve
                          </button>
                          <button className="btn btn-danger" onClick={handleRejectSubmission}>
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p>No submissions yet!!</p>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          <motion.div
            className="project-chat-container"
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 180 }}
          >
            <h4>Chat with the Freelancer</h4>
            <hr />

            {project.freelancerId ? (
              <div className="chat-body">
                {chats && (
                  <div className="chat-messages">
                    {chats.messages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={
                          msg.senderId === localStorage.getItem('userId')
                            ? 'my-message'
                            : 'received-message'
                        }
                      >
                        <div>
                          <p>{msg.text}</p>
                          <h6>
                            {msg.time.slice(5, 10)} - {msg.time.slice(11, 19)}
                          </h6>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <hr />
                <div className="chat-input">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter something..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button onClick={handleMessageSend}>Send</button>
                </div>
              </div>
            ) : (
              <i style={{ color: '#ccc' }}>Chat will be enabled if the project is assigned.</i>
            )}
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default ProjectWorking;
