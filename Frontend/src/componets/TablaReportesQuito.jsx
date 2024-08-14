import { useEffect, useState, useContext } from "react";
import axios from 'axios';
import Mensaje from "./Alertas/Mensaje";
import { useNavigate } from "react-router-dom";
import { MdPublishedWithChanges } from "react-icons/md";
import ReportesContext from "../context/ReportesProvider";
import AuthContext from "../context/AuthProvider"; // Importa el contexto de autenticación

const TablaReportesQuito = () => {
    const { handleStatus } = useContext(ReportesContext);
    const { auth } = useContext(AuthContext); // Usa el contexto para obtener la info del usuario
    const [reportes, setReportes] = useState([]);
    const navigate = useNavigate();

    const listarReportes = async () => {
        try {
            const token = localStorage.getItem('token');
            const url = `${import.meta.env.VITE_BACKEND_URL}/reportes`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };

            const respuesta = await axios.get(url, options);
            const { data } = respuesta;
            if (Array.isArray(data.reports)) {
                setReportes(data.reports.reverse()); // Invertir el array de reportes
            } else {
                setReportes([]);
            }
        } catch (error) {
            console.log(error);
            setReportes([]);
        }
    };

    useEffect(() => {
        listarReportes();
    }, []);

    const getSituacionColor = (situacion) => {
        switch (situacion) {
            case 'Pendiente':
                return 'bg-red-600 text-white';
            case 'En proceso':
                return 'bg-blue-600 text-white';
            case 'Resuelto':
                return 'bg-green-600 text-white';
            default:
                return 'bg-gray-600 text-white';
        }
    };

    const handleActionClick = async (id, situacion) => {
        await handleStatus(id, situacion);
        listarReportes(); // Actualiza la tabla después de realizar la acción
    };

    return (
        <>
            {reportes.length === 0 ? (
                <Mensaje tipo={'active'}>{'No existen registros'}</Mensaje>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full mt-5 table-auto shadow-lg bg-gray-800 rounded-lg">
                        <thead className="bg-gray-900 text-green-500">
                            <tr>
                                <th className="p-4 text-left text-lg">N°</th>
                                <th className="p-4 text-left text-lg">Ubicación</th>
                                <th className="p-4 text-left text-lg">Descripción</th>
                                <th className="p-4 text-left text-lg">Situación</th>
                                {/* Renderiza la columna de Acción solo si el rol no es 'user' */}
                                {auth?.rol !== 'user' && (
                                    <th className="p-4 text-left text-lg">Acción</th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="text-gray-300">
                            {reportes.map((reporte, index) => (
                                <tr 
                                    className="border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200" 
                                    key={reporte._id}
                                >
                                    <td className="p-4">{index + 1}</td>
                                    <td className="p-4">{reporte.ubicacion}</td>
                                    <td className="p-4">{reporte.descripcion}</td>
                                    <td className="p-4">
                                        <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${getSituacionColor(reporte.situacion)}`}>
                                            {reporte.situacion}
                                        </span>
                                    </td>
                                    {/* Renderiza la celda de Acción solo si el rol no es 'user' */}
                                    {auth.rol === 'administrador' && (
                                        <td className='py-2 text-center'>
                                            <MdPublishedWithChanges 
                                                className="h-7 w-7 text-blue-400 cursor-pointer inline-block mr-2 hover:text-blue-300"
                                                onClick={() => handleActionClick(reporte._id, reporte.situacion)} 
                                            />
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default TablaReportesQuito;
