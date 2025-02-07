import { useState, useEffect } from "react";

function useItemsPerPage() {
    const [itemsPerPage, setItemsPerPage] = useState(4);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 576) {
                setItemsPerPage(4);
            } else if (window.innerWidth < 992) {
                setItemsPerPage(12);
            } else {
                setItemsPerPage(16);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return { itemsPerPage };
}

export default useItemsPerPage;