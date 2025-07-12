import './Button.css'

export default function GenerateButton({ OnClick, IsLoading }) {
    return (              
        <button onClick={OnClick} className="generate-button" disabled={IsLoading}>{IsLoading ? 'Generating...' : 'Generate Profile'}</button>
    );
}