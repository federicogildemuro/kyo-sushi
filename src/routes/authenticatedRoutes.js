import { lazy } from 'react';

const Cart = lazy(() => import('../pages/shop/cart/Cart'));
const Favorites = lazy(() => import('../pages/shop/favorites/Favorites'));
const Checkout = lazy(() => import('../pages/shop/checkout/Checkout'));
const OrderConfirmation = lazy(() => import('../pages/shop/checkout/OrderConfirmation'));

const userRoutes = [
    { path: '/cart', component: Cart },
    { path: '/favorites', component: Favorites },
    { path: '/checkout', component: Checkout },
    { path: '/order-confirmation/:orderId', component: OrderConfirmation }
];

export default userRoutes;