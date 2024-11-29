import emailjs from '@emailjs/browser';

const sendEmail = async (form) => {
    try {
        const result = await emailjs.sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            form,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
        return { success: true, result };
    } catch (error) {
        console.error("Error al enviar el correo:", error);
        return { success: false, error };
    }
};

export default sendEmail;