import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useNotification from '../../hooks/useNotification';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';

function Login() {
    const { user, isAdmin, login, loginWithGoogle, loading, error } = useAuth();
    const { showNotification } = useNotification();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (error) {
            showNotification(error?.message || 'Error al iniciar sesión', 'danger');
        }
    }, [error, showNotification]);

    useEffect(() => {
        if (user && isAdmin) {
            navigate('/admin');
        } else if (user) {
            navigate('/');
        }
    }, [user, isAdmin, navigate]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            showNotification('Por favor, complete todos los campos', 'danger');
            return;
        }

        await login(email, password);
    }

    const handleGoogleLogin = async () => {
        await loginWithGoogle();
    }

    return (
        <section className="custom-container d-flex flex-column text-center">
            {loading && <Spinner />}

            <div className="container mb-3">
                <h1 className="display-6 fw-bold mb-3">Iniciar sesión</h1>

                <form className="mx-auto col-12 col-lg-6 mb-3" onSubmit={handleSubmit}>
                    <div className="d-flex flex-column align-items-start mb-3">
                        <label htmlFor="email" className="form-label">
                            Correo Electrónico
                        </label>

                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>

                    <div className="d-flex flex-column align-items-start mb-3">
                        <label htmlFor="password" className="form-label">
                            Contraseña
                        </label>

                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn custom-btn my-3"
                        disabled={loading}
                    >
                        Iniciar sesión
                    </button>
                </form>

                <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 mb-3">
                    <button
                        className="btn custom-btn d-flex align-items-center justify-content-center gap-2"
                        onClick={handleGoogleLogin}
                        aria-label="Iniciar sesión con Google"
                        disabled={loading}
                    >
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24" aria-hidden="true">
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                            <path fill="none" d="M0 0h48v48H0z"></path>
                        </svg>
                        Iniciar sesión con Google
                    </button>

                    <Link to="/register" className="btn custom-btn">
                        Registrarse
                    </Link>

                    <Link to="/reset-password" className="btn custom-btn">
                        Reestablecer contraseña
                    </Link>
                </div>

                <BackButton />
            </div>
        </section>
    );
}

export default Login;