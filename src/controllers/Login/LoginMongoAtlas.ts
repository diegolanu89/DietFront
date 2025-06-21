import { AppUser } from "../../types/User";
import { LoginInterface } from "./LoginInterface";
import { AUTH_CONFIG_ATLAS } from "../../config/parameters";

/**
 * ☁️ LoginMongoAtlas
 *
 * Adaptador de autenticación que implementa `LoginInterface<AppUser>`, diseñado para interactuar
 * con una API REST alojada en la nube con MongoDB Atlas como backend.
 *
 * Permite realizar login, logout, registrar nuevos usuarios y restaurar sesiones en el cliente.
 * No realiza verificación activa con el servidor al cargar el estado inicial, sino que utiliza `localStorage`.
 */
export class LoginMongoAtlas implements LoginInterface<AppUser> {
  /**
   * 🔐 login
   *
   * Realiza autenticación contra el backend remoto usando correo y contraseña.
   * En caso de éxito, devuelve un objeto `AppUser`.
   *
   * @param email - Correo electrónico del usuario.
   * @param password - Contraseña asociada.
   * @returns Promesa con el usuario autenticado.
   * @throws Si las credenciales son inválidas o hay un error en la conexión.
   *
   * @example
   * const user = await authAdapter.login("email@ejemplo.com", "123456");
   */
  async login(email: string, password: string): Promise<AppUser> {
    const res = await fetch(`${AUTH_CONFIG_ATLAS.API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

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
   * Notifica al backend para cerrar la sesión del usuario autenticado.
   *
   * @returns Una promesa que se resuelve cuando finaliza la solicitud.
   *
   * @example
   * await authAdapter.logout();
   */
  async logout(): Promise<void> {
    await fetch(`${AUTH_CONFIG_ATLAS.API_URL}/logout`, {
      method: "POST",
    });
  }

  /**
   * 👁️ onAuthStateChanged
   *
   * Simula la observación del estado de autenticación leyendo el usuario desde `localStorage`.
   * No se conecta con el servidor. Útil para restaurar sesión tras recarga.
   *
   * @param callback - Función que se ejecuta con el usuario activo (`AppUser`) o `null`.
   * @returns Función de limpieza vacía (para cumplir la interfaz).
   *
   * @example
   * authAdapter.onAuthStateChanged((user) => {
   *   if (user) console.log("Sesión activa");
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
   * Registra un nuevo usuario en la base de datos alojada en MongoDB Atlas mediante
   * una solicitud POST al endpoint `/register`.
   *
   * @param email - Correo electrónico del nuevo usuario.
   * @param password - Contraseña del nuevo usuario.
   * @param nombre - (Opcional) Nombre visible del usuario.
   * @returns Promesa con el usuario recién registrado.
   * @throws Si el registro falla por email en uso o error de red.
   *
   * @example
   * const nuevo = await authAdapter.register("nuevo@ejemplo.com", "clave123", "Leonella");
   */
  async register(
    email: string,
    password: string,
    nombre?: string
  ): Promise<AppUser> {
    const res = await fetch(`${AUTH_CONFIG_ATLAS.API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, nombre }),
    });

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
