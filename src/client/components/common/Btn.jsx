import React from "react";
import { Button } from "reactstrap";
import "../../scss/Button.scss";

// Button Component which takes colours: primary secondary tertiary, size and disabled
const Btn = ({ onClick, color, size, disabled, children }) => {
  if (color == undefined) {
    color = "primary"; // default colour
  }
  return (
    <Button outline size={size} className={color + "-btn"} onClick={onClick}>
      {children}
    </Button>
  );
};

export default Btn;
