import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Loading from "./Loading";

describe.skip("Loading", () => {
  it("debería mostrar el spinner si `carga` es false o no está definido", () => {
    render(<Loading text="Procesando..." />);

    expect(screen.getByText("Procesando...")).toBeInTheDocument();
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("debería mostrar la barra de carga con el nivel correspondiente si `carga` es true", () => {
    render(<Loading carga={true} nivel="80%" text="Cargando datos..." />);

    expect(screen.getByText("Cargando datos...")).toBeInTheDocument();
    const progress = screen.getByTestId("progressbar");
    expect(progress).toHaveStyle({ width: "80%" });
  });
});
