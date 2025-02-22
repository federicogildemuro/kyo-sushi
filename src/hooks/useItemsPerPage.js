import { useState, useEffect } from 'react';

// Custom hook to manage the number of items to display per page based on window size
function useItemsPerPage() {
    // State to store the number of items to display per page
    const [itemsPerPage, setItemsPerPage] = useState(4);

    useEffect(() => {
        // Function to handle window resize and adjust items per page accordingly
        const handleResize = () => {
            if (window.innerWidth < 576) {
                setItemsPerPage(4);
            }
            else if (window.innerWidth < 992) {
                setItemsPerPage(12);
            }
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