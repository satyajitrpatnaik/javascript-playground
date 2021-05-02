import { render, screen } from "../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "./Options/Options";
import OrderEntry from "./OrderEntry";

test("update scoop sub total when scoops change", async () => {
  render(<Options optionType="scoops" />);

  // make sure total starts at $0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  // update chocolate scoops to 2 and check sub total
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update toppings subtotal when toppings change", async () => {
  render(<Options optionType="toppings" />);
  const toppingsTotal = screen.getByText("Toppings total: $", { exact: false });
  expect(toppingsTotal).toHaveTextContent("0.00");

  const mnmsCheckbox = await screen.findByRole("checkbox", { name: "M&Ms" });
  userEvent.click(mnmsCheckbox);
  expect(toppingsTotal).toHaveTextContent("1.50");

  const hotFudgeCheckbox = screen.getByRole("checkbox", { name: "Hot fudge" });
  userEvent.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent("3.00");

  userEvent.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  test("grand total updates if scoop is added first", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent("0.00");
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("4.00");

    const mnmsCheckbox = await screen.findByRole("checkbox", { name: "M&Ms" });
    userEvent.click(mnmsCheckbox);
    expect(grandTotal).toHaveTextContent("5.50");
  });

  test("grand total updates if topping is added first", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    const mnmsCheckbox = await screen.findByRole("checkbox", { name: "M&Ms" });
    userEvent.click(mnmsCheckbox);
    expect(grandTotal).toHaveTextContent("1.50");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("5.50");
  });
});
