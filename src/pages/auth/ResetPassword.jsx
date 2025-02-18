import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../../services/userServices';
import useAsync from '../../hooks/useAsync';
import useNotification from '../../hooks/useNotification';
import { scrollToTop } from '../../utils/scrollUtils';
import Spinner from '../../components/spinner/Spinner';
import BackButton from '../../components/misc/BackButton';

function ResetPassword() {
    const [email, setEmail] = useState('');
    const { data: result, loading, error, execute: reset } = useAsync(resetPassword, [], false);
    const { showNotification } = useNotification();
    const navigate = useNavigate();

    useEffect(() => {
        if (result) {
            showNotification('Se le ha enviado un correo electrónico para restablecer su contraseña', 'success');
            scrollToTop();
            navigate('/');
        }
        if (error) showNotification(error.message, 'danger')
    }, [result, error, showNotification, navigate]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!email) {
            showNotification('Por favor, ingrese su correo electrónico', 'warning');
            return;
        }
        reset(email);
    };

    return (
        <section className="d-flex flex-column text-center">
            {loading && <Spinner />}

            <div className="container">
                <h1 className="display-6 fw-bold">Restablecer contraseña</h1>

                <form
                    className="col-12 col-lg-6 mx-auto my-5"
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
                        className="btn custom-btn mt-3"
                    >
                        Enviar correo electrónico
                    </button>
                </form>

                <BackButton />
            </div>
        </section>
    );
}

export default ResetPassword;