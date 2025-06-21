import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../../contexts/Login.Context";

// Mock del contexto de autenticación
vi.mock("../../../contexts/Login.Context", () => ({
  useAuth: vi.fn(),
}));

describe.skip("ProtectedRoute", () => {
  it("redirige al login si no hay usuario autenticado", () => {
    // @ts-expect-error: mock
    useAuth.mockReturnValue({ user: null });

    render(
      <MemoryRouter initialEntries={["/protegida"]}>
        <Routes>
          <Route path="/login" element={<div>Página de Login</div>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/protegida" element={<div>Ruta Protegida</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Página de Login")).toBeInTheDocument();
  });

  it("permite el acceso a la ruta protegida si hay usuario", () => {
    // @ts-expect-error: mock
    useAuth.mockReturnValue({ user: { id: "1", email: "test@demo.com" } });

    render(
      <MemoryRouter initialEntries={["/protegida"]}>
        <Routes>
          <Route path="/login" element={<div>Página de Login</div>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/protegida" element={<div>Ruta Protegida</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Ruta Protegida")).toBeInTheDocument();
  });
});
