# React Ecommerce for Coderhouse React.js Course

This is a React-based ecommerce project developed as a final project for the Coderhouse React.js course. It utilizes several libraries to enhance the functionality and user experience.

## Dependencies

The project uses the following dependencies:

- **@emailjs/browser**: A library to send emails from the frontend using EmailJS.
- **AOS (Animate On Scroll)**: A library that enables animations triggered when scrolling.
- **Firebase**: A platform for building web applications with backend services, including authentication, real-time databases, and more.
- **normalize.css**: A CSS library to normalize and standardize styles across browsers.
- **React**: The core library for building user interfaces.
- **react-dom**: Provides the DOM-specific methods for React.
- **react-router-dom**: A library for handling routing in React applications.

## Prerequisites

Before starting, make sure you have:

- **Node.js** installed on your machine. You can download it from [here](https://nodejs.org/).
- **npm** (Node Package Manager), which is installed automatically with Node.js.

## Installation

1. Clone this repository to your local machine:

```bash
git clone https://github.com/yourusername/react-ecommerce-coderhouse.git
```

2. Navigate into the project directory:

```bash
cd react-ecommerce-coderhouse
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

- **Routing**: The project uses `react-router-dom` for navigation between different pages such as Home, Products and Cart.
- **Styling**: The project's styles are mostly handled using Bootstrap, implemented via its CDN for simplicity.
- **Responsive Design**: The application is fully responsive and optimized for mobile, tablet, and desktop.
- **Product Categories View**: The app displays products organized by categories, allowing users to easily navigate and find products in their preferred category.
- **Shopping Cart**: Users can add and remove the quantity of items in their cart.
- **Email Functionality**: EmailJS is used to send contact form messages and order details, including products and total price, directly to the user's email.
- **Animations**: Scroll-based animations are powered by AOS.
- **SEO Optimized**: The app is optimized for search engines with proper metadata and route-based dynamic content.

## Contribution

Contributions are welcome! If you find a bug or have suggestions, feel free to create an issue or submit a pull request.

## Author

This project was developed by Federico Gil de Muro.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
