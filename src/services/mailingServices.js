import emailjs from '@emailjs/browser';

// Function to send an order confirmation email to the buyer
const sendOrderEmail = async (order) => {
    // Destructure order data
    const { buyer, orderId, items, total } = order;

    // Format data to be used in the email template
    const formattedOrderId = orderId.toString().padStart(4, '0');
    const formattedOrderItems = items.map(item => `${item.quantity}x ${item.title}`).join(', ');
    const formattedTotal = total.toFixed(2);
    const templateParams = {
        buyer_email: buyer.email,
        buyer_name: buyer.name,
        order_number: formattedOrderId,
        items: formattedOrderItems,
        total: formattedTotal
    };

    try {
        // Send the email using EmailJS
        const result = await emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_ORDER_TEMPLATE_ID,
            templateParams,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
        return result;
    } catch (error) {
        console.error(error);
        throw new Error(error.message || 'Error al enviar correo de confirmación de compra');
    }
};

// Function to send a contact form email to the site owner
const sendContactEmail = async (form) => {
    // Destructure form data
    const { name, email, message } = form;

    // Format data to be used in the email template
    const templateParams = {
        name,
        email,
        message
    };

    try {
        // Send the email using EmailJS
        const result = await emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID,
            templateParams,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
        return result;
    } catch (error) {
        console.error(error);
        throw new Error(error.message || 'Error al enviar correo de contacto');
    }
};

export { sendOrderEmail, sendContactEmail };