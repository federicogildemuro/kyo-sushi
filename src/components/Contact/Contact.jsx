import { useRef } from 'react'
import { sendContactEmail } from '../../services/MailingServices'
import useAsync from '../../hooks/useAsync'
import useNotification from '../../hooks/useNotification'
import Spinner from '../Spinner/Spinner'

function Contact() {
    const form = useRef();
    const { showNotification } = useNotification();
    const { loading, execute } = useAsync(sendContactEmail);

    const validateForm = (formData) => {
        const userName = formData.get("user_name").trim();
        const userEmail = formData.get("user_email").trim();
        const message = formData.get("message").trim();

        if (!userName || !userEmail || !message) {
            showNotification('Debes completar todos los campos antes de enviar.', 'warning');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userEmail)) {
            showNotification('El correo electrónico ingresado no es válido.', 'warning');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(form.current);

        if (!validateForm(formData)) return;

        try {
            await execute(form.current);
            showNotification('Mensaje enviado correctamente, te responderemos a la brevedad.', 'success');
            form.current.reset();
        } catch {
            showNotification('Error al enviar el mensaje', 'danger');
        }
    };

    return (
        <section className="custom-container d-flex flex-column">
            <div className="container mb3">
                <h1 className="display-6 fw-bold mb-3 text-center">Contáctanos</h1>
                <form ref={form} onSubmit={handleSubmit} noValidate className="mx-auto col-12 col-lg-6">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label mb-3">
                            Nombre
                        </label>
                        <input
                            type="text"
                            name="user_name"
                            id="name"
                            className="form-control"
                            placeholder="Tu nombre"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label mb-3">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            name="user_email"
                            id="email"
                            className="form-control"
                            placeholder="Tu correo electrónico"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="message" className="form-label mb-3">
                            Mensaje
                        </label>
                        <textarea
                            name="message"
                            id="message"
                            className="form-control"
                            placeholder="Escribe tu mensaje"
                            rows="4"
                        ></textarea>
                    </div>

                    <div className="d-flex justify-content-center mb-3">
                        <button type="submit" className="btn custom-btn">
                            Enviar
                        </button>
                    </div>
                </form>
            </div>

            {loading && <Spinner />}
        </section>
    )
}

export default Contact