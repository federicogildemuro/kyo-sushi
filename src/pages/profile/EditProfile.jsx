import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { fetchUserById, updateUser } from '../../services/userServices';
import useAsync from '../../hooks/useAsync';
import { editProfileForm as formConfig } from './formConfig';
import useFormValidation from '../../hooks/useFormValidation';
import useNotification from '../../hooks/useNotification';
import { scrollToTop } from '../../utils/scrollUtils';
import Spinner from '../../components/spinner/Spinner';
import CustomForm from '../../components/misc/CustomForm';
import BackButton from '../../components/misc/BackButton';

function EditProfile() {
    /* Get user from useAuth hook */
    const { user } = useAuth();

    /* Fetch user by id when user is available */
    const { data: userData, loading: loadingUser } = useAsync(() => {
        if (user?.uid) {
            return fetchUserById(user.uid);
        }
    }, [user?.uid]);

    /* Create initial form data from user */
    const initialFormData = useMemo(() => {
        if (!userData) {
            return Object.fromEntries(
                Object.entries(formConfig).map(([key, { initialValue }]) => [key, initialValue])
            );
        }

        return {
            firstName: userData.firstName || formConfig.firstName.initialValue,
            lastName: userData.lastName || formConfig.lastName.initialValue,
            phone: userData.phone || formConfig.phone.initialValue,
            street: userData.address?.street || formConfig.street.initialValue,
            number: userData.address?.number || formConfig.number.initialValue,
            apartment: userData.address?.apartment || formConfig.apartment.initialValue,
            city: userData.address?.city || formConfig.city.initialValue,
            state: userData.address?.state || formConfig.state.initialValue,
            country: userData.address?.country || formConfig.country.initialValue
        };
    }, [userData]);

    /* Use form validation hook */
    const {
        formData,
        setFormData,
        formErrors,
        handleInputChange,
        handleBlur,
        validateFormData
    } = useFormValidation(initialFormData);

    useEffect(() => {
        if (userData) {
            setFormData(initialFormData);
        }
    }, [userData, initialFormData, setFormData]);

    /* Check if form data has changed */
    const isFormUnchanged = useMemo(() => {
        return Object.keys(initialFormData).every(
            (key) => formData[key] === initialFormData[key]
        );
    }, [formData, initialFormData]);

    /* Use async hook to update user */
    const { data: result, loading: loadingUpdate, error, execute: updateProfile } = useAsync(updateUser, [], false);

    /* Use notification hook to show messages */
    const { showNotification } = useNotification();

    /* Use navigate hook to redirect */
    const navigate = useNavigate();

    /* Handle form submit */
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateFormData()) {
            showNotification('Por favor, complete los campos correctamente', 'warning');
            return;
        }
        updateProfile(user.uid, formData);
    };

    /* Show notification on result or error */
    useEffect(() => {
        if (result) {
            showNotification('Usuario actualizado exitosamente', 'success');
            scrollToTop();
            navigate('/profile');
        }
        if (error) showNotification(error.message, 'danger');
    }, [result, error, showNotification, navigate]);

    /* Render spinner while fetching or updating user */
    const loading = loadingUser || loadingUpdate;
    if (loading) return <Spinner />;

    return (
        <section className="d-flex flex-column text-center">
            <div className="container">
                <h1 className="display-6 fw-bold">Editar perfil</h1>

                <CustomForm
                    formConfig={formConfig}
                    formData={formData}
                    formErrors={formErrors}
                    handleInputChange={handleInputChange}
                    handleBlur={handleBlur}
                    handleSubmit={handleSubmit}
                    submitText="Guardar cambios"
                    submitDisabled={isFormUnchanged}
                />

                <BackButton />
            </div>
        </section>
    );
}

export default EditProfile;