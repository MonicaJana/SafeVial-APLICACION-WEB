import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

export const CardPerfilAdministrador = () => {
    const { auth } = useContext(AuthContext);

    return (
        <div className="bg-gray-800 border border-gray-700 p-6 flex flex-col items-center justify-between shadow-lg rounded-lg">
            <div className="mb-4">
                <img 
                    src="https://cdn-icons-png.flaticon.com/512/4715/4715329.png" 
                    alt="img-client" 
                    className="rounded-full border-4 border-green-500" 
                    width={120} 
                    height={120} 
                />
            </div>
            <div className="text-gray-300 w-full mb-2">
                <b className="text-green-400">Nombre:</b>
                <p className="inline-block ml-3">{auth.name}</p>
            </div>
            <div className="text-gray-300 w-full mb-2">
                <b className="text-green-400">Apellido:</b>
                <p className="inline-block ml-3">{auth.lastname}</p>
            </div>
            <div className="text-gray-300 w-full">
                <b className="text-green-400">Email:</b>
                <p className="inline-block ml-3">{auth.email}</p>
            </div>
        </div>
    );
}
