import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAsync from '../../hooks/useAsync';
import useNotification from '../../hooks/useNotification';
import { resetPassword } from '../../services/userServices';
import { scrollToTop } from '../../utils/scrollUtils';
import Spinner from '../../components/spinner/Spinner';
import BackButton from '../../components/misc/BackButton';

function ResetPassword() {
    // Handle password reset
    const { data: result, loading, error, execute: reset } = useAsync(resetPassword, [], false);

    // State to store the email
    const [email, setEmail] = useState('');

    // Show notification on success or error
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

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Validate email
        if (!email) {
            showNotification('Por favor, ingrese su correo electrónico', 'warning');
            return;
        }
        // Reset password when email is valid
        reset(email);
    };

    return (
        <section className="d-flex flex-column text-center">
            {/* Show spinner while loading */}
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