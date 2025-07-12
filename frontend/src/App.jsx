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
    if (!url.trim()) {
      setError('Please enter a valid URL.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const prompt = `
      Given the URL of a company's website below, extract the following information:

      - Company Name
      - One or more Service Lines (e.g., Cybersecurity, Software Development)
      - Short Company Description
      - Tier 1 Keywords (keywords that this company would use to search for public government opportunities)
      - Tier 2 Keywords (keywords that this company MIGHT use to search for government opportunities)

      Return the result in the following JSON format:
      {
        "company_name": "",
        "service_line": [],
        "company_description": "",
        "tier1_keywords": [],
        "tier2_keywords": [],
        "emails": [],
        "poc": ""
      }

      Here is the URL for the website:
      ${url}
      `;

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You are an assistant that summarizes company websites and always responds with a valid JSON object that matches the schema. Do not include explanations.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.5,
          max_tokens: 800,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
        }
      );

      const content = response.data.choices[0].message.content;
      const parsed = JSON.parse(content);
      setProfile(parsed);
      setShowModal(true);
    } catch (err) {
      console.error("Error generating profile:", err);
      setError("Failed to generate profile. Please check the URL or try again later.");
    } finally {
      setIsLoading(false);
    }
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
