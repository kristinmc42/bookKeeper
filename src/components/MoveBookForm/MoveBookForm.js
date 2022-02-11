import React from "react";
import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import firebase from "../../firebase.js";
import Button from "../Button/Button";
import Card from "../Card/Card.js";
import Select from "../Select/Select.js";
import "./MoveBookForm.scss";


function MoveBookForm() {

  // init state for option choice
  const [ optionChoice, setOptionChoice ] = useState("");

  // init use params
  const { id } = useParams();

  // init history
  let navigate = useNavigate();


   // track option change
  const handleOptionChange = (event) => {
    // updates state to option selected by user
    setOptionChoice(event.target.value);
  }

  // when move book form submitted
  const handleFormSubmit = (event) => {
    event.preventDefault();

    // get title from firebase using id
    const dbItem = firebase.database().ref(id);
    
    if (optionChoice !== ""){
      // when new category selected update category for that book
      
     dbItem.child("category").set(optionChoice);
     
    }

    // route back to Home
    navigate("/");
  }


  return(
    <>
      <Card className="moveBook">

          <form action="submit" onSubmit={handleFormSubmit}>
            <label htmlFor="moveBookCategory">Where would you like to move this book to?</label>
            <Select name="moveBook" id="moveBookCategory" onChange={handleOptionChange} />
            <Button className="moveBookButton" text="Move Book"/>
            <Link className="cancel" to="/">Cancel</Link>
          </form>

      </Card>
    </>
  )
}


export default MoveBookForm;