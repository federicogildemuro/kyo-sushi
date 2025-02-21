// Function to validate individual form fields based on their name and value
const validateField = (name, value, formData) => {
    // Regular expression for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Regular expression for validating password strength (at least 6 characters, one uppercase, one lowercase, one number, one special character)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,}/;

    // Trim the value if it's a string to remove any leading or trailing spaces
    if (typeof value === 'string') value = value.trim();

    // Switch statement to validate different fields based on their name
    switch (name) {
        case 'email':
            // Check if the email field is not empty and matches the email regex
            if (!value) return 'El correo es obligatorio';
            if (!emailRegex.test(value)) return 'El correo no es válido';
            return '';
        case 'password':
            // Check if the password field is not empty and matches the password regex
            if (!value) return 'La contraseña es obligatoria';
            if (!passwordRegex.test(value)) return 'La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula, un número y un caracter especial'; // 'Password must have at least 6 characters, one uppercase, one lowercase, a number, and a special character'
            return '';
        case 'passwordConfirm':
            // Check if the password confirmation field is not empty and matches the original password
            if (!value) return 'Debe repetir la contraseña';
            if (value !== formData.password) return 'Las contraseñas no coinciden';
            return '';
        // Check if the price is a number and greater than 0
        case 'price':
            if (isNaN(value)) return 'El precio debe ser un número';
            if (parseFloat(value) <= 0) return 'El precio debe ser mayor a 0';
            return '';
        // Check if stock is a valid number and an integer, and is not negative
        case 'stock':
            if (isNaN(value)) return 'El stock debe ser un número';
            if (!Number.isInteger(parseFloat(value))) return 'El stock debe ser un número entero';
            if (parseInt(value, 10) < 0) return 'El stock no puede ser negativo';
            return '';
        // Apartment field is not required, other optional fields can be added here
        case 'apartment':
            return '';
        // All other fields are considered required
        default:
            if (!value) return 'Campo obligatorio';
            return '';
    }
};

// Function to validate all form fields by calling validateField for each one
const validateForm = (formData) => {
    const errors = {};

    // Loop through all form fields and validate them
    Object.keys(formData).forEach((field) => {
        errors[field] = validateField(field, formData[field], formData);
    });

    return errors;
};

// Function to check if the form is valid by ensuring there are no errors
const isFormValid = (errors) => {
    // Return true if all fields are valid (no errors), false otherwise
    return Object.values(errors).every((error) => !error);
};

export { validateField, validateForm, isFormValid };