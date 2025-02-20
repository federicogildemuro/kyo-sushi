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
    { to: '/admin/productos', label: 'Productos' },
    { to: '/admin/categorias', label: 'Categorías' },
    { to: '/admin/pedidos', label: 'Pedidos' },
    { to: '/admin/usuarios', label: 'Usuarios' }
];

export { userLinks, authenticatedUserLinks, adminLinks };