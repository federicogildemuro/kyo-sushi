import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import { createOrder } from '../../services/OrdersServices';

function Checkout() {
    const { cart, emptyCart, totalPrice } = useCart();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: {
            street: "",
            number: "",
            apartment: "",
        },
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name.includes("address.")) {
            const addressField = name.split(".")[1];
            setFormData((prev) => ({
                ...prev,
                address: { ...prev.address, [addressField]: value },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const order = {
            buyer: formData,
            items: cart.map((item) => ({
                id: item.id,
                title: item.title,
                price: item.price,
                quantity: item.quantity,
            })),
            total: totalPrice(),
            date: new Date(),
        };
        createOrder(order);
        console.log("Compra realizada con éxito", order);
        emptyCart();
        console.log("Carrito vaciado", cart);
        alert("Compra realizada con éxito");
        navigate("/");
    };

    return (

        cart.length === 0
            ?
            (<div className="container mt-5">
                <h2>Tu carrito está vacío</h2>
            </div>)
            :
            (<div className="container mt-5">
                <h1 className="mb-4">Checkout</h1>
                <h2 className="mb-4">Completa tus datos para finalizar la compra</h2>
                <h4 className="mb-4">Envíos a Palma de Mallorca</h4>
                <h6 className="mb-4">Los campos marcados con * son obligatorios</h6>

                <div className="row">
                    <div className="col-md-6">
                        <h2>Datos del cliente</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Nombre *
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">
                                    Teléfono *
                                </label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="street" className="form-label">
                                    Calle *
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="street"
                                    name="address.street"
                                    value={formData.address.street}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="number" className="form-label">
                                    Altura *
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="number"
                                    name="address.number"
                                    value={formData.address.number}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="apartment" className="form-label">
                                    Departamento
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="apartment"
                                    name="address.apartment"
                                    value={formData.address.apartment}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Finalizar Compra
                            </button>
                        </form>
                    </div>

                    <div className="col-md-6">
                        <h2>Detalle de la compra</h2>
                        <ul className="list-group mb-3">
                            {cart.map((item) => (
                                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <span>
                                        {item.title} (x{item.quantity})
                                    </span>
                                    <span>${item.price * item.quantity}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="text-end">
                        </div>
                    </div>
                </div>
            </div>)
    );
};

export default Checkout;