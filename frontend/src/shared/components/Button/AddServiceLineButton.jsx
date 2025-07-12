import './Button.css'

export default function AddServiceLineButton({ OnClick }) {
    return (              
        <button type="button" className="btn btn-black" onClick={OnClick}>+ Add</button>
    );
}