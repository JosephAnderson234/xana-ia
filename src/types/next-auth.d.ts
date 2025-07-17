import "next-auth"

declare module "next-auth" {
    interface Session {
        accessToken?: string
        user: {
            id: string
            numero: string
            nombre: string | null
        }
    }

    interface User {
        id: string
        numero: string
        nombre: string
        accessToken: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken: string
    }
}
