import ItemCount from '../ItemCount/ItemCount'

function ItemDetail({ item }) {
    return (
        <div className="container mt-5">
            <div className="card h-100">
                <div className="row g-0 h-100">
                    <div className="col-md-4 position-relative">
                        <img
                            src={item.pictureUrl}
                            alt={item.title}
                            className="img-fluid rounded-start w-100 h-100 position-absolute"
                            style={{ top: 0, left: 0, bottom: 0, right: 0, objectFit: 'cover' }}
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body d-flex flex-column h-100">
                            <h1 className="card-title">{item.title}</h1>
                            <p className="card-text">{item.description}</p>
                            <h3 className="card-text">€{item.price}</h3>
                            <p className="card-text">
                                <small className="text-muted">{item.stock} unidades en stock</small>
                            </p>
                            <div className="mt-auto">
                                <ItemCount stock={item.stock} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemDetail