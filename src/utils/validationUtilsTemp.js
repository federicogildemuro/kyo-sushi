const validateField = (name, value, formData) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,}/;

    if (typeof value === 'string') value = value.trim();

    switch (name) {
        case 'email':
            if (!value) return 'El correo es obligatorio';
            if (!emailRegex.test(value)) return 'El correo no es válido';
            return '';
        case 'password':
            if (!value) return 'La contraseña es obligatoria';
            if (!passwordRegex.test(value)) return 'La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula, un número y un caracter especial';
            return '';
        case 'passwordConfirm':
            if (!value) return 'Debe repetir la contraseña';
            if (value !== formData.password) return 'Las contraseñas no coinciden';
            return '';
        case 'apartment':
            return '';
        case 'price':
            if (isNaN(value)) return 'El precio debe ser un número';
            if (parseFloat(value) <= 0) return 'El precio debe ser mayor a 0';
            return '';
        case 'stock':
            if (isNaN(value)) return 'El stock debe ser un número';
            if (!Number.isInteger(parseFloat(value))) return 'El stock debe ser un número entero';
            if (parseInt(value, 10) < 0) return 'El stock no puede ser negativo';
            return '';
        default:
            if (!value) return 'Campo obligatorio';
            return '';
    }
};

const validateForm = (formData) => {
    const errors = {};

    Object.keys(formData).forEach((field) => {
        errors[field] = validateField(field, formData[field], formData);
    });

    return errors;
};

const isFormValid = (errors) => {
    return Object.values(errors).every((error) => !error);
};

export { validateField, validateForm, isFormValid };