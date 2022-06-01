import React from 'react'
import { useParams } from 'react-router-dom'
import Formulario from '../components/Formulario'
import Spinner from '../components/Spinner'

const EditarCliente = () => {

  const {id} = useParams()

  const [cliente, setCliente] = React.useState({})
  const [cargando, setCargando] = React.useState(true)

  React.useEffect(() => {

    const obtenerDatosClienteAPI = async () => {

      try {
        const url = `http://localhost:4000/clientes/${id}`
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        setCliente(resultado)
      } catch (error) {
        console.log(error)
      }

      setCargando(false)

    }

    obtenerDatosClienteAPI()

  }, [])

  return !cargando ? (
    <div>
      {
        Object.keys(cliente).length === 0 ? (
          'No hay resultados'
        ) : (
          <>
            <h1>Editar Cliente</h1>
            <Formulario 
              cliente={cliente}
            />
          </>
        )
      }
    </div>
  ) : (
    <Spinner />
  )
}

export default EditarCliente