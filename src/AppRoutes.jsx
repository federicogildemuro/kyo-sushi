import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Spinner from './components/Spinner/Spinner';

const LandingPage = lazy(() => import('./components/LandingPage/LandingPage'));
const Register = lazy(() => import('./components/Register/Register'));
const Login = lazy(() => import('./components/Login/Login'));
const ResetPassword = lazy(() => import('./components/ResetPassword/ResetPassword'));
const ItemListContainer = lazy(() => import('./components/ItemListContainer/ItemListContainer'));
const ItemDetailContainer = lazy(() => import('./components/ItemDetailContainer/ItemDetailContainer'));
const Profile = lazy(() => import('./components/Profile/Profile'));
const Cart = lazy(() => import('./components/Cart/Cart'));
const Wishlist = lazy(() => import('./components/Wishlist/Wishlist'));
const Checkout = lazy(() => import('./components/Checkout/Checkout'));
const AboutUs = lazy(() => import('./components/AboutUs/AboutUs'));
const Contact = lazy(() => import('./components/Contact/Contact'));
const Terms = lazy(() => import('./components/Terms/Terms'));

function AppRoutes() {
    return (
        <Suspense fallback={<Spinner />}>
            <Routes>
                <Route path="/" element={<LandingPage />} />

                <Route path="/register" element={<Register />} />

                <Route path="/login" element={<Login />} />

                <Route path="/reset-password" element={<ResetPassword />} />

                <Route path="/tienda" element={<ItemListContainer />} />

                <Route path="/tienda/:category" element={<ItemListContainer />} />

                <Route path="/item/:id" element={<ItemDetailContainer />} />

                <Route path="/profile" element={<Profile />} />

                <Route path="/cart" element={<Cart />} />

                <Route path="/wishlist" element={<Wishlist />} />

                <Route path="/checkout" element={<Checkout />} />

                <Route path="/about-us" element={<AboutUs />} />

                <Route path="/contact" element={<Contact />} />

                <Route path="/terms" element={<Terms />} />

                <Route path="*" element={<LandingPage />} />
            </Routes>
        </Suspense>
    );
}

export default AppRoutes;