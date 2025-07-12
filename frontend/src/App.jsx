import { useState } from 'react'
import axios from 'axios';
import './App.css'
import Modal from "./shared/components/Modal/Modal";
import GenerateButton from "./shared/components/Button/GenerateButton";

function App() {
  const [profile, setProfile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
       /*
    if (!url) {
      setError('Please enter a URL.');
      return;
    }
    setIsLoading(true);
    setError('');

    try {

      const response = await axios.post('http://127.0.0.1:8000/generate-profile', {
        url: url
      });

      setProfile(response.data);
      setShowModal(true);

    } catch (err) {
      console.error("Error generating profile:", err);
      setError('Failed to generate profile. Please check the URL or try again later.');
    } finally {
      setIsLoading(false);
    }
     */
    
    const exampleProfile = {
      company_name: "TechNova Solutions",
      service_line: ["Cybersecurity", "Software Development"],
      company_description:
        "TechNova Solutions is a cutting-edge IT company specializing in enterprise cybersecurity and custom software development.",
      tier1_keywords: ["Cybersecurity", "IT Services"],
      tier2_keywords: ["Penetration Testing", "Cloud Development"],
      emails: [],
      poc: ""
    };
    setProfile(exampleProfile);
    setShowModal(true);   

  };

  const handleCloseModal = () => {
    const modal = document.querySelector(".modal-content");
    if (modal) {
      modal.classList.add("slide-out");
      modal.addEventListener("animationend", () => {
        setShowModal(false);
      }, { once: true });
    } else {
      setShowModal(false);
    }
  }

  const handleUpdateProfile = (updatedProfile) => setProfile(updatedProfile);

  return (
    <div className={`app-wrapper ${showModal ? "with-modal" : ""}`}>
      <div className="left-panel">
        <div className="card">
          <h1 className="generate-card-title">Company Profile Generator</h1>
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter website URL"
              className="url-input"
              value={url}
              onChange={(e) => setUrl(e.target.value)}              
              disabled={isLoading}
            />
            <GenerateButton OnClick={handleGenerate} IsLoading={isLoading}/>
          </div>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>

      <div className={`right-panel ${showModal ? "slide-in" : "hidden"}`}>
        <Modal isOpen={showModal} onClose={handleCloseModal} profile={profile} onUpdateProfile={handleUpdateProfile}/>
      </div>
    </div>
  )
}

export default App
