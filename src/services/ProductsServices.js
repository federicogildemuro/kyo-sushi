const products = [
    {
        id: '1',
        title: 'Buenos Aires',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Rolls',
        price: 12.5,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '2',
        title: 'Filadelphia',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Rolls',
        price: 10,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '3',
        title: 'Three',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Rolls',
        price: 10,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png',
    },
    {
        id: '4',
        title: 'New York',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Rolls',
        price: 10,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '5',
        title: 'California',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Rolls',
        price: 10,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '6',
        title: 'Eby de tempura',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Rolls',
        price: 12.5,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '7',
        title: 'Smoked',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Rolls',
        price: 12.5,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '8',
        title: 'Salmon honey',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Rolls',
        price: 10,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '9',
        title: 'Ceviche',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Hot Rolls',
        price: 12.5,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '10',
        title: 'Aplle',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Hot Rolls',
        price: 12.5,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '11',
        title: 'Double crunch',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Hot Rolls',
        price: 12.5,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '12',
        title: 'Kyo',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Hot Rolls',
        price: 12.5,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '13',
        title: 'Gunkan de maracuyá',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Sin alga y sin arroz',
        price: 12.5,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '14',
        title: 'Tamago',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Sin alga y sin arroz',
        price: 10,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '15',
        title: 'Cítrico',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Sin alga y sin arroz',
        price: 12.5,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '16',
        title: 'Sensation',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Sin alga y sin arroz',
        price: 12.5,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '17',
        title: 'Caspio',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Veggies',
        price: 12.5,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '18',
        title: 'Adriático',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Veggies',
        price: 12.5,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '19',
        title: 'Seto',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Veggies',
        price: 12.5,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '20',
        title: 'Mediterráneo',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Veggies',
        price: 10,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '21',
        title: 'Salmón',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Makis',
        price: 10,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '22',
        title: 'Salmón, aguacate y filadelphia',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Makis',
        price: 10,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '23',
        title: 'Salmón, aguacate y langostinos',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Makis',
        price: 10,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '24',
        title: 'Aguacate, zanahorias y manzana',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Makis',
        price: 8,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '25',
        title: 'Salmón',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Sashimis',
        price: 3,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '26',
        title: 'Langostino',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Sashimis',
        price: 3.5,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '27',
        title: 'Edammame',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Entrantes',
        price: 5,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '28',
        title: 'Gyozas de verduras',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Entrantes',
        price: 7,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '29',
        title: 'Gyozas de pollo',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Entrantes',
        price: 7,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '30',
        title: 'Langostinos rebozados con guacamole',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Entrantes',
        price: 8,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '31',
        title: 'Arrolladitos primavera',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Entrantes',
        price: 7,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '32',
        title: 'Chicken crunch',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Entrantes',
        price: 3.5,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '33',
        title: 'Salmón',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Niguiris',
        price: 5,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '34',
        title: 'Langostino',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Niguiris',
        price: 8,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '35',
        title: 'Salmón, filadelfia, aguacate y mango',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Niguiris',
        price: 5,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '36',
        title: 'Salsa de pera picante',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Salsas',
        price: 2,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '37',
        title: 'Salsa de mango',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Salsas',
        price: 2,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '38',
        title: 'Salsa de maracuyá',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Salsas',
        price: 2,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '39',
        title: 'Salsa de sésamo',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Salsas',
        price: 2,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '40',
        title: 'Salsa de mostaza dulce',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Salsas',
        price: 2,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '41',
        title: 'Salsa de honey',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Salsas',
        price: 2,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '42',
        title: 'Salsa yogurt',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Salsas',
        price: 2,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '43',
        title: 'Coulis de rúcula',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Salsas',
        price: 2,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '44',
        title: 'Salsa teriyaki',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Salsas',
        price: 2,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '45',
        title: 'Combo veggie',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Combinados',
        price: 19.99,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '46',
        title: 'Combo Mallorca (15 unidades)',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Combinados',
        price: 21.99,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '47',
        title: 'Combo Mallorca (30 unidades)',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Combinados',
        price: 39.99,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '48',
        title: 'Combo Mallorca (45 unidades)',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Combinados',
        price: 57.99,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '49',
        title: 'Combo Kyo (15 unidades)',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Combinados',
        price: 22.99,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '50',
        title: 'Combo Kyo (30 unidades)',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Combinados',
        price: 41.99,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
    {
        id: '51',
        title: 'Combo Kyo (45 unidades)',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus at mauris rutrum vulputate nec eu lorem. Suspendisse mauris purus, fermentum eu tempus in, malesuada ac nisi. Quisque efficitur augue nisi. Suspendisse diam tellus, vehicula eu pellentesque vel, imperdiet id lacus. Sed interdum massa in odio dapibus, in ultricies diam finibus. Donec mollis felis et pulvinar luctus. Nam maximus rutrum enim ut accumsan. Aliquam consectetur arcu sed arcu commodo, nec mollis odio faucibus. Mauris ac est consequat, faucibus lacus sed, tincidunt ex. Nam ac commodo augue, non posuere libero.',
        category: 'Combinados',
        price: 59.99,
        stock: 10,
        pictureUrl: 'https://sushisur.com.ar/test/wp-content/uploads/2021/09/buenosairesrolls-.png'
    },
]

const getProducts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products);
        }, 2000);
    });
}

const getProduct = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const product = products.find(product => product.id === id);
            if (product) {
                resolve(product);
            } else {
                reject('Product not found');
            }
        }, 2000);
    });
}

const getProductsByCategory = (category) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const productsByCategory = products.filter(product => product.category === category);
            resolve(productsByCategory);
        }, 2000);
    });
}

const getCategories = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const categories = products.map(product => product.category);
            const uniqueCategories = [...new Set(categories)];
            resolve(uniqueCategories);
        }, 2000);
    });
}

export { getProducts, getProduct, getProductsByCategory, getCategories }