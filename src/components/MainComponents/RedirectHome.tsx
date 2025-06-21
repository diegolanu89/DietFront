// src/components/navigation/RedirectHome.tsx

import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/Login.Context";
import { PATHS } from "../../config/parameters";
import { Navigate } from "react-router-dom";

/**
 * Componente que redirige automáticamente al usuario según su estado de autenticación.
 *
 * - Si el usuario está autenticado, lo redirige a `PATHS.HOME`.
 * - Si no está autenticado, lo redirige a `PATHS.LOGIN`.
 *
 * Se utiliza un pequeño retraso (100ms) con `setTimeout` para permitir que el estado de autenticación
 * se resuelva adecuadamente antes de realizar la redirección. Esto previene redirecciones incorrectas
 * mientras se inicializa el contexto de autenticación.
 *
 * 📌 Ejemplo de uso:
 * ```tsx
 * <Route path="*" element={<RedirectHome />} />
 * ```
 */
const RedirectHome = () => {
  const { user } = useAuth();
  const [checkingAuth, setCheckingAuth] = useState(true); // Estado inicial de verificación

  useEffect(() => {
    const timer = setTimeout(() => {
      setCheckingAuth(false); // Finaliza la verificación luego de 100ms
    }, 100);

    return () => clearTimeout(timer); // Limpieza del timer
  }, []);

  // Mientras se verifica la autenticación, no se muestra nada
  if (checkingAuth) return null;

  // Redirecciona según si hay usuario autenticado o no
  return user ? (
    <Navigate to={PATHS.HOME} replace />
  ) : (
    <Navigate to={PATHS.LOGIN} replace />
  );
};

export default RedirectHome;
