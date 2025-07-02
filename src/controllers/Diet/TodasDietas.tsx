/**
 * @file TodasLasDietas.tsx
 * @description Página que muestra todas las dietas públicas disponibles.
 * Se conecta al contexto de dietas y utiliza paginación para mostrar los resultados.
 */

import { useEffect, useState } from "react";
import { Box, CircularProgress, Fab } from "@mui/material";
import { Diet } from "../../types/Diet";
import { useDietContext } from "../../contexts/Diet.Context";
import DietaCardPublica from "./DietCardPublica";

const DIETAS_POR_PAGINA = 6;

/**
 * `TodasLasDietas`
 *
 * Componente que renderiza una grilla paginada con las dietas públicas disponibles.
 * Realiza una consulta inicial al cargar el componente mediante el método `listarTodas` del contexto.
 * Utiliza `DietaCardPublica` para mostrar cada tarjeta.
 *
 * @component
 * @returns {JSX.Element} Contenedor con grilla de dietas públicas y paginación.
 */
const TodasLasDietas = (): JSX.Element => {
  const { listarTodas } = useDietContext(); // Función para obtener dietas públicas
  const [loading, setLoading] = useState(true);
  const [dietas, setDietas] = useState<Diet[]>([]);
  const [pagina, setPagina] = useState(1);

  // Efecto inicial para cargar las dietas públicas
  useEffect(() => {
    const fetch = async () => {
      try {
        const resultado = await listarTodas();
        setDietas(resultado);
      } catch (error) {
        console.error("Error al listar dietas públicas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [listarTodas]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="70vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  // Paginación de las dietas
  const desde = (pagina - 1) * DIETAS_POR_PAGINA;
  const hasta = desde + DIETAS_POR_PAGINA;
  const dietasPaginadas = dietas.slice(desde, hasta);
  const totalPaginas = Math.ceil(dietas.length / DIETAS_POR_PAGINA);

  return (
    <Box mt={2} px={2}>
      {dietas.length === 0 ? (
        <Box mt={2}>No hay dietas públicas disponibles.</Box>
      ) : (
        <>
          <Box
            display="grid"
            gridTemplateColumns={{
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
            }}
            gap={2}
          >
            {dietasPaginadas.map((dieta) => (
              <Box key={`${dieta._id}-${dieta.updatedAt}`}>
                <DietaCardPublica dieta={dieta} />
              </Box>
            ))}
          </Box>

          {totalPaginas > 1 && (
            <Box mt={3} display="flex" justifyContent="center" gap={1}>
              {Array.from({ length: totalPaginas }, (_, i) => (
                <Fab
                  key={i}
                  size="small"
                  color={pagina === i + 1 ? "primary" : "default"}
                  onClick={() => setPagina(i + 1)}
                >
                  {i + 1}
                </Fab>
              ))}
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default TodasLasDietas;
