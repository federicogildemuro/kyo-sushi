import ItemList from '../../components/item-list/ItemList';

function RelatedItems({ items }) {
    if (!items) return null;

    return (
        <section className="d-flex flex-column text-center mb-5">
            <h1 className="display-6 fw-bold mb-5">Productos relacionados</h1>

            <ItemList items={items} />
        </section>
    );
}

export default RelatedItems;