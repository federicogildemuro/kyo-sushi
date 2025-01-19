import { NotificationProvider } from './NotificationContext';
import { AuthProvider } from './AuthContext';
import { CartProvider } from './CartContext';
import { WishlistProvider } from './WishlistContext';

function Providers({ children }) {
    return (
        <NotificationProvider>
            <AuthProvider>
                <CartProvider>
                    <WishlistProvider>
                        {children}
                    </WishlistProvider>
                </CartProvider>
            </AuthProvider>
        </NotificationProvider>
    );
}

export default Providers;