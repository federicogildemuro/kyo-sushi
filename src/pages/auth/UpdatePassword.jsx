import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useFormValidation from '../../hooks/useFormValidation';
import useAsync from '../../hooks/useAsync';
import { updatePassword } from '../../services/UsersServices';
import useNotification from '../../hooks/useNotification';
import Spinner from '../../components/Spinner';
import BackButton from '../../components/BackButton';
import { scrollToTop } from '../../utils/ScrollUtils';

function UpdatePassword() {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const oobCode = queryParams.get('oobCode');

    const { data, loading, error, execute } = useAsync(updatePassword, [], false);
    const { showNotification } = useNotification();
    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            showNotification('Contraseña actualizada con éxito', 'success');
            scrollToTop();
            navigate('/login');
        }
    }, [data, showNotification, navigate]);

    useEffect(() => {
        if (error) {
            showNotification(error.message || 'Error al actualizar la contraseña', 'danger');
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

        await execute(oobCode, formData.password);
    };

    return (
        <section className="custom-container d-flex flex-column text-center">
            {loading && <Spinner />}

            <div className="container mb-3">
                <h1 className="display-6 fw-bold mb-3">Establecer nueva contraseña</h1>

                <form className="mx-auto col-12 col-lg-6 mb-3 col" onSubmit={handleSubmit}>
                    <div className="d-flex flex-column align-items-start mb-3">
                        <label htmlFor="newPassword" className="form-label">
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
                        <label htmlFor="passwordConfirm" className="form-label">
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
                        Establecer nueva contraseña
                    </button>
                </form>

                <BackButton />
            </div>
        </section>
    );
}

export default UpdatePassword;