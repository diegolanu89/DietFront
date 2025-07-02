/**
 * @file ConfirmDeleteModal.tsx
 * @description Modal de confirmación para eliminar una dieta.
 * Utiliza Material UI para la interfaz visual del diálogo.
 */

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { Diet } from "../../types/Diet";

/**
 * Props del componente `ConfirmDeleteModal`.
 *
 * @property open - Booleano que indica si el modal está visible.
 * @property onClose - Función que se ejecuta al cerrar el modal.
 * @property onConfirm - Función que se ejecuta al confirmar la eliminación.
 * @property dieta - Objeto opcional de tipo `Diet` que representa la dieta a eliminar.
 */
type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  dieta?: Diet | null;
};

/**
 * `ConfirmDeleteModal`
 *
 * Componente modal que solicita confirmación del usuario para eliminar una dieta específica.
 * Muestra el nombre de la dieta en cuestión y dos botones: "Cancelar" y "Eliminar".
 *
 * @component
 * @example
 * <ConfirmDeleteModal
 *   open={true}
 *   onClose={handleClose}
 *   onConfirm={handleDelete}
 *   dieta={dietaSeleccionada}
 * />
 *
 * @param {Props} props - Propiedades que controlan la apertura, cierre y acción de confirmación.
 * @returns {JSX.Element} Modal de confirmación de eliminación.
 */
const ConfirmDeleteModal = ({
  open,
  onClose,
  onConfirm,
  dieta,
}: Props): JSX.Element => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar eliminación</DialogTitle>

      <DialogContent>
        <Typography>
          ¿Estás seguro de que querés eliminar la dieta{" "}
          <strong>{dieta?.nombre}</strong>?
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteModal;
