export function validateField(name, value, formData) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const errors = {
        name: !value.trim() ? "El nombre es obligatorio" : "",
        email: !value.trim()
            ? "El email es obligatorio"
            : !emailRegex.test(value)
                ? "El email no es válido"
                : "",
        confirmEmail: !value.trim()
            ? "Debes confirmar el email"
            : value !== formData.email
                ? "Los correos no coinciden"
                : "",
        phone: !value.trim() ? "El teléfono es obligatorio" : "",
        street: !value.trim() ? "La calle es obligatoria" : "",
        number: !value.trim() ? "La altura es obligatoria" : "",
    };

    return errors[name] || "";
}

export function validateForm(formData) {
    const errors = {};
    Object.keys(formData).forEach((field) => {
        errors[field] = validateField(field, formData[field], formData);
    });
    return errors;
}

export function isFormValid(errors) {
    return Object.values(errors).every((error) => !error);
}