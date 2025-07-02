// src/components/dietas/DietaCardPublica.tsx

import { Diet } from "../../types/Diet";
import { Typography, Card, CardContent, Box, Divider } from "@mui/material";

type Props = {
  dieta: Diet;
};

const DietaCardPublica = ({ dieta }: Props) => {
  return (
    <Card variant="outlined" sx={{ borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {dieta.nombre}
        </Typography>

        <Box mb={1}>
          <Typography variant="subtitle2" gutterBottom>
            Fecha de inicio:
          </Typography>
          <Typography variant="body2">
            {new Date(dieta.fechaInicio).toLocaleDateString()}
          </Typography>
        </Box>

        {dieta.fechaFin && (
          <Box mb={1}>
            <Typography variant="subtitle2" gutterBottom>
              Fecha de finalización:
            </Typography>
            <Typography variant="body2">
              {new Date(dieta.fechaFin).toLocaleDateString()}
            </Typography>
          </Box>
        )}

        {dieta.caloriasTotales && (
          <Box mb={1}>
            <Typography variant="subtitle2" gutterBottom>
              Calorías totales:
            </Typography>
            <Typography variant="body2">
              {dieta.caloriasTotales} kcal
            </Typography>
          </Box>
        )}

        <Divider sx={{ my: 2 }} />

        <Typography variant="caption" color="text.secondary">
          Creada el:{" "}
          {dieta.createdAt
            ? new Date(dieta.createdAt).toLocaleDateString()
            : "Fecha no disponible"}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DietaCardPublica;
