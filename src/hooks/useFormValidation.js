import { useState } from 'react';
import { validateField, validateForm, isFormValid } from '../utils/validationUtils';

function useFormValidation(initialData) {
    const [formData, setFormData] = useState(initialData);
    const [formErrors, setFormErrors] = useState({});

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        const updatedValue = name === 'price' || name === 'stock' ? Number(value) : value;

        setFormData((prev) => ({
            ...prev,
            [name]: updatedValue,
        }));

        setFormErrors((prev) => ({
            ...prev,
            [name]: validateField(name, updatedValue, formData),
        }));
    };

    const handleBlur = (event) => {
        const { name, value } = event.target;

        const updatedValue = name === 'price' || name === 'stock' ? Number(value) : value;

        setFormErrors((prev) => ({
            ...prev,
            [name]: validateField(name, updatedValue, formData),
        }));
    };

    const validateFormData = () => {
        const errors = validateForm(formData);
        setFormErrors(errors);
        return isFormValid(errors);
    };

    return { formData, setFormData, formErrors, handleInputChange, handleBlur, validateFormData };
}

export default useFormValidation;