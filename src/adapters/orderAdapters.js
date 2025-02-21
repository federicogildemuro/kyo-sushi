// Function to parse order data from Firebase
// Receives a Firebase document and extracts the necessary fields
// Returns an object with the order data in the required format to be used in the app
const parseOrderFromFirebase = (doc) => {
    // Get the data from the document
    const data = doc.data();
    return {
        id: doc.id,
        orderId: data.orderId,
        date: data.date,
        userId: data.userId,
        buyer: data.buyer,
        items: data.items,
        total: data.total,
        status: data.status
    };
};

// Function to create an order object with the provided data
// Receives the order ID, user data, the shopping cart, and the total price of the order
// Returns an object with the order data in the required format to be stored in Firebase
const createOrderAdapter = (orderId, user, cart, total) => ({
    orderId,
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