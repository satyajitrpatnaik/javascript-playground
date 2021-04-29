import { render, screen, fireEvent } from "@testing-library/react";
import ColorButton from "./ColorButton";

test("button has the correct initial color", () => {
  render(<ColorButton />);
  const colorButton = screen.getByRole("button", { name: "Change to BLUE" });
  expect(colorButton).toHaveStyle({ backgroundColor: "red" });
});

test("button turns blue when clicked", () => {
  render(<ColorButton />);
  const colorButton = screen.getByRole("button", { name: "Change to BLUE" });
  fireEvent.click(colorButton);
  expect(colorButton).toHaveStyle({ backgroundColor: "blue" });
  expect(colorButton.textContent).toBe("Change to RED");
});
