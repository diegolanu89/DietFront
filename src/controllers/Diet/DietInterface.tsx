import { Diet } from "../../types/Diet";

/**
 * 🧠 DietInterface
 *
 * Interfaz genérica que define las operaciones que deben implementarse
 * para interactuar con el modelo de Dietas, sin importar la tecnología
 * de backend utilizada (MongoDB, Firebase, etc.).
 *
 * Esto permite desacoplar la lógica de negocio del frontend del proveedor de datos,
 * favoreciendo la inyección de dependencias y la escalabilidad.
 */
export interface DietInterface {
  /**
   * 📋 listarTodas
   *
   * Recupera todas las dietas disponibles en el sistema. Las dietas
   * pueden haber sido creadas por cualquier usuario y se consideran públicas.
   *
   * @returns Una promesa que se resuelve con un array de objetos `Diet`.
   *
   * @example
   * const todas = await dietAdapter.listarTodas();
   */
  listarTodas(): Promise<Diet[]>;

  /**
   * 🧍 listarPorUsuario
   *
   * Recupera todas las dietas asociadas al usuario actualmente autenticado.
   * No es necesario pasar un ID ya que el backend extrae `req.user` de la sesión.
   *
   * @returns Una promesa con el array de dietas del usuario autenticado.
   *
   * @example
   * const propias = await dietAdapter.listarPorUsuario();
   */
  listarPorUsuario(): Promise<Diet[]>;

  /**
   * 🆕 crear
   *
   * Crea una nueva dieta asociada al usuario autenticado.
   * La dieta puede incluir su título, descripción y contenido semanal.
   *
   * @param dieta - Objeto parcial con los datos requeridos para la creación.
   * @returns Una promesa con la dieta recién creada.
   *
   * @example
   * const nueva = await dietAdapter.crear({ titulo: "Corte definición", menuSemanal: {...} });
   */
  crear(dieta: Partial<Diet>): Promise<Diet>;

  /**
   * 📝 actualizar
   *
   * Modifica una dieta existente identificada por su ID.
   * Solo podrá modificarse si el usuario autenticado es su creador.
   *
   * @param id - ID único de la dieta.
   * @param dieta - Datos actualizados de la dieta.
   * @returns Una promesa con la dieta modificada.
   *
   * @throws Si el usuario no es el propietario o la dieta no existe.
   *
   * @example
   * await dietAdapter.actualizar("64a2...e7", { descripcion: "Actualizada" });
   */
  actualizar(id: string, dieta: Partial<Diet>): Promise<Diet>;

  /**
   * ❌ eliminar
   *
   * Elimina una dieta del sistema por su ID.
   * Solo podrá eliminarla el usuario que la creó originalmente.
   *
   * @param id - ID único de la dieta a eliminar.
   * @returns Una promesa que se resuelve si la operación fue exitosa.
   *
   * @throws Si la dieta no existe o no pertenece al usuario autenticado.
   *
   * @example
   * await dietAdapter.eliminar("64a2...e7");
   */
  eliminar(id: string): Promise<void>;
}
