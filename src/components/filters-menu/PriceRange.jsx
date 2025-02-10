import { useState, useEffect } from 'react';

function PriceRange({ onChange, priceRange }) {
    const [isVisible, setIsVisible] = useState(false);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    useEffect(() => {
        setMinPrice(priceRange.min);
        setMaxPrice(priceRange.max);
    }, [priceRange]);

    const handleMinPriceChange = (event) => {
        let value = event.target.value;
        if (/^\d*$/.test(value)) {
            if (value === '' || parseInt(value, 10) < 0) value = '';
            setMinPrice(value);
            onChange({ min: value, max: maxPrice });
        }
    };

    const handleMaxPriceChange = (event) => {
        let value = event.target.value;
        if (/^\d*$/.test(value)) {
            if (value === '' || parseInt(value, 10) < 0) value = '';
            setMaxPrice(value);
            onChange({ min: minPrice, max: value });
        }
    };

    const preventKeyboardInput = (event) => {
        if (!/[0-9]/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Delete') {
            event.preventDefault();
        }
    };

    return (
        <div className="d-flex flex-column align-items-center align-items-md-start gap-3 w-100">
            <h5
                onClick={() => setIsVisible(!isVisible)}
                style={{ cursor: 'pointer' }}
            >
                Filtrar por precio
                <i className={`bi bi-caret-${isVisible ? 'up-fill' : 'down-fill'}`} />
            </h5>

            {isVisible && (
                <div className="d-flex gap-3">
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
            )}
        </div>
    );
}

export default PriceRange;