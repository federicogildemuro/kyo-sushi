import 'normalize.css'
import NavBar from './components/NavBar/NavBar'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import Footer from './components/Footer/Footer'

function App() {
    return (
        <>
            <header>
                <NavBar />
            </header>

            <main>
                <ItemListContainer />
            </main>

            <footer>
                <Footer />
            </footer>
        </>
    )
}

export default App