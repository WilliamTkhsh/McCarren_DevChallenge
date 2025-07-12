import './EditForms.css'

export default function EditForm({ FormLabel, ProfileField, onChange }) {
    return (              
        <div className="form-group">
            <label className="form-label">{FormLabel}</label>
            <input
                type="text"
                value={ProfileField}
                onChange={onChange}
                className="form-input"
            />
        </div>
    );
}