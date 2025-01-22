import { BrowserRouter } from 'react-router-dom';
import Providers from './contexts/Providers';
import AppRoutes from './routes/AppRoutes';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import 'normalize.css';

function App() {
    return (
        <BrowserRouter>
            <Providers>
                <NavBar />
                <AppRoutes />
                <Footer />
            </Providers>
        </BrowserRouter>
    );
}

export default App;