import { useEffect, useMemo } from 'react';
import { sendContactEmail } from '../../services/mailingServices';
import useAsync from '../../hooks/useAsync';
import useNotification from '../../hooks/useNotification';
import useFormValidation from '../../hooks/useFormValidation';
import { scrollToTop } from '../../utils/scrollUtils';
import Spinner from '../../components/spinner/Spinner';
import BackButton from '../../components/misc/BackButton';

function Contact() {
    // Handle sending contact email
    const { data: result, loading, error, execute: sendEmail } = useAsync(sendContactEmail, [], false);

    // Show notification on success or error
    const { showNotification } = useNotification();
    useEffect(() => {
        if (result) {
            showNotification('Mensaje enviado exitosamente', 'success');
            setFormData(initialFormData);
        }
        if (error) showNotification(error, 'danger');
    }, [result, error, showNotification, setFormData, initialFormData]);

    // Labels for form fields
    const labels = {
        name: 'Nombre',
        email: 'Correo electrónico',
        message: 'Mensaje',
    };

    // Set initial form data
    const initialFormData = useMemo(() => ({
        name: '',
        email: '',
        message: '',
    }), []);

    // Handle form input and validation
    const {
        formData,
        setFormData,
        formErrors,
        handleInputChange,
        handleBlur,
        validateFormData
    } = useFormValidation(initialFormData);

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Validate form data before sending email
        if (!validateFormData()) {
            showNotification('Por favor, complete los campos correctamente', 'warning');
            return;
        }
        // Send email if form data is valid
        await sendEmail(formData);
        scrollToTop();
    };

    return (
        <section className="d-flex flex-column text-center">
            {/* Show spinner while loading */}
            {loading && <Spinner />}

            <div className="container">
                <h1 className="display-6 fw-bold mb-5">Contacto</h1>

                <form
                    className="mx-auto col-12 col-lg-6 mb-5"
                    onSubmit={handleSubmit}
                >
                    {Object.keys(labels).map((field) => (
                        <div
                            key={field}
                            className="d-flex flex-column align-items-start mb-3"
                        >
                            {/* Render textarea for message field, input for other fields */}
                            {field === 'message' ? (
                                <>
                                    <label
                                        htmlFor={field}
                                        className="form-label"
                                    >
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
                                    <label
                                        htmlFor={field}
                                        className="form-label"
                                    >
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

                            {/* Show error message if field has one */}
                            {formErrors[field] && (
                                <div className="text-danger small text-start mt-1">
                                    {formErrors[field]}
                                </div>
                            )}
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="btn custom-btn my-3"
                    >
                        Enviar
                    </button>
                </form>

                <BackButton />
            </div>
        </section>
    );
}

export default Contact;