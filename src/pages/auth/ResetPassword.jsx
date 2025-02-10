import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../../services/userServices';
import useAsync from '../../hooks/useAsync';
import useNotification from '../../hooks/useNotification';
import { scrollToTop } from '../../utils/scrollUtils';
import BackButton from '../../components/misc/BackButton';
import Spinner from '../../components/spinner/Spinner';

function ResetPassword() {
    const [email, setEmail] = useState('');

    const { data: response, loading, error, execute: reset } = useAsync(resetPassword, [], false);
    const { showNotification } = useNotification();
    const navigate = useNavigate();

    useEffect(() => {
        if (response) {
            showNotification('Se le ha enviado un correo electrónico para reestablecer su contraseña', 'success');
            scrollToTop();
            navigate('/');
        }
    }, [response, showNotification, navigate]);

    useEffect(() => {
        if (error) {
            showNotification(error.message, 'danger');
        }
    }, [error, showNotification]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email) {
            showNotification('Por favor, ingrese su correo electrónico', 'warning');
            return;
        }

        await reset(email);
    };

    return (
        <section className=" d-flex flex-column text-center">
            {loading && <Spinner />}

            <div className="container">
                <h1 className="display-6 fw-bold mb-5">Reestablecer contraseña</h1>

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

                    <button
                        type="submit"
                        className="btn custom-btn my-3"
                        disabled={loading}
                    >
                        Enviar
                    </button>
                </form>

                <BackButton />
            </div>
        </section>
    );
}

export default ResetPassword;