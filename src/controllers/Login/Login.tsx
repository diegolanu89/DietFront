// src/components/Login/Login.tsx

import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  Paper,
  useTheme,
  useMediaQuery,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useAuth } from "../../contexts/Login.Context";
import { useNavigate } from "react-router-dom";
import { LOGIN_TEXTS, LOGIN_STYLES } from "../../config/parameters";
import { useAuthSubmit } from "./HandlerSubmit";

/**
 * 🧩 Login
 *
 * Componente visual de autenticación que permite a los usuarios:
 * - Iniciar sesión si ya están registrados.
 * - Registrarse si no poseen cuenta.
 *
 * Este componente desacopla la lógica de validación y autenticación mediante el uso
 * de un hook personalizado (`useAuthSubmit`), y aplica medidas básicas de seguridad como:
 * - Sanitización de inputs para prevenir XSS
 * - Validaciones de email, contraseña y nombre
 * - Control de intentos fallidos
 * - Advertencia si no se usa HTTPS en producción
 */
const Login = () => {
  // 🔐 Acciones de login y registro proporcionadas por el contexto
  const { login, register } = useAuth();

  // 🧭 Permite redirigir a otras rutas después de autenticar
  const navigate = useNavigate();

  // 🎨 Responsividad: detecta si el dispositivo es móvil
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // 📦 Estados del formulario
  const [email, setEmail] = useState(""); // Email del usuario
  const [nombre, setNombre] = useState(""); // Nombre del usuario (solo en registro)
  const [password, setPassword] = useState(""); // Contraseña
  const [isRegistering, setIsRegistering] = useState(
    localStorage.getItem("loginMode") === "register"
  ); // Estado para alternar entre login y registro

  // 🔁 Hook con la lógica de autenticación centralizada
  const { submit, error, loading } = useAuthSubmit({
    login,
    register,
    redirect: (path) => navigate(path),
  });

  /**
   * 📤 handleSubmit
   *
   * Llama a la función `submit` del hook con los datos del formulario.
   * Se previene el comportamiento por defecto del formulario.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit({ email, nombre, password, isRegistering });
  };

  /**
   * 🔄 toggleMode
   *
   * Alterna entre los modos de login y registro.
   * Guarda el modo actual en `localStorage` para mantener la persistencia.
   */
  const toggleMode = () => {
    setIsRegistering((prev) => {
      const next = !prev;
      localStorage.setItem("loginMode", next ? "register" : "login");
      return next;
    });
  };

  /**
   * ⚠️ HTTPS Warning (solo en producción)
   *
   * Si se detecta que la app se ejecuta en producción sin HTTPS,
   * se muestra una advertencia y se impide el uso de la app.
   */
  if (
    process.env.NODE_ENV === "production" &&
    window.location.protocol !== "https:"
  ) {
    return (
      <Alert severity="warning">
        Esta aplicación requiere conexión segura (HTTPS) para funcionar
        correctamente.
      </Alert>
    );
  }

  /**
   * 🧱 Interfaz de usuario (UI)
   *
   * Construida con Material UI, incluye:
   * - Campos de texto para email, nombre y contraseña
   * - Alternador entre login y registro
   * - Mensaje de error
   * - Botón de envío
   */
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      px={2}
      bgcolor={LOGIN_STYLES.BACKGROUND_COLOR}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: LOGIN_STYLES.MAX_WIDTH,
          p: isMobile
            ? LOGIN_STYLES.PADDING_MOBILE
            : LOGIN_STYLES.PADDING_DESKTOP,
          borderRadius: LOGIN_STYLES.BORDER_RADIUS,
        }}
      >
        {/* 🏷️ Título según el modo */}
        <Typography variant="h5" align="center" gutterBottom>
          {isRegistering ? LOGIN_TEXTS.REGISTER_TITLE : LOGIN_TEXTS.TITLE}
        </Typography>

        {/* 📋 Formulario principal */}
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label={LOGIN_TEXTS.EMAIL_LABEL}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />

          {/* Solo en modo registro se solicita nombre */}
          {isRegistering && (
            <TextField
              label={LOGIN_TEXTS.NAME_LABEL}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
          )}

          <TextField
            label={LOGIN_TEXTS.PASSWORD_LABEL}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />

          {/* Mensaje de error si existe */}
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          {/* Switch de alternancia entre login y registro */}
          <FormControlLabel
            control={<Switch checked={isRegistering} onChange={toggleMode} />}
            label={LOGIN_TEXTS.TOGGLE_LABEL}
            sx={{ mt: 2 }}
          />

          {/* Botón de envío del formulario */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading
              ? LOGIN_TEXTS.LOADING_TEXT
              : isRegistering
                ? LOGIN_TEXTS.REGISTER_BUTTON
                : LOGIN_TEXTS.BUTTON_TEXT}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
