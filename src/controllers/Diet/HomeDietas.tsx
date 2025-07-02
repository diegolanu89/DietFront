import { useDietContext } from "../../contexts/Diet.Context";
import {
  Box,
  Typography,
  CircularProgress,
  IconButton,
  useMediaQuery,
  Fab,
  Drawer,
} from "@mui/material";
import { Add, Public } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Diet } from "../../types/Diet";
import DietaCard from "./DietCard";
import AddDietaForm from "./AddDietForm";
import ConfirmDeleteModal from "./CondirmModal";
import { PATHS } from "../../config/parameters";
import AddComidasForm from "./AddComidaForm";

const DIETAS_POR_PAGINA = 6;

const HomeDietas = () => {
  const { dietas, loading, eliminarDieta } = useDietContext();
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  const [pagina, setPagina] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<
    "crear" | "editar" | "comidas" | null
  >(null);
  const [selectedDieta, setSelectedDieta] = useState<Diet | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [dietaSeleccionada, setDietaSeleccionada] = useState<Diet | null>(null);

  const abrirDrawer = (modo: "crear" | "editar" | "comidas", dieta?: Diet) => {
    setDrawerMode(modo);
    setSelectedDieta(dieta ?? null);
    setDrawerOpen(true);
  };

  const cerrarDrawer = () => {
    setDrawerOpen(false);
    setSelectedDieta(null);
    setDrawerMode(null);
  };

  const abrirModalEliminar = (dieta: Diet) => {
    setDietaSeleccionada(dieta);
    setModalOpen(true);
  };

  const cerrarModalEliminar = () => {
    setModalOpen(false);
    setDietaSeleccionada(null);
  };

  const confirmarEliminacion = async () => {
    if (dietaSeleccionada) {
      await eliminarDieta(dietaSeleccionada._id);
      cerrarModalEliminar();
    }
  };

  const desde = (pagina - 1) * DIETAS_POR_PAGINA;
  const hasta = desde + DIETAS_POR_PAGINA;
  const dietasPaginadas = Array.isArray(dietas)
    ? dietas.slice(desde, hasta)
    : [];
  const totalPaginas = Array.isArray(dietas)
    ? Math.ceil(dietas.length / DIETAS_POR_PAGINA)
    : 0;

  if (loading || dietas === null) {
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

  if (Array.isArray(dietas) && dietas.length === 0) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6">No hay dietas creadas aún.</Typography>
        <Typography variant="body2">
          Usa el botón flotante para agregar una nueva dieta personalizada.
        </Typography>
        {isMobile && (
          <Fab
            color="primary"
            onClick={() => abrirDrawer("crear")}
            sx={{ position: "fixed", bottom: 16, right: 16 }}
          >
            <Add />
          </Fab>
        )}
      </Box>
    );
  }

  return (
    <Box mt={2} px={2}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">Tus Dietas</Typography>

        <Box display="flex" gap={1}>
          <IconButton
            color="primary"
            onClick={() => abrirDrawer("crear")}
            title="Crear dieta"
          >
            <Add />
          </IconButton>

          <IconButton
            color="secondary"
            onClick={() => navigate(PATHS.ALL_DIET)}
            title="Ver dietas públicas"
          >
            <Public />
          </IconButton>
        </Box>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }}
        gap={2}
      >
        {dietasPaginadas.map((dieta) => (
          <Box key={`${dieta._id}-${dieta.updatedAt}`}>
            <DietaCard
              dieta={dieta}
              onEdit={() => abrirDrawer("editar", dieta)}
              onAddComidas={() => abrirDrawer("comidas", dieta)}
              onDelete={() => abrirModalEliminar(dieta)}
            />
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

      <Drawer
        anchor={isMobile ? "bottom" : "right"}
        open={drawerOpen}
        onClose={cerrarDrawer}
      >
        <Box p={2} width={isMobile ? "100vw" : 400}>
          {drawerMode === "crear" && (
            <>
              <Typography variant="h6">Crear nueva dieta</Typography>
              <AddDietaForm onClose={cerrarDrawer} />
            </>
          )}
          {drawerMode === "editar" && selectedDieta && (
            <>
              <Typography variant="h6">Editar dieta</Typography>
              <AddDietaForm
                onClose={cerrarDrawer}
                initialData={selectedDieta}
              />
            </>
          )}
          {drawerMode === "comidas" && selectedDieta && (
            <>
              <Typography variant="h6" gutterBottom>
                Agregar comidas
              </Typography>
              <AddComidasForm dieta={selectedDieta} onClose={cerrarDrawer} />
            </>
          )}
        </Box>
      </Drawer>

      {isMobile && (
        <Fab
          color="primary"
          onClick={() => abrirDrawer("crear")}
          sx={{ position: "fixed", bottom: 16, right: 16 }}
        >
          <Add />
        </Fab>
      )}

      <ConfirmDeleteModal
        open={modalOpen}
        onClose={cerrarModalEliminar}
        onConfirm={confirmarEliminacion}
        dieta={dietaSeleccionada}
      />
    </Box>
  );
};

export default HomeDietas;
