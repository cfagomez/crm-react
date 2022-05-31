import React from 'react'
import { useParams } from 'react-router-dom'
import Formulario from '../components/Formulario'

const EditarCliente = () => {

  const {id} = useParams()

  const [cliente, setCliente] = React.useState({})

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

    }

    obtenerDatosClienteAPI()

  })

  return (
    <div>
        <h1>Editar Cliente</h1>
        <Formulario 
          cliente={cliente}
        />
    </div>
  )
}

export default EditarCliente