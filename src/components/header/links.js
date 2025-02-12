const userLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/about-us', label: 'Sobre nosotros' },
    { to: '/contact', label: 'Contacto' }
];

const authenticatedUserLinks = [
    { to: '/profile', title: 'Perfil', icon: 'bi-person' },
    { to: '/favorites', title: 'Favoritos', icon: 'bi-heart' }
];

const adminLinks = [
    { to: '/admin/products', label: 'Productos' },
    { to: '/admin/categories', label: 'Categorías' },
    { to: '/admin/orders', label: 'Órdenes' },
    { to: '/admin/users', label: 'Usuarios' }
];

export { userLinks, authenticatedUserLinks, adminLinks };