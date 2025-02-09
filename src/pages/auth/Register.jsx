import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createUser } from '../../services/userServices';
import useAsync from '../../hooks/useAsync';
import useNotification from '../../hooks/useNotification';
import useFormValidation from '../../hooks/useFormValidation';
import Spinner from '../../components/Spinner';
import BackButton from '../../components/BackButton';
import './Auth.css';

function Register() {
    const { loading, error, execute: register } = useAsync(createUser, [], false);
    const { showNotification } = useNotification();

    useEffect(() => {
        if (error) {
            showNotification(error.message, 'danger');
        }
    }, [error, showNotification]);

    const labels = {
        firstName: 'Nombre',
        lastName: 'Apellido',
        email: 'Correo electrónico',
        password: 'Contraseña',
        passwordConfirm: 'Repetir contraseña',
        phone: 'Teléfono',
        street: 'Calle',
        number: 'Altura',
        apartment: 'Departamento',
        city: 'Ciudad',
        state: 'Provincia/Estado',
        country: 'País'
    };

    const initialFormData = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: '',
        phone: '',
        street: '',
        number: '',
        apartment: '',
        city: '',
        state: '',
        country: ''
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
            showNotification('Por favor, complete los campos correctamente', 'warning');
            return;
        }

        const result = await register(formData.email, formData.password, formData);

        if (result) {
            showNotification('Usuario registrado exitosamente', 'success');
        }
    };

    return (
        <section className="d-flex flex-column text-center">
            {loading && <Spinner />}

            <div className="container">
                <h1 className="display-6 fw-bold mb-5">Registrar nuevo usuario</h1>

                <form
                    className="mx-auto col-12 col-lg-6 mb-5"
                    onSubmit={handleSubmit}
                >
                    {Object.keys(labels).map((field) => (
                        <div
                            key={field}
                            className="d-flex flex-column align-items-start mb-3"
                        >
                            <>
                                <label
                                    htmlFor={field}
                                    className="form-label"
                                >
                                    {labels[field]}
                                </label>

                                <input
                                    type={
                                        field.includes('password')
                                            ? 'password'
                                            : field === 'email'
                                                ? 'email'
                                                : 'text'
                                    }
                                    id={field}
                                    className="form-control"
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                />
                            </>

                            {formErrors[field] && (
                                <div className="text-danger small text-start mt-1">
                                    {formErrors[field]}
                                </div>
                            )}
                        </div>
                    ))}

                    <div className=" small text-start mb-3">
                        El registro implica la aceptación de nuestros{' '}
                        <Link
                            to="/terms"
                            className="auth-link"
                            target="_blank"
                        >
                            términos y condiciones
                        </Link>
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

export default Register;