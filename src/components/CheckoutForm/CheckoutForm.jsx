import useCart from '../../hooks/useCart';
import useNotification from '../../hooks/useNotification';
import useFormValidation from '../../hooks/useFormValidation';
import useAsync from '../../hooks/useAsync';
import { checkStockAndUpdate } from '../../services/ProductsServices';
import { createOrder } from '../../services/OrdersServices';
import { sendOrderEmail } from '../../services/MailingServices';
import Spinner from '../Spinner/Spinner';

function CheckoutForm() {
    const { cart, clearCart, getTotalPrice } = useCart();
    const { showNotification } = useNotification();

    const initialFormData = {
        name: '',
        email: '',
        confirmEmail: '',
        phone: '',
        street: '',
        number: '',
        apartment: '',
    };
    const { formData, formErrors, handleInputChange, handleBlur, validateFormData } = useFormValidation(initialFormData);

    const { data: stockCheckResult, loading: loadingStock, execute: executeCheckStockAndUpdate } = useAsync(checkStockAndUpdate);
    const { data: dataOrder, loading: loadingOrder, execute: executeCreateOrder } = useAsync(createOrder);
    const { loading: loadingEmail, execute: executeSendOrderEmail } = useAsync(sendOrderEmail);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateFormData()) {
            showNotification('Por favor, complete los campos correctamente', 'warning');
            return;
        }

        try {
            await executeCheckStockAndUpdate(cart);
            console.log(stockCheckResult);
            if (!stockCheckResult.success) {
                const productsWithNoStock = stockCheckResult.productsWithNoStock.map((product) => product.title).join(', ');
                showNotification(`No hay stock suficiente para los siguientes productos: ${productsWithNoStock}. Elimínelos del carrito para finalizar la compra`, 'danger');
                return;
            }

            const order = {
                date: new Date(),
                buyer: formData,
                items: cart.map((item) => ({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    quantity: item.quantity,
                })),
                total: getTotalPrice(),
                status: "pending",
            };
            await executeCreateOrder(order);
            await executeSendOrderEmail(dataOrder);
            showNotification(`Compra realizada con éxito, se te ha enviado un correo electrónico con los detalles`, 'success');
            clearCart();
        } catch (error) {
            showNotification(`Hubo un error al procesar la compra: ${error.message || error}`, 'danger');
        }
    };

    const labels = {
        name: "Nombre",
        email: "Correo electrónico",
        confirmEmail: "Confirmar correo",
        phone: "Teléfono",
        street: "Calle",
        number: "Número",
        apartment: "Departamento",
    };

    return (
        <form className="mx-auto col-12 col-lg-6 mt-5">
            {(loadingStock || loadingOrder || loadingEmail) && <Spinner />}

            {Object.keys(labels).map((field) => (
                <div key={field} className="d-flex flex-column align-items-start mb-3">
                    <label htmlFor={field} className="form-label d-inline-flex align-items-center">
                        {labels[field]}
                        {formErrors[field] &&
                            <small className="text-danger d-inline-flex align-items-center ms-3">
                                {formErrors[field]}
                            </small>}
                    </label>

                    <input
                        type={field.includes("email") ? "email" : field === "phone" ? "tel" : "text"}
                        className="form-control"
                        id={field}
                        name={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        disabled={loadingStock || loadingOrder || loadingEmail}
                    />
                </div>
            ))}

            <button type="submit" className="btn custom-btn mb-5" onClick={handleSubmit} disabled={loadingStock || loadingOrder || loadingEmail}>
                Finalizar Compra
            </button>
        </form>
    );
}

export default CheckoutForm;