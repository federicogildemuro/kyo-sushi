import NavBar from "../components/NavBar/NavBar";
import UserRoutes from "../routes/UserRoutes";
import Footer from "../components/Footer/Footer";

function UserLayout() {
    return (
        <>
            <NavBar />
            <UserRoutes />
            <Footer />
        </>
    );
}

export default UserLayout;