/**
 * @file DetalleDietaModal.tsx
 * @description Modal informativo que muestra los detalles de una dieta seleccionada.
 * Incluye fechas, calorías totales y el menú semanal si está disponible.
 * Utiliza componentes de Material UI para la interfaz visual.
 */

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

/**
 * Props del componente `DetalleDietaModal`.
 *
 * @property open - Controla la visibilidad del modal.
 * @property dieta - Objeto de tipo `Diet` con los datos a mostrar.
 * @property onClose - Función que se ejecuta al cerrar el modal.
 */
type Props = {
  open: boolean;
  dieta: Diet | null;
  onClose: () => void;
};

/**
 * `DetalleDietaModal`
 *
 * Modal para visualizar en detalle una dieta seleccionada.
 * Presenta la información general de la dieta (nombre, fechas, calorías)
 * y su menú semanal, organizado por días. Si no hay comidas cargadas, lo indica claramente.
 *
 * @component
 * @example
 * <DetalleDietaModal
 *   open={true}
 *   dieta={dietaSeleccionada}
 *   onClose={handleClose}
 * />
 *
 * @param {Props} props - Propiedades que controlan apertura, contenido y cierre del modal.
 * @returns {JSX.Element | null} Modal con la información de la dieta o `null` si no hay dieta.
 */
const DetalleDietaModal = ({
  open,
  dieta,
  onClose,
}: Props): JSX.Element | null => {
  // Si no hay dieta seleccionada, no se muestra el modal
  if (!dieta) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{dieta.nombre}</DialogTitle>

      <DialogContent dividers>
        {/* Fecha de inicio */}
        <Typography variant="subtitle2" gutterBottom>
          Fecha de inicio: {new Date(dieta.fechaInicio).toLocaleDateString()}
        </Typography>

        {/* Fecha de fin (opcional) */}
        {dieta.fechaFin && (
          <Typography variant="subtitle2" gutterBottom>
            Fecha de fin: {new Date(dieta.fechaFin).toLocaleDateString()}
          </Typography>
        )}

        {/* Calorías totales (opcional) */}
        {dieta.caloriasTotales && (
          <Typography variant="subtitle2" gutterBottom>
            Calorías totales: {dieta.caloriasTotales} kcal
          </Typography>
        )}

        <Divider sx={{ my: 2 }} />

        {/* Menú Semanal */}
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
