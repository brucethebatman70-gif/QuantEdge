import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/ui/badge";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText("Test Badge")).toBeInTheDocument();
  });
  it("applies variant classes", () => {
    render(<Badge variant="success">Success</Badge>);
    const badge = screen.getByText("Success");
    expect(badge.className).toContain("success");
  });
  it("renders as a div by default", () => {
    render(<Badge>Default</Badge>);
    expect(screen.getByText("Default").tagName).toBe("DIV");
  });
});
