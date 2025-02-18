const registerForm = {
    firstName: { label: 'Nombre', type: 'text', initialValue: '' },
    lastName: { label: 'Apellido', type: 'text', initialValue: '' },
    email: { label: 'Correo electrónico', type: 'email', initialValue: '' },
    password: { label: 'Contraseña', type: 'password', initialValue: '' },
    passwordConfirm: { label: 'Repetir contraseña', type: 'password', initialValue: '' },
    phone: { label: 'Teléfono', type: 'text', initialValue: '' },
    street: { label: 'Calle', type: 'text', initialValue: '' },
    number: { label: 'Altura', type: 'text', initialValue: '' },
    apartment: { label: 'Departamento', type: 'text', initialValue: '' },
    city: { label: 'Ciudad', type: 'text', initialValue: '' },
    state: { label: 'Provincia/Estado', type: 'text', initialValue: '' },
    country: { label: 'País', type: 'text', initialValue: '' }
};

const updatePasswordForm = {
    password: { label: 'Nueva Contraseña', type: 'password', initialValue: '' },
    passwordConfirm: { label: 'Confirmar Contraseña', type: 'password', initialValue: '' }
};

export { registerForm, updatePasswordForm };