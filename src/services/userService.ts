import { makeAuthenticatedRequest } from '../hooks/useAuthenticatedRequest'

// Función para registrar usuario
export const registerUser = async (userData: {
    numero: string
    nombre: string
    contrasena: string
}) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })

        if (!response.ok) {
            throw new Error('Error en el registro')
        }

        return await response.json()
    } catch (error) {
        console.error('Error en registro:', error)
        throw error
    }
}