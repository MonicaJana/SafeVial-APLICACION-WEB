import TablaReportesQuito from '../componets/TablaReportesQuito';
import Mensaje from '../componets/Alertas/Mensaje';
import ReportesContext from '../context/ReportesProvider';
import React, { useContext,useState} from 'react';

const Crear = () => {
    const {mensaje} = useContext(ReportesContext)
    const [setMensaje] = useState({})
    return (
        <> 
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
                <h1 className="font-black text-4xl text-green-500 mb-4">Reportes de Quito</h1>
                <hr className="my-4 border-gray-700" />
                  {Object.keys(mensaje).length>0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
                <p className="mb-8 text-gray-300">Este módulo te permite visualizar los reportes registrados</p>
                <TablaReportesQuito/>
            </div>   
        </>   
    );
}

export default Crear;
