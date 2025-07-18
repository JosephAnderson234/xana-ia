"use client";
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function SignInForm() {
    const router = useRouter()
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const numero = formData.get('numero') as string
        const contrasena = formData.get('contrasena') as string

        const res = await signIn('credentials', {
            numero: "51" + numero, 
            contrasena,
            redirect: true,
            callbackUrl: '/dashboard'
        })

        if (res?.ok) {
            router.push('/dashboard')
        } else {
            console.error('Error al iniciar sesión')
        }
    }

    return (
        <form className=" w-full flex flex-col justify-center items-center px-12 text-center pb-14 gap-3" onSubmit={handleSubmit}>
            <div>
                <h1 className="text-2xl font-bold mb-4">Inicia sesión en Xana AI</h1>
            </div>
            <input type="text" name="numero" placeholder="Número" className="mb-2 p-2 bg-gray-100 w-full" />
            <input type="password" name="contrasena" placeholder="Contraseña" className="mb-2 p-2 bg-gray-100 w-full" />
            <button className="bg-primary text-white px-8 py-2 uppercase text-sm rounded-full hover:cursor-pointer">Iniciar Sesión</button>

            <Link href="/auth/register" className="text-sm text-secondary mb-4 font-bold">Nuevo? crea tu cuenta aquí</Link>
        </form>
    )
}
