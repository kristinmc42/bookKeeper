import React from "react";
import { useState } from "react";
import DeleteBookForm from "../DeleteBookForm/DeleteBookForm";
import Button from "../Button/Button";
import "./DeleteTitle.scss";

function DeleteTitle(id) {
  // init state for showing DeleteBookForm
  const [ visible, setVisible]= useState(false);
  
  return(
    <>
    <Button className="cross" text="Del" onFocus={(e) => {setVisible(true)}} />

    <DeleteBookForm id={id}  classTitle={visible ? "show" : "hide"} setVisible={setVisible}/>
    </>
  )
}

export default DeleteTitle;