import emailjs from '@emailjs/browser';

const sendEmail = async (form) => {
    try {
        const result = await emailjs.sendForm(
            'service_sxmc1we',
            'template_5w4lzbf',
            form,
            'FT5xKsccS4HGg3pNV'
        );
        return { success: true, result };
    } catch (error) {
        console.error("Error al enviar el correo:", error);
        return { success: false, error };
    }
};

export default sendEmail;