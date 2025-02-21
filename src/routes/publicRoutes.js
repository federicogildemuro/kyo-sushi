import { lazy } from 'react';

// Lazily loading page components to optimize performance
const Register = lazy(() => import('../pages/auth/Register'));
const Login = lazy(() => import('../pages/auth/Login'));
const ResetPassword = lazy(() => import('../pages/auth/ResetPassword'));
const UpdatePassword = lazy(() => import('../pages/auth/UpdatePassword'));

// Defining routes for public pages with their associated components
const publicRoutes = [
    { path: '/register', component: Register },
    { path: '/login', component: Login },
    { path: '/reset-password', component: ResetPassword },
    { path: '/update-password', component: UpdatePassword }
];

export default publicRoutes;