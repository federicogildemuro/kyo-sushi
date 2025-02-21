import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createUser } from '../../services/userServices';
import useAsync from '../../hooks/useAsync';
import { registerForm as formConfig } from './formConfig';
import useFormValidation from '../../hooks/useFormValidation';
import useNotification from '../../hooks/useNotification';
import Spinner from '../../components/spinner/Spinner';
import CustomForm from '../../components/misc/CustomForm';
import BackButton from '../../components/misc/BackButton';
import './Auth.css';

function Register() {
    // Handle user registration
    const { data: result, loading, error, execute: register } = useAsync(createUser, [], false);

    // Show notification on success or error
    const { showNotification } = useNotification();
    useEffect(() => {
        if (result) showNotification('Usuario registrado exitosamente', 'success');
        if (error) showNotification(error.message, 'danger');
    }, [result, error, showNotification]);

    // Set initial form data based on form config
    const initialFormData = Object.keys(formConfig).reduce((data, field) => {
        data[field] = formConfig[field].initialValue;
        return data;
    }, {});

    // Handle form input and validation
    const {
        formData,
        formErrors,
        handleInputChange,
        handleBlur,
        validateFormData
    } = useFormValidation(initialFormData);

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Validate form data before 
        if (!validateFormData()) {
            showNotification('Por favor, complete los campos correctamente', 'warning');
            return;
        }
        // Register user if form data is valid
        register(formData.email, formData.password, formData);
    };

    return (
        <section className="d-flex flex-column text-center">
            {/* Show spinner while loading */}
            {loading && <Spinner />}

            <div className="container">
                <h1 className="display-6 fw-bold">Registrar nuevo usuario</h1>

                <CustomForm
                    formConfig={formConfig}
                    formData={formData}
                    formErrors={formErrors}
                    handleInputChange={handleInputChange}
                    handleBlur={handleBlur}
                    handleSubmit={handleSubmit}
                    submitText="Registrarse"
                />

                <Link
                    to="/terms"
                    className="auth-link"
                    target="_blank"
                >
                    <i
                        className="bi bi-file-earmark-text me-2"
                        aria-hidden="true"
                    />
                    El registro implica la aceptación de los términos y condiciones
                </Link>

                <BackButton />
            </div>
        </section>
    );
}

export default Register;