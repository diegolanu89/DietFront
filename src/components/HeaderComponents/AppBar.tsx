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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    handleMenuClose();
    await logout();
  };

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleGoHome = () => {
    navigate(APPBAR_CONFIG.ROUTES.HOME);
  };

  const shouldShowBackButton = !APPBAR_CONFIG.ROUTES.NO_BACK.includes(
    location.pathname
  );

  const displayName = user?.nombre || user?.email || "";
  const avatarColor = Utils.stringToColor(displayName);
  const avatarInitials = Utils.obtenerIniciales(displayName);

  // 🔁 Título dinámico según ruta
  const getDynamicTitle = () => {
    switch (location.pathname) {
      case "/TodasLasDietas":
        return "Dietas públicas";
      case "/":
        return "Tus dietas";
      default:
        return APPBAR_CONFIG.TITLE;
    }
  };

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

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {getDynamicTitle()}
        </Typography>

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
