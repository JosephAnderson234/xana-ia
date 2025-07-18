import { makeAuthenticatedRequest } from '../hooks/useAuthenticatedRequest'

import { UserProfile } from '@src/types/user';
import Link from 'next/link';
import { SignOutButton } from './Buttons';

const loadData = async () : Promise<UserProfile | null> => {
    try {
        const response = await makeAuthenticatedRequest('/auth/me', {
            method: 'GET',
        });
        return response.data;
    } catch (error) {
        console.error('Error loading user data:', error);
        return null;
    }
}

export default async function Dashboard() {
    const profile = await loadData();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h1 className="text-2xl font-bold mb-4">Dashboard - Xana AI</h1>


                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg mb-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-primary">Bienvenido/a</h2>
                        <Link 
                            href="/dashboard/bot" 
                            className="px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            Ir al Bot
                        </Link>
                    </div>
                </div>
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Perfil</h2>
                        <div className="bg-gray-50 p-4 rounded">
                            <p><strong>Nombre:</strong> {profile?.nombre}</p>
                            <p><strong>Número:</strong> {profile?.numero}</p>
                        </div>
                    </div>

                <div>
                    <h2 className="text-xl font-semibold mb-2">Opciones</h2>
                    <div className="space-y-4">
                        <SignOutButton />
                    </div>
                </div>
            </div>
        </div>
    )
}
