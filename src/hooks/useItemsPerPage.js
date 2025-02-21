import { useState, useEffect } from 'react';

// Custom hook to manage the number of items to display per page based on window size
function useItemsPerPage() {
    // State to store the number of items to display per page
    const [itemsPerPage, setItemsPerPage] = useState(4);

    useEffect(() => {
        // Function to handle window resize and adjust items per page accordingly
        const handleResize = () => {
            // If the window width is less than 576px, set items per page to 4
            if (window.innerWidth < 576) {
                setItemsPerPage(4);
            }
            // If the window width is less than 992px, set items per page to 12
            else if (window.innerWidth < 992) {
                setItemsPerPage(12);
            }
            // If the window width is 992px or more, set items per page to 16
            else {
                setItemsPerPage(16);
            }
        };

        // Call handleResize to set the initial items per page based on current window size
        handleResize();

        // Add event listener to handle window resize
        window.addEventListener('resize', handleResize);

        // Clean up event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return { itemsPerPage };
}

export default useItemsPerPage;