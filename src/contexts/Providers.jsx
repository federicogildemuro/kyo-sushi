import { NotificationProvider } from './NotificationContext';
import { AuthProvider } from './AuthContext';
import { CartProvider } from './CartContext';
import { FavoritesProvider } from './FavoritesContext';

function Providers({ children }) {
    return (
        <NotificationProvider>
            <AuthProvider>
                <CartProvider>
                    <FavoritesProvider>
                        {children}
                    </FavoritesProvider>
                </CartProvider>
            </AuthProvider>
        </NotificationProvider>
    );
}

export default Providers;