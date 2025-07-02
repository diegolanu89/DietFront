/**
 * @file DietaCardPublica.tsx
 * @description Componente que muestra una tarjeta informativa de una dieta pública.
 * Incluye datos generales como fechas, calorías totales y fecha de creación.
 * Este componente es de solo lectura y no incluye acciones interactivas.
 */

import { Diet } from "../../types/Diet";
import { Typography, Card, CardContent, Box, Divider } from "@mui/material";

/**
 * Props del componente `DietaCardPublica`.
 *
 * @property dieta - Objeto de tipo `Diet` que contiene los datos a mostrar.
 */
type Props = {
  dieta: Diet;
};

/**
 * `DietaCardPublica`
 *
 * Componente visual utilizado para mostrar de forma resumida la información
 * de una dieta pública, sin funcionalidades interactivas.
 * Se utiliza en la vista general de todas las dietas disponibles.
 *
 * @component
 * @example
 * <DietaCardPublica dieta={unaDietaPublica} />
 *
 * @param {Props} props - Propiedades del componente, incluyendo la dieta a renderizar.
 * @returns {JSX.Element} Tarjeta de visualización de dieta.
 */
const DietaCardPublica = ({ dieta }: Props): JSX.Element => {
  return (
    <Card variant="outlined" sx={{ borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {dieta.nombre}
        </Typography>

        {/* Fecha de inicio */}
        <Box mb={1}>
          <Typography variant="subtitle2" gutterBottom>
            Fecha de inicio:
          </Typography>
          <Typography variant="body2">
            {new Date(dieta.fechaInicio).toLocaleDateString()}
          </Typography>
        </Box>

        {/* Fecha de finalización */}
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

        {/* Calorías totales */}
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

        {/* Fecha de creación */}
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
