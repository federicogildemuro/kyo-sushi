import Item from './Item';

function ItemList({ items }) {
    if (!items) return null;

    return (
        <ul className="row justify-content-center g-3 m-5 p-0">
            {items.map((item) => (
                <li
                    key={item.id}
                    className="col-12 col-sm-6 col-md-4 col-lg-3 p-2"
                >
                    <Item item={item} />
                </li>
            ))}
        </ul>
    );
}

export default ItemList;