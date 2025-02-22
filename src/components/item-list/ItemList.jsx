import { motion } from 'framer-motion';
import Item from './Item';
import './ItemList.css';

function ItemList({ items }) {
    // Variants for the item list animation
    const itemVariants = {
        hidden: { opacity: 0, y: 25 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: .5, ease: 'easeInOut' }
        },
    };

    // Don't render if there are no items
    if (!items) return null;

    return (
        <motion.ul
            className="row justify-content-center g-3 mx-5 p-0"
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: .25 }}
        >
            {items.map((item) => (
                <motion.li
                    key={item.id}
                    className="col-12 col-sm-6 col-md-4 col-lg-3 p-2"
                    variants={itemVariants}
                >
                    <Item item={item} />
                </motion.li>
            ))}
        </motion.ul>
    );
}

export default ItemList;