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

                                <p className="card-text">Administra los productos de la tienda</p>

                                <Link
                                    to="/admin/products"
                                    className="btn custom-btn"
                                    onClick={scrollToTop}
                                >
                                    Ir a productos
                                    <i className="bi bi-box-seam ms-2" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card custom-card mb-4">
                            <div className="card-body">
                                <h2 className="card-title">Categorías</h2>

                                <p className="card-text">Administra las categorías de los productos</p>

                                <Link
                                    to="/admin/categories"
                                    className="btn custom-btn"
                                    onClick={scrollToTop}
                                >
                                    Ir a categorías
                                    <i className="bi bi-tags ms-2" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card custom-card mb-4">
                            <div className="card-body">
                                <h2 className="card-title">Órdenes</h2>

                                <p className="card-text">Administra las órdenes de los clientes</p>

                                <Link
                                    to="/admin/orders"
                                    className="btn custom-btn"
                                    onClick={scrollToTop}
                                >
                                    Ir a órdenes
                                    <i className="bi bi-cart4 ms-2" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card custom-card mb-4">
                            <div className="card-body">
                                <h2 className="card-title">Usuarios</h2>

                                <p className="card-text">Administra los usuarios de la tienda</p>

                                <Link
                                    to="/admin/users"
                                    className="btn custom-btn"
                                    onClick={scrollToTop}
                                >
                                    Ir a usuarios
                                    <i className="bi bi-people ms-2" />
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