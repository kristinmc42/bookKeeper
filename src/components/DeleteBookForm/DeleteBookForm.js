import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import firebase from "../../firebase.js";
import Button from "../Button/Button";
import Card from "../Card/Card.js";
import "./DeleteBookForm.scss";


function DeleteBookForm() {
   // init use params
  const { id } = useParams();

   // init history
  let navigate = useNavigate();

  // when user selects yes to delete title
  const handleDeleteTitle = () => {
    // get item from the database using the book id
    const dbItem = firebase.database().ref(id);

    // delete title from database
    dbItem.remove();

    // route back to Home
    navigate("/");    
  }

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