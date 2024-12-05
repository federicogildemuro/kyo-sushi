import emailjs from '@emailjs/browser'

const sendContactEmail = async (form) => {
    try {
        const result = await emailjs.sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            form,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
        return { success: true, result };
    } catch (error) {
        return { success: false, error };
    }
}

export { sendContactEmail }