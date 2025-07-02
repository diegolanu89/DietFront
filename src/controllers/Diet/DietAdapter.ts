import { Diet } from "../../types/Diet";
import { DietInterface } from "./DietInterface";
import { DietMongo } from "./DietMongo";

/**
 * 🔌 DietAdapter
 *
 * Adaptador que cumple con `DietInterface` y utiliza una implementación concreta
 * como `DietMongo`. Facilita el desacople entre el frontend y la fuente de datos.
 *
 * Esta clase permite intercambiar fácilmente la implementación por otra (Mock, Firebase, etc.)
 * sin modificar el código de los consumidores (Context, Componentes, etc.).
 */
export class DietAdapter implements DietInterface {
  private readonly backend: DietInterface;

  constructor() {
    // En este caso, usamos Mongo por defecto
    this.backend = new DietMongo();
  }

  /**
   * 📋 listarTodas
   *
   * Lista todas las dietas públicas del sistema.
   */
  listarTodas(): Promise<Diet[]> {
    return this.backend.listarTodas();
  }

  /**
   * 🧍 listarPorUsuario
   *
   * Lista todas las dietas propias del usuario autenticado.
   */
  listarPorUsuario(): Promise<Diet[]> {
    return this.backend.listarPorUsuario();
  }

  /**
   * 🆕 crear
   *
   * Crea una nueva dieta asociada al usuario autenticado.
   *
   * @param dieta - Datos requeridos para la creación.
   */
  crear(dieta: Partial<Diet>): Promise<Diet> {
    return this.backend.crear(dieta);
  }

  /**
   * 📝 actualizar
   *
   * Actualiza una dieta propia según el ID.
   *
   * @param id - ID de la dieta.
   * @param dieta - Datos a modificar.
   */
  actualizar(id: string, dieta: Partial<Diet>): Promise<Diet> {
    return this.backend.actualizar(id, dieta);
  }

  /**
   * ❌ eliminar
   *
   * Elimina una dieta del sistema.
   *
   * @param id - ID de la dieta.
   */
  eliminar(id: string): Promise<void> {
    return this.backend.eliminar(id);
  }
}
