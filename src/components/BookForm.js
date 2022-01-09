import firebase from "../firebase";

import { useState, useEffect } from "react";


function BookForm () {
  // set state
  const [ userInput, setUserInput ] = useState("");
  const [ optionChoice, setOptionChoice ] = useState("");
  // const [ bookTitle, setBookTitle ] = useState("");

  // track user input
  const handleInputChange = (event) => {
    //updates state to whatever the user types in the input field
    setUserInput(event.target.value);
  }

  // track option change
  const handleOptionChange = (event) => {
    // updates state to option selected by user
    setOptionChoice(event.target.value);
  }

  // form submit
  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    const dbRef = firebase.database().ref();

    // store user input in database
    const bookInfo = { userInput, optionChoice }
    console.log(bookInfo)
  }
  
  // useEffect(() => {
  //   // reference the databse
  //   const dbRef = firebase.database().ref();
    
  //   //add event listener to watch for changes to the database
  //   dbRef.on("value", (response) => {
  //   })

  // }, []);

  return(
    <form action="submit" onSubmit={handleFormSubmit}>
      <label htmlFor="bookTitle">Add a book to your collection</label>
      <input 
        type="text" 
        id="bookTitle" 
        placeholder="Enter a title"
        onChange={handleInputChange}
        value={userInput}
      />

      <label htmlFor="readStatus">Choose a bookshelf</label>
      <select name="readStatus" id="readStatus" onChange={handleOptionChange}>
        <option value="">- Select one -</option>
        <option value="read">Read</option>
        <option value="toRead">To Read</option>
        <option value="currentlyReading">Currently Reading</option>
      </select>

      <button>Add book</button>
    </form>
  )
}

export default BookForm;