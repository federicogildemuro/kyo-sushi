import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useFormValidation from '../../hooks/useFormValidation';
import { createUser } from '../../services/UsersServices';
import useAsync from '../../hooks/useAsync';
import useNotification from '../../hooks/useNotification';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import { scrollToTop } from '../../utils/ScrollUtils';
import './Register.css';

function Register() {
    const { data, loading, error, execute } = useAsync(createUser, [], false);
    const { showNotification } = useNotification();
    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            showNotification('Usuario registrado exitosamente', 'success');
            scrollToTop();
            navigate('/login');
        }
    }, [data, showNotification, navigate]);

    useEffect(() => {
        if (error) {
            showNotification(error.message, 'danger');
        }
    }, [error, showNotification]);

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
        country: '',
        terms: false,
    };

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
        country: 'País',
        terms: (
            <>
                Aceptar{" "}
                <Link to="/terms" className="terms-link" target="_blank">
                    términos y condiciones
                </Link>
            </>
        ),
    };

    const {
        formData,
        formErrors,
        handleInputChange,
        handleBlur,
        handleCheckboxChange,
        validateFormData
    } = useFormValidation(initialFormData);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateFormData()) {
            showNotification('Por favor, complete los campos correctamente', 'warning');
            return;
        }

        await execute(formData.email, formData.password, {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            street: formData.street,
            number: formData.number,
            apartment: formData.apartment,
            city: formData.city,
            state: formData.state,
            country: formData.country,
            role: 'user',
            lastLogin: null
        });
    };

    return (
        <section className="custom-container d-flex flex-column text-center">
            {loading && <Spinner />}

            <div className="container mb-3">
                <h1 className="display-6 fw-bold mb-3">Registro</h1>

                <form className="mx-auto col-12 col-lg-6 mb-5" onSubmit={handleSubmit}>
                    {Object.keys(labels).map((field) => (
                        <div key={field} className="d-flex flex-column align-items-start mb-3">
                            {field === 'terms' ? (
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id={field}
                                        name={field}
                                        checked={formData[field]}
                                        onChange={handleCheckboxChange}
                                        disabled={loading}
                                    />

                                    <label htmlFor={field} className="form-check-label">
                                        {labels[field]}
                                    </label>
                                </div>
                            ) : (
                                <>
                                    <label htmlFor={field} className="form-label">
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
                                        disabled={loading}
                                    />
                                </>
                            )}

                            {formErrors[field] && (
                                <div className="text-danger small text-start mt-1">
                                    {formErrors[field]}
                                </div>
                            )}
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="btn custom-btn"
                        disabled={loading}
                    >
                        Registrarse
                    </button>
                </form>

                <BackButton />
            </div>
        </section>
    );
}

export default Register;