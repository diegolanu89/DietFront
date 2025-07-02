/**
 * @file AppClient.tsx
 * @description Punto de entrada principal para la interfaz de usuario cliente.
 * Define la estructura de la aplicación, incluyendo rutas, contexto de autenticación,
 * contexto de dietas, y estilo general. Usa React Router para navegación
 * y Material UI para la interfaz visual.
 */

import "./css/appStyle.css"; // 🎨 Estilos globales

import Box from "@mui/material/Box"; // 📦 Contenedor de layout
import CssBaseline from "@mui/material/CssBaseline"; // 🧼 Normalización de estilos

import { BrowserRouter, Route, Routes } from "react-router-dom"; // 🌐 Ruteo

// Contexto de autenticación global
import { AuthProvider } from "./contexts/Login.Context";

// Definición centralizada de rutas (ej: '/', '/login', '/home', etc.)
import { PATHS } from "./config/parameters";

// Barra superior con navegación, perfil y logout
import AppBarHeader from "./components/HeaderComponents/AppBar";

// Página pública de login
import Login from "./controllers/Login/Login";

// Middleware de protección: solo permite acceso si hay un usuario autenticado
import ProtectedRoute from "./components/FuncionalComponents/ProtectedRoute";

// Redirecciona automáticamente al HOME o LOGIN según autenticación
import RedirectHome from "./components/MainComponents/RedirectHome";

// Tema oscuro personalizado (Material UI Theme)
import { styleDark } from "./contexts/Style.Context";
import { ThemeProvider } from "@mui/material/styles";

// Página 404 para rutas inexistentes
import NotFound from "./components/FuncionalComponents/NotFound";

// Contexto para manejar y compartir dietas del usuario
import { DietProvider } from "./contexts/Diet.Context";
import HomeDiet from "./controllers/Diet/HomeDietas";
import TodasLasDietas from "./controllers/Diet/TodasDietas";

/**
 * `AppClient`
 *
 * Componente principal del cliente que define:
 * - Tematización con Material UI.
 * - Contextos globales (Auth y Dietas).
 * - Enrutamiento y protección de rutas.
 * - Estructura de navegación de la aplicación.
 *
 * @component
 * @returns JSX.Element
 *
 * @example
 * ```tsx
 * <AppClient />
 * ```
 */
const AppClient = () => {
  return (
    <ThemeProvider theme={styleDark}>
      <CssBaseline />
      <AuthProvider>
        <Box>
          <BrowserRouter>
            <DietProvider>
              {" "}
              {/* ✅ Envolvemos todo el ruteo con el contexto de dietas */}
              <AppBarHeader />
              <Routes>
                <Route path="/" element={<RedirectHome />} />
                <Route path={PATHS.LOGIN} element={<Login />} />

                {/* ✅ Rutas protegidas */}
                <Route element={<ProtectedRoute />}>
                  <Route path={PATHS.HOME} element={<HomeDiet />} />
                  <Route path={PATHS.ALL_DIET} element={<TodasLasDietas />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </DietProvider>
          </BrowserRouter>
        </Box>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default AppClient;
