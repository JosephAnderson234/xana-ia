"use client";
import Link from "next/link";
export default function Home() {

	const handleOpenWhatsappChat = () =>{
		const phoneNumber = "51923441744"; // Reemplaza con el número de teléfono deseado
		const message = "¡Hola! Xana IA.";
		const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
		window.open(whatsappUrl, "_blank");
	}

	return (
		<div className="min-h-screen bg-[#ece9e2] text-[#1d2a3d]">
			<nav className="p-4 flex justify-between items-center">
				<h1 className="text-2xl font-bold text-[#2e7b85]">Xana IA</h1>
				<div className="space-x-4">
					<Link href="/auth/login" className="px-4 py-2 bg-[#2e7b85] text-white rounded-lg hover:opacity-90">
						Iniciar Sesión
					</Link>
					<Link href="/auth/register" className="px-4 py-2 bg-[#f48b54] text-white rounded-lg hover:opacity-90">
						Registrarse
					</Link>
				</div>
			</nav>

			<main className="container mx-auto px-4 py-16 text-center">
				<h2 className="text-4xl font-bold mb-6">
					Bienvenido a tu Asistente de Bienestar Emocional
				</h2>
				<p className="text-xl mb-8 max-w-2xl mx-auto">
					Xana IA está aquí para acompañarte en tu camino hacia el bienestar emocional. 
					Una compañera virtual que te escucha y apoya 24/7.
				</p>
				<button className="px-8 py-3 bg-[#2e7b85] text-white rounded-lg text-lg hover:opacity-90" onClick={handleOpenWhatsappChat}>
					Comienza tu viaje
				</button>
			</main>
		</div>
	);
}