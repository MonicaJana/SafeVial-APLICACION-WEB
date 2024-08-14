
import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import Mensaje from "./Alertas/Mensaje"

export const Formulario = ({reporte}) => {
    const navigate = useNavigate()
    
    const [form, setform] = useState({
        ubicacion: reporte?.ubicacion ??"",
        descripcion: reporte?.descripcion ??""
        
})

const handleChange = (e) => {
    setform({...form,
        [e.target.name]:e.target.value
    })
}

const handleSubmit = async(e) => { 
    e.preventDefault()
    try {
        const token = localStorage.getItem('token')
        const url = `${import.meta.env.VITE_BACKEND_URL}/reporte/registro`
        const options={
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        await axios.post(url,form,options)
        setMensaje({ respuesta:"Reporte registrado con exito", tipo: true })
        setTimeout(() => {
            navigate('/dashboard/listar');
        }, 3000);
    } catch (error) {
                    setMensaje({ respuesta: error.response.data.msg, tipo: false })
        setTimeout(() => {
            setMensaje({})
        }, 3000);
    }
}

    return (
        <form onSubmit={handleSubmit}>
            {Object.keys(mensaje).length>0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
            <div>
                <label
                    htmlFor='ubicacion:'
                    className='text-gray-700 uppercase font-bold text-sm'>Ubicación: </label>
                <input
                    id='ubicacion'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Ubicación'
                    name='ubicacion'
                    value={form.ubicacion}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='descripcion:'
                    className='text-gray-700 uppercase font-bold text-sm'>Descripción: </label>
                <input
                    id='descripcion'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Descripción'
                    name='descripcion'
                    value={form.descripcion}
                    onChange={handleChange}
                />
            </div>
       
            <input
                type="submit"
                className='bg-gray-600 w-full p-3 
                    text-slate-300 uppercase font-bold rounded-lg 
                    hover:bg-gray-900 cursor-pointer transition-all'
                    value={reporte?._id ? 'Actualizar paciente' : 'Registrar paciente'} />

        </form>
    )
}