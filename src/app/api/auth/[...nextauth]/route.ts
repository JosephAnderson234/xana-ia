
import NextAuth, { NextAuthOptions, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { JWT } from "next-auth/jwt"
import { Session } from "next-auth"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                numero: { label: "Número", type: "text" },
                contrasena: { label: "Contraseña", type: "password" },
            },
            async authorize(credentials) {
                try {
                    // Aquí harías la petición real a tu backend
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            numero: credentials?.numero,
                            contrasena: credentials?.contrasena,
                        }),
                    })
                    if (!response.ok) {
                        throw new Error('Error en la autenticación')
                    }
                    const data = await response.json()
                    const token = data.token
                    // Segundo paso: usar token para obtener información del usuario
                    const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!userResponse.ok) return null;

                    const user = await userResponse.json();

                    return {
                        id: user.id,
                        numero: user.numero,
                        nombre: user.nombre,
                        accessToken: token,
                    };
                } catch (error) {
                    console.error('Error en autenticación:', error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: User }) {
            // Persiste el token de acceso cuando el usuario se loguea
            if (user) {
                token.accessToken = user.accessToken
            }
            return token
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            // Envía propiedades al cliente
            session.accessToken = token.accessToken as string
            return session
        },
    },
    pages: {
        signIn: "/auth/login",
        newUser: "/auth/register",
    },
    session: {
        strategy: "jwt",
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }