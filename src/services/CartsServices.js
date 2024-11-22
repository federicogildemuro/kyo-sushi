let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

const saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

const getCart = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([...cart]);
        }, 2000);
    });
};

const addToCart = (item) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const index = cart.findIndex((product) => product.id === item.id);
            if (index === -1) {
                cart = [...cart, item];
            } else {
                cart = cart.map((product, i) =>
                    i === index ? { ...product, quantity: product.quantity + item.quantity } : product
                );
            }
            saveCart();
            resolve([...cart]);
        }, 2000);
    });
};

const removeFromCart = (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            cart = cart.filter((item) => item.id !== id);
            saveCart();
            resolve([...cart]);
        }, 2000);
    });
};

const updateQuantity = (id, quantity) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            cart = cart.map((item) =>
                item.id === id ? { ...item, quantity } : item
            );
            saveCart();
            resolve([...cart]);
        }, 2000);
    });
};

const clearCart = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            cart = [];
            saveCart();
            resolve([...cart]);
        }, 2000);
    });
};

export { getCart, addToCart, removeFromCart, updateQuantity, clearCart };