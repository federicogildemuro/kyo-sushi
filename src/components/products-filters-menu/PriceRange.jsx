import { useState, useEffect } from 'react';

function PriceRange({ onChange, priceRange }) {
    // States to store the min and max price values
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    // Update the min and max price values when the priceRange prop changes
    useEffect(() => {
        setMinPrice(priceRange.min);
        setMaxPrice(priceRange.max);
    }, [priceRange]);

    // Handle the change of the min price input
    const handleMinPriceChange = (event) => {
        let value = event.target.value;
        if (/^\d*$/.test(value)) {
            if (value === '' || parseInt(value, 10) < 0) value = '';
            setMinPrice(value);
            onChange({ min: value, max: maxPrice });
        }
    };

    // Handle the change of the max price input
    const handleMaxPriceChange = (event) => {
        let value = event.target.value;
        if (/^\d*$/.test(value)) {
            if (value === '' || parseInt(value, 10) < 0) value = '';
            setMaxPrice(value);
            onChange({ min: minPrice, max: value });
        }
    };

    // Prevent the user from typing non-numeric characters except some keys to allow keyboard navigation
    const preventKeyboardInput = (event) => {
        if (!/[0-9]/.test(event.key) &&
            !['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Enter'].includes(event.key)) {
            event.preventDefault();
        }
    };

    return (
        <div className="d-flex flex-column align-items-center gap-3">
            <h5>Filtrar por precio</h5>

            <div className="d-flex gap-3 mx-3">
                <div className="d-flex align-items-center gap-3">
                    <label
                        htmlFor="minPrice"
                        className="form-label m-0"
                    >
                        Min
                    </label>

                    <input
                        type="text"
                        id="minPrice"
                        className="form-control"
                        value={minPrice}
                        onChange={handleMinPriceChange}
                        onKeyDown={preventKeyboardInput}
                    />
                </div>

                <div className="d-flex align-items-center gap-3">
                    <label
                        htmlFor="maxPrice"
                        className="form-label m-0"
                    >
                        Max
                    </label>

                    <input
                        type="text"
                        id="maxPrice"
                        className="form-control"
                        value={maxPrice}
                        onChange={handleMaxPriceChange}
                        onKeyDown={preventKeyboardInput}
                    />
                </div>
            </div>
        </div>
    );
}

export default PriceRange;