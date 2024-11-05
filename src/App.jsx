import 'normalize.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import Cart from './components/Cart/Cart'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'

function App() {
    return (
        <BrowserRouter>
            <NavBar />

            <Routes>
                <Route path="/" element={<ItemListContainer />} />
                <Route path="/category/:id" element={<ItemListContainer />} />
                <Route path="/item/:id" element={<ItemDetailContainer />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>

            <Footer />
        </BrowserRouter>
    )
}

export default App