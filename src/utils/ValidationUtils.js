const validateField = (name, value, formData) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,}/;

    if (typeof value === 'string') {
        value = value.trim();
    }

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
        case 'terms':
            if (!value) return 'Debe aceptar los términos y condiciones';
            return '';
        default:
            if (!value) return 'Campo obligatorio';
            return '';
    }
}

const validateForm = (formData) => {
    const errors = {};

    Object.keys(formData).forEach((field) => {
        errors[field] = validateField(field, formData[field], formData);
    });

    return errors;
}

const isFormValid = (errors) => {
    return Object.values(errors).every((error) => !error);
}

export { validateField, validateForm, isFormValid };