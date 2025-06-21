import { useState, MouseEvent } from "react";
import {
  IconButton,
  Toolbar,
  Box,
  Menu,
  MenuItem,
  Divider,
  Avatar,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAuth } from "../../contexts/Login.Context";
import { useLocation, useNavigate } from "react-router-dom";
import { Utils } from "../../utils/Utils";
import { APPBAR_CONFIG } from "../../config/parameters";

/**
 * Componente de encabezado de la aplicación.
 * Muestra el título, botón de retroceso y menú de usuario autenticado.
 */
const AppBarHeader = () => {
  // Estado local para controlar el menú desplegable del avatar
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Contexto de autenticación
  const { user, logout } = useAuth();

  // Hook de ubicación actual (ruta)
  const location = useLocation();

  // Hook para navegación programática
  const navigate = useNavigate();

  /**
   * Cierra el menú y ejecuta el cierre de sesión del usuario.
   */
  const handleLogout = async () => {
    handleMenuClose();
    await logout();
  };

  /**
   * Abre el menú anclado al avatar del usuario.
   */
  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Cierra el menú del avatar.
   */
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  /**
   * Redirige al usuario a la página de inicio.
   */
  const handleGoHome = () => {
    navigate(APPBAR_CONFIG.ROUTES.HOME);
  };

  /**
   * Determina si debe mostrarse el botón de "Volver".
   * No se muestra en las rutas declaradas como "NO_BACK".
   */
  const shouldShowBackButton = !APPBAR_CONFIG.ROUTES.NO_BACK.includes(
    location.pathname
  );

  // Datos del usuario para mostrar en el avatar
  const displayName = user?.nombre || user?.email || "";
  const avatarColor = Utils.stringToColor(displayName);
  const avatarInitials = Utils.obtenerIniciales(displayName);

  return (
    <header>
      <Toolbar
        sx={{
          width: "100%",
          minHeight: "56px",
          position: "relative",
          zIndex: 1201,
          px: 1,
          background: APPBAR_CONFIG.COLORS.BACKGROUND,
          color: APPBAR_CONFIG.COLORS.TEXT,
        }}
      >
        {/* Botón de retroceso, solo si corresponde según la ruta actual */}
        {shouldShowBackButton && (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon />
          </IconButton>
        )}

        {/* Título principal de la aplicación */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {APPBAR_CONFIG.TITLE}
        </Typography>

        {/* Menú desplegable del usuario si está autenticado */}
        {user && (
          <Box>
            <IconButton onClick={handleMenuOpen}>
              <Avatar sx={{ bgcolor: avatarColor }}>{avatarInitials}</Avatar>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleGoHome}>
                {APPBAR_CONFIG.LABELS.HOME}
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                {APPBAR_CONFIG.LABELS.PROFILE}
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                {APPBAR_CONFIG.LABELS.LOGOUT}
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </header>
  );
};

export default AppBarHeader;
