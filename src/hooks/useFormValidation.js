import { useState } from 'react';
import { validateField, validateForm, isFormValid } from '../utils/validationUtils';

// Custom hook to handle form data and validation
function useFormValidation(initialData) {
    // State to store form data
    const [formData, setFormData] = useState(initialData);
    // State to store form validation errors
    const [formErrors, setFormErrors] = useState({});

    // Function to handle input changes and validate the field value
    const handleInputChange = (event) => {
        const { name, value } = event.target;

        // Convert 'price' and 'stock' fields to numbers, others remain as strings
        const updatedValue = name === 'price' || name === 'stock' ? Number(value) : value;

        // Update form data state with the new value
        setFormData((prev) => ({
            ...prev,
            [name]: updatedValue,
        }));

        // Validate the field and update formErrors state
        setFormErrors((prev) => ({
            ...prev,
            [name]: validateField(name, updatedValue, formData),
        }));
    };

    // Function to handle blur event (when the input field loses focus) and validate the field
    const handleBlur = (event) => {
        const { name, value } = event.target;

        // Convert 'price' and 'stock' fields to numbers, others remain as strings
        const updatedValue = name === 'price' || name === 'stock' ? Number(value) : value;

        // Validate the field on blur and update formErrors state
        setFormErrors((prev) => ({
            ...prev,
            [name]: validateField(name, updatedValue, formData),
        }));
    };

    // Function to validate the entire form and return if the form is valid
    const validateFormData = () => {
        // Get all form validation errors
        const errors = validateForm(formData);

        // Update formErrors state with all errors
        setFormErrors(errors);

        // Return whether the form is valid or not
        return isFormValid(errors);
    };

    return { formData, setFormData, formErrors, handleInputChange, handleBlur, validateFormData };
}

export default useFormValidation;