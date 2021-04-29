import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "./SummaryForm";

test("initial conditions", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const submitButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  expect(checkbox).not.toBeChecked();
  expect(submitButton).toBeDisabled();
});

test("checking checkbox as true enables the button", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const submitButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  userEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(submitButton).toBeEnabled();
});

test("popover responds to hover", async () => {
  render(<SummaryForm />);

  // popover starts out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  // popover appears upon mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // popover disappers when we mouse out
  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});
