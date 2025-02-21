import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';
import { scrollToTop } from '../../utils/scrollUtils';

function CartWidget() {
    const { user, isAdmin } = useAuth();
    const { cartTotalQuantity } = useCart();
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        setIsAnimating(true);
        const timer = setTimeout(() => {
            setIsAnimating(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [cartTotalQuantity]);

    if (!user || isAdmin) return null;

    return (
        <div className="position-relative">
            <motion.div
                animate={{ scale: isAnimating ? [1, 1.25, 1] : 1 }}
                transition={{ duration: .5 }}
            >
                <Link
                    to="/cart"
                    title="Carrito"
                    className="nav-link"
                    onClick={scrollToTop}
                >
                    <i
                        className="nav-bar-icon bi bi-cart"
                        aria-hidden="true"
                    />

                    {cartTotalQuantity > 0 && (
                        <span
                            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                            aria-label={`Cantidad de productos en el carrito: ${cartTotalQuantity}`}
                        >
                            {cartTotalQuantity}
                        </span>
                    )}
                </Link>
            </motion.div>
        </div>
    );
}

export default CartWidget;