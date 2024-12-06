import emailjs from '@emailjs/browser'

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
        return { success: true, result };
    } catch (error) {
        return { success: false, error };
    }
}

const sendContactEmail = async (form) => {
    try {
        const result = await emailjs.sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID,
            form,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
        return { success: true, result };
    } catch (error) {
        return { success: false, error };
    }
}

export { sendOrderEmail, sendContactEmail }