export const createProductAdapterFromFirebase = (doc) => {
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
}