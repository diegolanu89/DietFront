// src/components/common/ThemedLinearProgress.tsx

import { LinearProgress, LinearProgressProps } from "@mui/material";

/**
 * Componente personalizado de barra de progreso lineal con estilo temático.
 * Utiliza un degradado suave en tonos beige y bordes redondeados.
 *
 * Este componente extiende las propiedades estándar de `LinearProgress` y
 * permite agregar estilos adicionales mediante la prop `sx`.
 *
 * 📌 Ejemplo de uso:
 * ```tsx
 * <ThemedLinearProgress variant="determinate" value={70} />
 * ```
 *
 * @param props - Props de `LinearProgress` incluyendo `variant`, `value`, etc.
 * @returns JSX.Element - Barra de progreso estilizada.
 */
const ThemedLinearProgress = (props: LinearProgressProps): JSX.Element => (
  <LinearProgress
    {...props}
    sx={{
      my: 2, // Margen vertical
      height: 6, // Altura personalizada
      borderRadius: 2, // Bordes redondeados
      background:
        "linear-gradient(90deg, #F5F5DC 0%, #FFFAF0 50%, #FAEBD7 100%)",
      "& .MuiLinearProgress-bar": {
        background:
          "linear-gradient(90deg, #F5F5DC 0%, #FFFAF0 50%, #FAEBD7 100%)",
      },
      ...props.sx, // Permite sobrescribir o extender estilos desde afuera
    }}
  />
);

export default ThemedLinearProgress;
