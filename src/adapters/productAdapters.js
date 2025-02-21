// Function to parse product data from Firebase
// Receives a Firebase document and extracts the necessary fields
// Returns an object with the product data in the required format to be used in the app
const parseProductFromFirebase = (doc) => {
    const data = doc.data();
    return {
        id: doc.id,
        title: data.title,
        description: data.description,
        category: data.category,
        price: data.price,
        stock: data.stock,
        pictureUrl: data.pictureUrl
    };
};

// Function to create a product object with the provided data
// Receives form data
// Returns an object with the product data in the required format to be stored in Firebase
const createProductAdapter = (formData) => {
    return {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        price: parseFloat(formData.price) || 0,
        stock: parseInt(formData.stock) || 0,
        pictureUrl: formData.pictureUrl
    };
};

export { parseProductFromFirebase, createProductAdapter };