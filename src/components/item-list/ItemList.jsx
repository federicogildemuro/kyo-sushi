import Item from './Item';

function ItemList({ items }) {
    if (!items) return null;

    return (
        <div className="container-fluid">
            <ul className="row g-4 m-3 mb-5 justify-content-center list-unstyled">
                {items.map((item) => (
                    <li
                        key={item.id}
                        className="col-12 col-sm-6 col-md-4 col-lg-3"
                    >
                        <Item item={item} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ItemList;