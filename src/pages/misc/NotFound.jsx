import BackButton from '../../components/misc/BackButton';

function NotFound() {
    return (
        <section className="d-flex flex-column text-center">
            <div className="container">
                <p className="fs-5 m-5">
                    <i
                        className="bi bi-exclamation-triangle me-2"
                        aria-hidden="true"
                    />
                    Página no encontrada
                </p>

                <BackButton />
            </div>
        </section>
    );
}

export default NotFound;