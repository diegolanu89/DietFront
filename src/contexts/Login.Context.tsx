import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { authAdapter } from "../controllers/Login/LoginAdapter";
import { AppUser } from "../types/User";
import { CircularProgress, Box } from "@mui/material";

/**
 * 📦 AuthContextType
 *
 * Define el contrato del contexto de autenticación que será usado
 * en toda la aplicación para acceder al estado de sesión y sus operaciones.
 */
interface AuthContextType {
  user: AppUser | null;

  /**
   * 🔐 login
   * Inicia sesión autenticando con email y contraseña.
   *
   * @param email - Correo electrónico del usuario.
   * @param password - Contraseña del usuario.
   */
  login: (email: string, password: string) => Promise<void>;

  /**
   * 🚪 logout
   * Cierra la sesión actual del usuario autenticado.
   */
  logout: () => Promise<void>;

  /**
   * 📝 register
   * Registra un nuevo usuario en el sistema y lo autentica automáticamente.
   *
   * @param userData - Objeto con la información del nuevo usuario.
   */
  register: (userData: AppUser, password: string) => Promise<void>;
}

// 🧠 Contexto global de autenticación
const authContext = createContext<AuthContextType | null>(null);

/**
 * 🪝 useAuth
 *
 * Hook personalizado para acceder al contexto de autenticación.
 * Lanza un error si se usa fuera de un `AuthProvider`.
 *
 * @returns El contexto de autenticación actual.
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuth debe ser utilizado dentro de un AuthProvider");
  }
  return context;
};

/**
 * 🧩 AuthProviderProps
 *
 * Define los props que recibe el componente `AuthProvider`,
 * específicamente los hijos que estarán envueltos por el proveedor.
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * 🔐 AuthProvider
 *
 * Componente de alto nivel que gestiona el estado de sesión,
 * provee las funciones de login, logout y registro,
 * y sincroniza el usuario activo a través de `localStorage` y `authAdapter`.
 *
 * Envuelve la aplicación para permitir el acceso global a la autenticación.
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * 🔐 login
   *
   * Autentica un usuario mediante el `authAdapter` y guarda sus datos en localStorage.
   */
  const login = async (email: string, password: string): Promise<void> => {
    const loggedUser = await authAdapter.login(email, password);
    localStorage.setItem("userData", JSON.stringify(loggedUser));
    setUser(loggedUser);
  };

  /**
   * 🚪 logout
   *
   * Cierra la sesión del usuario eliminando sus datos y notificando al adaptador.
   */
  const logout = async (): Promise<void> => {
    localStorage.removeItem("userData");
    setUser(null);
    await authAdapter.logout();
  };

  /**
   * 📝 register
   *
   * Registra un nuevo usuario utilizando el `authAdapter`.
   * Este método almacena el usuario en `localStorage` y actualiza el estado global.
   *
   * @param userData - Datos del usuario (sin incluir la contraseña).
   * @param password - Contraseña del nuevo usuario.
   */
  const register = async (
    userData: AppUser,
    password: string
  ): Promise<void> => {
    const newUser = await authAdapter.register(
      userData.email,
      password,
      userData.nombre
    );
    localStorage.setItem("userData", JSON.stringify(newUser));
    setUser(newUser);
  };

  /**
   * 👁️ Restauración de sesión
   *
   * Restaura la sesión al montar el proveedor consultando al backend.
   * Si hay cookie válida, se guarda el usuario activo.
   */
  useEffect(() => {
    const unsubscribe = authAdapter.onAuthStateChanged((activeUser) => {
      if (activeUser) {
        setUser(activeUser);
        localStorage.setItem("userData", JSON.stringify(activeUser));
      } else {
        localStorage.removeItem("userData");
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  /**
   * ⏳ Carga inicial
   * Muestra un spinner mientras se determina el estado de autenticación.
   */
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress
          size={60}
          thickness={5}
          sx={{
            background: "orange",
            borderRadius: "50%",
            color: "orange",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        />
      </Box>
    );
  }

  /**
   * 🌐 Proveedor del contexto de autenticación
   */
  return (
    <authContext.Provider value={{ user, login, logout, register }}>
      {children}
    </authContext.Provider>
  );
};
