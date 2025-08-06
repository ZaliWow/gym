
export type ClientDetails = {
    weightKg?: number        // Peso en kilogramos
    heightCm?: number        // Altura en centímetros
    age?: number             // Edad del cliente
    gender?: 'male' | 'female' | 'other'
    birthDate?: string       // Fecha de nacimiento en formato ISO
    membershipType: 'basic' | 'premium' | 'vip'
    startDate: string        // Fecha de inicio de la membresía
    endDate?: string         // Fecha de vencimiento de la membresía
    isActive: boolean        // Estado actual del cliente
    goals?: string         // Objetivos del cliente (bajar peso, tonificar, etc.)
    injuriesOrConditions?: string // Lesiones o condiciones médicas
    trainerAssigned?: string // ID o nombre del entrenador
    notes?: string           // Comentarios adicionales
  }