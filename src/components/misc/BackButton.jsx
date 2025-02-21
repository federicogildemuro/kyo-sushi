import { useNavigate } from 'react-router-dom';
import { scrollToTop } from '../../utils/scrollUtils';

function BackButton() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
        scrollToTop();
    };

    return (
        <div className="d-flex justify-content-center justify-content-md-start my-5">
            <button
                className="btn custom-btn"
                onClick={handleBack}
                aria-label="Volver a la página anterior"
            >
                <i
                    className="bi bi-arrow-left me-2"
                    aria-hidden="true"
                />
                Atrás
            </button>
        </div>
    );
}

export default BackButton;