import { render, screen, fireEvent } from "@testing-library/react";
import ColorButton from "./ColorButton";

test("button has the correct initial color", () => {
  render(<ColorButton />);
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  expect(colorButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });
});

test("button turns MidnightBlue when clicked", () => {
  render(<ColorButton />);
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  fireEvent.click(colorButton);
  expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });
  expect(colorButton.textContent).toBe("Change to Medium Violet Red");
});

test("initial conditions", () => {
  render(<ColorButton />);
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
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
  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });

  fireEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
  expect(colorButton).toBeEnabled();
  expect(colorButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });
});

test("Clicked gray disabled button and reverts to MidnightBlue", () => {
  render(<ColorButton />);
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  const checkbox = screen.getByRole("checkbox", { name: "Disable Button" });
  fireEvent.click(colorButton);
  expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });
});

test("Clicked gray disabled button and reverts to MediumVioletRed", () => {
  render(<ColorButton />);
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  const checkbox = screen.getByRole("checkbox", { name: "Disable Button" });
  expect(colorButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });
});
