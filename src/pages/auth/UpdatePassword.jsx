import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { updatePassword } from '../../services/userServices';
import useAsync from '../../hooks/useAsync';
import useNotification from '../../hooks/useNotification';
import useFormValidation from '../../hooks/useFormValidation';
import { scrollToTop } from '../../utils/scrollUtils';
import Spinner from '../../components/Spinner';
import BackButton from '../../components/BackButton';

function UpdatePassword() {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const oobCode = queryParams.get('oobCode');

    const { data: response, loading, error, execute: update } = useAsync(updatePassword, [], false);
    const { showNotification } = useNotification();
    const navigate = useNavigate();

    useEffect(() => {
        if (response) {
            showNotification('Contraseña restablecida exitosamente', 'success');
            scrollToTop();
            navigate('/login');
        }
    }, [response, showNotification, navigate]);

    useEffect(() => {
        if (error) {
            showNotification(error.message, 'danger');
        }
    }, [error, showNotification]);

    const initialFormData = {
        password: '',
        passwordConfirm: '',
    };

    const {
        formData,
        formErrors,
        handleInputChange,
        handleBlur,
        validateFormData
    } = useFormValidation(initialFormData);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateFormData()) {
            showNotification('Por favor, complete los campos correctamente', 'danger');
            return;
        }

        await update(oobCode, formData.password);
    };

    if (!oobCode) {
        showNotification('El enlace de restablecimiento de contraseña no es válido', 'danger');
        scrollToTop();
        navigate('/');
    }

    return (
        <section className="d-flex flex-column text-center">
            {loading && <Spinner />}

            <div className="container">
                <h1 className="display-6 fw-bold mb-5">Establecer nueva contraseña</h1>

                <form
                    className="mx-auto col-12 col-lg-6 mb-5"
                    onSubmit={handleSubmit}
                >
                    <div className="d-flex flex-column align-items-start mb-3">
                        <label
                            htmlFor="newPassword"
                            className="form-label"
                        >
                            Nueva Contraseña
                        </label>

                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                        />

                        {formErrors.password && (
                            <div className="text-danger small text-start mt-1">
                                {formErrors.password}
                            </div>
                        )}
                    </div>

                    <div className="d-flex flex-column align-items-start mb-3">
                        <label
                            htmlFor="passwordConfirm"
                            className="form-label"
                        >
                            Confirmar Contraseña
                        </label>

                        <input
                            type="password"
                            id="passwordConfirm"
                            className="form-control"
                            name="passwordConfirm"
                            value={formData.passwordConfirm}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                        />

                        {formErrors.passwordConfirm && (
                            <div className="text-danger small text-start mt-1">
                                {formErrors.passwordConfirm}
                            </div>
                        )}
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

export default UpdatePassword;