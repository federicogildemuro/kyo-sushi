// Function to create an user object with the provided data
// Receives form data
// Returns an object with the user data in the required format to be stored in Firebase
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

// Function to update an user object with the provided data
// Receives form data
// Returns an object with the user data in the required format to be stored in Firebase
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