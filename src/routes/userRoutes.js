import { lazy } from 'react';

const LandingPage = lazy(() => import('../pages/landing-page/LandingPage'));
const Store = lazy(() => import('../pages/store/Store'));
const ItemDetail = lazy(() => import('../pages/item-detail/ItemDetail'));
const AboutUs = lazy(() => import('../pages/info/AboutUs'));
const Contact = lazy(() => import('../pages/info/Contact'));
const Terms = lazy(() => import('../pages/info/Terms'));

const userRoutes = [
    { path: '/', component: LandingPage },
    { path: '/tienda', component: Store },
    { path: '/tienda/:category', component: Store },
    { path: '/item/:id', component: ItemDetail },
    { path: '/about-us', component: AboutUs },
    { path: '/contact', component: Contact },
    { path: '/terms', component: Terms }
];

export default userRoutes;