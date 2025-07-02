/**
 * @file AddComidasForm.tsx
 * @description Componente de formulario para agregar una comida a una dieta específica.
 * Permite seleccionar el día, tipo de comida, nombre y cantidad de calorías, y actualiza
 * el menú semanal de la dieta usando el contexto global `DietContext`.
 */

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

/**
 * Propiedades requeridas por el componente `AddComidasForm`.
 * @property dieta - Dieta a la cual se le agregará la comida.
 * @property onClose - Función que se ejecuta al cerrar el formulario.
 */
type Props = {
  dieta: Diet;
  onClose: () => void;
};

/**
 * Lista de días disponibles para seleccionar en el formulario.
 */
const diasDeLaSemana = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

/**
 * Tipos de comida válidos que puede seleccionar el usuario.
 */
const tiposComida = ["Desayuno", "Almuerzo", "Merienda", "Cena", "Snack"];

/**
 * Componente de formulario utilizado para agregar una comida a una dieta existente.
 * El formulario permite elegir un día de la semana, el nombre de la comida, su tipo
 * y el valor calórico. Una vez completado, actualiza el menú semanal de la dieta mediante
 * el contexto global `DietContext`.
 *
 * @component
 * @example
 * <AddComidasForm dieta={miDieta} onClose={() => setOpen(false)} />
 *
 * @param {Props} props - Propiedades con la dieta destino y el handler para cerrar.
 * @returns {JSX.Element} Formulario renderizado con campos y botón de acción.
 */
const AddComidasForm = ({ dieta, onClose }: Props): JSX.Element => {
  const { actualizarDieta } = useDietContext();

  const [dia, setDia] = useState<string>("Lunes");
  const [nombre, setNombre] = useState<string>("");
  const [tipo, setTipo] = useState<string>("");
  const [calorias, setCalorias] = useState<number>(0);

  /**
   * Maneja la acción de agregar una nueva comida.
   * - Si el día ya existe, agrega la comida a ese día.
   * - Si no existe, crea un nuevo objeto `MenuDiario` para ese día.
   * Luego actualiza la dieta con el nuevo `menuSemanal`.
   */
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
