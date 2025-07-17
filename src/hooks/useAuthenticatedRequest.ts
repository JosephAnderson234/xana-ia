import { useSession } from 'next-auth/react'
import { useCallback } from 'react'
import axios, { AxiosRequestConfig } from 'axios'


// Hook personalizado para peticiones autenticadas
export const useAuthenticatedRequest = () => {
    const { data: session } = useSession()

    const authenticatedRequest = useCallback(
        async (url: string, options: AxiosRequestConfig = {}) => {
            if (!session?.accessToken) {
                throw new Error('No hay token de autenticación disponible')
            }

            const config: AxiosRequestConfig = {
                ...options,
                url,
                baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
                headers: {
                    ...options.headers,
                    Authorization: `Bearer ${session.accessToken}`,
                    'Content-Type': 'application/json',
                },
            }

            return axios(config)
        },
        [session]
    )

    return { authenticatedRequest, isAuthenticated: !!session?.accessToken }
}

// Función de utilidad para peticiones autenticadas fuera de componentes
export const makeAuthenticatedRequest = async (
    url: string,
    options: AxiosRequestConfig = {},
    token: string
) => {
    const config: AxiosRequestConfig = {
        ...options,
        url,
        baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    }

    return axios(config)
}
