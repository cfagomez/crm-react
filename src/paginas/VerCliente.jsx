import React from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'

const VerCliente = () => {

    const {id} = useParams()

    const [cliente, setCliente] = React.useState({})
    const [cargando, setCargando] = React.useState(true)

    const {nombre, empresa, email, telefono, notas} = cliente

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
    <>
        {
            Object.keys(cliente).length === 0 ? (
                <p>No hay resultados</p>
            ) : (
                <div>
                    <h1 className='font-black text-4xl text-blue-900'>Ver Cliente:</h1>
                    <p className='mt-3'>Informacion del Cliente</p>
                    <p className='text-4xl mt-10 text-gray-700'>
                        <span className='font-bold uppercase text-gray-800'>Cliente: </span>
                        {nombre}
                    </p>
                    <p className='text-4xl mt-10 text-gray-700'>
                        <span className='font-bold uppercase text-gray-800'>Empresa: </span>
                        {empresa}
                    </p>
                    <p className='text-4xl mt-10 text-gray-700'>
                        <span className='font-bold uppercase text-gray-800'>Email: </span>
                        {email}
                    </p>
                    <p className='text-4xl mt-10 text-gray-700'>
                        <span className='font-bold uppercase text-gray-800'>Telefono: </span>
                        {telefono}
                    </p>
                    <p className='text-4xl mt-10 text-gray-700'>
                        <span className='font-bold uppercase text-gray-800'>Notas: </span>
                        {notas}
                    </p>
                </div>
            )
        }
    </>
    
  ) : (
      <Spinner />
  )
}

export default VerCliente