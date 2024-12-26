import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NotificationProvider } from './contexts/NotificationContext';
import { CartProvider } from './contexts/CartContext';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Spinner from './components/Spinner/Spinner';
import 'normalize.css';

const LandingPage = lazy(() => import('./components/LandingPage/LandingPage'));
const ItemListContainer = lazy(() => import('./components/ItemListContainer/ItemListContainer'));
const ItemDetailContainer = lazy(() => import('./components/ItemDetailContainer/ItemDetailContainer'));
const Cart = lazy(() => import('./components/Cart/Cart'));
const Checkout = lazy(() => import('./components/Checkout/Checkout'));
const AboutUs = lazy(() => import('./components/AboutUs/AboutUs'));
const Contact = lazy(() => import('./components/Contact/Contact'));

function App() {
    return (
        <BrowserRouter>
            <NotificationProvider>
                <CartProvider>
                    <NavBar />

                    <Suspense fallback={<Spinner />}>
                        <Routes>
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/tienda/" element={<ItemListContainer />} />
                            <Route path="/tienda/:category" element={<ItemListContainer />} />
                            <Route path="/item/:id" element={<ItemDetailContainer />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/checkout" element={<Checkout />} />
                            <Route path="/about-us" element={<AboutUs />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="*" element={<LandingPage />} />
                        </Routes>
                    </Suspense>

                    <Footer />
                </CartProvider>
            </NotificationProvider>
        </BrowserRouter>
    );
}

export default App;