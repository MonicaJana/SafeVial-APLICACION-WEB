import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensaje';

export const Forgot = () => {
    const [mensaje, setMensaje] = useState({});
    const [mail, setMail] = useState({});

    const handleChange = (e) => {
        setMail({
            ...mail,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/user/recover-password`;
            const respuesta = await axios.post(url, mail);
            setMensaje({ respuesta: respuesta.data.msg, tipo: true });
            setMail({});
        } catch (error) {
            if (error.response && error.response.data) {
                setMensaje({ respuesta: error.response.data.msg, tipo: false });
            } else {
                setMensaje({ respuesta: 'Error inesperado. Inténtalo de nuevo más tarde.', tipo: false });
            }
        }
    };

    return (
        <>
            <div className="flex flex-col md:flex-row h-screen w-screen">
                <div className="w-full md:w-1/2 bg-gradient-to-b from-gray-900 to-gray-700 flex items-center justify-center p-10">
                    <div className="w-full max-w-md">
                        {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
                        
                        <h1 className="text-4xl font-bold text-white text-center mb-6">Olvidaste tu contraseña?</h1>
                        <p className="text-gray-300 text-center mb-8">No te preocupes, ingresa tu correo para recuperarla.</p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-300" htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email"
                                    value={mail.email || ""} onChange={handleChange}
                                    placeholder="Ingresa tu correo" 
                                    className="w-full px-4 py-2 mt-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                    required />
                            </div>

                            <button className="w-full py-3 mt-6 bg-green-700 rounded-lg text-white hover:bg-green-800 transition-all duration-300">Enviar correo</button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-gray-400">¿Ya recuerdas tu contraseña? <Link to="/login" className="text-green-400 hover:text-white font-semibold">Inicia sesión</Link></p>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/2">
                    <img src="/images/senales.png" alt="Imagen decorativa" className="object-cover w-full h-full" />
                </div>
            </div>
        </>
    );
};
