// src/components/dietas/AddDietaForm.tsx

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

type Props = {
  onClose?: () => void;
  initialData?: Diet;
};

/**
 * 📋 AddDietaForm
 *
 * Formulario para crear o editar una dieta.
 * Si se proporciona `initialData`, el formulario funcionará en modo edición.
 */
const AddDietaForm = ({ onClose, initialData }: Props) => {
  const { crearDieta, actualizarDieta } = useDietContext();

  const [nombre, setNombre] = useState("");
  const [fechaInicio, setFechaInicio] = useState<Dayjs | null>(dayjs());
  const [fechaFin, setFechaFin] = useState<Dayjs | null>(null);
  const [calorias, setCalorias] = useState("");
  const [error, setError] = useState<string | null>(null);

  const esEdicion = Boolean(initialData);

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
