import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserRoute, PublicRoute, AuthenticatedRoute, AdminRoute } from './RouteGuards';
import userRoutes from './userRoutes';
import publicRoutes from './publicRoutes';
import authenticatedRoutes from './authenticatedRoutes';
import adminRoutes from './adminRoutes';
import NotFound from '../pages/NotFound';
import Spinner from '../components/Spinner';

function AppRoutes() {
    return (
        <Suspense fallback={<Spinner />}>
            <Routes>
                {userRoutes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <UserRoute>
                                <route.component />
                            </UserRoute>
                        }
                    />
                ))}

                {publicRoutes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <PublicRoute>
                                <route.component />
                            </PublicRoute>
                        }
                    />
                ))}

                {authenticatedRoutes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <AuthenticatedRoute>
                                <route.component />
                            </AuthenticatedRoute>
                        }
                    />
                ))}

                {adminRoutes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <AdminRoute>
                                <route.component />
                            </AdminRoute>
                        }
                    />
                ))}

                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
}

export default AppRoutes;