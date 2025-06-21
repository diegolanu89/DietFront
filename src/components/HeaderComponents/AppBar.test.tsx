// AppBarHeader.test.tsx

import { describe, it, vi, beforeEach, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import AppBarHeader from "./AppBar";
import { MemoryRouter } from "react-router-dom";
import { APPBAR_CONFIG } from "../../config/parameters";

// 👇 Importar jest-dom para usar matchers como toBeInTheDocument
import "@testing-library/jest-dom";
import { AuthProvider } from "../../contexts/Login.Context";

// ✅ Mock de useNavigate
vi.mock("react-router-dom", async () => {
  const actual =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom"
    );
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

// ✅ Mock de useAuth del contexto
vi.mock("../../../contexts/Login.Context", () => ({
  useAuth: () => ({
    user: { nombre: "Test User", email: "test@example.com" },
    logout: vi.fn(),
  }),
}));

const renderWithProviders = (ui: React.ReactNode) =>
  render(
    <AuthProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </AuthProvider>
  );

describe("AppBarHeader", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("muestra el título de la aplicación", () => {
    renderWithProviders(<AppBarHeader />);
    expect(screen.getByText(APPBAR_CONFIG.TITLE)).toBeInTheDocument();
  });

  it.skip("muestra el botón de volver si la ruta no está en NO_BACK", () => {
    renderWithProviders(<AppBarHeader />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it.skip("abre el menú del avatar y muestra las opciones", () => {
    renderWithProviders(<AppBarHeader />);

    const avatarButton = screen.getByRole("button");
    fireEvent.click(avatarButton);

    expect(screen.getByText(APPBAR_CONFIG.LABELS.HOME)).toBeInTheDocument();
    expect(screen.getByText(APPBAR_CONFIG.LABELS.PROFILE)).toBeInTheDocument();
    expect(screen.getByText(APPBAR_CONFIG.LABELS.LOGOUT)).toBeInTheDocument();
  });
});
