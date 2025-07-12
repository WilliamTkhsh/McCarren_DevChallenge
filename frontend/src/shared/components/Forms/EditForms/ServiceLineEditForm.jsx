import AddServiceLineButton from "../../Button/AddServiceLineButton";
import './EditForms.css'

export default function ServiceLineEditForm({ serviceLines, onChange }) {
  const handleLineChange = (index, value) => {
    const updated = [...serviceLines];
    updated[index] = value;
    onChange(updated);
  };

  const addServiceLine = () => {
    onChange([...serviceLines, ""]);
  };

  const removeServiceLine = (indexToRemove) => {
    const updated = serviceLines.filter((_, index) => index !== indexToRemove);
    onChange(updated);
  };

  return (
    <div className="form-group">
      <label className="form-label">Service Lines</label>
      {serviceLines.map((line, index) => (
        <div key={index} className="input-with-remove">
          <input
            type="text"
            value={line}
            onChange={e => handleLineChange(index, e.target.value)}
            className="form-input"
            placeholder={`Service Line ${index + 1}`}
          />
          <button
            type="button"
            className="btn-remove-inside"
            onClick={() => removeServiceLine(index)}
            title="Remove"
          >
            ×
          </button>
        </div>
      ))}
    <AddServiceLineButton OnClick={addServiceLine}/>
    </div>
  );
}
