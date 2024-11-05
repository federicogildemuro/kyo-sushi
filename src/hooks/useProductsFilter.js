import { useState, useEffect } from 'react'

function useProductsFilter(products) {
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        if (filter) {
            const filtered = products.filter(product => product.title.toLowerCase().includes(filter.toLowerCase()));
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    }, [products, filter]);

    return { filteredProducts, setFilter };
}

export default useProductsFilter