import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../styles/freelancer/ProjectData.css'
import { GeneralContext } from '../../context/GeneralContext';
import { motion } from 'framer-motion';

const ProjectData = () => {
  const { socket } = useContext(GeneralContext);
  const params = useParams();

  const [project, setProject] = useState();
  const [clientId, setClientId] = useState('');
  const [freelancerId] = useState(localStorage.getItem('userId'));
  const [projectId, setProjectId] = useState(params['id']);

  const [proposal, setProposal] = useState('');
  const [bidAmount, setBidAmount] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState('');

  const [projectLink, setProjectLink] = useState('');
  const [manualLink, setManualLink] = useState('');
  const [submissionDescription, setSubmissionDescription] = useState('');

  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([]);

  useEffect(() => {
    fetchProject(params['id']);
    joinSocketRoom();
    fetchChats();

    socket.on("message-from-user", () => fetchChats());
  }, [socket]);

  const joinSocketRoom = async () => {
    await socket.emit("join-chat-room", { projectId: params['id'], freelancerId });
  };

  const fetchProject = async (id) => {
    try {
      const res = await axios.get(`http://localhost:6001/fetch-project/${id}`);
      setProject(res.data);
      setClientId(res.data.clientId);
      setProjectId(res.data._id);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchChats = async () => {
    const res = await axios.get(`http://localhost:6001/fetch-chats/${params['id']}`);
    setChats(res.data);
  };

  const handleBidding = async () => {
    try {
      await axios.post("http://localhost:6001/make-bid", { clientId, freelancerId, projectId, proposal, bidAmount, estimatedTime });
      setProposal('');
      setBidAmount(0);
      setEstimatedTime('');
      alert("Bidding successful!!");
    } catch {
      alert("Bidding failed!! Try again!");
    }
  };

  const handleProjectSubmission = async () => {
    try {
      await axios.post("http://localhost:6001/submit-project", { clientId, freelancerId, projectId, projectLink, manualLink, submissionDescription });
      setProjectLink('');
      setManualLink('');
      setSubmissionDescription('');
      alert("Submission successful!!");
    } catch {
      alert("Submission failed!! Try again!");
    }
  };

  const handleMessageSend = async () => {
    socket.emit("new-message", {
      projectId,
      senderId: localStorage.getItem("userId"),
      message,
      time: new Date(),
    });
    setMessage('');
    fetchChats();
  };

  return project ? (
    <motion.div
      className="project-data-page dark-theme"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div className="project-data-container" initial={{ y: 30 }} animate={{ y: 0 }} transition={{ duration: 0.4 }}>
        <div className="project-data">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div>
            <h5>Required skills</h5>
            <div className="required-skills">
              {project.skills.map((skill) => <p key={skill}>{skill}</p>)}
            </div>
          </div>
          <h5>Budget: ₹{project.budget}</h5>
        </div>

        {/* Proposal Form */}
        {project.status === "Available" && (
          <motion.div className="project-form-body" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h4>Send proposal</h4>
            <input type="number" placeholder="Budget" className="form-control" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} />
            <input type="number" placeholder="Estimated days" className="form-control" value={estimatedTime} onChange={(e) => setEstimatedTime(e.target.value)} />
            <textarea placeholder="Describe your proposal" className="form-control" value={proposal} onChange={(e) => setProposal(e.target.value)} />
            {!project.bids.includes(freelancerId) ? (
              <button className="btn btn-success" onClick={handleBidding}>Post Bid</button>
            ) : (
              <button className="btn btn-secondary" disabled>Already bidded</button>
            )}
          </motion.div>
        )}

        {/* Submission Form */}
        {project.freelancerId === freelancerId && (
          <motion.div className="project-form-body" initial={{ scale: 0.95 }} animate={{ scale: 1 }}>
            <h4>Submit the project</h4>
            {project.submissionAccepted ? (
              <p>Project completed</p>
            ) : (
              <>
                <input type="text" placeholder="Project Link" className="form-control" value={projectLink} onChange={(e) => setProjectLink(e.target.value)} />
                <input type="text" placeholder="Manual Link" className="form-control" value={manualLink} onChange={(e) => setManualLink(e.target.value)} />
                <textarea placeholder="Describe your work" className="form-control" value={submissionDescription} onChange={(e) => setSubmissionDescription(e.target.value)} />
                {project.submission ? (
                  <button className="btn btn-secondary" disabled>Already submitted</button>
                ) : (
                  <button className="btn btn-success" onClick={handleProjectSubmission}>Submit Project</button>
                )}
              </>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Chat */}
      <motion.div className="project-chat-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h4>Chat with the client</h4>
        <hr />
        {project.freelancerId === freelancerId ? (
          <div className="chat-body">
            <div className="chat-messages">
              {chats?.messages?.map((message, i) => (
                <div key={i} className={message.senderId === freelancerId ? 'my-message' : 'received-message'}>
                  <p>{message.text}</p>
                  <h6>{new Date(message.time).toLocaleTimeString()}</h6>
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input type="text" className="form-control" placeholder="Type a message..." value={message} onChange={(e) => setMessage(e.target.value)} />
              <button onClick={handleMessageSend}>Send</button>
            </div>
          </div>
        ) : (
          <i style={{ color: '#aaa' }}>Chat is only available after assignment.</i>
        )}
      </motion.div>
    </motion.div>
  ) : null;
};

export default ProjectData;
