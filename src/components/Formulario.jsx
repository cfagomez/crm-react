import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'

const Formulario = () => {
    
    const nuevoClienteSchema = yup.object().shape({
        nombre: yup.string().min(5, 'El nombre del cliente es muy corto').max(20, 'El nombre del cliente es muy largo').required('El nombre del cliente es requerido'),
        empresa: yup.string().min(5, 'El nombre de la empresa es muy corto').max(20, 'El nombre de la empresa es muy largo').required('El nombre de la empresa es requerido'),
        email: yup.string().email('El email no es valido').required('El email es requerido'),
        telefono: yup.number().integer('Numero no valido').positive('Numero no valido').typeError('El numero no es valido'),
    })

    const agregarNuevoCliente = () => {

    }

  return (
    <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md: w-3/4 mx-auto'>
        <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>Nuevo Cliente</h1>
        <Formik
            initialValues={{
                nombre: "",
                empresa: "",
                email: "",
                telefono: "",
                notas: "",
            }}
            onSubmit={(values) => agregarNuevoCliente(values)}
            validationSchema={nuevoClienteSchema}
        >
            {
                ({errors}) => {

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
                                    errors.nombre ? (
                                        <h1>Error</h1>
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
                                value="Agregar Cliente"
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

export default Formulario