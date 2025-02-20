import { Link } from 'react-router-dom';
import { scrollToTop } from '../../utils/scrollUtils';
import cards from './adminDashboardCards';

function AdminDashboard() {
    return (
        <section className="d-flex flex-column text-center">
            <div className="container">
                <h1 className="display-6 fw-bold">Panel de administración</h1>

                <div className="row">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="col-md-6"
                        >
                            <div className="card custom-border m-3">
                                <div className="card-body">
                                    <h2 className="card-title">{card.title}</h2>

                                    <p className="card-text">{card.text}</p>

                                    <Link
                                        to={card.linkTo}
                                        className="btn custom-btn"
                                        onClick={scrollToTop}
                                    >
                                        {card.linkText}
                                        <i className={`bi ${card.linkIcon} ms-2`} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default AdminDashboard;