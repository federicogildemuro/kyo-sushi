import './Spinner.css';

function Spinner() {
    return (
        <div className="spinner-overlay d-flex align-items-center justify-content-center w-100 h-100">
            <div className="spinner-border spinner-custom" />
        </div>
    );
}

export default Spinner;