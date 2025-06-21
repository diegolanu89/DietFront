// src/components/__tests__/Starting.test.tsx

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Starting } from "./Starting";

describe("Starting", () => {
  it('debe mostrar el texto "Loading"', () => {
    render(<Starting />);

    const texto = screen.getByText("Loading");
    expect(texto).toBeInTheDocument();
  });
});
