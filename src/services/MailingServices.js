import emailjs from '@emailjs/browser';

const sendOrderEmail = async (order) => {
    try {
        const result = await emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_ORDER_TEMPLATE_ID,
            {
                buyer_email: order.buyer.email,
                buyer_name: order.buyer.name,
                order_id: order.id,
                items: order.items.map(item => `${item.quantity}x ${item.title}`).join(', '),
                total: order.total
            },
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
        return result;
    } catch (error) {
        console.error(error);
        throw new Error(error.message || 'Error al enviar correo de confirmación de compra');
    }
};

const sendContactEmail = async (form) => {
    try {
        const result = await emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID,
            {
                name: form.name,
                email: form.email,
                message: form.message
            },
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
        return result;
    } catch (error) {
        console.error(error);
        throw new Error(error.message || 'Error al enviar correo de contacto');
    }
};

export { sendOrderEmail, sendContactEmail };