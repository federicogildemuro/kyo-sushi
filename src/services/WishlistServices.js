const getWishlist = () => {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    return [...wishlist];
}

const saveWishlist = (wishlist) => localStorage.setItem('wishlist', JSON.stringify(wishlist));

const isItemInWishlist = (id) => {
    const wishlist = getWishlist();
    return wishlist.some((item) => item.id === id);
}

const addItemToWishlist = (item) => {
    let wishlist = getWishlist();
    if (isItemInWishlist(item.id)) {
        return;
    }
    wishlist.push(item);
    saveWishlist(wishlist);
    return getWishlist();
}

const removeItemFromWishlist = (id) => {
    let wishlist = getWishlist();
    if (!isItemInWishlist(id)) {
        return;
    }
    wishlist = wishlist.filter((item) => item.id !== id);
    saveWishlist(wishlist);
    return getWishlist();
}

export { getWishlist, isItemInWishlist, addItemToWishlist, removeItemFromWishlist };