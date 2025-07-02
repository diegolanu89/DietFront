import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  DialogActions,
  Button,
} from "@mui/material";
import { Diet } from "../../types/Diet";

type Props = {
  open: boolean;
  dieta: Diet | null;
  onClose: () => void;
};

const DetalleDietaModal = ({ open, dieta, onClose }: Props) => {
  if (!dieta) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{dieta.nombre}</DialogTitle>
      <DialogContent dividers>
        <Typography variant="subtitle2" gutterBottom>
          Fecha de inicio: {new Date(dieta.fechaInicio).toLocaleDateString()}
        </Typography>
        {dieta.fechaFin && (
          <Typography variant="subtitle2" gutterBottom>
            Fecha de fin: {new Date(dieta.fechaFin).toLocaleDateString()}
          </Typography>
        )}
        {dieta.caloriasTotales && (
          <Typography variant="subtitle2" gutterBottom>
            Calorías totales: {dieta.caloriasTotales} kcal
          </Typography>
        )}

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6">Menú semanal</Typography>
        {dieta.menuSemanal.length === 0 ? (
          <Typography variant="body2">Sin comidas registradas.</Typography>
        ) : (
          dieta.menuSemanal.map((menu) => (
            <Box key={menu.dia} mt={1}>
              <Typography variant="subtitle1">{menu.dia}</Typography>
              <List dense disablePadding>
                {menu.comidas.length === 0 ? (
                  <ListItem>
                    <ListItemText primary="(Sin comidas)" />
                  </ListItem>
                ) : (
                  menu.comidas.map((c, i) => (
                    <ListItem key={i}>
                      <ListItemText
                        primary={`${c.tipo}: ${c.nombre}`}
                        secondary={`${c.calorias} kcal`}
                      />
                    </ListItem>
                  ))
                )}
              </List>
            </Box>
          ))
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetalleDietaModal;
