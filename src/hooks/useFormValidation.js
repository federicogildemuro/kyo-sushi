import { useState } from 'react';
import { validateField, validateForm, isFormValid } from '../utils/ValidationUtils';

function useFormValidation(initialData) {
    const [formData, setFormData] = useState(initialData);
    const [formErrors, setFormErrors] = useState({});

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setFormErrors((prev) => ({
            ...prev,
            [name]: validateField(name, value, formData),
        }));
    };

    const handleBlur = (event) => {
        const { name, value } = event.target;

        setFormErrors((prev) => ({
            ...prev,
            [name]: validateField(name, value, formData),
        }));
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: checked,
        }));

        setFormErrors((prevFormErrors) => ({
            ...prevFormErrors,
            [name]: validateField(name, checked, formData),
        }));
    };

    const validateFormData = () => {
        const errors = validateForm(formData);
        setFormErrors(errors);
        return isFormValid(errors);
    };

    return { formData, setFormData, formErrors, handleInputChange, handleBlur, handleCheckboxChange, validateFormData };
}

export default useFormValidation;