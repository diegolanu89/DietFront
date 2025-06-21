// src/components/common/__tests__/ThemedLinearProgress.test.tsx

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ThemedLinearProgress from "./ThemedLinearProgress";
import { LinearProgressProps } from "@mui/material";

describe("ThemedLinearProgress", () => {
  it('se renderiza sin errores con variant="determinate"', () => {
    const props: LinearProgressProps = {
      variant: "determinate",
      value: 50,
    };

    render(<ThemedLinearProgress {...props} />);

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();
  });

  it("acepta estilos adicionales a través de la prop sx", () => {
    const props: LinearProgressProps = {
      variant: "indeterminate",
      sx: { marginTop: "10px" },
    };

    render(<ThemedLinearProgress {...props} />);

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveStyle({ marginTop: "10px" });
  });
});
