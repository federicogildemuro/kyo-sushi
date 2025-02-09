import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useNotification from '../../hooks/useNotification';
import LoginLinks from './LoginLinks';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import './Auth.css';

function Login() {
    const { login, loading, error } = useAuth();
    const { showNotification } = useNotification();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (error) {
            showNotification(error, 'danger');
        }
    }, [error, showNotification]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            showNotification('Por favor, complete todos los campos', 'warning');
            return;
        }

        const result = await login(email, password);

        if (result) {
            showNotification('Sesión iniciada exitosamente', 'success');
        }
    }

    return (
        <section className="d-flex flex-column text-center">
            {loading && <Spinner />}

            <div className="container">
                <h1 className="display-6 fw-bold mb-5">Iniciar sesión</h1>

                <form
                    className="mx-auto col-12 col-lg-6 mb-5"
                    onSubmit={handleSubmit}
                >
                    <div className="d-flex flex-column align-items-start mb-3">
                        <label
                            htmlFor="email"
                            className="form-label"
                        >
                            Correo Electrónico
                        </label>

                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            name="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>

                    <div className="d-flex flex-column align-items-start mb-3">
                        <label
                            htmlFor="password"
                            className="form-label"
                        >
                            Contraseña
                        </label>

                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn custom-btn my-3"
                        disabled={loading}
                    >
                        Enviar
                    </button>
                </form>

                <LoginLinks />

                <BackButton />
            </div>
        </section>
    );
}

export default Login;