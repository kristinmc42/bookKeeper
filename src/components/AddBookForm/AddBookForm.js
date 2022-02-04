import firebase from "../../firebase.js";
import "./AddBookForm.scss";
import Button from "../Button/Button.js";
import { useState } from "react";
import Card from "../Card/Card.js";
import Select from "../Select/Select.js";




function AddBookForm () {
  // set state for showing form
  const [ showForm , setShowForm ] = useState(false);
  // set state for user input
  const [ userInput, setUserInput ] = useState("");
  const [ optionChoice, setOptionChoice ] = useState("");

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
    if (userInput && optionChoice){
      const bookID = dbRef.push().getKey();
      const bookInfo = { title: userInput, category: optionChoice };
      console.log(bookInfo);
  
     

      // store book info in database
      dbRef.child(bookID).set(bookInfo).then(() => {
        // clear values of state
        setUserInput("");
        setOptionChoice("");
        setShowForm(false);
      })
      .catch((error) => {
        console.log(error);
      });

    }

  }
  

  return(
    <>

   


    {
      showForm
      ?
      <Card className="addBookForm">

        <form action="submit" onSubmit={handleFormSubmit}>
          <label htmlFor="bookTitle">Add a book to your collection</label>
          <input 
            type="text" 
            id="bookTitle" 
            placeholder="Enter book title"
            onChange={handleInputChange}
            value={userInput}
            />

          <label htmlFor="readStatus">Choose a bookshelf</label>
          {/* <select name="readStatus" id="readStatus" onChange={handleOptionChange}>
            <option value="">- Select one -</option>
            <option value="read">Read</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="toRead">To Read</option>
          </select> */}
          <Select name="readStatus" id="readStatus" onChange={handleOptionChange} />
          <Button text="Add book" className="addBookButton" />

          <Button text="cancel" onClick={() => setShowForm(false)} className="cancelButton"/>
        </form>
      </Card>

      :  <Button text="Add a book" onClick={() => setShowForm(true)} className="stickyButton"/>
    }
    </>
  )
}

export default AddBookForm;