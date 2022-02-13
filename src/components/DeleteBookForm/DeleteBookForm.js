import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
import firebase from "../../firebase.js";
import Button from "../Button/Button";
import Card from "../Card/Card.js";
import "./DeleteBookForm.scss";


function DeleteBookForm() {
  // init state for showing this delete book form
  // const [ showForm , setShowForm ] = useState(false);

   // init use params
  const { id } = useParams();

   // init history
  let navigate = useNavigate();

  // change state based on classTitle (hide or show)
  // useEffect(() => {
  //   if (classTitle === "show"){
  //     setShowForm(true)
  //   }else {
  //     setShowForm(false)
  //   }
  // }, [classTitle])

  // when user selects yes to delete title
  const handleDeleteTitle = () => {
    // get item from the database using the book id
    const dbItem = firebase.database().ref(id);

    // delete title from database
    dbItem.remove();

    
    // route back to Home
    navigate("/");    
  }

  // when user selects no to delete title
  // const handleCloseWindow = () => {
  //   // hide the delete form
  //   setShowForm(false);
  //   //change state that will be passed back to parent so can click on delete button again
  //   setVisible(false);
  // }

  return(
    <>
      <Card className="deleteBook">
        <form action="submit" onSubmit={handleDeleteTitle}>
          <label htmlFor="yesButton">Are you sure you want to remove this title from your library?</label>
          
          <Button id="yesButton" text="Yes" className="yesButton"/>

          <Link className="cancel" to="/">Cancel</Link>

        </form>
      </Card>
    </>
  )
}


export default DeleteBookForm;