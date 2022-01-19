import React from "react";
import { useState } from "react";
import DeleteBookForm from "../DeleteBookForm/DeleteBookForm";
import "./DeleteTitle.scss";

function DeleteTitle(id) {
  // init state for showing DeleteBookForm
  const [ visible, setVisible]= useState(false);
  
  return(
    <>
    <button className="cross" onFocus={(e) => {setVisible(true)}} >x</button>
    <DeleteBookForm id={id}  classTitle={visible ? "show" : "hide"} setVisible={setVisible}/>
    </>
  )
}

export default DeleteTitle;