const parseOrderFromFirebase = (doc) => {
    const data = doc.data();
    return {
        id: doc.id,
        date: data.date,
        userId: data.userId,
        buyer: data.buyer,
        items: data.items,
        total: data.total,
        status: data.status
    }
};

const createOrderAdapter = (user, cart, total) => ({
    date: new Date().toISOString(),
    userId: user.id,
    buyer: {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
    },
    items: cart.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
    })),
    total: total,
    status: 'pending'
});

export { parseOrderFromFirebase, createOrderAdapter };