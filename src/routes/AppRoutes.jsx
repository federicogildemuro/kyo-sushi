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
                {/* User-specific routes with UserRoute guard */}
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

                {/* Public routes that should be available to non-authenticated users */}
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

                {/* Authenticated-only routes for logged-in users */}
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

                {/* Admin-only routes for users with admin role */}
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

                {/* Catch-all route to handle 404 Not Found */}
                <Route
                    path="*"
                    element={<NotFound />}
                />
            </Routes>
        </Suspense>
    );
}

export default AppRoutes;