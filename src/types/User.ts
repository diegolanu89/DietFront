// src/types/User.ts

/**
 * Representa el tipo de usuario autenticado que se almacena en localStorage
 * y se utiliza en el sistema de autenticación de la aplicación.
 */
export interface AppUser {
  /**
   * Identificador único del usuario.
   * En el caso de Firebase, suele ser el UID. En MongoDB, el _id.
   */
  id: string;

  /**
   * Nombre completo o visible del usuario.
   * Puede provenir de un campo `displayName`, `nombre` o ser derivado del email.
   */
  nombre: string;

  /**
   * Dirección de correo electrónico del usuario.
   * Utilizada tanto para autenticación como para mostrar en el perfil.
   */
  email: string;

  // 🔧 Si se necesita ampliar, pueden agregarse aquí otros campos
  // como `rol`, `foto`, `telefono`, `esAdmin`, etc.
}
