import { useEffect, useMemo } from 'react';
import { sendContactEmail } from '../services/MailingServices';
import useAsync from '../hooks/useAsync';
import useNotification from '../hooks/useNotification';
import useFormValidation from '../hooks/useFormValidation';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';

function Contact() {
    const { data, loading, error, execute } = useAsync(sendContactEmail, [], false);
    const { showNotification } = useNotification();

    const initialFormData = useMemo(() => ({
        name: '',
        email: '',
        message: '',
    }), []);

    const labels = {
        name: 'Nombre',
        email: 'Correo electrónico',
        message: 'Mensaje',
    };

    const { formData, setFormData, formErrors, handleInputChange, handleBlur, validateFormData } = useFormValidation(initialFormData);

    useEffect(() => {
        if (data) {
            showNotification('Mensaje enviado exitosamente', 'success');
            setFormData(initialFormData);
        }
    }, [data, showNotification, setFormData, initialFormData]);

    useEffect(() => {
        if (error) {
            showNotification(error.message, 'danger');
        }
    }, [error, showNotification]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateFormData()) {
            showNotification('Por favor, complete los campos correctamente', 'warning');
            return;
        }

        await execute(formData);
    };

    return (
        <section className="d-flex flex-column text-center">
            {loading && <Spinner />}

            <div className="container mb-3">
                <h1 className="display-6 fw-bold mb-3">Contacto</h1>

                <form className="mx-auto col-12 col-lg-6 mb-5" onSubmit={handleSubmit}>
                    {Object.keys(labels).map((field) => (
                        <div key={field} className="d-flex flex-column align-items-start mb-3">
                            {field === 'message' ? (
                                <>
                                    <label htmlFor={field} className="form-label">
                                        {labels[field]}
                                    </label>

                                    <textarea
                                        id={field}
                                        className="form-control"
                                        name={field}
                                        value={formData[field]}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        style={{ height: '10rem' }}
                                    />
                                </>
                            ) : (
                                <>
                                    <label htmlFor={field} className="form-label">
                                        {labels[field]}
                                    </label>

                                    <input
                                        type="text"
                                        id={field}
                                        className="form-control"
                                        name={field}
                                        value={formData[field]}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                    />
                                </>
                            )}

                            {formErrors[field] && (
                                <div className="text-danger small text-start mt-1">
                                    {formErrors[field]}
                                </div>
                            )}
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="btn custom-btn"
                        disabled={loading}
                    >
                        Enviar mensaje
                    </button>
                </form>

                <BackButton />
            </div>
        </section>
    );
}

export default Contact;