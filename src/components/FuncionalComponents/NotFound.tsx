import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

/**
 * ❌ `NotFound`
 *
 * Componente de presentación que representa una página de error 404
 * para rutas no definidas en la aplicación. Es utilizado como fallback
 * cuando el usuario intenta acceder a una ruta inexistente.
 *
 * Este componente está diseñado para integrarse con `react-router-dom`
 * y proporciona un botón que redirige al usuario a la ruta principal (`/`).
 *
 * El estilo está adaptado para ocupar toda la pantalla, centrando el contenido
 * tanto vertical como horizontalmente, y presentando el código de error con claridad.
 *
 * ---
 *
 * ### 🔧 Props
 * Este componente **no recibe props**.
 *
 * ---
 *
 * ### 🚦 Comportamiento
 * - Muestra el código de error "404".
 * - Informa que la página no fue encontrada.
 * - Proporciona un botón para volver a la ruta raíz (`/`).
 * - Utiliza `useNavigate()` de `react-router-dom` para la navegación programática.
 *
 * ---
 *
 * ### 📌 Ejemplo de uso
 *
 * En el componente principal de tu aplicación:
 *
 * ```tsx
 * import NotFound from "./components/NotFound";
 *
 * <Routes>
 *   <Route path="/" element={<Home />} />
 *   <Route path="/login" element={<Login />} />
 *   <Route path="*" element={<NotFound />} />
 * </Routes>
 * ```
 *
 * ---
 *
 * @returns {JSX.Element} Página 404 amigable para el usuario final.
 */
const NotFound = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 2,
      }}
    >
      <Typography variant="h2" color="error" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Página no encontrada
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        La ruta que estás buscando no existe.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/")}>
        Volver al inicio
      </Button>
    </Box>
  );
};

export default NotFound;
