import { useContext, useState } from "react";
import ReportesContext from "../../context/ReportesProvider";
import { FaMapMarkerAlt } from "react-icons/fa";
import MapComponent from "./MapComponent";

const ModalReporte = ({ idUser }) => {
  const { setModal, handleModal, registrarReportes } = useContext(ReportesContext);
  const [form, setForm] = useState({
    ubicacion: "",
    descripcion: "",
    usuario: idUser,
  });
  const [mapOpen, setMapOpen] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleMapClick = () => {
    setMapOpen(true);
  };

  const handleLocationSelect = (locationString) => {
    setForm({
      ...form,
      ubicacion: locationString,
    });
    setMapOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    registrarReportes(form);
    setModal(false);
  };

  return (
    <div className="lg:w-2/4 lg:h-3/5 bg-gray-900 bg-opacity-95 fixed top-1/4 left-1/3 rounded-lg shadow-xl p-8 z-50">
      <p className="text-green-500 uppercase font-bold text-lg text-center mb-6">Registrar Reporte</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="ubicacion" className="text-gray-300 uppercase font-bold text-sm">
            Ubicación:
          </label>
          <input
            id="ubicacion"
            type="text"
            className="border border-gray-700 w-full p-3 mt-2 bg-gray-800 text-gray-200 rounded-md"
            placeholder="Ubicación del reporte"
            name="ubicacion"
            value={form.ubicacion}
            onChange={handleChange}
          />
        </div>

        <div className="mb-5 relative">
          <p className="text-gray-400 text-sm mb-2">Selecciona la ubicación en el mapa:</p>
          <button
            type="button"
            onClick={handleMapClick}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-green-600 text-white p-3 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            title="Seleccionar ubicación en el mapa"
          >
            <FaMapMarkerAlt size={20} />
          </button>
        </div>

        <div className="mb-5">
          <label htmlFor="descripcion" className="text-gray-300 uppercase font-bold text-sm">
            Descripción:
          </label>
          <textarea
            id="descripcion"
            className="border border-gray-700 w-full p-3 mt-2 bg-gray-800 text-gray-200 rounded-md"
            placeholder="Descripción del reporte"
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
          />
        </div>

        <div className="mb-5">
          <label className="text-gray-300 uppercase font-bold text-sm">ID Usuario: </label>
          <input
            type="text"
            disabled
            value={idUser}
            className="border border-gray-700 w-full p-3 mt-2 bg-gray-700 text-gray-400 rounded-md"
            name="usuario"
          />
        </div>

        <div className="flex justify-center gap-5">
          <input
            type="submit"
            className="bg-green-600 px-6 py-3 text-white rounded-lg hover:bg-green-700 cursor-pointer transition-all"
            value="Registrar"
          />
          <button
            className="leading-3 text-white px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition-all"
            onClick={handleModal}
          >
            Cancelar
          </button>
        </div>
      </form>

      {mapOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <MapComponent onLocationSelect={handleLocationSelect} onClose={() => setMapOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalReporte;
