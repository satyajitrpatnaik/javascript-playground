import { useState } from "react";

const ColorButton = ({
  initialColor = "red",
  initialDisability = false,
  ...props
}) => {
  const [buttonColor, setButtonColor] = useState(initialColor);
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <div>
      <button
        style={{
          backgroundColor: isDisabled ? "gray" : buttonColor,
          color: "white",
        }}
        onClick={() =>
          setButtonColor((prev) => (prev === "red" ? "blue" : "red"))
        }
        disabled={isDisabled}
      >
        Change to {buttonColor === "red" ? "BLUE" : "RED"}
      </button>

      <input
        type="checkbox"
        id="disable-button-checkbox"
        defaultChecked={isDisabled}
        aria-checked={isDisabled}
        onChange={(e) => {
          setIsDisabled(e.target.checked);
        }}
      />
      <label htmlFor="disable-button-checkbox">Disable Button</label>
    </div>
  );
};

export default ColorButton;
