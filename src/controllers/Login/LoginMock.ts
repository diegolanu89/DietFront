import { LoginInterface } from "./LoginInterface";
import { AUTH_CONFIG_MOCK } from "../../config/parameters";

/**
 * 🧪 MockUser
 *
 * Interfaz interna utilizada en el entorno simulado. Representa un usuario ficticio
 * utilizado para pruebas locales o desarrollo sin conexión a backend real.
 */
interface MockUser {
  id: string;
  email: string;
  nombre: string;
}

/**
 * 🧪 LoginMock
 *
 * Implementación de `LoginInterface<MockUser>` para simular autenticación
 * en entornos de desarrollo o testing sin conexión a una base de datos real.
 * Utiliza valores predefinidos desde `AUTH_CONFIG_MOCK`.
 *
 * Se puede utilizar como fallback o mock durante pruebas unitarias.
 */
export class LoginMock implements LoginInterface<MockUser> {
  /**
   * Usuario falso preconfigurado. Representa el usuario autenticado válido.
   */
  private fakeUser: MockUser = {
    id: AUTH_CONFIG_MOCK.ID,
    email: AUTH_CONFIG_MOCK.EMAIL,
    nombre: AUTH_CONFIG_MOCK.NAME,
  };

  /**
   * 🔐 login
   *
   * Valida las credenciales proporcionadas contra las almacenadas en `AUTH_CONFIG_MOCK`.
   * Si coinciden, simula autenticación exitosa y retorna el usuario ficticio.
   *
   * @param email - Correo electrónico ingresado.
   * @param password - Contraseña ingresada.
   * @returns Promesa con el usuario simulado.
   * @throws Error si las credenciales no coinciden.
   *
   * @example
   * const user = await authAdapter.login("demo@mock.com", "1234");
   */
  async login(email: string, password: string): Promise<MockUser> {
    if (
      email === AUTH_CONFIG_MOCK.EMAIL &&
      password === AUTH_CONFIG_MOCK.PASSWORD
    ) {
      return this.fakeUser;
    }
    throw new Error("Credenciales inválidas");
  }

  /**
   * 🚪 logout
   *
   * No realiza ninguna acción efectiva ya que no hay backend real.
   * Cumple con el contrato de la interfaz para mantener coherencia.
   *
   * @example
   * await authAdapter.logout();
   */
  async logout(): Promise<void> {
    // No se requiere acción real en entorno simulado
  }

  /**
   * 👁️ onAuthStateChanged
   *
   * Simula restauración del usuario autenticado leyendo el estado desde `localStorage`.
   * El valor se guarda bajo la clave `AUTH_CONFIG_MOCK.STORAGE_KEY`.
   *
   * @param callback - Función invocada con el usuario activo o `null`.
   * @returns Función vacía para cumplir con el patrón de suscripción.
   *
   * @example
   * authAdapter.onAuthStateChanged((user) => {
   *   if (user) console.log("Usuario mock activo");
   * });
   */
  onAuthStateChanged(callback: (user: MockUser | null) => void): () => void {
    const stored = localStorage.getItem(AUTH_CONFIG_MOCK.STORAGE_KEY);
    if (stored) {
      try {
        callback(JSON.parse(stored));
      } catch {
        callback(null);
      }
    } else {
      callback(null);
    }

    return () => {};
  }

  /**
   * 📝 register
   *
   * Simula el registro de un nuevo usuario. En este entorno ficticio,
   * siempre devuelve el `fakeUser` como si el registro hubiera sido exitoso.
   *
   * @param email - Email (ignorado en mock).
   * @param password - Contraseña (ignorada en mock).
   * @param nombre - Nombre opcional (ignorado en mock).
   * @returns Promesa con el mismo usuario simulado.
   *
   * @example
   * const nuevo = await authAdapter.register("demo@mock.com", "1234");
   */
  async register(
    email: string,
    password: string,
    nombre?: string
  ): Promise<MockUser> {
    console.log(email + password + nombre);
    // En entorno simulado, se ignoran los parámetros y se retorna el mismo usuario
    return this.fakeUser;
  }
}
