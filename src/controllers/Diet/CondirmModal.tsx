// src/components/dietas/ConfirmDeleteModal.tsx

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { Diet } from "../../types/Diet";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  dieta?: Diet | null;
};

const ConfirmDeleteModal = ({ open, onClose, onConfirm, dieta }: Props) => {
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
