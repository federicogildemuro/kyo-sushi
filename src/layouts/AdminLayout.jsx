import AdminMenu from "../components/Admin/AdminMenu/AdminMenu";
import AdminRoutes from "../routes/AdminRoutes";

function AdminLayout() {
    return (
        <>
            <AdminMenu />
            <AdminRoutes />
        </>
    );
}

export default AdminLayout;