import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAsync from '../../hooks/useAsync';
import useFormValidation from '../../hooks/useFormValidation';
import useNotification from '../../hooks/useNotification';
import { updatePassword } from '../../services/userServices';
import { updatePasswordForm as formConfig } from './formConfig';
import { scrollToTop } from '../../utils/scrollUtils';
import Spinner from '../../components/spinner/Spinner';
import CustomForm from '../../components/misc/CustomForm';
import BackButton from '../../components/misc/BackButton';

function UpdatePassword() {
    // Get oobCode from URL
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const oobCode = queryParams.get('oobCode');

    // Handle password update
    const { data: result, loading, error, execute: update } = useAsync(updatePassword, [], false);

    // Show notification on success or error
    const { showNotification } = useNotification();
    const navigate = useNavigate();
    useEffect(() => {
        if (result) {
            showNotification('Contraseña restablecida exitosamente', 'success');
            scrollToTop();
            navigate('/login');
        }
        if (error) showNotification(error.message, 'danger');
    }, [result, error, showNotification, navigate]);

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
        // Validate form data before submitting
        if (!validateFormData()) {
            showNotification('Por favor, complete los campos correctamente', 'danger');
            return;
        }
        // Update password if form data is valid
        update(oobCode, formData.password);
    };

    return (
        <section className="d-flex flex-column text-center">
            {/* Show spinner while loading */}
            {loading && <Spinner />}

            <div className="container">
                <h1 className="display-6 fw-bold">Establecer nueva contraseña</h1>

                <CustomForm
                    formConfig={formConfig}
                    formData={formData}
                    formErrors={formErrors}
                    handleInputChange={handleInputChange}
                    handleBlur={handleBlur}
                    handleSubmit={handleSubmit}
                    submitText="Establecer contraseña"
                />

                <BackButton />
            </div>
        </section>
    );
}

export default UpdatePassword;