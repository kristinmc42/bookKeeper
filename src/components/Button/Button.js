// reusable button component to keep consistant styling
// takes various props

import React from "react";
import "./Button.scss";

function Button(props) {
  return(
    <button onClick={props.onClick} className={props.className} onFocus={props.onFocus} value={props.value}>{props.text} </button>
  )
}

export default Button;