import { useState } from "react";

const ColorButton = ({
  initialColor = "red",
  initialDisability = false,
  ...props
}) => {
  const [buttonColor, setButtonColor] = useState(initialColor);

  return (
    <div>
      <button
        style={{ backgroundColor: buttonColor, color: "white" }}
        onClick={() =>
          setButtonColor((prev) => (prev === "red" ? "blue" : "red"))
        }
      >
        Change to {buttonColor === "red" ? "BLUE" : "RED"}
      </button>
    </div>
  );
};

export default ColorButton;
