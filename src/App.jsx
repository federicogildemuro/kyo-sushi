import { BrowserRouter } from 'react-router-dom';
import Providers from './contexts/Providers';
import Header from './components/header/Header';
import MainLayout from './layouts/MainLayout';
import Footer from './components/footer/Footer';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Providers>
                <Header />
                <MainLayout />
                <Footer />
            </Providers>
        </BrowserRouter>
    );
}

export default App;