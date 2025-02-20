const adminProductFormConfig = {
    title: {
        label: 'Nombre',
        type: 'text',
        initialValue: ''
    },
    description: {
        label: 'Descripción',
        type: 'text',
        initialValue: ''
    },
    category: {
        label: 'Categoría',
        type: 'text',
        initialValue: ''
    },
    price: {
        label: 'Precio',
        type: 'number',
        initialValue: 0
    },
    stock: {
        label: 'Stock',
        type: 'number',
        initialValue: 0
    },
    pictureUrl: {
        label: 'URL de la imagen',
        type: 'text',
        initialValue: ''
    }
};

export { adminProductFormConfig };