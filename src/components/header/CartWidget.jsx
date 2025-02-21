import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';
import { scrollToTop } from '../../utils/scrollUtils';

function CartWidget() {
    // Get the user object and isAdmin value from the useAuth hook
    const { user, isAdmin } = useAuth();
    // Get the cartTotalQuantity value from the useCart hook
    const { cartTotalQuantity } = useCart();
    // State to handle the animation of the cart widget
    const [isAnimating, setIsAnimating] = useState(false);

    // Animate the cart widget when the cartTotalQuantity changes
    useEffect(() => {
        setIsAnimating(true);
        const timer = setTimeout(() => {
            setIsAnimating(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [cartTotalQuantity]);

    // Check if the cart has items
    const hasItems = cartTotalQuantity > 0;

    // Don't render the cart widget if the user is not authenticated or is admin
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

                    {/* Render the cartTotalQuantity value as a badge if the cart has items */}
                    {hasItems && (
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