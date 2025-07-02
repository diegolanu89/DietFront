import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Diet } from "../../types/Diet";
import { useAuth } from "../../context/AuthContext";
import { useDiet } from "../../context/DietContext"; // Opcional si usás context para las dietas

export const CrearDietaPanel: React.FC = () => {
  const { user } = useAuth();
  const { crear } = useDiet(); // Si no usás contexto, reemplazar por props o servicio directo

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleCrear = async () => {
    setError("");
    setSuccess("");

    if (!nombre.trim()) {
      setError("El nombre de la dieta es obligatorio.");
      return;
    }

    try {
      const nueva: Partial<Diet> = {
        nombre,
        descripcion,
      };

      await crear(nueva);
      setSuccess("✅ Dieta creada correctamente");
      setNombre("");
      setDescripcion("");
    } catch (e) {
      setError("❌ Error al crear la dieta");
    }
  };

  if (!user) return null;

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        maxWidth: 600,
        margin: "auto",
        mt: 4,
        bgcolor: "#fdfdfd",
        borderRadius: 3,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Crear nueva dieta
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Nombre"
          variant="outlined"
          fullWidth
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <TextField
          label="Descripción"
          variant="outlined"
          fullWidth
          multiline
          minRows={3}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />

        {error && (
          <Typography color="error" fontSize="0.9rem">
            {error}
          </Typography>
        )}
        {success && (
          <Typography color="primary" fontSize="0.9rem">
            {success}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleCrear}
          disabled={!nombre.trim()}
        >
          Guardar dieta
        </Button>
      </Box>
    </Paper>
  );
};
