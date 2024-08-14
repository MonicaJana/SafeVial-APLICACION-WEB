import axios from 'axios';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Mensaje from '../componets/Alertas/Mensaje';
import AuthProvider from '../context/AuthProvider';

const Login = () => {
    const { setAuth, setEstado } = useContext(AuthProvider);
    const navigate = useNavigate();
    const [form, setForm] = useState({
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
        const url = form.password.includes("admin")
            ? `${import.meta.env.VITE_BACKEND_URL}/admin/login`
            : `${import.meta.env.VITE_BACKEND_URL}/user/login`;
        try {
            const respuesta = await axios.post(url, form);
            localStorage.setItem('token', respuesta.data.token);
            localStorage.setItem('_id', respuesta.data._id);
            setAuth(respuesta.data);
            navigate('/dashboard');
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false });
            setForm({});
            setTimeout(() => {
                setMensaje({});
            }, 3000);
        }
    };

    return (
        <>
            <div className="flex flex-col md:flex-row h-screen w-screen">
                <div className="w-full md:w-1/2 bg-gradient-to-b from-gray-900 to-gray-700 flex items-center justify-center p-10">
                    <div className="w-full max-w-md">
                        {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
                        
                        <h1 className="text-4xl font-bold text-white text-center mb-6">Bienvenido!</h1>
                        <p className="text-gray-300 text-center mb-8">Ingresa tus datos para iniciar sesión.</p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-300" htmlFor="email">Correo:</label>
                                <input type="email" id="email" name="email"
                                    value={form.email || ""} onChange={handleChange}
                                    placeholder="Ingresa tu correo" 
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

                            <button className="w-full py-3 mt-6 bg-green-700 rounded-lg text-white hover:bg-green-800 transition-all duration-300">Iniciar sesión</button>
                        </form>

                        <div className="mt-5 text-xs border-b-2 py-4">
                            <Link to="/forgot/id" className="underline text-sm" style={{ color: '#2F855A' }}>Olvidaste tu contraseña?</Link>
                        </div>

                        <div className="mt-3 text-sm flex justify-between items-center" style={{ color: '#2F855A' }}>
                            <p>No tienes cuenta?</p>
                            <Link to="/register" className="py-2 px-5 bg-green-700 text-slate-300 border rounded-xl hover:scale-110 transition-all duration-300 hover:bg-gray-900 hover:text-white">Registrar</Link>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/2">
                    <img src="/images/transito.jfif" alt="Imagen decorativa" className="object-cover w-full h-full" />
                </div>
            </div>
        </>
    );
};

export default Login;
