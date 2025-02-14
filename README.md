# React Ecommerce for Coderhouse React.js Course

This is a React-based ecommerce project developed as a final project for the Coderhouse React.js course. It utilizes several libraries to enhance the functionality and user experience.

## Dependencies

The project uses the following dependencies:

- **React**: The core library for building user interfaces.
- **React DOM**: Provides DOM-specific methods for React applications.
- **React Router DOM**: A library for handling routing in React applications.
- **Firebase**: A platform for building web applications with backend services, including authentication, real-time databases, and more.
- **Normalize.css**: A CSS library to normalize and standardize styles across browsers.
- **AOS (Animate On Scroll)**: A library that enables animations triggered when scrolling.
- **Framer Motion**: A library for creating animations and transitions in React applications.
- **EmailJS**: A library to send emails from the frontend using EmailJS.

## Prerequisites

Before starting, make sure you have:

- **Node.js** installed on your machine. You can download it from [here](https://nodejs.org/).
- **npm** (Node Package Manager), which is installed automatically with Node.js.

## Installation

1. Clone this repository to your local machine:

```bash
git clone https://github.com/federicogildemuro/react-coderhouse.git
```

2. Navigate into the project directory:

```bash
cd react-coderhouse
```

2. Install the dependencies using npm:

```bash
npm install
```

## Configuration

1. Create a `.env` file in the root directory of the project.
2. Add any necessary environment variables for the project (e.g., Firebase API keys, EmailJS credentials).
3. You can find an example of the required variables in the .env.example file.

## Usage

To run the development server, use the following command:

```bash
npm start
```

This will start the app on [http://localhost:5173](http://localhost:5173).

## Features

- **Styling**: The project's styles are mostly handled using Bootstrap, implemented via its CDN for simplicity.
- **Responsive Design**: The application is fully responsive and optimized for mobile, tablet, and desktop.
- **Lazy Loading**: Components are lazily loaded to improve performance, ensuring that only the necessary parts of the application are loaded initially.
- **Routing**: The project uses `react-router-dom` for navigation between different pages such as Home, Products and Cart.
- **User Authentication with Firebase**: Firebase authentication is used to manage user accounts, allowing for sign-up, login, and session management.
- **Admin Panel**: An admin panel allows authorized users to manage products, orders, and users within the application.
- **Protected Routes**: Certain routes, like the admin panel, are protected to ensure only authorized users can access them.
- **Product Search, Filters, and Sorting**: The project allows users to search products by name, apply filters based on category or price range, and sort products in ascending or descending order by name or price.
- **Pagination**: The product list is paginated to improve performance and user experience, displaying a limited number of products per page.
- **Shopping Cart**: Users can easily add, remove, and update the quantity of items in their cart. The cart automatically reflects changes in real-time, ensuring a seamless shopping experience.
- **Favorites**: Users can add products to their favorites, creating a personalized shopping experience.
- **Real-time Stock Management**: The application updates product stock in real-time, preventing users from purchasing more items than available in stock.
- **Email Functionality**: EmailJS is used to send contact form messages and order details, including products and total price, directly to the user's email.
- **Animations**: Scroll-based animations are powered by AOS.
- **SEO Optimization**: The app is optimized for search engines with proper metadata, dynamic content for better indexing, and route-based SEO improvements.

## Contribution

Contributions are welcome! If you find a bug or have suggestions, feel free to create an issue or submit a pull request.

## Author

This project was developed by Federico Gil de Muro.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
