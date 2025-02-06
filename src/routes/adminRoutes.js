import { lazy } from 'react';

const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const AdminProducts = lazy(() => import('../pages/admin/AdminProducts'));
const ProductForm = lazy(() => import('../pages/admin/ProductForm'));
const AdminOrders = lazy(() => import('../pages/admin/AdminOrders'));
const OrderForm = lazy(() => import('../pages/admin/OrderForm'));

const adminRoutes = [
    { path: '/admin', component: AdminDashboard },
    { path: '/admin/products', component: AdminProducts },
    { path: '/admin/products/new', component: ProductForm },
    { path: '/admin/products/:id', component: ProductForm },
    { path: '/admin/orders', component: AdminOrders },
    { path: '/admin/orders/:id', component: OrderForm },
];

export default adminRoutes;