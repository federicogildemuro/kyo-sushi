const products = [
    {
        id: 1,
        title: 'Product 1',
        description: 'Description 1',
        price: 100,
        stock: 10,
        pictureUrl: 'https://via.placeholder.com/150'
    },
    {
        id: 2,
        title: 'Product 2',
        description: 'Description 2',
        price: 200,
        stock: 20,
        pictureUrl: 'https://via.placeholder.com/150'
    },
    {
        id: 3,
        title: 'Product 3',
        description: 'Description 3',
        price: 300,
        stock: 30,
        pictureUrl: 'https://via.placeholder.com/150'
    },
    {
        id: 4,
        title: 'Product 4',
        description: 'Description 4',
        price: 400,
        stock: 0,
        pictureUrl: 'https://via.placeholder.com/150'
    }
];

export const getProducts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products);
        }, 2000);
    });
};