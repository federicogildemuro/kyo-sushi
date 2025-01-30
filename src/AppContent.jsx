import useAuth from "./hooks/useAuth";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";

function AppContent() {
    const { isAdmin } = useAuth();
    return isAdmin ? <AdminLayout /> : <UserLayout />;
}

export default AppContent;