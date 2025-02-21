import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAsync from '../../../hooks/useAsync';
import useFormValidation from '../../../hooks/useFormValidation';
import useNotification from '../../../hooks/useNotification';
import { fetchProductById, updateProduct } from '../../../services/productsServices';
import { scrollToTop } from '../../../utils/scrollUtils';
import { adminProductFormConfig as formConfig } from './adminProductFormConfig';
import CustomForm from '../../../components/misc/CustomForm';
import Spinner from '../../../components/spinner/Spinner';
import BackButton from '../../../components/misc/BackButton';

function EditProduct() {
    // Get product ID from URL params
    const { id: productId } = useParams();
    // Fetch product by ID on mount or whenever the product ID changes
    const {
        data: productData,
        loading: fetching,
        error: errorFetching
    } = useAsync(() => productId ? fetchProductById(productId) : Promise.resolve(null), [productId]);

    // Set initial form data based on form config or fetched product data
    const initialFormData = useMemo(() => {
        if (!productData) {
            return Object.fromEntries(
                Object.entries(formConfig).map(([key, { initialValue }]) => [key, initialValue])
            );
        }
        return {
            title: productData.title || formConfig.title.initialValue,
            description: productData.description || formConfig.description.initialValue,
            category: productData.category || formConfig.category.initialValue,
            price: productData.price || formConfig.price.initialValue,
            stock: productData.stock || formConfig.stock.initialValue,
            pictureUrl: productData.pictureUrl || formConfig.pictureUrl.initialValue
        };
    }, [productData]);

    // Handle form input and validation
    const {
        formData,
        setFormData,
        formErrors,
        handleInputChange,
        handleBlur,
        validateFormData
    } = useFormValidation(initialFormData);

    // Update form data when product data changes
    useEffect(() => {
        if (productData) {
            setFormData(initialFormData);
        }
    }, [productData, initialFormData, setFormData]);

    // Check if form data has changed
    const isFormUnchanged = useMemo(() => {
        return Object.keys(initialFormData).every(
            (key) => formData[key] === initialFormData[key]
        );
    }, [formData, initialFormData]);

    // Handle product update
    const { data: result, loading: updating, error: errorUpdating, execute: updateProductById } = useAsync(updateProduct, [], false);

    // Show notifications on success or error
    const { showNotification } = useNotification();
    const error = errorFetching || errorUpdating;
    const navigate = useNavigate();
    useEffect(() => {
        if (result) {
            showNotification('Producto actualizado exitosamente', 'success');
            scrollToTop();
            navigate('/admin/productos');
        }
        if (error) showNotification(error.message, 'danger');
    }, [result, error, showNotification, navigate]);

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Validate form data before submitting
        if (!validateFormData()) {
            showNotification('Por favor, complete los campos correctamente', 'warning');
            return;
        }
        // Update product if form data is valid
        updateProductById(productId, formData);
    };

    // Show spinner while fetching product
    if (fetching) return <Spinner />;

    return (
        <section className="d-flex flex-column text-center">
            {/* Show spinner while updating product */}
            {updating && <Spinner />}

            <div className="container">
                <h1 className="display-6 fw-bold">Editar producto</h1>

                <CustomForm
                    formConfig={formConfig}
                    formData={formData}
                    formErrors={formErrors}
                    handleInputChange={handleInputChange}
                    handleBlur={handleBlur}
                    handleSubmit={handleSubmit}
                    submitText="Guardar cambios"
                    submitDisabled={isFormUnchanged}
                />

                <BackButton />
            </div>
        </section>
    );
}

export default EditProduct;