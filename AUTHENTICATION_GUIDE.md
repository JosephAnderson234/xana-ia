# Manejo de Sesiones con Tokens JWT y NextAuth

Este proyecto implementa un sistema completo de autenticación con tokens JWT usando NextAuth y axios para hacer peticiones autenticadas al backend.

## Configuración

### 1. Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con:

```bash
# URL de tu backend API
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# NextAuth secret para encriptar JWT
NEXTAUTH_SECRET=tu_secreto_super_seguro_aqui

# URL de tu aplicación
NEXTAUTH_URL=http://localhost:3000
```

### 2. Estructura del Backend

Tu backend debe tener estos endpoints:

- `POST /auth/login` - Login del usuario
- `POST /auth/register` - Registro del usuario
- `GET /user/profile` - Obtener perfil (requiere token)
- `GET /conversations` - Obtener conversaciones (requiere token)
- `POST /conversations` - Crear conversación (requiere token)

## Uso del Sistema de Autenticación

### 1. Hook para Peticiones Autenticadas

```tsx
import { useAuthenticatedRequest } from '../hooks/useAuthenticatedRequest'

function MiComponente() {
  const { authenticatedRequest, isAuthenticated } = useAuthenticatedRequest()

  const obtenerDatos = async () => {
    try {
      const response = await authenticatedRequest('/mi-endpoint', {
        method: 'GET'
      })
      console.log(response.data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div>
      {isAuthenticated ? (
        <button onClick={obtenerDatos}>Cargar Datos</button>
      ) : (
        <p>No autenticado</p>
      )}
    </div>
  )
}
```

### 2. Funciones de Servicio

```tsx
import { makeAuthenticatedRequest } from '../hooks/useAuthenticatedRequest'
import { useSession } from 'next-auth/react'

function MiComponente() {
  const { data: session } = useSession()

  const actualizarPerfil = async (datosNuevos) => {
    if (session?.accessToken) {
      try {
        const response = await makeAuthenticatedRequest(
          '/user/profile',
          {
            method: 'PUT',
            data: datosNuevos
          },
          session.accessToken
        )
        console.log('Perfil actualizado:', response.data)
      } catch (error) {
        console.error('Error:', error)
      }
    }
  }

  return (
    <button onClick={() => actualizarPerfil({ name: 'Nuevo nombre' })}>
      Actualizar Perfil
    </button>
  )
}
```

### 3. Servicio de Usuario

Ya incluido en `src/services/userService.ts`:

```tsx
import { userService } from '../services/userService'
import { useSession } from 'next-auth/react'

function MiComponente() {
  const { data: session } = useSession()

  const cargarPerfil = async () => {
    if (session?.accessToken) {
      try {
        const response = await userService.getProfile(session.accessToken)
        console.log('Perfil:', response.data)
      } catch (error) {
        console.error('Error:', error)
      }
    }
  }

  return <button onClick={cargarPerfil}>Cargar Perfil</button>
}
```

## Componentes Incluidos

### 1. AuthProvider
Envuelve la aplicación para proporcionar contexto de autenticación.

### 2. SignUpForm
Formulario de registro que conecta con el backend.

### 3. SignInForm  
Formulario de login que usa NextAuth.

### 4. Dashboard
Ejemplo de componente que usa peticiones autenticadas.

## Cómo Funciona

1. **Login/Registro**: El usuario se autentica y recibe un token JWT del backend
2. **Almacenamiento**: NextAuth almacena el token en la sesión
3. **Interceptor**: Axios automáticamente añade `Bearer {token}` a las peticiones
4. **Renovación**: Si el token expira (401), redirige al login
5. **Hooks**: Facilitan el uso de peticiones autenticadas en componentes

## Estructura de Respuesta del Backend

### Login/Register Response
```json
{
  "user": {
    "id": "123",
    "numero": "123456789",
    "email": "usuario@example.com", 
    "name": "Usuario"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Peticiones Autenticadas
Todas las peticiones incluyen:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Instalación de Dependencias

```bash
npm install axios next-auth
```

El sistema está listo para usar. Solo necesitas configurar las variables de entorno y asegurarte de que tu backend tenga los endpoints correctos.
