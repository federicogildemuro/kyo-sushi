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
    const { data: result, loading, error, execute: register } = useAsync(createUser, [], false);
    const { showNotification } = useNotification();

    useEffect(() => {
        if (result) showNotification('Usuario registrado exitosamente', 'success');
        if (error) showNotification(error.message, 'danger');
    }, [result, error, showNotification]);

    const initialFormData = Object.keys(formConfig).reduce((data, field) => {
        data[field] = formConfig[field].initialValue;
        return data;
    }, {});

    const {
        formData,
        formErrors,
        handleInputChange,
        handleBlur,
        validateFormData
    } = useFormValidation(initialFormData);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateFormData()) {
            showNotification('Por favor, complete los campos correctamente', 'warning');
            return;
        }
        register(formData.email, formData.password, formData);
    };

    return (
        <section className="d-flex flex-column text-center">
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
                    <i className="bi bi-file-earmark-text me-2" />
                    El registro implica la aceptación de los términos y condiciones
                </Link>

                <BackButton />
            </div>
        </section>
    );
}

export default Register;