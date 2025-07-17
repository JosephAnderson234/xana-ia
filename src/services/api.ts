import axios from 'axios'
import { getSession } from 'next-auth/react'

// Crear instancia de axios
const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
    timeout: 10000,
})

// Interceptor para peticiones - añadir token automáticamente
apiClient.interceptors.request.use(
    async (config) => {
        const session = await getSession()

        if (session?.accessToken) {
            config.headers.Authorization = `Bearer ${session.accessToken}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Interceptor para respuestas - manejar errores de autenticación
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Token expirado o inválido - redirigir al login
            if (typeof window !== 'undefined') {
                window.location.href = '/auth/login'
            }
        }
        return Promise.reject(error)
    }
)

export default apiClient
