import React from "react";
import { useState } from "react";
import MoveBookForm from "../MoveBookForm/MoveBookForm";
import Button from "../Button/Button";
import "./MoveTitle.scss";

function MoveTitle({ id , title }) {
  // init state for showing MoveBookForm
  const [ visible, setVisible]= useState(false);
  
  return(
    <>
    <Button className="move" text="Move" onFocus={(e) => {setVisible(true)}} />

    <MoveBookForm id={id} title={title} classTitle={visible ? "show" : "hide"} setVisible={setVisible}/>
    </>
  )
}

export default MoveTitle;