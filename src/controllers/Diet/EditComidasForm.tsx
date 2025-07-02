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

type Props = {
  dieta: Diet;
  onEdit: (d: Diet) => void;
  onAddComidas: (d: Diet) => void;
  onDelete: (d: Diet) => void;
};

const DietaCard = ({ dieta, onEdit, onAddComidas, onDelete }: Props) => {
  return (
    <Card sx={{ position: "relative" }}>
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
