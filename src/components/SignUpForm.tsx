"use client";
import { useState } from "react"
import { registerUser } from "@src/services/userService"
import Link from "next/link";
import { signIn } from "next-auth/react";
export default function SignUpForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        const formData = new FormData(e.currentTarget)
        const userData = {
            nombre: formData.get('name') as string,
            numero: "51" + formData.get('numero') as string,
            contrasena: formData.get('contrasena') as string,
        }

        try {
            await registerUser(userData)
            await signIn('credentials', {
                numero: userData.numero,
                contrasena: userData.contrasena,
                redirect: true,
                callbackUrl: '/dashboard'
            })
        } catch (error) {
            setError('Error en el registro. Intenta nuevamente.')
            console.error('Error en registro:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form className="h-full flex flex-col justify-center items-center px-12 text-center pb-5" onSubmit={handleSubmit}>
            <div className="mb-4">
                <h1 className="text-2xl font-bold ">Crear Cuenta</h1>
                <p>Por favor, completa el siguiente formulario para crear una cuenta.</p>
            </div>


            {error && (
                <div className="text-red-500 text-sm mb-4 p-2 bg-red-100 rounded">
                    {error}
                </div>
            )}

            <input
                type="text"
                name="name"
                placeholder="Nombre completo"
                className="mb-2 p-2 w-full bg-gray-100 rounded outline-none"
                required
            />
            <input
                type="text"
                name="numero"
                placeholder="Número de teléfono"
                className="mb-2 p-2 w-full bg-gray-100 rounded outline-none"
                required
            />
            <input
                type="password"
                name="contrasena"
                placeholder="Contraseña"
                className="mb-4 p-2 w-full bg-gray-100 rounded outline-none"
                required
            />

            <button
                type="submit"
                disabled={isLoading}
                className="bg-primary text-white px-8 py-2 uppercase text-sm rounded-full hover:cursor-pointer transition-colors disabled:opacity-50"
            >
                {isLoading ? 'Registrando...' : 'Registrarse'}
            </button>
            <Link href="/auth/login" className="text-sm text-secondary mb-4 font-bold">¿Ya tienes una cuenta? Inicia sesión aquí</Link>
        </form>
    )
}
