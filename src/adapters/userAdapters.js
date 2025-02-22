// Function to generate an object for creating a new user in Firebase
const createUserAdapter = (formData) => ({
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    phone: formData.phone,
    address: {
        street: formData.street,
        number: formData.number,
        apartment: formData.apartment,
        city: formData.city,
        state: formData.state,
        country: formData.country
    },
    role: 'user'
});

// Function to generate an object for updating a user in Firebase
const updateUserAdapter = (formData) => ({
    firstName: formData.firstName,
    lastName: formData.lastName,
    phone: formData.phone,
    address: {
        street: formData.street,
        number: formData.number,
        apartment: formData.apartment,
        city: formData.city,
        state: formData.state,
        country: formData.country
    }
});

export { createUserAdapter, updateUserAdapter };