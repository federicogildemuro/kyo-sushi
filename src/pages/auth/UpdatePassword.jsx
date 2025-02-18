import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updatePassword } from '../../services/userServices';
import useAsync from '../../hooks/useAsync';
import { updatePasswordForm as formConfig } from './formConfig';
import useFormValidation from '../../hooks/useFormValidation';
import useNotification from '../../hooks/useNotification';
import { scrollToTop } from '../../utils/scrollUtils';
import Spinner from '../../components/spinner/Spinner';
import CustomForm from '../../components/misc/CustomForm';
import BackButton from '../../components/misc/BackButton';

function UpdatePassword() {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const oobCode = queryParams.get('oobCode');
    const { data: result, loading, error, execute: update } = useAsync(updatePassword, [], false);
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
            showNotification('Por favor, complete los campos correctamente', 'danger');
            return;
        }
        update(oobCode, formData.password);
    };

    return (
        <section className="d-flex flex-column text-center">
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