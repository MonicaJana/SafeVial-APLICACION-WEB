import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthProvider'; // Cambiado a AuthContext para usar useContext correctamente
import logo from '../assets/logo.jpeg';
import portada from '../assets/portada.jpeg';

const Dashboard = () => {
    const location = useLocation();
    const urlActual = location.pathname;

    const { auth } = useContext(AuthContext); // Cambiado AuthProvider por AuthContext para usar useContext correctamente

    const autenticado = localStorage.getItem('token');

    return (
        <div className='md:flex md:min-h-screen'>

            <div className='md:w-1/5 bg-[#1C5739] px-5 py-4'>
                <h2 className='text-4xl font-black text-center text-slate-200'>REPORTES VIALES</h2>

                <div className="flex flex-col items-center mt-8">
                    <img src={portada} alt="img-client" className="w-32 h-32 p-1 border-2 border-slate-500 rounded-full" />
                    <p className='text-slate-400 text-center my-4 text-sm'>
                        <span className='bg-green-600 w-3 h-3 inline-block rounded-full mr-2'></span>Bienvenido - {auth?.name}
                    </p>
                </div>
                <p className='text-slate-400 text-center my-4 text-sm'> Rol - {auth?.rol}</p>
                <hr className="mt-5 border-slate-500" />

                <ul className="mt-5">
                    <li className="text-center">
                        <Link 
                            to='/dashboard' 
                            className={`${urlActual === '/dashboard' ? 'text-slate-200 bg-gray-900' : 'text-slate-400 hover:bg-gray-700'} text-xl block mt-2 px-3 py-2 rounded-md`}>
                            Perfil
                        </Link>
                    </li>

                    <li className="text-center">
                        <Link 
                            to='/dashboard/listar' 
                            className={`${urlActual === '/dashboard/listar' ? 'text-slate-200 bg-gray-900' : 'text-slate-400 hover:bg-gray-700'} text-xl block mt-2 px-3 py-2 rounded-md`}>
                            Mis reportes
                        </Link>
                    </li>

                    <li className="text-center">
                        <Link 
                            to='/dashboard/crear' 
                            className={`${urlActual === '/dashboard/crear' ? 'text-slate-200 bg-gray-900' : 'text-slate-400 hover:bg-gray-700'} text-xl block mt-2 px-3 py-2 rounded-md`}>
                            Reportes
                        </Link>
                    </li>
                </ul>
            </div>

            <div className='flex-1 flex flex-col justify-between h-screen bg-gray-100'>
                <div className='bg-[#1C5739] py-2 flex justify-end items-center gap-5 px-5'>
                    <div className='text-md font-semibold text-slate-100'>
                        Bienvenido - {auth?.name}
                    </div>
                    <div>
                        <img src={logo} alt="img-client" className="w-12 h-12 border-2 border-green-600 rounded-full" />
                    </div>
                    <div>
                        <Link 
                            to='/' 
                            className="bg-red-800 hover:bg-red-900 text-white text-md block px-4 py-1 rounded-lg transition-colors duration-300" 
                            onClick={() => {
                                localStorage.removeItem('token');
                                localStorage.removeItem('_id');
                            }}>
                            Salir
                        </Link>
                    </div>
                </div>

                <div className='overflow-y-scroll p-8'>
                    {autenticado ? <Outlet /> : <Navigate to="/login" />}
                </div>

                <footer className='bg-gray-800 py-3'>
                    <p className='text-center text-slate-100 text-sm'>
                        Todos los derechos reservados &copy; {new Date().getFullYear()}
                    </p>
                </footer>
            </div>
        </div>
    );
}

export default Dashboard;
