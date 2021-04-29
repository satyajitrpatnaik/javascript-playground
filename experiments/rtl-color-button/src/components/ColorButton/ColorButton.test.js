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

test("initial conditions", () => {
  render(<ColorButton />);
  const colorButton = screen.getByRole("button", { name: "Change to BLUE" });
  expect(colorButton).toBeEnabled();

  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toBeChecked();
});

test("Checkbox disables button on first click and enables on second click", () => {
  render(<ColorButton />);
  const colorButton = screen.getByRole("button");
  const checkbox = screen.getByRole("checkbox", { name: "Disable Button" });
  expect(colorButton).toBeEnabled();

  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(colorButton).toBeDisabled();

  fireEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
  expect(colorButton).toBeEnabled();
});
