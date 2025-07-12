import { useState } from "react";
import './Modal.css'
import EditForm from "../Forms/EditForms/EditForm";
import EditButton from "../Button/EditButton";
import CloseButton from "../Button/CloseButton";
import ServiceLineEditForm from "../Forms/EditForms/ServiceLineEditForm";

export default function Modal({ isOpen, onClose, onUpdateProfile, profile }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (field, value) => {
    onUpdateProfile({ ...profile, [field]: value });
  };

  const handleArrayChange = (field, value) => {
    onUpdateProfile({ ...profile, [field]: value.split(",").map(s => s.trim()) });
  };

  if (!isOpen || !profile) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-body">
          <div className="modal-actions">
            <EditButton OnClick={() => setIsEditing(!isEditing)} IsEditing={isEditing}/>        
            <CloseButton OnClick={onClose}/>        
          </div>
          {isEditing ? (
            <div className="form-container">
              <h2 className="form-title">Edit Profile</h2>
              <EditForm FormLabel={"Company Name"} ProfileField={profile.company_name} onChange={e => handleChange("company_name", e.target.value)}/>
              <EditForm FormLabel={"Description"} ProfileField={profile.company_description} onChange={e => handleChange("company_description", e.target.value)}/>
              <ServiceLineEditForm
                serviceLines={profile.service_line}
                onChange={(updated) => onUpdateProfile({ ...profile, service_line: updated })}
              />
              <EditForm FormLabel={"Tier 1 Keywords"} ProfileField={profile.tier1_keywords.join(", ")} onChange={e => handleArrayChange("tier1_keywords", e.target.value)}/>
              <EditForm FormLabel={"Tier 2 Keywords"} ProfileField={profile.tier2_keywords.join(", ")} onChange={e => handleArrayChange("tier2_keywords", e.target.value)}/>
              <EditForm FormLabel={"Emails"} ProfileField={profile.emails.join(", ")} onChange={e => handleArrayChange("emails", e.target.value)}/>
              <EditForm FormLabel={"Point of Contact (POC)"} ProfileField={profile.poc} onChange={e => handleChange("poc", e.target.value)}/>
            </div>
          ) : (
            <div className="profile-view">
              <h2 className="profile-company-name">{profile.company_name}</h2>
              <p className="profile-description">{profile.company_description}</p>
              <div className="profile-details">
                {profile.service_line && profile.service_line.length > 0 && (<p><strong className="profile-detail-label">Service Lines:</strong> {profile.service_line.join(", ")}</p>)}
                <p><strong className="profile-detail-label">Tier 1 Keywords:</strong> {profile.tier1_keywords.join(", ")}</p>
                <p><strong className="profile-detail-label">Tier 2 Keywords:</strong> {profile.tier2_keywords.join(", ")}</p>
                <p><strong className="profile-detail-label">Emails:</strong> {profile.emails.length > 0 ? profile.emails.join(", ") : "None"}</p>
                <p><strong className="profile-detail-label">POC:</strong> {profile.poc || "Not provided"}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
