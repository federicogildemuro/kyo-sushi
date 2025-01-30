import { BrowserRouter } from 'react-router-dom';
import Providers from './contexts/Providers';
import Header from './components/Header/Header';
import AppRoutes from './routes/AppRoutes';
import Footer from './components/Footer/Footer';

function App() {
    return (
        <BrowserRouter>
            <Providers>
                <Header />
                <AppRoutes />
                <Footer />
            </Providers>
        </BrowserRouter>
    );
}

export default App;