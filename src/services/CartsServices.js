let cart = JSON.parse(localStorage.getItem('cart')) || [];

const saveCart = () => localStorage.setItem('cart', JSON.stringify(cart));

const getCart = () => [...cart];

const addToCart = (item) => {
    const index = cart.findIndex((product) => product.id === item.id);
    if (index === -1) {
        cart.push(item);
    } else {
        cart[index].quantity += item.quantity;
    }
    saveCart();
    return getCart();
};

const removeFromCart = (id) => {
    cart = cart.filter((item) => item.id !== id);
    saveCart();
    return getCart();
};

const updateQuantity = (id, quantity) => {
    cart = cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
    );
    saveCart();
    return getCart();
};

const clearCart = () => {
    cart = [];
    saveCart();
    return getCart();
};

export { getCart, addToCart, removeFromCart, updateQuantity, clearCart };