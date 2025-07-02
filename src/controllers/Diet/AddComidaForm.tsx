import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useState } from "react";
import { Diet, MenuDiario } from "../../types/Diet";
import { useDietContext } from "../../contexts/Diet.Context";

type Props = {
  dieta: Diet;
  onClose: () => void;
};

const diasDeLaSemana = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

const tiposComida = ["Desayuno", "Almuerzo", "Merienda", "Cena", "Snack"];

const AddComidasForm = ({ dieta, onClose }: Props) => {
  const { actualizarDieta } = useDietContext();
  const [dia, setDia] = useState<string>("Lunes");
  const [nombre, setNombre] = useState<string>("");
  const [tipo, setTipo] = useState<string>("");
  const [calorias, setCalorias] = useState<number>(0);

  const handleAgregar = async () => {
    const nuevoMenu: MenuDiario[] = [...(dieta.menuSemanal || [])];

    const nuevaComida = { nombre, tipo, calorias };

    const existente = nuevoMenu.find((m) => m.dia === dia);
    if (existente) {
      existente.comidas.push(nuevaComida);
    } else {
      nuevoMenu.push({ dia, comidas: [nuevaComida] });
    }

    await actualizarDieta(dieta._id, { menuSemanal: nuevoMenu });
    onClose();
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="body1">
        Agregar comida a: <strong>{dieta.nombre}</strong>
      </Typography>

      <FormControl fullWidth>
        <InputLabel>Día</InputLabel>
        <Select
          value={dia}
          label="Día"
          onChange={(e) => setDia(e.target.value)}
        >
          {diasDeLaSemana.map((d) => (
            <MenuItem key={d} value={d}>
              {d}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Nombre de la comida"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        fullWidth
      />

      <FormControl fullWidth>
        <InputLabel>Tipo</InputLabel>
        <Select
          value={tipo}
          label="Tipo"
          onChange={(e) => setTipo(e.target.value)}
        >
          {tiposComida.map((t) => (
            <MenuItem key={t} value={t}>
              {t}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Calorías"
        type="number"
        value={calorias}
        onChange={(e) => setCalorias(Number(e.target.value))}
        fullWidth
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleAgregar}
        disabled={!nombre || !tipo || calorias <= 0}
      >
        Agregar comida
      </Button>
    </Box>
  );
};

export default AddComidasForm;
