import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAsync from '../../hooks/useAsync';
import useFormValidation from '../../hooks/useFormValidation';
import useNotification from '../../hooks/useNotification';
import { fetchUserById, updateUser } from '../../services/userServices';
import { editProfileForm as formConfig } from './formConfig';
import { scrollToTop } from '../../utils/scrollUtils';
import Spinner from '../../components/spinner/Spinner';
import CustomForm from '../../components/misc/CustomForm';
import BackButton from '../../components/misc/BackButton';

function EditProfile() {
    // Get the current user from the useAuth hook
    const { user } = useAuth();

    // Fetch user by id when user is available
    const { data: userData, loading: fetching } = useAsync(() => {
        if (user?.uid) {
            return fetchUserById(user.uid);
        }
    }, [user?.uid]);

    // Set initial form data based on form config or fetched user data
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

    // Handle form input and validation
    const {
        formData,
        setFormData,
        formErrors,
        handleInputChange,
        handleBlur,
        validateFormData
    } = useFormValidation(initialFormData);

    // Update form data when user data changes
    useEffect(() => {
        if (userData) {
            setFormData(initialFormData);
        }
    }, [userData, initialFormData, setFormData]);

    // Check if form data has changed
    const isFormUnchanged = useMemo(() => {
        return Object.keys(initialFormData).every(
            (key) => formData[key] === initialFormData[key]
        );
    }, [formData, initialFormData]);

    // Handle updating user data
    const { data: result, loading: updating, error, execute: updateProfile } = useAsync(updateUser, [], false);

    // Show notifications on success or error
    const { showNotification } = useNotification();
    const navigate = useNavigate();
    useEffect(() => {
        if (result) {
            showNotification('Usuario actualizado exitosamente', 'success');
            scrollToTop();
            navigate('/profile');
        }
        if (error) showNotification(error.message, 'danger');
    }, [result, error, showNotification, navigate]);


    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Validate form data before submitting
        if (!validateFormData()) {
            showNotification('Por favor, complete los campos correctamente', 'warning');
            return;
        }
        // Update user if form data is valid
        updateProfile(user.uid, formData);
    };

    // Show spinner while fetching user
    if (fetching) return <Spinner />

    return (
        <section className="d-flex flex-column text-center">
            {/* Show spinner while updating user */}
            {updating && <Spinner />}

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