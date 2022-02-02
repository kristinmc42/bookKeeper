import React from "react";
import "./Button.scss";

function Button(props) {
  return(
    <button onClick={props.onClick} className={props.className} onFocus={props.onFocus}>{props.text}</button>
  )
}

export default Button;