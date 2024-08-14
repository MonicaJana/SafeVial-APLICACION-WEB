import semafaro from '../assets/semafaro2.jpeg';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Mensaje from '../componets/Alertas/Mensaje';

const Restablecer = () => {
    const { token } = useParams();
    const [mensaje, setMensaje] = useState({});
    const [tokenback, setTokenBack] = useState(false);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        password: "",
        confirmpassword: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/user/new-password/${token}`;
            const respuesta = await axios.post(url, form);
            setForm({});
            setMensaje({ respuesta: respuesta.data.msg, tipo: true });
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false });
        }
    };

    const verifyToken = async () => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/user/recover-password/${token}`;
            const respuesta = await axios.get(url);
            setTokenBack(true);
            setMensaje({ respuesta: respuesta.data.msg, tipo: true });
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false });
        }
    };

    useEffect(() => {
        verifyToken();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white text-gray-800">
            {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
            <h1 className="text-3xl font-semibold mb-4 text-center uppercase text-green-500">Bienvenido de nuevo</h1>
            <small className="text-gray-600 block mb-6 text-sm">Por favor, ingresa tus datos</small>
            <img className="object-cover h-80 w-80 rounded-full border-4 border-solid border-green-600 mb-6" src={semafaro} alt="Descripción de la imagen" />
            {tokenback &&
                <form className='w-full max-w-md bg-gray-100 p-6 rounded-lg shadow-lg' onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">Nueva contraseña</label>
                        <input
                            type="password"
                            placeholder="Introduce tu nueva contraseña"
                            className="block w-full rounded-md border border-gray-300 bg-white text-gray-700 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 py-2 px-3"
                            value={form.password}
                            name='password'
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">Confirmar contraseña</label>
                        <input
                            type="password"
                            placeholder="Repite tu nueva contraseña"
                            className="block w-full rounded-md border border-gray-300 bg-white text-gray-700 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 py-2 px-3"
                            value={form.confirmpassword}
                            name='confirmpassword'
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="bg-green-600 text-white border py-2 w-full rounded-xl hover:bg-green-700 transition-colors duration-300"
                        >
                            Enviar
                        </button>
                    </div>
                </form>
            }
        </div>
    );
};

export default Restablecer;
