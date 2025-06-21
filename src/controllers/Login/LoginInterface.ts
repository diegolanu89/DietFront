/**
 * 🔄 LoginInterface
 *
 * Interfaz genérica que define el contrato que deben cumplir todos los adaptadores
 * de autenticación. Permite abstraer la lógica de login/logout y observar cambios
 * de sesión, independientemente del proveedor (Firebase, MongoDB, mock, etc.).
 *
 * Esta interfaz asegura consistencia en el uso del contexto de autenticación en toda la aplicación.
 *
 * @typeParam TUser - Tipo del objeto usuario que será retornado al loguear y observar sesión.
 */
export interface LoginInterface<TUser> {
  /**
   * 🔐 login
   * Inicia sesión autenticando con email y contraseña.
   *
   * @param email - Dirección de correo electrónico del usuario.
   * @param password - Contraseña del usuario.
   * @returns Una promesa que se resuelve con el usuario autenticado (tipo `TUser`).
   *
   * @example
   * const user = await adapter.login('usuario@example.com', '123456');
   */
  login(email: string, password: string): Promise<TUser>;

  /**
   * 🚪 logout
   * Cierra la sesión del usuario autenticado.
   *
   * @returns Una promesa que se resuelve una vez finalizado el cierre de sesión.
   *
   * @example
   * await adapter.logout();
   */
  logout(): Promise<void>;

  /**
   * 👁️ onAuthStateChanged
   * Observa los cambios de estado de sesión del usuario.
   *
   * @param callback - Función que se ejecuta cuando el usuario inicia o cierra sesión.
   * @returns Una función para desuscribirse del observador.
   *
   * @example
   * const unsubscribe = adapter.onAuthStateChanged((user) => {
   *   if (user) console.log('Usuario activo:', user.email);
   *   else console.log('No hay sesión');
   * });
   */
  onAuthStateChanged(callback: (user: TUser | null) => void): () => void;

  /**
   * 📝 register
   * Registra un nuevo usuario con email, contraseña y nombre visible opcional.
   *
   * @param email - Correo electrónico del nuevo usuario
   * @param password - Contraseña segura
   * @param nombre - Nombre visible (opcional)
   * @returns Promesa con el usuario registrado
   */
  register(email: string, password: string, nombre?: string): Promise<TUser>;
}
