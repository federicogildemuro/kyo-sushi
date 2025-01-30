import { BrowserRouter } from 'react-router-dom';
import Providers from './contexts/Providers';
import AppContent from './AppContent';

function App() {
    return (
        <BrowserRouter>
            <Providers>
                <AppContent />
            </Providers>
        </BrowserRouter>
    );
}

export default App;