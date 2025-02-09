import { Link } from 'react-router-dom';
import { scrollToTop } from '../../utils/scrollUtils';

function AdminDashboard() {
    return (
        <section className="d-flex flex-column text-center">
            <div className="container">
                <h1 className="display-6 fw-bold mb-5">Dashboard de administración</h1>

                <div className="row">
                    <div className="col-md-6">
                        <div className="custom-card card mb-4">
                            <div className="card-body">
                                <h2 className="card-title">Productos</h2>

                                <p className="card-text">Administra los productos de la tienda.</p>

                                <Link
                                    to="/admin/products"
                                    className="btn custom-btn"
                                    onClick={scrollToTop}
                                >
                                    Administrar
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card custom-card mb-4">
                            <div className="card-body">
                                <h2 className="card-title">Órdenes</h2>

                                <p className="card-text">Administra las órdenes de los clientes.</p>

                                <Link
                                    to="/admin/orders"
                                    className="btn custom-btn"
                                    onClick={scrollToTop}
                                >
                                    Administrar
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AdminDashboard;