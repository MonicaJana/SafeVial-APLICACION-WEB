import semaforo from '../assets/semafaro1.jpeg';

export const Forbidden = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-8">
            <img
                className="object-cover h-60 w-60 rounded-full border-4 border-green-600 shadow-lg"
                src={semaforo}
                alt="image description"
            />
            <div className="text-center mt-8">
                <p className="text-4xl md:text-5xl lg:text-6xl text-red-400 font-bold">
                    Página no encontrada
                </p>
                <p className="md:text-lg lg:text-xl text-gray-300 mt-4">
                    Lo siento, el acceso a esta página es únicamente para el Usuario.
                </p>
            </div>
        </div>
    );
}
