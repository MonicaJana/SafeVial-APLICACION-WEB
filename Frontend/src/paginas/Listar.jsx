import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import ReportesContext from '../context/ReportesProvider';
import ModalReporte from '../componets/Modals/ModalReporte';
import Mensaje from '../componets/Alertas/Mensaje';
import TablaReportes from '../componets/TablaReportes';

const Listar = () => {
    const {modal,mensaje, handleModal,reportes,setReportes} = useContext(ReportesContext)
    const [usuario, setUsuario] = useState({})
    const [setMensaje] = useState({})


    useEffect(() => {
        const consultarUsuarioYReportes = async () => {
            try {
                const token = localStorage.getItem('token');
                const id = localStorage.getItem('_id');
                if (!token || !id) {
                    setMensaje({ respuesta: 'Token o ID no encontrado', tipo: false });
                    return;
                }

                // Consultar información del usuario
                const urlUsuario = `${import.meta.env.VITE_BACKEND_URL}/user/${id}`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                };
                const respuestaUsuario = await axios.get(urlUsuario, options);
                if (respuestaUsuario.data && respuestaUsuario.data.msg) {
                    setUsuario(respuestaUsuario.data.msg);
                } else {
                    throw new Error('La respuesta no contiene los datos esperados del usuario');
                }

                // Consultar todos los reportes
                const urlReportes = `${import.meta.env.VITE_BACKEND_URL}/reportes`;
                const respuestaReportes = await axios.get(urlReportes, options);
                console.log(respuestaReportes)
                if (respuestaReportes.data && Array.isArray(respuestaReportes.data.reports)) {
                    const reportesFiltrados = respuestaReportes.data.reports.filter(reporte => reporte.usuario === id);
                    console.log(reportesFiltrados)
                    setReportes(reportesFiltrados);
                } else {
                    throw new Error('La respuesta no contiene los datos esperados de los reportes');
                }
            } catch (error) {
                console.error('Error al consultar usuario y reportes:', error);
                setMensaje({ respuesta: error.response?.data?.msg || 'Error al obtener datos', tipo: false });
            }
        };
        consultarUsuarioYReportes();
    }, [setReportes]);

    return (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <h1 className="font-black text-4xl text-green-500 mb-4">Reportes</h1>
            <hr className="my-4 border-gray-700" />
                {Object.keys(mensaje).length>0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
            <p className="mb-8 text-gray-300">Este módulo te permite visualizar los reportes registrados</p>
            <button className="px-5 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700" onClick={handleModal}>
                Registrar
            </button>
            {modal && (<ModalReporte idUser={usuario._id} />)}
            {reportes.length === 0 ? (
                <Mensaje tipo={'active'}>{'No existen registros'}</Mensaje>
            ) : (
                <TablaReportes reportes={reportes} />
            )}
        </div>
    );
}

export default Listar;
