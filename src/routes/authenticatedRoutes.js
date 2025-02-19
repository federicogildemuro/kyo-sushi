import { lazy } from 'react';

const Profile = lazy(() => import('../pages/profile/Profile'));
const EditProfile = lazy(() => import('../pages/profile/EditProfile'));
const Orders = lazy(() => import('../pages/orders/Orders'));
const Cart = lazy(() => import('../pages/cart/Cart'));
const Favorites = lazy(() => import('../pages/favorites/Favorites'));
const Checkout = lazy(() => import('../pages/checkout/Checkout'));
const OrderConfirmation = lazy(() => import('../pages/checkout/OrderConfirmation'));

const userRoutes = [
    { path: '/profile', component: Profile },
    { path: '/profile/edit', component: EditProfile },
    { path: '/profile/orders', component: Orders },
    { path: '/cart', component: Cart },
    { path: '/favorites', component: Favorites },
    { path: '/checkout', component: Checkout },
    { path: '/order-confirmation/:orderId', component: OrderConfirmation }
];

export default userRoutes;