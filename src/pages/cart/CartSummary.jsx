function CartSummary({ total }) {
    // Format the total amount
    const formattedTotal = total.toFixed(2);

    return (
        <h3 className="text-center text-md-end">Total: ${formattedTotal}</h3>
    );
}

export default CartSummary;