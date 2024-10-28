import NavBar from "./components/NavBar/NavBar"
import ItemListContainer from "./components/ItemListContainer/ItemListContainer"

function App() {
    const greeting = "¡Bienvenidos a la tienda de react-coderhouse!"

    return (
        <>
            <NavBar />
            <ItemListContainer greeting={greeting} />
        </>
    )
}

export default App