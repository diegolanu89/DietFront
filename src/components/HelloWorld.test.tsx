// 🧪 Importamos funciones necesarias de Vitest para crear y verificar pruebas
import { describe, it, expect } from "vitest";

// 🧰 Herramientas de testing para componentes React
import { render, screen } from "@testing-library/react";

// 🧩 El componente que vamos a testear
import HelloWorld from "./HelloWorld";

// 🔍 Grupo de pruebas para el componente HelloWorld
describe("HelloWorld Component", () => {
  // ✅ Caso de prueba específico: verifica que el saludo se renderice correctamente
  it("renders the correct greeting", () => {
    // 🧱 Renderizamos el componente con un nombre específico
    render(<HelloWorld name="Vitest" />);

    // 🔎 Buscamos el texto esperado en pantalla
    expect(screen.getByText("Hello, Vitest!")).toBeInTheDocument();
  });
});
