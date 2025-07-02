import { Diet } from "../../types/Diet";
import { DietInterface } from "./DietInterface";

/**
 * 🍽️ DietMock
 *
 * Implementación en memoria de DietInterface usando dietas de ejemplo.
 * Permite trabajar sin conexión al backend.
 */
export class DietMock implements DietInterface {
  private dietas: Diet[] = [
    {
      _id: "68606241dbc9f2fa6c586ddd",
      nombre: "Vegetariana",
      fechaInicio: new Date("2025-06-28T00:00:00.000Z"),
      fechaFin: new Date("2025-06-29T00:00:00.000Z"),
      caloriasTotales: 1000,
      menuSemanal: [
        {
          dia: "Lunes",
          comidas: [
            {
              nombre: "Carne con papas",
              calorias: 5000,
              tipo: "almuerzo",
            },
          ],
        },
        {
          dia: "Martes",
          comidas: [],
        },
      ],
      createdAt: "2025-06-28T21:44:33.546Z",
      updatedAt: "2025-06-28T22:56:21.606Z",
    },
    {
      _id: "68606c1385adf13abefa140e",
      userId: "685b378253f101b112ab0784",
      nombre: "Veggieee",
      fechaInicio: new Date("2025-06-28T00:00:00.000Z"),
      fechaFin: new Date("2025-06-29T00:00:00.000Z"),
      caloriasTotales: 12000,
      menuSemanal: [
        {
          dia: "Miercoles",
          comidas: [],
        },
        {
          dia: "Viernes",
          comidas: [],
        },
        {
          dia: "Lunes",
          comidas: [
            {
              nombre: "Carne",
              calorias: 500,
              tipo: "Merienda",
            },
          ],
        },
      ],
      createdAt: "2025-06-28T22:26:27.130Z",
      updatedAt: "2025-07-02T04:30:19.870Z",
    },
    {
      _id: "686078fc1f4603d3d9919cb3",
      nombre: "Otra Dieta",
      fechaInicio: new Date("2025-06-28T00:00:00.000Z"),
      fechaFin: new Date("2025-06-29T00:00:00.000Z"),
      caloriasTotales: 1212222,
      menuSemanal: [],
      createdAt: "2025-06-28T23:21:32.932Z",
      updatedAt: "2025-06-28T23:21:32.932Z",
    },
  ];

  async listarTodas(): Promise<Diet[]> {
    return this.dietas; // en este mock no filtramos por visibilidad
  }

  async listarPorUsuario(): Promise<Diet[]> {
    // simulamos que todas son del usuario
    return this.dietas;
  }

  async obtenerPorId(id: string): Promise<Diet> {
    const encontrada = this.dietas.find((d) => d._id === id);
    if (!encontrada) throw new Error("Dieta no encontrada");
    return encontrada;
  }

  async crear(dieta: Partial<Diet>): Promise<Diet> {
    const nueva: Diet = {
      ...dieta,
      _id: crypto.randomUUID(), // asegura ID único
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      menuSemanal: dieta.menuSemanal || [],
      caloriasTotales: dieta.caloriasTotales || 0,
      nombre: dieta.nombre || "Sin nombre",
      fechaInicio: dieta.fechaInicio || new Date().toISOString(),
      fechaFin: dieta.fechaFin || null,
      __v: 0,
    } as Diet;

    this.dietas.push(nueva);
    return nueva;
  }

  async actualizar(id: string, cambios: Partial<Diet>): Promise<Diet> {
    const index = this.dietas.findIndex((d) => d._id === id);
    if (index === -1) throw new Error("Dieta no encontrada");

    const actual = this.dietas[index];
    const actualizada = {
      ...actual,
      ...cambios,
      updatedAt: new Date().toISOString(),
    };
    this.dietas[index] = actualizada;
    return actualizada;
  }

  async eliminar(id: string): Promise<void> {
    const index = this.dietas.findIndex((d) => d._id === id);
    if (index === -1) throw new Error("Dieta no encontrada");
    this.dietas.splice(index, 1);
  }
}
