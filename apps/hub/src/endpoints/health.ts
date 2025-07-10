import type { PayloadRequest } from 'payload'

// Handler para verificar la salud del servidor
const healthHandler = async (req: PayloadRequest): Promise<Response> => {
  try {
    // Responder con información básica del sistema
    const response = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      services: {
        api: 'running',
        endpoint: 'generar-contexto available'
      }
    }

    return Response.json(response, { status: 200 })
  } catch (error) {
    console.error('Health check failed:', error)
    
    return Response.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 503 })
  }
}

export default healthHandler
