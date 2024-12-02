import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import { useFormValidation } from "../../hooks/useFormValidation";
import { createOrder } from "../../services/OrdersServices";

function CheckoutForm() {
    const navigate = useNavigate();
    const { cart, clearCart, totalPrice } = useCart();

    const initialFormData = {
        name: "",
        email: "",
        confirmEmail: "",
        phone: "",
        street: "",
        number: "",
        apartment: "",
    };

    const { formData, formErrors, handleInputChange, handleBlur, validateFormData } = useFormValidation(initialFormData);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateFormData()) return;

        const order = {
            date: new Date(),
            buyer: formData,
            items: cart.map((item) => ({
                id: item.id,
                title: item.title,
                price: item.price,
                quantity: item.quantity,
            })),
            total: totalPrice(),
            status: "pending",
        };

        const orderId = await createOrder(order);
        alert(`Compra realizada con éxito! Número de orden: ${orderId}.`);
        clearCart();
        navigate("/");
    };

    return (
        <form>
            {["name", "email", "confirmEmail", "phone", "street", "number", "apartment"].map((field) => (
                <div key={field} className="mb-3">
                    <label htmlFor={field} className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                    <input
                        type={field.includes("email") ? "email" : field === "phone" ? "tel" : "text"}
                        className="form-control"
                        id={field}
                        name={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                    />
                    {formErrors[field] && <small className="text-danger">{formErrors[field]}</small>}
                </div>
            ))}
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                Finalizar Compra
            </button>
        </form>
    );
}

export default CheckoutForm;