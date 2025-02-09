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
    }
};

const createProductAdapter = (formData) => {
    return {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        price: parseFloat(formData.price) || 0,
        stock: parseInt(formData.stock) || 0,
        pictureUrl: formData.pictureUrl
    }
};

export { parseProductFromFirebase, createProductAdapter };