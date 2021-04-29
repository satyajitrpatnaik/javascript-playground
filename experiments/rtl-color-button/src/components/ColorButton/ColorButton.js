import { useState } from "react";
import replaceCamelWithSpaces from "../../utils/replaceCamelWithSpaces";

const ColorButton = ({
  initialColor = "MediumVioletRed",
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
          setButtonColor((prev) =>
            prev === "MediumVioletRed" ? "MidnightBlue" : "MediumVioletRed"
          )
        }
        disabled={isDisabled}
      >
        Change to{" "}
        {buttonColor === "MediumVioletRed"
          ? replaceCamelWithSpaces("MidnightBlue")
          : replaceCamelWithSpaces("MediumVioletRed")}
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
