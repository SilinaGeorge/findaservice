import React from "react";
import { UncontrolledAlert } from "reactstrap";

// bootstrap alert dismissal
const Alert = ({ message }) => {
  return (
    <UncontrolledAlert color="info">
      {message}
    </UncontrolledAlert>
  );
};

export default Alert;
