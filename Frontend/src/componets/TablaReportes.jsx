import { MdDeleteForever } from "react-icons/md";
import { useContext } from "react";
import ReportesContext from "../context/ReportesProvider";

const TablaReportes = ({ reportes }) => {
    const { handleDelete } = useContext(ReportesContext);

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

    return (
        <table className='w-full mt-5 table-auto shadow-lg bg-gray-800 text-slate-200'>
            <thead className='bg-gray-900'>
                <tr>
                    <th className='p-3 text-left'>N°</th>
                    <th className='p-3 text-left'>Ubicación</th>
                    <th className='p-3 text-left'>Descripción</th>
                    <th className='p-3 text-left'>Situación</th>
                    <th className='p-3 text-center'>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {reportes.slice().reverse().map((reporte, index) => (
                    <tr className="border-b border-gray-700 hover:bg-gray-700" key={reporte._id}>
                        <td className='p-3'>{index + 1}</td>
                        <td className='p-3'>{reporte.ubicacion}</td>
                        <td className='p-3'>{reporte.descripcion}</td>
                        <td className='p-3'>
                            <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${getSituacionColor(reporte.situacion)}`}>
                                {reporte.situacion}
                            </span>
                        </td>
                        <td className='py-2 text-center'>
                            <MdDeleteForever 
                                className="h-7 w-7 text-red-400 cursor-pointer inline-block hover:text-red-300"  
                                onClick={() => handleDelete(reporte._id)}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TablaReportes;
