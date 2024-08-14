import React, { useContext, useEffect, useState } from "react";
import { MdDeleteForever, MdNoteAdd, MdInfo } from "react-icons/md";
import axios from 'axios';
import Mensaje from "./Alertas/Mensaje";
import { useNavigate } from "react-router-dom";

const Tabla = () => {
    const [reportes, setReportes] = useState([]);
    const navigate = useNavigate();

    const listarReportes = async () => {
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('_id'); // Obtener el ID del usuario logueado
            const url = `${import.meta.env.VITE_BACKEND_URL}/reportes`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };

            const respuesta = await axios.get(url, options);
            console.log(respuesta);

            // Filtrar reportes para mostrar solo los que pertenecen al usuario logueado
            const reportesDelUsuario = respuesta.data.reports.filter(reporte => reporte.userId === userId);
            setReportes(reportesDelUsuario);
        } catch (error) {
            console.log(error);
            setReportes([]); // En caso de error, setear como array vacío
        }
    };

    const handleDelete = async (reporteId) => {
        try {
            const confirmar = confirm("Vas a eliminar un reporte, ¿Estás seguro de realizar esta acción?");
            if (confirmar) {
                const token = localStorage.getItem('token');
                const url = `${import.meta.env.VITE_BACKEND_URL}/reporte/${reporteId}`;
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                };
                await axios.delete(url, { headers });
                // Vuelve a listar los reportes del usuario después de eliminar el reporte
                listarReportes();
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        listarReportes();
    }, []);

    return (
        <>
            {reportes.length === 0 ? (
                <Mensaje tipo={'active'}>{'No existen registros'}</Mensaje>
            ) : (
                <table className='w-full mt-5 table-auto shadow-lg bg-white'>
                    <thead className='bg-gray-800 text-slate-400'>
                        <tr>
                            <th className='p-2'>N°</th>
                            <th className='p-2'>Ubicación</th>
                            <th className='p-2'>Descripción</th>
                            <th className='p-2'>Situación</th>
                            <th className='p-2'>Estado</th>
                            <th className='p-2'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportes.map((reporte, index) => (
                            <tr className="border-b hover:bg-gray-300 text-center" key={reporte._id}>
                                <td>{index + 1}</td>
                                <td>{reporte.ubicacion}</td>
                                <td>{reporte.descripcion}</td>
                                <td>{reporte.situacion}</td>
                                <td>{reporte.status ? "activo" : "inactivo"}</td>
                                <td className='py-2 text-center'>
                                    <MdNoteAdd className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2" />
                                    <MdInfo className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2" 
                                    onClick={() => navigate(`/dashboard/actualizar/${reporte._id}`)}/>
                                    <MdDeleteForever
                                        className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                                        onClick={() => {
                                            console.log("Deleting report ID:", reporte._id);
                                            handleDelete(reporte._id);
                                        }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default Tabla;
