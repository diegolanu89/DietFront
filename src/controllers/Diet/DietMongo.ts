/**
 * @file DietMongo.ts
 * @description Implementación concreta de la interfaz `DietInterface` para consumir
 * un backend REST que gestiona dietas persistidas en MongoDB. Esta clase es un adaptador
 * que abstrae los detalles de red y formato del backend.
 */

import { Diet } from "../../types/Diet";
import { DietInterface } from "./DietInterface";
import { DIET_CONFIG_MONGO as DIET_CONFIG } from "../../config/parameters";

/**
 * 🍽️ DietMongo
 *
 * Esta clase permite consumir la API de dietas basada en MongoDB.
 * Implementa todas las operaciones del contrato `DietInterface` usando `fetch`.
 *
 * Todos los métodos incluyen `credentials: 'include'` ya que el backend utiliza
 * sesiones gestionadas por cookies a través de Passport.
 */
export class DietMongo implements DietInterface {
  /**
   * 🔍 listarTodas
   *
   * Recupera todas las dietas públicas disponibles en el sistema.
   *
   * @returns Una promesa que se resuelve con un array de dietas.
   *
   * @example
   * const dietas = await dietAdapter.listarTodas();
   */
  async listarTodas(): Promise<Diet[]> {
    const res = await fetch(`${DIET_CONFIG.BASE_URL}${DIET_CONFIG.ALL}`, {
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(DIET_CONFIG.ERRORS.FETCH_ALL);
    }

    const data = await res.json();
    return data.dietas;
  }

  /**
   * 📄 obtenerPorId
   *
   * Recupera una dieta por su ID.
   *
   * @param id - El identificador único de la dieta.
   * @returns La dieta encontrada.
   *
   * @example
   * const dieta = await dietAdapter.obtenerPorId("abc123");
   */
  async obtenerPorId(id: string): Promise<Diet> {
    const res = await fetch(`${DIET_CONFIG.BASE_URL}/${id}`, {
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(DIET_CONFIG.ERRORS.FETCH_ONE);
    }

    return await res.json();
  }

  /**
   * 🧍 listarPorUsuario
   *
   * Recupera todas las dietas creadas por el usuario actualmente autenticado.
   * No requiere un `userId` explícito ya que la autenticación con sesión
   * permite que el backend extraiga el usuario desde `req.user`.
   *
   * @returns Una promesa con el array de dietas propias del usuario autenticado.
   *
   * @example
   * const propias = await dietAdapter.listarPorUsuario();
   */
  async listarPorUsuario(): Promise<Diet[]> {
    const res = await fetch(`${DIET_CONFIG.BASE_URL}${DIET_CONFIG.MINE}`, {
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(DIET_CONFIG.ERRORS.FETCH_OWN);
    }
    const data = await res.json();
    return data.dietas; // <- esto extrae el array del objeto
  }

  /**
   * ✍️ crear
   *
   * Crea una nueva dieta.
   *
   * @param dieta - Objeto sin `_id` con los datos necesarios.
   * @returns La dieta recién creada, incluyendo su `_id`.
   *
   * @example
   * const creada = await dietAdapter.crear({...});
   */
  async crear(dieta: Partial<Diet>): Promise<Diet> {
    const res = await fetch(`${DIET_CONFIG.BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(dieta),
    });

    if (!res.ok) {
      throw new Error(DIET_CONFIG.ERRORS.CREATE);
    }

    return await res.json();
  }

  /**
   * 🧽 eliminar
   *
   * Elimina una dieta por ID. Requiere que el usuario sea su creador.
   *
   * @param id - ID de la dieta a eliminar.
   * @example
   * await dietAdapter.eliminar("abc123");
   */
  async eliminar(id: string): Promise<void> {
    const res = await fetch(`${DIET_CONFIG.BASE_URL}/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(DIET_CONFIG.ERRORS.DELETE);
    }
  }

  /**
   * 🛠️ actualizar
   *
   * Actualiza una dieta existente en el sistema. Solo el usuario que creó
   * la dieta puede modificarla. Se deben pasar únicamente los campos a actualizar,
   * no es necesario enviar el objeto completo.
   *
   * @param id - El ID único de la dieta a modificar.
   * @param cambios - Un objeto parcial con los cambios deseados. Por ejemplo:
   * `{ descripcion: "Nueva descripción", menuSemanal: {...} }`.
   * @returns Una promesa que se resuelve con la dieta ya actualizada.
   *
   * @throws Si el usuario no es el dueño de la dieta o si ocurre un error en el servidor.
   *
   * @example
   * const dietaModificada = await dietAdapter.actualizar("64d123abc", {
   *   descripcion: "Plan actualizado",
   *   menuSemanal: {
   *     lunes: { desayuno: "Yogur", almuerzo: "Pasta", cena: "Sopa" },
   *     ...
   *   }
   * });
   */
  async actualizar(id: string, cambios: Partial<Diet>): Promise<Diet> {
    const res = await fetch(`${DIET_CONFIG.BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(cambios),
    });

    if (!res.ok) {
      throw new Error(DIET_CONFIG.ERRORS.UPDATE);
    }

    const data = await res.json();
    return data.dietaActualizada; // <- esto extrae el array del objeto
  }
}
