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

// Funciones de ejemplo para peticiones autenticadas
export const userService = {
    // Obtener perfil del usuario
    getProfile: (token: string) =>
        makeAuthenticatedRequest('/user/profile', { method: 'GET' }, token),

    // Actualizar perfil
    updateProfile: (profileData: any, token: string) =>
        makeAuthenticatedRequest('/user/profile', {
            method: 'PUT',
            data: profileData
        }, token),
}
