/**
 * 📦 Comida
 *
 * Representa una comida específica dentro de un día del plan alimenticio.
 * Incluye nombre, calorías aproximadas y el tipo (desayuno, almuerzo, etc.).
 */
export interface Comida {
  nombre: string; // Ej: "Ensalada César"
  calorias: number; // Ej: 250
  tipo: string; // Ej: "almuerzo", "desayuno", "cena"
}

/**
 * 📅 MenuDiario
 *
 * Representa el menú alimenticio de un día específico.
 * Contiene el día de la semana y una lista de comidas.
 */
export interface MenuDiario {
  dia: string; // Ej: "Lunes"
  comidas: Comida[]; // Lista de comidas para ese día
}

/**
 * 🥗 Diet
 *
 * Representa una planificación alimentaria completa.
 * Puede estar asociada o no a un usuario.
 * Incluye fechas, calorías totales y el menú de la semana.
 */
export interface Diet {
  _id: string; // ID único de la dieta (MongoDB)
  userId?: string; // ID del usuario creador (opcional si es pública)
  nombre: string; // Ej: "Dieta Hipocalórica"
  fechaInicio: Date; // Fecha en formato ISO (ej: "2025-06-01T00:00:00Z")
  fechaFin?: Date; // Fecha de fin opcional
  caloriasTotales?: number; // Calorías totales estimadas
  menuSemanal: MenuDiario[]; // Lista de menús diarios
  createdAt?: string; // Fecha de creación (opcional, generada por MongoDB)
  updatedAt?: string; // Fecha de última actualización
}
