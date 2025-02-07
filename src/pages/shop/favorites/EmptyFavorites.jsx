import { Link } from "react-router-dom";
import { scrollToTop } from "../../../utils/scrollUtils";

const EmptyFavorites = () => {
    return (
        <div>
            <p className="fs-5 mb-5">
                <i className="bi bi-heart me-2" />
                No tienes productos marcados como favoritos
            </p>

            <Link
                to="/tienda"
                className="btn custom-btn"
                onClick={scrollToTop}
            >
                Ir a la tienda
                <i className="bi bi-shop ms-2" />
            </Link>
        </div>
    );
};

export default EmptyFavorites;