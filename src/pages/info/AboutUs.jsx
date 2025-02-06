import BackButton from '../../components/BackButton';

function AboutUs() {
    return (
        <section className="d-flex flex-column text-center">
            <h1 className="display-6 fw-bold mb-5">Sobre Nosotros</h1>

            <div className="container">
                <p className="fs-5 mb-3">
                    Somos <strong>Tefo</strong> y <strong>Braichu</strong>, dos amigos emprendedores de
                    <strong> Palma de Mallorca</strong> apasionados por la gastronomía y el arte culinario. Tras
                    años de experiencia trabajando en el mundo de la cocina, decidimos unir nuestras fuerzas y dar vida
                    a un proyecto que refleja nuestra dedicación y amor por la buena comida: <strong>Kyo Sushi</strong>.
                </p>

                <p className="fs-5 mb-3">
                    Nuestro objetivo es llevar a tu mesa lo mejor de la cocina japonesa, con ingredientes frescos
                    y de la más alta calidad. En cada roll, sashimi y nigiri, ponemos toda nuestra creatividad y
                    conocimientos para ofrecerte una experiencia gastronómica única que combina tradición y un
                    toque de innovación.
                </p>

                <p className="fs-5 mb-3">
                    En <strong>Kyo Sushi</strong>, creemos que la comida no solo alimenta, sino que también conecta
                    a las personas. Por eso, trabajamos día a día para que cada pedido sea una celebración de sabores,
                    frescura y autenticidad. Gracias por confiar en nosotros y permitirnos ser parte de tus momentos especiales. ¡Estamos
                    emocionados de compartir nuestra pasión contigo!
                </p>

                <BackButton />
            </div>
        </section>
    );
}

export default AboutUs;