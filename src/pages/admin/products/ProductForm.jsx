import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProductById, createProduct, updateProduct } from '../../../services/productsServices';
import useAsync from '../../../hooks/useAsync';
import useNotification from '../../../hooks/useNotification';
import useFormValidation from '../../../hooks/useFormValidation';
import { scrollToTop } from '../../../utils/scrollUtils';
import Spinner from '../../../components/spinner/Spinner';
import BackButton from '../../../components/misc/BackButton';

function ProductForm() {
    const { id } = useParams();
    const { showNotification } = useNotification();
    const navigate = useNavigate();

    const {
        data: product,
        loading: loadingProduct
    } = useAsync(
        () => (id ? fetchProductById(id) : Promise.resolve(null)),
        [id]
    );

    const {
        data: updatedProduct,
        loading: loadingUpdateProduct,
        error: errorUpdateProduct,
        execute: executeUpdateProduct
    } = useAsync((id, product) => updateProduct(id, product), [], false);

    const {
        data: newProduct,
        loading: loadingCreateProduct,
        error: errorCreateProduct,
        execute: executeCreateProduct
    } = useAsync(createProduct, [], false);

    const loading = loadingCreateProduct || loadingUpdateProduct;
    const error = errorCreateProduct || errorUpdateProduct;

    const labels = {
        title: 'Título',
        description: 'Descripción',
        category: 'Categoría',
        price: 'Precio',
        stock: 'Stock',
        pictureUrl: 'URL de la imagen'
    };

    const initialFormData = {
        title: '',
        description: '',
        category: '',
        price: 0,
        stock: 0,
        pictureUrl: ''
    };

    const {
        formData,
        setFormData,
        formErrors,
        handleInputChange,
        handleBlur,
        validateFormData
    } = useFormValidation(initialFormData);

    useEffect(() => {
        if (product) {
            setFormData({
                title: product.title,
                description: product.description,
                category: product.category,
                price: product.price,
                stock: product.stock,
                pictureUrl: product.pictureUrl
            });
        }
    }, [product, setFormData]);

    useEffect(() => {
        if (newProduct) {
            showNotification('Producto creado exitosamente', 'success');
            setFormData({
                title: '',
                description: '',
                category: '',
                price: 0,
                stock: 0,
                pictureUrl: ''
            });
        }
        if (updatedProduct) {
            showNotification('Producto actualizado exitosamente', 'success');
            navigate('/admin/products');
        }
    }, [newProduct, setFormData, updatedProduct, showNotification, navigate]);

    useEffect(() => {
        if (error) showNotification(error.message, 'danger');
    }, [error, showNotification]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateFormData()) {
            showNotification('Por favor, complete los campos correctamente', 'warning');
            return;
        }

        if (id) {
            await executeUpdateProduct(id, formData);
        } else {
            await executeCreateProduct(formData);
            scrollToTop();
        }
    };

    const isFormUnchanged = useMemo(() => {
        if (!product) return false;
        const { id: _, ...productWithoutId } = product;
        return JSON.stringify(formData) === JSON.stringify(productWithoutId);
    }, [formData, product]);

    if (loadingProduct) return <Spinner />;

    return (
        <section className="d-flex flex-column text-center">
            {loading && <Spinner />}

            <div className="container">
                <h1 className="display-6 fw-bold mb-5">{id ? 'Editar producto' : 'Crear nuevo producto'}</h1>

                <form
                    className="mx-auto col-12 col-lg-6 mb-5"
                    onSubmit={handleSubmit}
                >
                    {Object.keys(labels).map((field) => (
                        <div
                            key={field}
                            className="d-flex flex-column align-items-start mb-3"
                        >
                            <label
                                htmlFor={field}
                                className="form-label"
                            >
                                {labels[field]}
                            </label>

                            <input
                                type={field === 'price' || field === 'stock' ? 'number' : 'text'}
                                id={field}
                                className="form-control"
                                name={field}
                                value={formData[field]}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                            />

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
                        disabled={loading || isFormUnchanged}
                    >
                        Enviar
                    </button>
                </form>

                <BackButton />
            </div>
        </section>
    );
}

export default ProductForm;