import { useEffect } from 'react';
import useAsync from '../../../hooks/useAsync';
import useFormValidation from '../../../hooks/useFormValidation';
import useNotification from '../../../hooks/useNotification';
import { createProduct } from '../../../services/productsServices';
import { scrollToTop } from '../../../utils/scrollUtils';
import { adminProductFormConfig as formConfig } from './adminProductFormConfig';
import CustomForm from '../../../components/misc/CustomForm';
import Spinner from '../../../components/spinner/Spinner';
import BackButton from '../../../components/misc/BackButton';

function CreateProduct() {
    /* Handle product creation */
    const { data: result, loading: creating, error, execute: createNewProduct } = useAsync(createProduct, [], false);

    /* Set initial form data based on form config */
    const initialFormData = Object.keys(formConfig).reduce((data, field) => {
        data[field] = formConfig[field].initialValue;
        return data;
    }, {});

    /* Handle form input and validation */
    const {
        formData,
        formErrors,
        handleInputChange,
        handleBlur,
        validateFormData
    } = useFormValidation(initialFormData);

    /* Show notifications on success or error */
    const { showNotification } = useNotification();
    useEffect(() => {
        if (result) {
            showNotification('Producto creado exitosamente', 'success');
            scrollToTop();
        }
        if (error) showNotification(error.message, 'danger');
    }, [result, error, showNotification]);


    /* Handle form submission */
    const handleSubmit = (event) => {
        event.preventDefault();
        /* Validate form data before submitting */
        if (!validateFormData()) {
            showNotification('Por favor, complete los campos correctamente', 'warning');
            return;
        }
        /* Create product if form data is valid */
        createNewProduct(formData);
    };

    return (
        <section className="d-flex flex-column text-center">
            {/* Show spinner while creating product */}
            {creating && <Spinner />}

            <div className="container">
                <h1 className="display-6 fw-bold">Crear nuevo producto</h1>

                <CustomForm
                    formConfig={formConfig}
                    formData={formData}
                    formErrors={formErrors}
                    handleInputChange={handleInputChange}
                    handleBlur={handleBlur}
                    handleSubmit={handleSubmit}
                    submitText="Crear producto"
                />

                <BackButton />
            </div>
        </section>
    );
}

export default CreateProduct;