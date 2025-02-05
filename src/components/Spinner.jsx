import './Spinner.css';

function Spinner({ message }) {
    return (
        <div className="spinner-overlay">
            <div className="d-flex flex-column justify-content-center align-items-center gap-3">
                <div className="spinner-border spinner-custom" />

                {message && <p className="spinner-message">{message}</p>}
            </div>
        </div>
    );
}

export default Spinner;