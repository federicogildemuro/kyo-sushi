import { lazy } from 'react';

const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const AdminProducts = lazy(() => import('../pages/admin/AdminProducts'));
const ProductForm = lazy(() => import('../pages/admin/ProductForm'));
const UnderConstruction = lazy(() => import('../pages/misc/UnderConstruction'));

const adminRoutes = [
    { path: '/admin', component: AdminDashboard },
    { path: '/admin/products', component: AdminProducts },
    { path: '/admin/products/new', component: ProductForm },
    { path: '/admin/products/:id', component: ProductForm },
    { path: '/admin/categories', component: UnderConstruction },
    { path: '/admin/orders', component: UnderConstruction },
    { path: '/admin/users', component: UnderConstruction }
];

export default adminRoutes;