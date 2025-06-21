import { useState } from "react";
import { AUTH_LIMITS, LOGIN_TEXTS } from "../../config/parameters";
import { AuthValidator } from "./LoginValidators";

interface UseAuthSubmitParams {
  /**
   * Función de login que recibe email y contraseña.
   */
  login: (email: string, password: string) => Promise<void>;

  /**
   * Función de registro que recibe el usuario (email, nombre, id) y la contraseña.
   */
  register: (
    user: { email: string; nombre: string; id: string },
    password: string
  ) => Promise<void>;

  /**
   * Función que redirige a una ruta específica tras autenticación exitosa.
   */
  redirect: (path: string) => void;
}

interface SubmitParams {
  /**
   * Email ingresado por el usuario.
   */
  email: string;

  /**
   * Nombre (solo requerido en modo registro).
   */
  nombre: string;

  /**
   * Contraseña ingresada.
   */
  password: string;

  /**
   * Modo del formulario (login o registro).
   */
  isRegistering: boolean;
}

/**
 * 🔐 useAuthSubmit
 *
 * Hook personalizado que encapsula la lógica de envío del formulario de login/registro,
 * incluyendo validaciones, sanitización, control de errores y protección por cooldown.
 *
 * Funcionalidades clave:
 * - Valida y sanitiza los inputs.
 * - Maneja intentos fallidos y aplica un cooldown tras varios errores.
 * - Abstrae el manejo de `login` y `register`.
 * - Permite desacoplar la lógica del formulario de la vista.
 */
export const useAuthSubmit = ({
  login,
  register,
  redirect,
}: UseAuthSubmitParams) => {
  const [attempts, setAttempts] = useState(0); // Contador local de intentos fallidos
  const [error, setError] = useState(""); // Mensaje de error para mostrar al usuario
  const [loading, setLoading] = useState(false); // Estado de carga para el botón

  /**
   * Envia los datos del formulario y ejecuta login o registro.
   * Realiza validaciones, aplica cooldown si se excede el límite de intentos,
   * y maneja errores y redirección.
   */
  const submit = async ({
    email,
    nombre,
    password,
    isRegistering,
  }: SubmitParams) => {
    setError("");

    // 🔄 Verifica si el usuario está en cooldown
    const lastAttempt = Number(localStorage.getItem("lastAttempt") || "0");
    const now = Date.now();
    const cooldownActive =
      now - lastAttempt < AUTH_LIMITS.COOLDOWN_SECONDS * 1000;

    if (cooldownActive) {
      setError(LOGIN_TEXTS.TOO_MANY_ATTEMPTS_COOLDOWN);
      return;
    }

    // 🚫 Aplica cooldown si se superó el límite de intentos
    if (attempts >= AUTH_LIMITS.MAX_ATTEMPTS) {
      localStorage.setItem("lastAttempt", now.toString());
      setError(LOGIN_TEXTS.TOO_MANY_ATTEMPTS_COOLDOWN);
      return;
    }

    // 🧼 Sanitización
    const safeEmail = AuthValidator.sanitize(email);
    const safeNombre = AuthValidator.sanitize(nombre);
    const safePassword = AuthValidator.sanitize(password);

    // ✅ Validaciones generales
    if (
      !AuthValidator.isValidEmail(safeEmail) ||
      !AuthValidator.isValidPassword(
        safePassword,
        AUTH_LIMITS.MIN_PASSWORD_LENGTH
      )
    ) {
      setError(LOGIN_TEXTS.INVALID_CREDENTIALS);
      return;
    }

    // ✅ Validación específica para nombre en modo registro
    if (isRegistering && !AuthValidator.isValidName(safeNombre)) {
      setError(LOGIN_TEXTS.INVALID_NAME);
      return;
    }

    // 🔄 Inicio de autenticación
    setLoading(true);

    try {
      if (isRegistering) {
        await register(
          { email: safeEmail, nombre: safeNombre, id: "" },
          safePassword
        );
      } else {
        await login(safeEmail, safePassword);
      }

      // ✅ Éxito: limpia los intentos y redirige
      localStorage.removeItem("lastAttempt");
      setAttempts(0);
      redirect(LOGIN_TEXTS.REDIRECT_PATH);
    } catch (err: unknown) {
      // ❌ Fallo: suma intento y muestra mensaje genérico
      console.error("Auth error:", err);
      setError(LOGIN_TEXTS.ERROR_MESSAGE);
      setAttempts((prev) => prev + 1);
    } finally {
      setLoading(false);
    }
  };

  return {
    submit, // Función principal que se ejecuta al enviar el formulario
    error, // Mensaje de error actual
    loading, // Estado de carga actual
  };
};
