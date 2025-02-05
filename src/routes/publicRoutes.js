import { lazy } from 'react';

const Register = lazy(() => import('../pages/auth/Register'));
const Login = lazy(() => import('../pages/auth/Login'));
const ResetPassword = lazy(() => import('../pages/auth/ResetPassword'));
const UpdatePassword = lazy(() => import('../pages/auth/UpdatePassword'));

const publicRoutes = [
    { path: '/register', component: Register },
    { path: '/login', component: Login },
    { path: '/reset-password', component: ResetPassword },
    { path: '/update-password', component: UpdatePassword }
];

export default publicRoutes;