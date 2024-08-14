import axios from 'axios';
import { createContext, useState} from "react"

const ReportesContext = createContext()


const ReportesProvider = ({ children }) => {
    
    const [modal, setModal] = useState(false)
    const [reportes, setReportes] = useState([])
    const [mensaje, setMensaje] = useState({})

    const handleModal = () => {
        setModal(!modal);
    };

    

    const registrarReportes = async(datos) => {

        const token = localStorage.getItem('token')
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/reporte/registro`
            const options={
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta= await axios.post(url,datos,options)    
            console.log(respuesta)
            setReportes([respuesta.data.reportedatos,...reportes])
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id) => {

        try {
            const confirmar = confirm("Vas a eliminar el reporte, ¿Estás seguro de realizar esta acción?")
            if (confirmar) {
                const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}/reporte/${id}`
                const options={
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const response= await axios.delete(url,options);
                console.log("delete: ",response)
                const reportesActualizados = reportes.filter(reporte => reporte._id !== id)
                setReportes(reportesActualizados)
                setMensaje({ respuesta: response.data?.msg, tipo: true })
                setTimeout(() => {
                    setMensaje({})
                }, 2000);
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleStatus = async (id, currentStatus) => {
        const token = localStorage.getItem('token');
        try {
            const confirmar = confirm("Vas a actualizar el estado de un reporte, ¿Estás seguro de realizar esta acción?");
            if (confirmar) { 
                // Determina el nuevo estado basado en el estado actual
                const newStatus = currentStatus === 'En proceso' ? 'Resuelto' : 'En proceso';
        
                const url = `${import.meta.env.VITE_BACKEND_URL}/reporte/actualizacionestado/${id}`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                };
        
                // Envía el nuevo estado en la solicitud
                await axios.put(url, { situacion: newStatus }, options);
        
                // Actualiza la lista de reportes localmente
                const reportesActualizados = reportes.map(reporte => 
                    reporte._id === id ? { ...reporte, situacion: newStatus } : reporte
                );
                setReportes(reportesActualizados);
        
                setMensaje({ respuesta: "Estado actualizado correctamente", tipo: true });
                setTimeout(() => {
                    setMensaje({});
                }, 2000);
            }
        } catch (error) {
            console.log(error);
            setMensaje({ respuesta: "Error al actualizar el estado", tipo: false });
        }
    };
    

    return (
        <ReportesContext.Provider value={
            {
                modal,
                setModal,
                handleModal,
                reportes,
                setReportes,
                registrarReportes,
                mensaje,
                handleDelete,
                handleStatus
            }
        }>
            {children}
        </ReportesContext.Provider>
    )
}
export {
    ReportesProvider
}
export default ReportesContext