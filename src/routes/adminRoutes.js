import { lazy } from 'react';

const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const AdminProducts = lazy(() => import('../pages/admin/products/AdminProducts'));
const CreateProduct = lazy(() => import('../pages/admin/products/CreateProduct'));
const EditProduct = lazy(() => import('../pages/admin/products/EditProduct'));
const UnderConstruction = lazy(() => import('../pages/misc/UnderConstruction'));

const adminRoutes = [
    { path: '/admin', component: AdminDashboard },
    { path: '/admin/productos', component: AdminProducts },
    { path: '/admin/productos/nuevo', component: CreateProduct },
    { path: '/admin/productos/editar/:id', component: EditProduct },
    { path: '/admin/categorias', component: UnderConstruction },
    { path: '/admin/pedidos', component: UnderConstruction },
    { path: '/admin/usuarios', component: UnderConstruction }
];

export default adminRoutes;