// Importa los estilos generales de la aplicación
import "./css/appStyle.css";

// Importa el componente Box de MUI para el layout
import Box from "@mui/material/Box";

// Importa los componentes necesarios para el enrutamiento
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Proveedor de contexto de autenticación para compartir el estado de login globalmente
import { AuthProvider } from "./contexts/Login.Context";

// Importa las rutas predefinidas (como `/`, `/login`, etc.) desde una constante centralizada
import { PATHS } from "./config/parameters";

// Barra superior de la aplicación con botón de perfil, título y logout
import AppBarHeader from "./components/HeaderComponents/AppBar";

// Página de inicio de sesión
import Login from "./controllers/Login/Login";

// Componente que protege las rutas que requieren autenticación (redirige si no hay usuario)
import ProtectedRoute from "./components/FuncionalComponents/ProtectedRoute";

// Componente que redirige automáticamente a HOME o LOGIN según el estado del usuario
import RedirectHome from "./components/MainComponents/RedirectHome";
import { styleDark } from "./contexts/Style.Context";
import { ThemeProvider } from "@mui/material/styles";

// Normaliza estilos
import CssBaseline from "@mui/material/CssBaseline";
//DERIVA A UNA PAGINA INEXISTENTE
import NotFound from "./components/FuncionalComponents/NotFound";

/**
 * Componente principal de la aplicación para clientes.
 * Encapsula el enrutamiento, la autenticación y la estructura visual.
 */
const AppClient = () => {
  return (
    <>
      <ThemeProvider theme={styleDark}>
        <CssBaseline />
        {/* Proveedor global de autenticación para toda la aplicación */}
        <AuthProvider>
          {/* Contenedor principal de MUI que envuelve todo el contenido */}
          <Box>
            {/* Router para manejo de rutas en el navegador */}
            <BrowserRouter>
              {/* Barra de navegación superior persistente */}
              <AppBarHeader />

              {/* Definición de las rutas de la app */}
              <Routes>
                {/* Ruta raíz: redirige al home o login según el usuario esté autenticado */}
                <Route path="/" element={<RedirectHome />} />

                {/* Ruta pública para iniciar sesión */}
                <Route path={PATHS.LOGIN} element={<Login />} />

                {/* Rutas protegidas: solo accesibles si el usuario está logueado */}
                <Route element={<ProtectedRoute />}>
                  {/* Ruta al HOME real (contenido principal) */}
                  <Route path={PATHS.HOME} element={<div>HOLA</div>} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </Box>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
};

export default AppClient;
