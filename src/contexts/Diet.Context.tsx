// src/contexts/Diet.Context.tsx

import { createContext, useContext, useEffect, useState } from "react";
import { Diet } from "../types/Diet";
import { DietMongo } from "../controllers/Diet/DietMongo";

// Crear instancia del adaptador (podrías inyectarlo luego si querés mayor flexibilidad)
const dietAdapter = new DietMongo();

type DietContextType = {
  dietas: Diet[] | null;
  loading: boolean;
  crearDieta: (data: Omit<Diet, "_id">) => Promise<void>;
  actualizarDieta: (id: string, data: Partial<Diet>) => Promise<void>;
  eliminarDieta: (id: string) => Promise<void>;
  listarTodas: () => Promise<Diet[]>;
};

const DietContext = createContext<DietContextType>({} as DietContextType);

export const DietProvider = ({ children }: { children: React.ReactNode }) => {
  const [dietas, setDietas] = useState<Diet[] | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDietas = async () => {
    setLoading(true);
    try {
      const response = await dietAdapter.listarPorUsuario();
      setDietas(response);
    } catch (error) {
      console.error("Error al obtener dietas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDietas();
  }, []);

  const crearDieta = async (data: Omit<Diet, "_id">) => {
    const nueva = await dietAdapter.crear(data);
    setDietas((prev) => (prev ? [...prev, nueva] : [nueva]));
    console.log(dietas);
  };

  const actualizarDieta = async (id: string, data: Partial<Diet>) => {
    const actualizada = await dietAdapter.actualizar(id, data);
    setDietas(
      (prev) =>
        prev?.map((dieta) =>
          dieta._id === id ? { ...dieta, ...actualizada } : dieta
        ) ?? [actualizada]
    );
  };

  const eliminarDieta = async (id: string) => {
    try {
      await dietAdapter.eliminar(id);
      const nuevaLista = dietas?.filter((d) => d._id !== id) ?? [];
      setDietas(nuevaLista);
    } catch (error) {
      console.error("Error al eliminar dieta:", error);
    }
  };

  const listarTodas = async (): Promise<Diet[]> => {
    return await dietAdapter.listarTodas();
  };

  return (
    <DietContext.Provider
      value={{
        dietas,
        loading,
        crearDieta,
        actualizarDieta,
        eliminarDieta,
        listarTodas,
      }}
    >
      {children}
    </DietContext.Provider>
  );
};

export const useDietContext = () => useContext(DietContext);
