import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAsync from '../../hooks/useAsync';
import { resetPassword } from '../../services/UsersServices';
import useNotification from '../../hooks/useNotification';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import { scrollToTop } from '../../utils/ScrollUtils';

function ResetPassword() {
    const { data, loading, error, execute } = useAsync(resetPassword, [], false);
    const { showNotification } = useNotification();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');

    useEffect(() => {
        if (data) {
            showNotification('Se ha enviado un correo electrónico para reestablecer su contraseña', 'success');
            scrollToTop();
            navigate('/restore-password');
        }
    }, [data, showNotification, navigate]);

    useEffect(() => {
        if (error) {
            showNotification(error.message || 'Error al reestablecer contraseña', 'danger');
        }
    }, [error, showNotification]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email) {
            showNotification('Por favor, ingrese su correo electrónico', 'danger');
            return;
        }

        await execute(email);
    };

    return (
        <section className="custom-container d-flex flex-column text-center">
            {loading && <Spinner />}

            <div className="container mb-3">
                <h1 className="display-6 fw-bold mb-3">Reestablecer contraseña</h1>

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

                    <button
                        type="submit"
                        className="btn custom-btn my-3"
                        disabled={loading}
                    >
                        Reestablecer contraseña
                    </button>
                </form>

                <BackButton />
            </div>
        </section>
    );
}

export default ResetPassword;