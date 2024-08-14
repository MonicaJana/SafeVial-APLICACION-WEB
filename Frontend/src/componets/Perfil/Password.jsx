import { useState, useContext } from "react";
import Mensaje from "../Alertas/Mensaje";
import AuthContext from "../../context/AuthProvider";

const Password = () => {
    const [mensaje, setMensaje] = useState({});
    const { actualizarPassword } = useContext(AuthContext);
    const [form, setForm] = useState({
        passwordactual: "",
        passwordnuevo: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(form).includes("")) {
            setMensaje({ respuesta: "Todos los campos deben ser ingresados", tipo: false });
            setTimeout(() => {
                setMensaje({});
            }, 3000);
            return;
        }

        if (form.passwordnuevo.length < 6) {
            setMensaje({ respuesta: "El nuevo password debe tener al menos 6 caracteres", tipo: false });
            setTimeout(() => {
                setMensaje({});
            }, 3000);
            return;
        }

        const resultado = await actualizarPassword(form);
        setMensaje(resultado);
        setTimeout(() => {
            setMensaje({});
        }, 3000);
    };

    return (
        <div className="p-6 bg-gray-900 rounded-lg shadow-lg max-w-md mx-auto mt-10">
            <h1 className="text-3xl font-bold text-gray-100 mb-4">Actualizar Password</h1>
            <p className="text-gray-400 mb-6">Este módulo te permite actualizar el password del usuario.</p>
            {Object.keys(mensaje).length > 0 && (
                <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label
                        htmlFor="passwordactual"
                        className="text-gray-300 uppercase font-semibold text-sm block mb-1"
                    >
                        Password actual:
                    </label>
                    <input
                        id="passwordactual"
                        type="password"
                        className="w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-gray-200 placeholder-gray-500"
                        placeholder="**************"
                        name="passwordactual"
                        value={form.passwordactual}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="passwordnuevo"
                        className="text-gray-300 uppercase font-semibold text-sm block mb-1"
                    >
                        Nuevo password:
                    </label>
                    <input
                        id="passwordnuevo"
                        type="password"
                        className="w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-gray-200 placeholder-gray-500"
                        placeholder="**************"
                        name="passwordnuevo"
                        value={form.passwordnuevo}
                        onChange={handleChange}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-3 bg-gray-800 text-gray-200 uppercase font-bold rounded-lg hover:bg-gray-700 transition-all"
                >
                    Actualizar
                </button>
            </form>
        </div>
    );
};

export default Password;
