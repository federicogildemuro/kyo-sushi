import BackButton from '../../components/misc/BackButton';

function Terms() {
    return (
        <section className="d-flex flex-column text-center">
            <h1 className="display-6 fw-bold mb-5">Términos y Condiciones</h1>

            <div className="container">
                <p className="fs-5 mb-3">
                    Bienvenido a <strong>Kyo Sushi</strong>. Al acceder y utilizar nuestro servicio, aceptas los siguientes términos y condiciones.
                    Te recomendamos leerlos atentamente antes de realizar un pedido.
                </p>

                <p className="fs-5 mb-3">
                    <strong>1. Uso del servicio:</strong> Nuestros productos están disponibles exclusivamente para consumo personal.
                    Queda prohibida la reventa sin autorización expresa de <strong>Kyo Sushi</strong>.
                </p>

                <p className="fs-5 mb-3">
                    <strong>2. Pedidos y pagos:</strong> Los pedidos deben realizarse a través de nuestra plataforma online.
                    Aceptamos pagos con tarjeta de crédito/débito y otros métodos digitales. Una vez confirmado el pago,
                    no se pueden realizar modificaciones en el pedido.
                </p>

                <p className="fs-5 mb-3">
                    <strong>3. Entregas:</strong> Hacemos nuestro mejor esfuerzo para entregar los pedidos en el tiempo estimado,
                    pero pueden surgir retrasos debido a factores externos. Si hay algún problema con tu pedido,
                    contáctanos de inmediato.
                </p>

                <p className="fs-5 mb-3">
                    <strong>4. Devoluciones y reembolsos:</strong> Debido a la naturaleza de nuestros productos, no aceptamos devoluciones.
                    Sin embargo, si recibes un pedido incorrecto o en mal estado, comunícate con nosotros para evaluar una posible solución.
                </p>

                <p className="fs-5 mb-3">
                    <strong>5. Cambios en los términos:</strong> Nos reservamos el derecho de actualizar estos términos en cualquier momento.
                    Te recomendamos revisar esta sección periódicamente.
                </p>

                <BackButton />
            </div>
        </section>
    );
}

export default Terms;