import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import {useNavigate} from 'react-router-dom'

const Formulario = ({cliente}) => {

    const navigate = useNavigate()
    
    const nuevoClienteSchema = yup.object().shape({
        nombre: yup.string().min(5, 'El nombre del cliente es muy corto').max(20, 'El nombre del cliente es muy largo').required('El nombre del cliente es requerido'),
        empresa: yup.string().min(5, 'El nombre de la empresa es muy corto').max(20, 'El nombre de la empresa es muy largo').required('El nombre de la empresa es requerido'),
        email: yup.string().email('El email no es valido').required('El email es requerido'),
        telefono: yup.number().integer('Numero no valido').positive('Numero no valido').typeError('El numero no es valido'),
    })

    const handleSubmit = async (values) => {

        try {

            if (Object.keys(cliente).length > 0) {

                const url = `http://localhost:4000/clientes/${cliente.id}`
                const respuesta = await fetch (url, {
                    method: 'PUT',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type':'application/json'
                    }
                })
                const resultado = await respuesta.json()
                console.log(resultado)

            } else {

                const url = "http://localhost:4000/clientes"
                const respuesta = await fetch (url, {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type':'application/json'
                    }
                })
                const resultado = await respuesta.json()
                console.log(resultado)

            }

        } catch (error) {

            console.log(error)

        }
    }

    const redireccionarUsuario = async (values, {resetForm}) => {

        await handleSubmit(values)
        resetForm()
        navigate('/clientes')

    }

  return (
    <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md: w-3/4 mx-auto'>
        <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>
            {
                Object.keys(cliente).length === 0 ? (
                    'Nuevo Cliente'
                ) : (
                    'Editar Cliente'
                )
            }
        </h1>
        <Formik
            initialValues={{
                nombre: cliente?.nombre ?? "",
                empresa: cliente?.empresa ?? "",
                email: cliente?.email ?? "",
                telefono: cliente?.telefono ?? "",
                notas: cliente?.notas ?? "",
            }}
            onSubmit={(values, {resetForm}) => redireccionarUsuario(values, {resetForm})}
            validationSchema={nuevoClienteSchema}
            enableReinitialize={true}
        >
            {
                ({errors, touched}) => {

                    return (

                        <Form className='mt-10'>
                            <div className='mb-4'>
                                <label 
                                    htmlFor="nombre"
                                    className='text-gray-800'
                                >
                                    Nombre
                                </label>
                                <Field
                                    id='nombre'
                                    type='text'
                                    name='nombre'
                                    className='mt-2 block w-full p-3 bg-gray-50'
                                    placeholder='Ingrese nombre del cliente'
                                />
                                {
                                    errors.nombre && touched.nombre ? (
                                        <p>{errors.nombre}</p>
                                    ) : (
                                        null
                                    )
                                }
                            </div>
                            <div className='mb-4'>
                                <label 
                                    htmlFor="empresa"
                                    className='text-gray-800'
                                >
                                    Empresa
                                </label>
                                <Field
                                    id="empresa"
                                    type='text'
                                    name='empresa'
                                    className='mt-2 block w-full p-3 bg-gray-50'
                                    placeholder="Ingrese nombre de la empresa"
                                />
                                {
                                    errors.empresa && touched.empresa ? (
                                        <p>{errors.empresa}</p>
                                    ) : (
                                        null
                                    )
                                }
                            </div>
                            <div className='mb-4'>
                                <label 
                                    htmlFor="email"
                                    className='text-gray-800'
                                >
                                    Email
                                </label>
                                <Field
                                    id="email"
                                    type='email'
                                    name='email'
                                    className='mt-2 block w-full p-3 bg-gray-50'
                                    placeholder="Ingrese email del cliente"
                                />
                                {
                                    errors.email && touched.email ? (
                                        <p>{errors.email}</p>
                                    ) : (
                                        null
                                    )
                                }
                            </div>
                            <div className='mb-4'>
                                <label 
                                    htmlFor="telefono"
                                    className='text-gray-800'
                                >
                                    Telefono
                                </label>
                                <Field
                                    id="telefono"
                                    type='tel'
                                    name="telefono"
                                    className='mt-2 block w-full p-3 bg-gray-50'
                                    placeholder="Ingrese el numero de telefono"
                                />
                                {
                                    errors.telefono && touched.telefono ? (
                                        <p>{errors.telefono}</p>
                                    ) : (
                                        null
                                    )
                                }
                            </div>
                            <div className='mb-4'>
                                <label 
                                    htmlFor="notas"
                                    className='text-gray-800'
                                >
                                    Notas
                                </label>
                                <Field
                                    id="notas"
                                    type='text'
                                    name='notas'
                                    as='textarea'
                                    className='mt-2 block w-full p-3 bg-gray-50 h-40'
                                />
                            </div>
                            <input 
                                type="submit"
                                value={
                                    Object.keys(cliente).length === 0 ? (
                                        'Nuevo Cliente'
                                    ) : (
                                        'Editar Cliente'
                                    )
                                }
                                className='mt-5 w-full bg-blue-800 p-3 text-white font-bold uppercase text-lg'
                            />
                        </Form>  

                    )

                }
            }
        </Formik>
    </div>
  )
}

Formulario.defaultProps = {
    cliente: {}
}

export default Formulario