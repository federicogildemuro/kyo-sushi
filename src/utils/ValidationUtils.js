const validateField = (name, value, formData) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value.trim() && name !== "apartment") {
        return "Campo obligatorio";
    }

    if (name === "email" && !emailRegex.test(value)) {
        return "El correo no es válido";
    }

    if (name === "confirmEmail" && value !== formData.email) {
        return "Los correos no coinciden";
    }

    return "";
}

const validateForm = (formData) => {
    const errors = {};

    Object.keys(formData).forEach((field) => {
        errors[field] = validateField(field, formData[field], formData);
    });

    return errors;
}

const isFormValid = (errors) => Object.values(errors).every((error) => !error);

export { validateField, validateForm, isFormValid }