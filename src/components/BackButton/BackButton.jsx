import { useNavigate } from 'react-router-dom';
import { scrollToTop } from '../../utils/ScrollUtils';

const BackButton = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
        scrollToTop();
    };

    return (
        <div className="d-flex justify-content-center justify-content-md-start mb-3">
            <button
                className="btn custom-btn"
                onClick={handleBack}
            >
                <i className="bi bi-arrow-left me-2" />
                Atrás
            </button>
        </div>
    );
};

export default BackButton;