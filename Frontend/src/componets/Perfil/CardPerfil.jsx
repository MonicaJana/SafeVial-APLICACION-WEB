import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

export const CardPerfil = () => {
    const { auth } = useContext(AuthContext);
    
    return (
        <div className="bg-gray-800 border border-gray-700 p-6 max-w-md mx-auto rounded-lg shadow-lg">
            <div className="flex flex-col items-center mb-6">
                <img 
                    src="https://cdn-icons-png.flaticon.com/512/4715/4715329.png" 
                    alt="Profile" 
                    className="w-32 h-32 rounded-full border-4 border-green-500" 
                />
                <p className="text-lg font-semibold text-white mt-4">{auth.name} {auth.lastname}</p>
            </div>
            <div className="text-gray-300">
                <div className="flex items-center mb-3">
                    <b className="text-gray-400 mr-2">Teléfono:</b>
                    <p>{auth.telefono}</p>
                </div>
                <div className="flex items-center">
                    <b className="text-gray-400 mr-2">Email:</b>
                    <p>{auth.email}</p>
                </div>
            </div>
        </div>
    );
}
