import './Button.css'

export default function EditButton({ OnClick, IsEditing }) {
    return (              
        <button className="btn btn-primary" onClick={OnClick}>
            {IsEditing ? "View" : "Edit"}
        </button>
    );
}