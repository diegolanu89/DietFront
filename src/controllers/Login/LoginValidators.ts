/**
 * 📦 AuthValidator
 *
 * Clase utilitaria para validar y sanitizar entradas de usuario relacionadas con autenticación.
 * Provee métodos estáticos seguros y reutilizables para sanitización básica y validaciones comunes.
 */
export class AuthValidator {
  /**
   * Elimina etiquetas HTML y espacios extremos.
   * Previene ataques XSS simples mediante expresiones regulares.
   *
   * @param str - Cadena a sanitizar.
   * @returns Cadena limpia.
   */
  static sanitize(str: string): string {
    return str.replace(/<\/?[^>]+(>|$)/g, "").trim();
  }

  /**
   * Valida si un email tiene un formato básico correcto.
   *
   * @param email - Email a validar.
   * @returns `true` si es válido, `false` si no.
   */
  static isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /**
   * Valida si la contraseña tiene la longitud mínima esperada.
   *
   * @param password - Contraseña ingresada.
   * @param minLength - Longitud mínima permitida.
   * @returns `true` si es válida, `false` si no.
   */
  static isValidPassword(password: string, minLength: number): boolean {
    return password.length >= minLength;
  }

  /**
   * Verifica que el nombre contenga solo letras y espacios, y tenga una longitud razonable.
   *
   * @param name - Nombre ingresado.
   * @returns `true` si es válido, `false` si no.
   */
  static isValidName(name: string): boolean {
    return /^[a-zA-Z\s]{2,50}$/.test(name);
  }
}
