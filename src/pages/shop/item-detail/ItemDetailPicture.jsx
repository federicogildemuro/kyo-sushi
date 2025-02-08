function ItemDetailPicture({ item, isFavorite, toggleFavorite }) {
    return (
        <div className="col-lg-4 d-flex align-items-stretch">
            <div className="position-relative w-100">
                <div className="favorite-icon-container">
                    <i
                        className={`favorite-icon fs-4 p-2 bi bi-heart${isFavorite ? '-fill' : ''}`}
                        onClick={toggleFavorite}
                    />
                </div>

                <img
                    src={item.pictureUrl}
                    alt={item.title}
                    className="img-fluid d-none d-lg-block rounded-start w-100 h-100"
                    style={{ objectFit: "cover" }}
                />

                <img
                    src={item.pictureUrl}
                    alt={item.title}
                    className="img-fluid d-block d-lg-none rounded-top w-100"
                    style={{ objectFit: "cover" }}
                />
            </div>
        </div>
    );
}

export default ItemDetailPicture;