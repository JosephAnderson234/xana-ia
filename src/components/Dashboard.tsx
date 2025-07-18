import { makeAuthenticatedRequest } from '../hooks/useAuthenticatedRequest'

import { UserProfile } from '@src/types/user';

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



                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Perfil</h2>
                        <div className="bg-gray-50 p-4 rounded">
                            <p><strong>Nombre:</strong> {profile?.nombre}</p>
                            <p><strong>Número:</strong> {profile?.numero}</p>
                        </div>
                    </div>


            </div>
        </div>
    )
}
