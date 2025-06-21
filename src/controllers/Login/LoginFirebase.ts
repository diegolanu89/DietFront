import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { LoginInterface } from "./LoginInterface";
import { AppUser } from "../../types/User";

/**
 * 🔐 LoginFirebase
 *
 * Implementación concreta del patrón Adapter que utiliza Firebase Authentication
 * para gestionar el inicio de sesión, cierre de sesión y observación del estado del usuario.
 *
 * Esta clase implementa la interfaz `LoginInterface<AppUser>`, lo cual permite
 * que sea intercambiable por otras implementaciones como Mongo o Mock.
 */
export class LoginFirebase implements LoginInterface<AppUser> {
  /**
   * 🔓 login
   * Autentica un usuario mediante Firebase Authentication con email y contraseña.
   *
   * @param email - Correo electrónico del usuario
   * @param password - Contraseña del usuario
   * @returns Un objeto `AppUser` con la información básica del usuario autenticado
   * @throws Error si las credenciales son incorrectas o si hay un problema de conexión
   *
   * @example
   * const user = await login("usuario@example.com", "123456");
   * console.log(user.nombre); // "Juan"
   */
  async login(email: string, password: string): Promise<AppUser> {
    const userCredential = await signInWithEmailAndPassword(
      getAuth(),
      email,
      password
    );
    const user = userCredential.user;

    return {
      id: user.uid,
      email: user.email || "",
      nombre: user.displayName || user.email || "",
    };
  }

  /**
   * 🚪 logout
   * Finaliza la sesión del usuario actual en Firebase.
   *
   * @returns Una promesa que se resuelve cuando la sesión se ha cerrado exitosamente
   *
   * @example
   * await logout();
   */
  logout(): Promise<void> {
    return signOut(getAuth());
  }

  /**
   * 👁️ onAuthStateChanged
   * Registra un listener para detectar cambios en el estado de autenticación del usuario.
   * Este método es clave para restaurar la sesión al refrescar la página.
   *
   * @param callback - Función que se ejecuta cuando cambia el estado de autenticación
   * @returns Función para desuscribirse del listener
   *
   * @example
   * const unsubscribe = onAuthStateChanged((user) => {
   *   if (user) {
   *     console.log("Usuario logueado:", user.email);
   *   } else {
   *     console.log("Sesión cerrada");
   *   }
   * });
   */
  onAuthStateChanged(callback: (user: AppUser | null) => void): () => void {
    return onAuthStateChanged(getAuth(), (firebaseUser) => {
      if (firebaseUser) {
        callback({
          id: firebaseUser.uid,
          email: firebaseUser.email || "",
          nombre: firebaseUser.displayName || firebaseUser.email || "",
        });
      } else {
        callback(null);
      }
    });
  }

  /**
   * 📝 register
   * Registra un nuevo usuario con email, password y nombre opcional.
   *
   * @param email - Correo electrónico
   * @param password - Contraseña
   * @param nombre - Nombre visible del usuario (opcional)
   */
  async register(
    email: string,
    password: string,
    nombre?: string
  ): Promise<AppUser> {
    const userCredential = await createUserWithEmailAndPassword(
      getAuth(),
      email,
      password
    );

    if (nombre) {
      await updateProfile(userCredential.user, { displayName: nombre });
    }

    return {
      id: userCredential.user.uid,
      email: userCredential.user.email || "",
      nombre:
        userCredential.user.displayName || userCredential.user.email || "",
    };
  }
}
