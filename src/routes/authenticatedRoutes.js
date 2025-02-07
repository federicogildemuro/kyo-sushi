import { lazy } from 'react';

const Cart = lazy(() => import('../pages/shop/cart/Cart'));
const Favorites = lazy(() => import('../pages/shop/favorites/Favorites'));
const Checkout = lazy(() => import('../pages/shop/checkout/Checkout'));

const userRoutes = [
    { path: '/cart', component: Cart },
    { path: '/favorites', component: Favorites },
    { path: '/checkout', component: Checkout }
];

export default userRoutes;