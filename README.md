# Kyo Sushi - From Course Project to Enhanced Ecommerce

This React-based ecommerce project was originally developed as the final project for the Coderhouse React Js course. Since then, it has been expanded with numerous additional features and improvements, incorporating various libraries to enhance functionality and user experience.

## Features

- **Routing**: Utilizes react-router-dom for seamless navigation between pages.
- **Protected Routes**: Restricts access to certain routes, ensuring only authorized users can access them.
- **Lazy Loading**: Components are lazily loaded to improve performance, ensuring that only the necessary parts of the application are initially loaded.
- **User Authentication with Firebase**: Manages user accounts, allowing sign-up, login, session management with a set duration, and password reset in case of forgotten credentials.
- **Firestore Integration**: Serves as the database to store and manage products, orders, and user information in real time.
- **Product Search, Filters, and Sorting**: Enables users to search products by name, filter them by category or price range, and sort them in ascending or descending order by name or price.
- **Pagination**: Implements pagination to enhance performance and user experience, displaying a limited number of products per page.
- **Shopping Cart**: Allows users to add, remove, and update item quantities in their cart, with real-time updates for a seamless shopping experience.
- **Favorites**: Users can save products to their favorites for a more personalized shopping experience.
- **Real-time Stock Management**: Automatically updates product stock to prevent users from purchasing more items than are available.
- **Admin Panel**: Includes an admin panel that enables authorized users to manage products within the application.
- **Styling**: The project’s styles are primarily handled using Bootstrap, implemented via its CDN for simplicity.
- **Responsive Design**: Fully responsive and optimized for mobile, tablet, and desktop.
- **Animations**: Powered by Framer Motion for smoother and more dynamic user interactions.
- **Accessibility**: Adheres to accessibility best practices, including semantic HTML, proper ARIA attributes, and keyboard navigation support.
- **SEO Optimization**: Optimized for search engines with proper metadata, dynamic content for better indexing, and route-based SEO improvements
- **Email Functionality**: Uses EmailJS to send contact form messages and order details, including products and total price, directly to the user's email.

## Dependencies

The project uses the following dependencies:

- **React**: The core library for building user interfaces.
- **React DOM**: Provides DOM-specific methods for React applications.
- **React Router DOM**: A library for handling routing in React applications.
- **Firebase**: A platform for building web applications with backend services, including authentication, real-time databases, and more.
- **Normalize.css**: A CSS library to normalize and standardize styles across browsers.
- **Framer Motion**: A library for creating animations and transitions in React applications.
- **EmailJS**: A library to send emails from the frontend using EmailJS.

## Prerequisites

Before starting, make sure you have:

- **Node.js** installed on your machine. You can download it from [here](https://nodejs.org/).
- **npm** (Node Package Manager), which is installed automatically with Node.js.

## Installation

1. Clone this repository to your local machine:

```bash
git clone https://github.com/federicogildemuro/kyo-sushi.git
```

2. Navigate into the project directory:

```bash
cd kyo-sushi
```

3. Install the dependencies using npm:

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

## Contribution

Contributions are welcome! If you find a bug or have suggestions, feel free to create an issue or submit a pull request.

## Author

This project was developed by Federico Gil de Muro.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
