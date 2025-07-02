/**
 * @file DietaCard.tsx
 * @description Componente de tarjeta que representa una dieta con opciones de visualización, edición, eliminación y agregado de comidas.
 * Incluye un modal interno para mostrar los detalles completos de la dieta.
 */

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

/**
 * Props del componente `DietaCard`.
 *
 * @property dieta - Objeto de tipo `Diet` que contiene los datos de la dieta.
 * @property onEdit - Función opcional a ejecutar al presionar el botón de editar.
 * @property onDelete - Función opcional a ejecutar al presionar el botón de eliminar.
 * @property onAddComidas - Función opcional a ejecutar al presionar el botón de agregar comidas.
 */
type Props = {
  dieta: Diet;
  onEdit?: () => void;
  onDelete?: () => void;
  onAddComidas?: () => void;
};

/**
 * `DietaCard`
 *
 * Componente visual que muestra una tarjeta con información breve de una dieta
 * y botones para acciones asociadas (editar, eliminar, agregar comidas, ver detalles).
 * Incluye un modal interno que muestra el detalle completo de la dieta seleccionada.
 *
 * @component
 * @example
 * <DietaCard
 *   dieta={unaDieta}
 *   onEdit={handleEdit}
 *   onDelete={handleDelete}
 *   onAddComidas={handleAdd}
 * />
 *
 * @param {Props} props - Propiedades para renderizar y controlar el componente.
 * @returns {JSX.Element} Tarjeta interactiva con resumen de la dieta y modal de detalle.
 */
const DietaCard = ({
  dieta,
  onEdit,
  onDelete,
  onAddComidas,
}: Props): JSX.Element => {
  const [openDetalle, setOpenDetalle] = useState(false);

  return (
    <>
      {/* Tarjeta con resumen de la dieta */}
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

        {/* Acciones */}
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

      {/* Modal con detalle completo de la dieta */}
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

          {!Array.isArray(dieta.menuSemanal) ||
          dieta.menuSemanal.length === 0 ? (
            <Typography variant="body2">Sin comidas registradas.</Typography>
          ) : (
            dieta.menuSemanal.map((menu) => (
              <Box key={menu.dia} mt={1}>
                <Typography variant="subtitle1">{menu.dia}</Typography>
                <List dense disablePadding>
                  {!Array.isArray(menu.comidas) || menu.comidas.length === 0 ? (
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
