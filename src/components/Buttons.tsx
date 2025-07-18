'use client'

import { signOut } from 'next-auth/react'

export function SignOutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: '/auth/login' })}
            className="block px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
        >
            Cerrar sesión
        </button>
    )
}
