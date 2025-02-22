import useAuth from '../../hooks/useAuth';
import useAsync from '../../hooks/useAsync';
import { fetchUserById } from '../../services/userServices';
import Spinner from '../../components/spinner/Spinner';
import ProfileInfo from './ProfileInfo';
import ProfileLinks from './ProfileLinks';
import BackButton from '../../components/misc/BackButton';

function Profile() {
    // Get the current user from the useAuth hook
    const { user } = useAuth();

    // Fetch user by id when user is available
    const { data: userData, loading } = useAsync(() => {
        if (user?.uid) {
            return fetchUserById(user.uid);
        }
    }, [user?.uid]);

    // Show spinner while loading
    if (loading) return <Spinner />;

    return (
        <section className="d-flex flex-column text-center">
            <div className="container">
                <h1 className="display-6 fw-bold">Tu perfil</h1>

                <ProfileInfo user={userData} />

                <ProfileLinks />

                <BackButton />
            </div>
        </section>
    );
}

export default Profile;