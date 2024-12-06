const getCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    return [...cart];
}

const saveCart = (cart) => localStorage.setItem('cart', JSON.stringify(cart));

const isItemInCart = (id) => {
    const cart = getCart();
    return cart.some((item) => item.id === id);
}

const addItemToCart = (item) => {
    let cart = getCart();
    if (isItemInCart(item.id)) {
        cart = cart.map((existingItem) =>
            existingItem.id === item.id
                ? { ...existingItem, quantity: existingItem.quantity + item.quantity }
                : existingItem
        );
    } else {
        cart.push(item);
    }
    saveCart(cart);
    return getCart();
}

const removeItemFromCart = (id) => {
    let cart = getCart();
    cart = cart.filter((item) => item.id !== id);
    saveCart(cart);
    return getCart();
}

const calculateCartTotal = () => {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

const clearCartItems = () => {
    saveCart([]);
    return getCart();
}

export { getCart, isItemInCart, addItemToCart, removeItemFromCart, calculateCartTotal, clearCartItems }