import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserRoute, PublicRoute, AuthenticatedRoute, AdminRoute } from './RouteGuards';
import userRoutes from './userRoutes';
import publicRoutes from './publicRoutes';
import authenticatedRoutes from './authenticatedRoutes';
import adminRoutes from './adminRoutes';
import Spinner from '../components/spinner/Spinner';
import NotFound from '../pages/misc/NotFound';

function AppRoutes() {
    return (
        // Suspense wrapper to show a loading spinner while waiting for lazy-loaded components
        <Suspense fallback={<Spinner />}>
            <Routes>
                {/* Routes for non-admin users */}
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

                {/* Routes for non-authenticated users */}
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

                {/* Routes for authenticated users (non-admin) */}
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

                {/* Routes for admin users only */}
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

                {/* Render NotFound component for unmatched routes */}
                <Route
                    path="*"
                    element={<NotFound />}
                />
            </Routes>
        </Suspense>
    );
}

export default AppRoutes;