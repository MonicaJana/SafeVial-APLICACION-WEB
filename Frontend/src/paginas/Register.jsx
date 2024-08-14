import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Mensaje from '../componets/Alertas/Mensaje';

export const Register = () => {
    const [form, setForm] = useState({
        name: "",
        lastname: "",
        telefono: "",
        email: "",
        password: ""
    });

    const [mensaje, setMensaje] = useState({});

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/user/register`;
            const respuesta = await axios.post(url, form);
            setMensaje({
                respuesta: respuesta.data.msg,
                tipo: true
            });
        } catch (error) {
            setMensaje({
                respuesta: error.response.data.msg,
                tipo: false
            });
        }
    };

    return (
        <>
            <div className="flex flex-col md:flex-row h-screen w-screen">
                <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-700 p-10">
                    <div className="w-full max-w-md">
                        {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
                        
                        <h1 className="text-4xl font-bold text-white text-center mb-6">Crea tu cuenta</h1>
                        <p className="text-gray-300 text-center mb-8">Ingresa tus datos para registrarte.</p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-300" htmlFor="nombre">Nombre:</label>
                                <input type="text" id="nombre" name="name"
                                    value={form.name || ""} onChange={handleChange}
                                    placeholder="Ingresa tu nombre" 
                                    className="w-full px-4 py-2 mt-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                    required />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-300" htmlFor="apellido">Apellido:</label>
                                <input type="text" id="apellido" name="lastname"
                                    value={form.lastname || ""} onChange={handleChange}
                                    placeholder="Ingresa tu apellido" 
                                    className="w-full px-4 py-2 mt-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                    required />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-300" htmlFor="telefono">Teléfono:</label>
                                <input type="tel" id="telefono" name="telefono"
                                    value={form.telefono || ""} onChange={handleChange}
                                    placeholder="Ingresa tu teléfono" 
                                    className="w-full px-4 py-2 mt-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                    required />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-300" htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email"
                                    value={form.email || ""} onChange={handleChange}
                                    placeholder="Ingresa tu email" 
                                    className="w-full px-4 py-2 mt-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                    required />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-300" htmlFor="password">Contraseña:</label>
                                <input type="password" id="password" name="password"
                                    value={form.password || ""} onChange={handleChange}
                                    placeholder="********************" 
                                    className="w-full px-4 py-2 mt-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                    required />
                            </div>

                            <button className="w-full py-3 mt-6 bg-green-700 rounded-lg text-white hover:bg-green-800 transition-all duration-300">Registrarse</button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-gray-400">¿Ya tienes una cuenta? <Link to="/login" className="text-green-400 hover:text-white font-semibold">Inicia sesión</Link></p>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/2">
                    <img src="/images/frevill.jpeg" alt="Imagen decorativa" className="object-cover w-full h-full" />
                </div>
            </div>
        </>
    );
};
