const userLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/about-us', label: 'Sobre nosotros' },
    { to: '/contact', label: 'Contacto' },
];

const authenticatedLinks = [
    { to: '/profile', icon: 'bi-person', title: 'Perfil' },
    { to: '/favorites', icon: 'bi-heart', title: 'Favoritos' },
];

const adminLinks = [
    { to: '/admin/products', label: 'Productos' },
    { to: '/admin/orders', label: 'Órdenes' },
    { to: '/admin/users', label: 'Usuarios' },
];

export { userLinks, authenticatedLinks, adminLinks };