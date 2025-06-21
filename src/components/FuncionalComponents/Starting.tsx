// src/components/Starting.tsx

import React from "react";

/**
 * Componente visual simple que muestra un mensaje de carga inicial.
 * Puede ser usado como placeholder durante el arranque de la aplicación
 * o durante una carga general.
 *
 * @returns {JSX.Element} Elemento visual con el texto "Loading".
 */
export function Starting(): JSX.Element {
  return (
    <div className="startText">
      <div className="logotipo">
        <span>Loading</span>
      </div>
    </div>
  );
}
