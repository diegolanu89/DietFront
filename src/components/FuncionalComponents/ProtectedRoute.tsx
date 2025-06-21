// src/components/ProtectedRoute.tsx

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/Login.Context";
import { PATHS } from "../../config/parameters";

/**
 * `ProtectedRoute` es un componente de protección de rutas que verifica si el usuario está autenticado.
 * Si el usuario está autenticado, permite el acceso a la ruta anidada mediante `<Outlet />`.
 * Si no lo está, redirige automáticamente a la página de login.
 *
 * Este componente debe usarse dentro de las rutas que requieren autenticación.
 *
 * @example
 * <Route path="/dashboard" element={<ProtectedRoute />}>
 *   <Route index element={<Dashboard />} />
 * </Route>
 *
 * @returns {JSX.Element} Componente que protege las rutas según el estado de autenticación.
 */
const ProtectedRoute = (): JSX.Element => {
  const { user } = useAuth();

  // Si el usuario está autenticado, renderiza la ruta solicitada
  // Si no, redirige a la página de login
  return user ? <Outlet /> : <Navigate to={PATHS.LOGIN} replace />;
};

export default ProtectedRoute;
