import React from "react";
import { useState, useEffect } from "react";
import firebase from "../../firebase.js";
import Button from "../Button/Button";
import Card from "../Card/Card.js";
import "./DeleteBookForm.scss";


function DeleteBookForm({ id, classTitle, setVisible }) {
  // init state for showing this delete book form
  const [ showForm , setShowForm ] = useState(false);

  // change state based on classTitle (hide or show)
  useEffect(() => {
    console.log(classTitle)
    if (classTitle === "show"){
      setShowForm(true)
    }else {
      setShowForm(false)
    }
  }, [classTitle])

  // when user selects yes to delete title
  const handleDeleteTitle = () => {
    // get item from the database using the book id
    const dbItem = firebase.database().ref(id.id);

    // delete title from database
    dbItem.remove();
  }

  // when user selects no to delete title
  const handleCloseWindow = () => {
    // hide the delete form
    setShowForm(false);
    //change state that will be passed back to parent so can click on delete button again
    setVisible(false);
  }

  return(
    <>
    {
      showForm
      ? 
        <Card className={classTitle}>
          <div className="deleteFormContainer">
            <p>Are you sure you want to remove this title from your library?</p>
            
              <Button text="Yes" onClick={handleDeleteTitle} className="yesButton"/>
              <Button text="No" onClick={handleCloseWindow} className="noButton"/>
            
          </div>
        </Card>
      : null
    }
    </>
  )
}


export default DeleteBookForm;