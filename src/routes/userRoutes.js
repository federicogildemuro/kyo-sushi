import { lazy } from 'react';

// Regularly loading essential pages for faster initial performance
import LandingPage from '../pages/landing-page/LandingPage';
import Store from '../pages/store/Store';

// Lazily loading page components to optimize performance
const ItemDetail = lazy(() => import('../pages/item-detail/ItemDetail'));
const AboutUs = lazy(() => import('../pages/info/AboutUs'));
const Contact = lazy(() => import('../pages/info/Contact'));
const Terms = lazy(() => import('../pages/info/Terms'));

// Defining routes for user pages with their associated components
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