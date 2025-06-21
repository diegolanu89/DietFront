import { AppUser } from "../../types/User";
import { LoginInterface } from "./LoginInterface";
import { AUTH_CONFIG_MONGO } from "../../config/parameters";

/**
 * 💾 LoginMongo
 *
 * Adaptador que implementa la interfaz `LoginInterface` para conectar con un backend
 * basado en MongoDB. Permite realizar operaciones de autenticación como login, logout,
 * observación de sesión activa y registro de nuevos usuarios.
 *
 * Este adaptador sigue el patrón de diseño Adapter para ser intercambiable por otras
 * implementaciones (Firebase, Mock, etc.) sin modificar la lógica del contexto de autenticación.
 */
export class LoginMongo implements LoginInterface<AppUser> {
  /**
   * 🔐 login
   *
   * Inicia sesión enviando las credenciales al backend MongoDB.
   * Si la autenticación es exitosa, retorna un objeto `AppUser` con la información del usuario.
   *
   * @param email - Correo electrónico del usuario.
   * @param password - Contraseña correspondiente.
   * @returns Una promesa que se resuelve con el usuario autenticado (`AppUser`).
   * @throws Si las credenciales son inválidas o hay un error de red.
   *
   * @example
   * const user = await authAdapter.login("usuario@ejemplo.com", "1234");
   * console.log(user.nombre); // "Usuario Demo"
   */
  async login(email: string, password: string): Promise<AppUser> {
    const res = await fetch(
      `${AUTH_CONFIG_MONGO.BASE_URL}${AUTH_CONFIG_MONGO.LOGIN_PATH}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!res.ok) {
      throw new Error("Credenciales inválidas");
    }

    const data = await res.json();

    return {
      id: data._id,
      email: data.email,
      nombre: data.nombre,
    };
  }

  /**
   * 🚪 logout
   *
   * Finaliza la sesión del usuario autenticado enviando una solicitud POST
   * al endpoint correspondiente del backend MongoDB.
   *
   * @returns Una promesa que se resuelve una vez que el backend haya cerrado la sesión.
   *
   * @example
   * await authAdapter.logout();
   */
  async logout(): Promise<void> {
    await fetch(
      `${AUTH_CONFIG_MONGO.BASE_URL}${AUTH_CONFIG_MONGO.LOGOUT_PATH}`,
      {
        method: "POST",
      }
    );
  }

  /**
   * 👁️ onAuthStateChanged
   *
   * Simula la observación del estado de sesión leyendo desde `localStorage`.
   * Este método es útil para restaurar sesiones al recargar la aplicación,
   * aunque no mantiene una conexión activa con el backend.
   *
   * @param callback - Función que se ejecuta con el usuario activo (`AppUser`)
   *                   o `null` si no hay sesión.
   * @returns Una función vacía para cumplir con el contrato de `LoginInterface`.
   *
   * @example
   * authAdapter.onAuthStateChanged((user) => {
   *   if (user) console.log("Usuario activo:", user.email);
   * });
   */
  onAuthStateChanged(callback: (user: AppUser | null) => void): () => void {
    const stored = localStorage.getItem("userDataAdmin");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as AppUser;
        callback(parsed);
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
   * Registra un nuevo usuario en el sistema MongoDB. Envia los datos
   * al backend mediante POST y retorna el usuario recién creado.
   *
   * El nombre es opcional y puede ser gestionado por el backend
   * en caso de no ser proporcionado.
   *
   * @param email - Correo electrónico del nuevo usuario.
   * @param password - Contraseña segura para acceso.
   * @param nombre - (Opcional) Nombre visible del usuario.
   * @returns Una promesa con el usuario creado.
   * @throws Si la operación de registro falla o el email ya está en uso.
   *
   * @example
   * const nuevo = await authAdapter.register("nuevo@ejemplo.com", "abcd1234", "Leonella");
   */
  async register(
    email: string,
    password: string,
    nombre?: string
  ): Promise<AppUser> {
    const res = await fetch(
      `${AUTH_CONFIG_MONGO.BASE_URL}${AUTH_CONFIG_MONGO.REGISTER_PATH}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, nombre }),
      }
    );

    if (!res.ok) {
      throw new Error("Registro fallido");
    }

    const data = await res.json();

    return {
      id: data._id,
      email: data.email,
      nombre: data.nombre,
    };
  }
}
