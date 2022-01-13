import React from "react";
import "./Button.scss";

function Button(props) {
  return(
    <button>{props.text}</button>
  )
}

export default Button;