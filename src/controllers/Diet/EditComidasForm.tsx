/**
 * @file DietaCard.tsx
 * @description Componente visual que representa una dieta editable.
 * Incluye botones para editar, eliminar o agregar comidas.
 * Muestra información básica como fechas y calorías.
 */

import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { Diet } from "../../types/Diet";
import dayjs from "dayjs";

/**
 * Props del componente `DietaCard`.
 *
 * @property dieta - Objeto de tipo `Diet` que contiene los datos a mostrar.
 * @property onEdit - Función que se ejecuta al presionar el botón de edición.
 * @property onAddComidas - Función que se ejecuta al presionar el botón para agregar comidas.
 * @property onDelete - Función que se ejecuta al presionar el botón para eliminar la dieta.
 */
type Props = {
  dieta: Diet;
  onEdit: (d: Diet) => void;
  onAddComidas: (d: Diet) => void;
  onDelete: (d: Diet) => void;
};

/**
 * `DietaCard`
 *
 * Componente de tarjeta que muestra una dieta con acciones disponibles.
 * Permite editar la dieta, agregar comidas o eliminarla.
 *
 * @component
 * @example
 * <DietaCard
 *   dieta={unaDieta}
 *   onEdit={(d) => setDietaParaEditar(d)}
 *   onAddComidas={(d) => abrirModalAgregar(d)}
 *   onDelete={(d) => eliminarDieta(d)}
 * />
 *
 * @param {Props} props - Propiedades del componente con callbacks y la dieta a mostrar.
 * @returns {JSX.Element} Tarjeta interactiva con información de la dieta.
 */
const DietaCard = ({
  dieta,
  onEdit,
  onAddComidas,
  onDelete,
}: Props): JSX.Element => {
  return (
    <Card sx={{ position: "relative" }}>
      {/* Botones de acción en esquina superior derecha */}
      <Stack direction="row" spacing={1} position="absolute" top={8} right={8}>
        <IconButton onClick={() => onEdit(dieta)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => onAddComidas(dieta)}>
          <RestaurantIcon />
        </IconButton>
        <IconButton onClick={() => onDelete(dieta)} color="error">
          <DeleteIcon />
        </IconButton>
      </Stack>

      {/* Contenido principal de la dieta */}
      <CardContent>
        <Typography variant="h6">{dieta.nombre}</Typography>
        <Typography variant="body2">
          Inicio: {dayjs(dieta.fechaInicio).format("DD/MM/YYYY")}
        </Typography>
        {dieta.fechaFin && (
          <Typography variant="body2">
            Fin: {dayjs(dieta.fechaFin).format("DD/MM/YYYY")}
          </Typography>
        )}
        {dieta.caloriasTotales && (
          <Typography variant="body2">
            Calorías: {dieta.caloriasTotales}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default DietaCard;
