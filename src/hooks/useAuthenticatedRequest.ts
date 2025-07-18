import axios, { AxiosRequestConfig } from 'axios'
import { getToken } from 'next-auth/jwt'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'
// Función para peticiones autenticadas
export const makeAuthenticatedRequest = async (
    url: string,
    options: AxiosRequestConfig = {}
) => {

    const cookieStore = await cookies();
    const token = await getToken({
        req: new NextRequest('http://localhost', {
            headers: {
                cookie: cookieStore.toString(),
            },
        }),
        secret: process.env.NEXTAUTH_SECRET,
    })
    if (!token) {
        throw new Error('No hay token de autenticación disponible')
    }
    const config: AxiosRequestConfig = {
        ...options,
        url,
        baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token.accessToken}`,
            'Content-Type': 'application/json',
        },
    }

    return axios(config)
}
