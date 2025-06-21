// src/components/navigation/RedirectHome.test.tsx

import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, waitFor } from "@testing-library/react";
import RedirectHome from "./RedirectHome";
import { MemoryRouter } from "react-router-dom";
import { PATHS, AUTH_CONFIG_MOCK } from "../../config/parameters";
import { AuthProvider } from "../../contexts/Login.Context";

// Simulación del onAuthStateChanged
vi.mock("../../controllers/Login/LoginAdapter", () => ({
  authAdapter: {
    onAuthStateChanged: (callback: any) => {
      const storedUser = localStorage.getItem(AUTH_CONFIG_MOCK.STORAGE_KEY);
      if (storedUser) {
        callback(JSON.parse(storedUser));
      } else {
        callback(null);
      }
      return () => {}; // cleanup
    },
    logout: () => Promise.resolve(),
  },
}));

describe.skip("RedirectHome", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("redirige a HOME si hay un usuario en localStorage", async () => {
    localStorage.setItem(
      AUTH_CONFIG_MOCK.STORAGE_KEY,
      JSON.stringify({
        id: AUTH_CONFIG_MOCK.ID,
        email: AUTH_CONFIG_MOCK.EMAIL,
        nombre: AUTH_CONFIG_MOCK.NAME,
      })
    );

    const { container } = render(
      <AuthProvider>
        <MemoryRouter>
          <RedirectHome />
        </MemoryRouter>
      </AuthProvider>
    );

    await waitFor(() => {
      // Espera a que el componente reaccione
      expect(container.innerHTML).toContain(PATHS.HOME);
    });
  });

  it("redirige a LOGIN si no hay usuario en localStorage", async () => {
    const { container } = render(
      <AuthProvider>
        <MemoryRouter>
          <RedirectHome />
        </MemoryRouter>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(container.innerHTML).toContain(PATHS.LOGIN);
    });
  });
});
