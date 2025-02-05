import { lazy } from 'react';

const Profile = lazy(() => import('../pages/user/Profile'));
const Cart = lazy(() => import('../pages/shop/cart/Cart'));
const Favorites = lazy(() => import('../pages/shop/Favorites'));
const Checkout = lazy(() => import('../pages/shop/checkhout/Checkout'));

const userRoutes = [
    { path: '/profile', component: Profile },
    { path: '/cart', component: Cart },
    { path: '/favorites', component: Favorites },
    { path: '/checkout', component: Checkout }
];

export default userRoutes;