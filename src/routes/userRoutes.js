import { lazy } from 'react';

const LandingPage = lazy(() => import('../pages/landing-page/LandingPage'));
const Shop = lazy(() => import('../pages/shop/shop'));
const ItemDetailContainer = lazy(() => import('../pages/shop/item-detail/ItemDetailContainer'));
const AboutUs = lazy(() => import('../pages/info/AboutUs'));
const Contact = lazy(() => import('../pages/info/Contact'));
const Terms = lazy(() => import('../pages/info/Terms'));

const userRoutes = [
    { path: '/', component: LandingPage },
    { path: '/tienda', component: Shop },
    { path: '/tienda/:category', component: Shop },
    { path: '/item/:id', component: ItemDetailContainer },
    { path: '/about-us', component: AboutUs },
    { path: '/contact', component: Contact },
    { path: '/terms', component: Terms }
];

export default userRoutes;