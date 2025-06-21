// src/theme/themes.ts
import { createTheme } from "@mui/material/styles";

/**
 * 🌙 Tema oscuro general (base Material UI)
 *
 * Define una paleta oscura con colores `primary` y `secondary` personalizados.
 * Puede usarse como tema base para aplicaciones con modo oscuro tradicional.
 *
 * Ejemplo de uso:
 * ```tsx
 * <ThemeProvider theme={styleDark}>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export const styleDark = createTheme({
  palette: {
    mode: "dark", // Habilita el modo oscuro de MUI
    primary: {
      light: "#FF8A50", // Naranja claro
      main: "#FF5722", // Naranja vibrante
      dark: "#D84315", // Naranja oscuro profundo
    },
    secondary: {
      light: "#52c7b8", // Verde agua claro
      main: "#009688", // Verde agua principal
      dark: "#00675b", // Verde agua oscuro
    },
  },
});
