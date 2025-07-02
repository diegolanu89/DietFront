import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { useState } from "react";
import { Diet } from "../../types/Diet";

type Props = {
  dieta: Diet;
  onEdit?: () => void;
  onDelete?: () => void;
  onAddComidas?: () => void;
};

const DietaCard = ({ dieta, onEdit, onDelete, onAddComidas }: Props) => {
  const [openDetalle, setOpenDetalle] = useState(false);

  return (
    <>
      <Card variant="outlined" sx={{ borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6">{dieta.nombre}</Typography>
          <Typography variant="body2" color="text.secondary">
            Desde: {new Date(dieta.fechaInicio).toLocaleDateString()}
          </Typography>
          {dieta.caloriasTotales && (
            <Typography variant="body2" color="text.secondary">
              Calorías totales: {dieta.caloriasTotales} kcal
            </Typography>
          )}
        </CardContent>

        <CardActions>
          {onEdit && (
            <IconButton onClick={onEdit} color="primary">
              <EditIcon />
            </IconButton>
          )}
          {onAddComidas && (
            <IconButton onClick={onAddComidas} color="secondary">
              <FastfoodIcon />
            </IconButton>
          )}
          {onDelete && (
            <IconButton onClick={onDelete} color="error">
              <DeleteIcon />
            </IconButton>
          )}
          <IconButton onClick={() => setOpenDetalle(true)} color="info">
            <InfoIcon />
          </IconButton>
        </CardActions>
      </Card>

      <Dialog
        open={openDetalle}
        onClose={() => setOpenDetalle(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{dieta.nombre}</DialogTitle>
        <DialogContent dividers>
          <Typography variant="subtitle2">
            Fecha de inicio: {new Date(dieta.fechaInicio).toLocaleDateString()}
          </Typography>
          {dieta.fechaFin && (
            <Typography variant="subtitle2">
              Fecha de fin: {new Date(dieta.fechaFin).toLocaleDateString()}
            </Typography>
          )}
          {dieta.caloriasTotales && (
            <Typography variant="subtitle2">
              Calorías totales: {dieta.caloriasTotales} kcal
            </Typography>
          )}

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            Menú semanal
          </Typography>

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
          <Button onClick={() => setOpenDetalle(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DietaCard;
