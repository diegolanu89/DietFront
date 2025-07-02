// src/services/diet/DietAdapterFactory.ts

import { DietInterface } from "./DietInterface";
import { DietMock } from "./DietMock";
import { DietMongo } from "./DietMongo";

// Se definen los posibles valores esperados desde la variable de entorno
type DietProvider = "mongo" | "mock";

/**
 * 🏭 DietAdapterFactory
 *
 * Fábrica de adaptadores para el manejo de dietas.
 * Permite elegir entre distintos proveedores como Mongo o Mock,
 * en función de la variable de entorno `VITE_DIET_PROVIDER`.
 */
export class DietAdapterFactory {
  static getAdapter(): DietInterface {
    const prov = import.meta.env.VITE_DIET_PROVIDER;
    const provider = (prov as DietProvider) || "mock";

    console.warn("DIET PROVIDER SELECTED:", provider);

    switch (provider) {
      case "mongo":
        return new DietMongo();

      case "mock":
      default:
        return new DietMock();
    }
  }
}

/**
 * 🧩 dietAdapter
 *
 * Adaptador de dietas utilizado en toda la aplicación.
 * La implementación concreta es seleccionada dinámicamente por la fábrica.
 */
export const dietAdapter: DietInterface = DietAdapterFactory.getAdapter();
