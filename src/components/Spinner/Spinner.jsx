import './Spinner.css'

function Spinner() {
    return (
        <div className="spinner-overlay">
            <div className="d-flex justify-content-center align-items-center">
                <div className="spinner-border spinner-custom" />
            </div>
        </div>
    )
}

export default Spinner