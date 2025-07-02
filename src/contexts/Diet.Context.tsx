/* eslint-disable react-refresh/only-export-components */
/**
 * @file Diet.Context.tsx
 * @description Contexto global para la gestión de dietas en la aplicación. Provee funciones para crear, actualizar, eliminar y listar dietas, tanto del usuario actual como todas las públicas.
 */

import { createContext, useContext, useEffect, useState } from "react";
import { Diet } from "../types/Diet";
import { DietMongo } from "../controllers/Diet/DietMongo";

/**
 * Instancia del adaptador de persistencia.
 * Actualmente está acoplado a `DietMongo`, pero puede ser sustituido por otro adaptador que implemente los mismos métodos.
 */
const dietAdapter = new DietMongo();

/**
 * Estructura del contexto de dietas.
 */
type DietContextType = {
  dietas: Diet[] | null;
  loading: boolean;
  crearDieta: (data: Omit<Diet, "_id">) => Promise<void>;
  actualizarDieta: (id: string, data: Partial<Diet>) => Promise<void>;
  eliminarDieta: (id: string) => Promise<void>;
  listarTodas: () => Promise<Diet[]>;
};

/**
 * Contexto de dietas, inicialmente con valores forzados para facilitar el tipado.
 */
const DietContext = createContext<DietContextType>({} as DietContextType);

/**
 * Proveedor del contexto de dietas.
 *
 * @component
 * @param props.children - Componentes hijos que tendrán acceso al contexto.
 */
export const DietProvider = ({ children }: { children: React.ReactNode }) => {
  const [dietas, setDietas] = useState<Diet[] | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * Consulta las dietas del usuario autenticado y actualiza el estado global.
   */
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

  // Carga inicial de dietas al montar el componente
  useEffect(() => {
    fetchDietas();
  }, []);

  /**
   * Crea una nueva dieta y actualiza el estado.
   * @param data - Datos de la nueva dieta, sin el campo `_id`.
   */
  const crearDieta = async (data: Omit<Diet, "_id">) => {
    await dietAdapter.crear(data);
    fetchDietas();
  };

  /**
   * Actualiza una dieta existente en la lista global.
   * @param id - ID de la dieta a modificar.
   * @param data - Campos a actualizar.
   */
  const actualizarDieta = async (id: string, data: Partial<Diet>) => {
    const actualizada = await dietAdapter.actualizar(id, data);
    setDietas(
      (prev) =>
        prev?.map((dieta) =>
          dieta._id === id ? { ...dieta, ...actualizada } : dieta
        ) ?? [actualizada]
    );
  };

  /**
   * Elimina una dieta por ID.
   * @param id - ID de la dieta a eliminar.
   */
  const eliminarDieta = async (id: string) => {
    try {
      await dietAdapter.eliminar(id);
      const nuevaLista = dietas?.filter((d) => d._id !== id) ?? [];
      setDietas(nuevaLista);
    } catch (error) {
      console.error("Error al eliminar dieta:", error);
    }
  };

  /**
   * Lista todas las dietas públicas disponibles.
   * @returns Lista de dietas públicas.
   */
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

/**
 * Hook personalizado para acceder al contexto de dietas.
 * @returns Contexto con funciones y datos relacionados con las dietas.
 */
export const useDietContext = () => useContext(DietContext);
