import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserRoute, PublicRoute, AuthenticatedRoute, AdminRoute } from './RouteGuards';
import Spinner from '../components/Spinner/Spinner';

/* Lazy-loaded components */
const LandingPage = lazy(() => import('../components/LandingPage/LandingPage'));
const ItemListContainer = lazy(() => import('../components/ItemListContainer/ItemListContainer'));
const ItemDetailContainer = lazy(() => import('../components/ItemDetailContainer/ItemDetailContainer'));
const AboutUs = lazy(() => import('../components/AboutUs/AboutUs'));
const Contact = lazy(() => import('../components/Contact/Contact'));
const Terms = lazy(() => import('../components/Terms/Terms'));
const NotFound = lazy(() => import('../components/NotFound/NotFound'));
const Register = lazy(() => import('../components/Register/Register'));
const Login = lazy(() => import('../components/Login/Login'));
const ResetPassword = lazy(() => import('../components/ResetPassword/ResetPassword'));
const UpdatePassword = lazy(() => import('../components/UpdatePassword/UpdatePassword'));
const Profile = lazy(() => import('../components/Profile/Profile'));
const Cart = lazy(() => import('../components/Cart/Cart'));
const Favorites = lazy(() => import('../components/Favorites/Favorites'));
const Checkout = lazy(() => import('../components/Checkout/Checkout'));
const AdminDashboard = lazy(() => import('../components/Admin/AdminDashboard/AdminDashboard'));
const AdminProducts = lazy(() => import('../components/Admin/AdminProducts/AdminProducts'));
const ProductForm = lazy(() => import('../components/Admin/ProductForm/ProductForm'));
const AdminOrders = lazy(() => import('../components/Admin/AdminOrders/AdminOrders'));
const OrderForm = lazy(() => import('../components/Admin/OrderForm/OrderForm'));
const AdminUsers = lazy(() => import('../components/Admin/AdminUsers/AdminUsers'));
const UserForm = lazy(() => import('../components/Admin/UserForm/UserForm'));

function AppRoutes() {
    return (
        <Suspense fallback={<Spinner />}>
            <Routes>
                {/* Users only routes (authenticated or not, but not admins) */}
                <Route path="/" element={<UserRoute><LandingPage /></UserRoute>} />
                <Route path="/tienda" element={<UserRoute><ItemListContainer /></UserRoute>} />
                <Route path="/tienda/:category" element={<UserRoute><ItemListContainer /></UserRoute>} />
                <Route path="/item/:id" element={<UserRoute><ItemDetailContainer /></UserRoute>} />
                <Route path="/about-us" element={<UserRoute><AboutUs /></UserRoute>} />
                <Route path="/contact" element={<UserRoute><Contact /></UserRoute>} />
                <Route path="/terms" element={<UserRoute><Terms /></UserRoute>} />

                {/* Public routes (not authenticated users) */}
                <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                <Route path="/reset-password" element={<PublicRoute><ResetPassword /></PublicRoute>} />
                <Route path="/update-password" element={<PublicRoute><UpdatePassword /></PublicRoute>} />

                {/* Authenticated Routes (only authenticated users but not admins) */}
                <Route path="/profile" element={<AuthenticatedRoute><Profile /></AuthenticatedRoute>} />
                <Route path="/cart" element={<AuthenticatedRoute><Cart /></AuthenticatedRoute>} />
                <Route path="/favorites" element={<AuthenticatedRoute><Favorites /></AuthenticatedRoute>} />
                <Route path="/checkout" element={<AuthenticatedRoute><Checkout /></AuthenticatedRoute>} />

                {/* Admin Routes (only admins) */}
                <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                <Route path="/admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
                <Route path="/admin/products/new" element={<AdminRoute><ProductForm /></AdminRoute>} />
                <Route path="/admin/products/:id" element={<AdminRoute><ProductForm /></AdminRoute>} />
                <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
                <Route path="/admin/orders/:id" element={<AdminRoute><OrderForm /></AdminRoute>} />
                <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
                <Route path="/admin/users/:id" element={<AdminRoute><UserForm /></AdminRoute>} />

                {/* Catch-all route for undefined paths */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
}

export default AppRoutes;