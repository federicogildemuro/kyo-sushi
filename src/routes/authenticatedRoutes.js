import { lazy } from 'react';

const UnderConstruction = lazy(() => import('../pages/misc/UnderConstruction'));
const Cart = lazy(() => import('../pages/cart/Cart'));
const Favorites = lazy(() => import('../pages/favorites/Favorites'));
const Checkout = lazy(() => import('../pages/checkout/Checkout'));
const OrderConfirmation = lazy(() => import('../pages/checkout/OrderConfirmation'));

const userRoutes = [
    { path: '/profile', component: UnderConstruction },
    { path: '/cart', component: Cart },
    { path: '/favorites', component: Favorites },
    { path: '/checkout', component: Checkout },
    { path: '/order-confirmation/:orderId', component: OrderConfirmation }
];

export default userRoutes;