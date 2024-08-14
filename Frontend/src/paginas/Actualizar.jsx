import { Formulario } from '../componets/Formulario'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Mensaje from '../componets/Alertas/Mensaje';
import axios from 'axios';



const Actualizar = () => {
    const { id } = useParams()
    const [reporte, setReporte] = useState({})
    const [mensaje, setMensaje] = useState({})

    useEffect(() => {
        const consultarReporte = async () => {
            try {
                const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}/reporte/${id}`
                
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const respuesta = await axios.get(url, options)
                console.log(respuesta);
                setReporte(respuesta.data)
            } catch (error) {
                setMensaje({ respuesta: error.response.data.msg, tipo: false })
            }
        }
        consultarReporte()
    }, [])

   

    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Actualizar Reporte</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite actualizar los detalles del reporte</p>
            {
                Object.keys(reporte).length != 0 ?
                    (
                        <Formulario reporte={reporte}/>
                    )
                    :
                    (
                        Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
                    )
            }
        </div>

    )
}

export default Actualizar