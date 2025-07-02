/**
 * @file AddDietaForm.tsx
 * @description Componente de formulario reutilizable para crear o editar una dieta.
 * Se conecta con el `DietContext` para persistir los cambios. Permite ingresar nombre,
 * fecha de inicio, fecha de fin y calorías totales. Utiliza `DatePicker` de MUI.
 */

import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  Alert,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDietContext } from "../../contexts/Diet.Context";
import { Diet } from "../../types/Diet";
import dayjs, { Dayjs } from "dayjs";

/**
 * Props aceptadas por el componente `AddDietaForm`.
 *
 * @property onClose - Función opcional que se ejecuta al cerrar el formulario (por ejemplo, cerrar un modal).
 * @property initialData - Dieta opcional que se desea editar. Si no se pasa, se asume creación.
 */
type Props = {
  onClose?: () => void;
  initialData?: Diet;
};

/**
 * `AddDietaForm`
 *
 * Formulario para crear una nueva dieta o editar una dieta existente.
 * Si se pasa `initialData`, el formulario precarga los campos y opera en modo edición.
 *
 * @component
 * @example
 * <AddDietaForm onClose={handleClose} />
 * <AddDietaForm initialData={dietaSeleccionada} onClose={handleClose} />
 *
 * @param {Props} props - Propiedades que controlan el modo de operación del formulario.
 * @returns {JSX.Element} Formulario interactivo para gestión de dietas.
 */
const AddDietaForm = ({ onClose, initialData }: Props): JSX.Element => {
  const { crearDieta, actualizarDieta } = useDietContext();

  const [nombre, setNombre] = useState<string>("");
  const [fechaInicio, setFechaInicio] = useState<Dayjs | null>(dayjs());
  const [fechaFin, setFechaFin] = useState<Dayjs | null>(null);
  const [calorias, setCalorias] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  /**
   * Bandera que determina si el formulario está en modo edición.
   */
  const esEdicion = Boolean(initialData);

  /**
   * Efecto que carga los datos iniciales en el formulario si se está editando.
   */
  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre || "");
      setFechaInicio(
        initialData.fechaInicio ? dayjs(initialData.fechaInicio) : null
      );
      setFechaFin(initialData.fechaFin ? dayjs(initialData.fechaFin) : null);
      setCalorias(initialData.caloriasTotales?.toString() || "");
    }
  }, [initialData]);

  /**
   * Maneja el envío del formulario para crear o actualizar una dieta.
   * Valida los campos requeridos y ejecuta las funciones correspondientes del contexto.
   * En caso de éxito, ejecuta `onClose()` si fue provisto.
   *
   * @param {React.FormEvent} e - Evento del formulario.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!nombre || !fechaInicio) {
      setError("El nombre y la fecha de inicio son obligatorios.");
      return;
    }

    const datosDieta: Partial<Diet> = {
      nombre,
      fechaInicio: fechaInicio.toDate(),
      fechaFin: fechaFin ? fechaFin.toDate() : undefined,
      caloriasTotales: calorias ? parseInt(calorias) : undefined,
    };

    try {
      if (esEdicion && initialData?._id) {
        await actualizarDieta(initialData._id, datosDieta);
      } else {
        await crearDieta({
          nombre: datosDieta.nombre as string,
          fechaInicio: datosDieta.fechaInicio as Date,
          fechaFin: datosDieta.fechaFin,
          caloriasTotales: datosDieta.caloriasTotales,
          menuSemanal: [],
        });
      }
      onClose?.();
    } catch (err) {
      setError("Ocurrió un error al guardar la dieta.");
      console.error(err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} p={2}>
      <Typography variant="h6" gutterBottom>
        {esEdicion ? "Editar Dieta" : "Crear Nueva Dieta"}
      </Typography>

      <Stack spacing={2}>
        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Nombre de la dieta"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <DatePicker
          label="Fecha de inicio"
          value={fechaInicio}
          onChange={(date) => setFechaInicio(date)}
        />

        <DatePicker
          label="Fecha de fin (opcional)"
          value={fechaFin}
          onChange={(date) => setFechaFin(date)}
        />

        <TextField
          label="Calorías totales (opcional)"
          type="number"
          value={calorias}
          onChange={(e) => setCalorias(e.target.value)}
        />

        <Button type="submit" variant="contained" fullWidth>
          {esEdicion ? "Guardar cambios" : "Crear Dieta"}
        </Button>
      </Stack>
    </Box>
  );
};

export default AddDietaForm;
