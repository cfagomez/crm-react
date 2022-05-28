import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./layout/Layout"
import EditarCliente from "./paginas/EditarCliente"
import NuevoCliente from "./paginas/NuevoCliente"
import Inicio from "./paginas/Inicio"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/clientes" element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="editar" element={<EditarCliente />} />
          <Route path="nuevo" element={<NuevoCliente />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
