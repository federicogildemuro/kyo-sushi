let cart = [
    {
        id: 1,
        title: 'Producto 1',
        price: 100,
        quantity: 2
    },
    {
        id: 2,
        title: 'Producto 2',
        price: 200,
        quantity: 1
    }
];

const getCart = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(cart);
        }, 2000);
    });
}

const addToCart = (item) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            cart.push(item);
            resolve(cart);
        }, 2000);
    });
}

const removeFromCart = (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const index = cart.findIndex(item => item.id === id);
            cart.splice(index, 1);
            resolve(cart);
        }, 2000);
    });
}

const updateQuantity = (id, quantity) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const index = cart.findIndex(item => item.id === id);
            cart[index].quantity = quantity;
            resolve(cart);
        }, 2000);
    });
}

const clearCart = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            cart = [];
            resolve(cart);
        }, 2000);
    });
}

export { getCart, addToCart, removeFromCart, updateQuantity, clearCart }