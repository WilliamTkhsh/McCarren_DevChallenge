import './Button.css'

export default function CloseButton({ OnClick }) {
    return (              
        <button onClick={OnClick} className="btn btn-return">Return</button>
    );
}