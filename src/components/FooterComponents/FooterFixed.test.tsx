// src/components/FooterComponents/__tests__/FooterFixed.test.tsx

import { render, screen } from "@testing-library/react";
import FooterFixed from "./FooterFixed";
import { describe, it, expect } from "vitest";

describe.skip("FooterFixed", () => {
  it("debería renderizar el contenido hijo", () => {
    render(
      <FooterFixed>
        <span>Contenido de prueba</span>
      </FooterFixed>
    );

    const contenido = screen.getByText("Contenido de prueba");
    expect(contenido).toBeInTheDocument();
  });

  it('debería tener el id "footerFixed" y estar posicionado como fixed', () => {
    render(
      <FooterFixed>
        <div>Otro contenido</div>
      </FooterFixed>
    );

    const footer = screen.getByTestId("footer-fixed");
    expect(footer).toHaveAttribute("id", "footerFixed");
    expect(footer).toHaveStyle({ position: "fixed" });
  });
});
