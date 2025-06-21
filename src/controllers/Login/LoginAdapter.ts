// src/services/auth/AuthAdapterFactory.ts

// Se importan los distintos proveedores de autenticación disponibles.
// Cada uno implementa la interfaz LoginInterface y encapsula su propia lógica de login.
import { LoginFirebase } from "./LoginFirebase";
import { LoginMongo } from "./LoginMongo";
import { LoginMock } from "./LoginMock";

// Interfaz que define el contrato que deben cumplir todos los adaptadores de autenticación.
// Se espera que cada clase tenga métodos como login, logout, getUser, etc.
import { LoginInterface } from "./LoginInterface";

// Tipo de usuario común en toda la aplicación, que unifica la estructura de los usuarios
// independientemente del proveedor (Firebase, Mongo, etc.).
import { AppUser } from "../../types/User";
import { LoginMongoAtlas } from "./LoginMongoAtlas";

// Se definen los posibles valores esperados desde la variable de entorno VITE_AUTH_PROVIDER.
// Esto permite limitar los casos a los únicos soportados.
type AuthProvider = "firebase" | "mongo" | "mock" | "atlas";

/**
 * 🔐 AuthAdapterFactory
 *
 * Esta clase actúa como una fábrica (Factory Pattern) que decide, en tiempo de ejecución,
 * qué implementación concreta del sistema de login debe utilizarse en la aplicación.
 *
 * La elección se realiza en base a la variable de entorno `VITE_AUTH_PROVIDER`,
 * que debe establecerse en el archivo `.env` del proyecto.
 *
 * Esto permite intercambiar fácilmente entre distintos sistemas de autenticación
 * (Firebase, MongoDB, mock para testing, etc.) sin cambiar el código de la aplicación.
 */
export class AuthAdapterFactory {
  /**
   * Retorna una instancia del adaptador de autenticación correspondiente.
   *
   * El proveedor se define mediante la variable de entorno `VITE_AUTH_PROVIDER`.
   * Si no se especifica o contiene un valor inválido, se usa por defecto el adaptador mock.
   *
   * @returns {LoginInterface<AppUser>} una instancia concreta del adaptador de autenticación.
   *
   * @example
   * // .env
   * VITE_AUTH_PROVIDER=firebase
   *
   * // En la app
   * const authAdapter = AuthAdapterFactory.getAdapter();
   * await authAdapter.login({ email: "test@example.com", password: "123456" });
   */
  static getAdapter(): LoginInterface<AppUser> {
    // Se obtiene el proveedor desde la variable de entorno y se fuerza su tipo
    const prov = import.meta.env.VITE_AUTH_PROVIDER;
    const provider =
      (import.meta.env.VITE_AUTH_PROVIDER as AuthProvider) || "mock";

    console.warn("PROVIDER SELECTED:" + prov);
    // Se retorna una nueva instancia del adaptador correspondiente
    switch (provider) {
      case "firebase":
        return new LoginFirebase();

      case "mongo":
        return new LoginMongo();

      case "atlas":
        return new LoginMongoAtlas();

      case "mock":
      default:
        // Si no se encuentra un proveedor válido, se retorna el adaptador mock por defecto
        return new LoginMock();
    }
  }
}

/**
 * ✨ authAdapter
 *
 * Esta constante representa el adaptador de login actual de la aplicación.
 * Su implementación concreta se decide en tiempo de ejecución mediante la fábrica.
 *
 * Se recomienda importar esta constante en los contextos, hooks o servicios
 * que requieran acceso a las funciones de login/logout.
 *
 * @example
 * import { authAdapter } from './services/auth';
 * const user = await authAdapter.login({ email, password });
 */
export const authAdapter = AuthAdapterFactory.getAdapter();
