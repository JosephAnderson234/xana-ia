"use client";
import { useSession } from 'next-auth/react'
import { useAuthenticatedRequest } from '../hooks/useAuthenticatedRequest'
import { useState, useEffect, useCallback } from 'react'

interface UserProfile {
  id: string
  name: string
  email: string
  numero: string
}

interface Conversation {
  id: string
  title: string
  createdAt: string
  lastMessage?: string
}

export default function Dashboard() {
  const { status } = useSession()
  const { authenticatedRequest, isAuthenticated } = useAuthenticatedRequest()
  
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const loadUserData = useCallback(async () => {
    try {
      // Cargar perfil del usuario
      const profileResponse = await authenticatedRequest('/user/profile', { method: 'GET' })
      setProfile(profileResponse.data)

      // Cargar conversaciones
      const conversationsResponse = await authenticatedRequest('/conversations', { method: 'GET' })
      setConversations(conversationsResponse.data)
    } catch (error) {
      setError('Error al cargar los datos del usuario')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }, [authenticatedRequest])

  useEffect(() => {
    if (isAuthenticated) {
      loadUserData()
    }
  }, [isAuthenticated, loadUserData])

  const createNewConversation = async () => {
    try {
      const response = await authenticatedRequest('/conversations', {
        method: 'POST',
        data: {
          title: 'Nueva conversación',
          type: 'general'
        }
      })
      
      // Actualizar lista de conversaciones
      setConversations(prev => [response.data, ...prev])
    } catch (error) {
      setError('Error al crear nueva conversación')
      console.error('Error:', error)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Cargando...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-500">No autenticado</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard - Xana AI</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {profile && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Perfil</h2>
            <div className="bg-gray-50 p-4 rounded">
              <p><strong>Nombre:</strong> {profile.name}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Número:</strong> {profile.numero}</p>
            </div>
          </div>
        )}

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Conversaciones</h2>
            <button
              onClick={createNewConversation}
              className="bg-[#FF4B2B] text-white px-4 py-2 rounded hover:bg-[#ff3a1a] transition"
            >
              Nueva Conversación
            </button>
          </div>
          
          <div className="space-y-2">
            {conversations.length === 0 ? (
              <p className="text-gray-500">No hay conversaciones aún</p>
            ) : (
              conversations.map((conversation) => (
                <div key={conversation.id} className="bg-gray-50 p-4 rounded hover:bg-gray-100 transition cursor-pointer">
                  <h3 className="font-semibold">{conversation.title}</h3>
                  {conversation.lastMessage && (
                    <p className="text-gray-600 text-sm">{conversation.lastMessage}</p>
                  )}
                  <p className="text-gray-400 text-xs">
                    {new Date(conversation.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
