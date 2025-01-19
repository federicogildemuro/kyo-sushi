import { BrowserRouter } from 'react-router-dom';
import Providers from './contexts/Providers';
import NavBar from './components/NavBar/NavBar';
import AppRoutes from './AppRoutes';
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