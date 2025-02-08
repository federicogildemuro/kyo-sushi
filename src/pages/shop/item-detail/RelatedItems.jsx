import ItemList from '../../../components/item-list/ItemList';

function RelatedItems({ items }) {
    if (!items) return null;

    return (
        <section className="d-flex flex-column text-center">
            <h1 className="display-6 fw-bold">Productos relacionados</h1>

            <ItemList items={items} />
        </section>
    );
}

export default RelatedItems;