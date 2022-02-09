import React from "react";
import { useState, useEffect } from "react";
import firebase from "../../firebase.js";
import Button from "../Button/Button";
import Card from "../Card/Card.js";
import Select from "../Select/Select.js";
import "./MoveBookForm.scss";


function MoveBookForm({ id, title, classTitle, setVisible }) {
  // init state for showing this delete book form
  const [ showForm , setShowForm ] = useState(false);
  // init state for option choice
  const [ optionChoice, setOptionChoice ] = useState("");

  // change state based on classTitle (hide or show)
  useEffect(() => {
    if (classTitle === "show"){
      setShowForm(true)
    }else {
      setShowForm(false)
    }
  }, [classTitle])

   // track option change
  const handleOptionChange = (event) => {
    // updates state to option selected by user
    setOptionChoice(event.target.value);
  }

  // when form submitted
  const handleFormSubmit = (event) => {
    event.preventDefault();

    // get title from firebase
    const dbItem = firebase.database().ref(id);
    
    if (optionChoice !== ""){
      // when new category selected update category for that book
      const updatedTitle = {
        category: optionChoice,
        title: title
      }
     
      dbItem.set(updatedTitle);
    }
    // hide the form
    setVisible(false);
  }

  // when user cancels move book
  const handleCloseWindow = () => {
    // hide the delete form
    setShowForm(false);
    //change state that will be passed back to parent so can click on move button again
    setVisible(false);
  }

  return(
    <>
    {
      showForm
      ? 
        <Card className={classTitle}>
          <div className="moveFormContainer">
            <form action="submit" onSubmit={handleFormSubmit}>
              <label htmlFor="moveBookCategory">Where would you like to move this book to?</label>
              <Select name="moveBook" id="moveBookCategory" onChange={handleOptionChange} />
              <Button text="Move Book"/>
              <Button text="Cancel" onClick={handleCloseWindow}/>
            </form>
            
          </div>
        </Card>
      : null
    }
    </>
  )
}


export default MoveBookForm;