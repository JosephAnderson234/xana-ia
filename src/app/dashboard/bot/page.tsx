"use client";
import { useSession } from "next-auth/react";
export default function Page() {

    const { data: session, status } = useSession();

    const handleClick = () => {
        const phoneNumber = "51923441744"; // Reemplaza con el número de teléfono deseado
        const message = `${session?.accessToken}`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
    }
    const handleBack = () => {
        window.history.back();
    }
    if (status === "loading") return <p>Cargando...</p>

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background p-8">
            <div className="ml-4 mb-4 w-full max-w-2xl">
                <button className="bg-primary text-white px-4 py-2 rounded self-start hover:cursor-pointer" onClick={handleBack}> Volver</button>
            </div>
            <h1 className="text-4xl font-bold text-primary mb-8">¿Quieres comenzar el servicio?</h1>


            <div className="text-center space-y-6">
                <p className="text-xl text-secondary">¡Estás a un paso de iniciar tu experiencia con nuestro bot!</p>
                <p className="text-gray-600">Conectaremos tu WhatsApp para una mejor comunicación</p>
                <button
                    onClick={handleClick}
                    className="bg-primary hover:bg-primary/80 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Iniciar flujo de WhatsApp
                </button>
            </div>
        </div>
    );
}