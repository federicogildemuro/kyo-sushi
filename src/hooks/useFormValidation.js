import { useState } from 'react'
import { validateField, validateForm, isFormValid } from '../utils/ValidationUtils'

function useFormValidation(initialData) {
    const [formData, setFormData] = useState(initialData);
    const [formErrors, setFormErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setFormErrors((prev) => ({
            ...prev,
            [name]: validateField(name, value, formData),
        }));
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setFormErrors((prev) => ({
            ...prev,
            [name]: validateField(name, value, formData),
        }));
    };

    const validateFormData = () => {
        const errors = validateForm(formData);
        setFormErrors(errors);
        return isFormValid(errors);
    };

    return { formData, formErrors, handleInputChange, handleBlur, validateFormData }
}

export default useFormValidation