import { useState } from "react";
import { Link } from "react-router-dom";
import firebase from "../../firebase.js";
import Card from "../Card/Card";
import Select from "../Select/Select";
import Button from "../Button/Button";



function ChooseBookshelf({ bookToAdd }) {
  // init state for select option
  const [ optionChoice, setOptionChoice ] = useState("");

 

  console.log(bookToAdd)
  // track option change
  const handleOptionChange = (event) => {
    // updates state to option selected by user
    setOptionChoice(event.target.value);
  }

  // form submit to select bookshelf category based on user's selection (after a title has been selected)
  const handleBookshelfFormSubmit = (event) => {
    event.preventDefault();
    console.log(optionChoice, bookToAdd)
    const dbRef = firebase.database().ref();

    // store user input in database if user has selected an option
    if (optionChoice && bookToAdd){
      const bookID = dbRef.push().getKey();
      const addedBook = bookToAdd[0];
      console.log(addedBook)
      const bookInfo = {
        id: addedBook.id,
        title: addedBook.volumeInfo.title,
        authors: addedBook.volumeInfo.authors ? addedBook.volumeInfo.authors : null,
        image: addedBook.volumeInfo.imageLinks ? addedBook.volumeInfo.imageLinks.thumbnail :"No image",
        alt: addedBook.volumeInfo.title,
        genres: addedBook.volumeInfo.categories,
        pageCount: addedBook.volumeInfo.pageCount,
        description: addedBook.volumeInfo.description,
        category: optionChoice 
      };
  
      // store book info in database
      dbRef.child(bookID).set(bookInfo).then(() => {
        // clear values of state
        // setUserInput("");
        setOptionChoice("");
        // setBookToAdd({})
        // setShowForm(false);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }


  return(
    <>
    <Card className="chooseBookshelf">
      <form action="submit" onSubmit={handleBookshelfFormSubmit}>
          <label htmlFor="readStatus">Choose a bookshelf</label>
          <Select name="readStatus" id="readStatus" onChange={handleOptionChange} />
          <Button text="Add to bookshelf" className="addBookButton" />

          {/* <Button text="cancel" onClick={() => setShowForm(false)} className="cancelButton"/> */}
          <Link to="/">Cancel</Link>
        </form>
    </Card>
    </>
  )
}


export default ChooseBookshelf;