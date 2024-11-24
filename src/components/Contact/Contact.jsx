import { useRef, useState } from 'react';
import sendEmail from '../../services/MailingServices';

function Contact() {
    const form = useRef();
    const [status, setStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await sendEmail(form.current);
        if (response.success) {
            setStatus("success");
            form.current.reset();
        } else {
            console.error(response.error);
            setStatus("error");
        }
    };

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Contáctanos</h2>
            <form ref={form} onSubmit={handleSubmit} className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="name" className="form-label">
                        Nombre
                    </label>
                    <input
                        type="text"
                        name="user_name"
                        id="name"
                        className="form-control"
                        placeholder="Tu nombre"
                        required
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="email" className="form-label">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        name="user_email"
                        id="email"
                        className="form-control"
                        placeholder="Tu correo"
                        required
                    />
                </div>
                <div className="col-12">
                    <label htmlFor="message" className="form-label">
                        Mensaje
                    </label>
                    <textarea
                        name="message"
                        id="message"
                        className="form-control"
                        placeholder="Escribe tu mensaje"
                        rows="4"
                        required
                    ></textarea>
                </div>
                <div className="col-12 text-center">
                    <button type="submit" className="btn btn-primary">
                        Enviar
                    </button>
                </div>
            </form>
            {status === "success" && (
                <div className="alert alert-success text-center mt-4" role="alert">
                    ¡Tu mensaje ha sido enviado con éxito!
                </div>
            )}
            {status === "error" && (
                <div className="alert alert-danger text-center mt-4" role="alert">
                    Ocurrió un error al enviar tu mensaje. Intenta nuevamente.
                </div>
            )}
        </div>
    );
};

export default Contact;