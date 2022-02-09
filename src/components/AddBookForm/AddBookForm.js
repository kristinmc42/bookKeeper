import firebase from "../../firebase.js";
import "./AddBookForm.scss";
import Button from "../Button/Button.js";
import { useState } from "react";
import Card from "../Card/Card.js";
import Select from "../Select/Select.js";
import SearchBookTitle from "../SearchBookTitle/SearchBookTitle.js";
import axios from "axios";
import DisplayTitleOptions from "../DisplayTitleOptions/DisplayTitleOptions";




function AddBookForm () {
  // set state for showing form
  const [ showForm , setShowForm ] = useState(false);
  // set state for user input
  const [ userInput, setUserInput ] = useState("");
  const [ optionChoice, setOptionChoice ] = useState("");
  // state for search options returned from API
  const [ searchOptions, setSearchOptions ] = useState([]);
  // state for title to add to bookshelf
  const [ bookToAdd, setBookToAdd ] = useState({});
  // state to show form for selecting bookshelf
  const [ showBookshelfSelection, setShowBookshelfSelection ] = useState(false);

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

  // form submit to search title in Google Books API
  const handleSearchFormSubmit = (event) => {
    event.preventDefault();
    // clear previous search options 
    setSearchOptions([]);
    // clear book to add
    setBookToAdd({});

    if (userInput){

      // call API to search title
      axios({
        url: "https://www.googleapis.com/books/v1/volumes",
        method: "GET",
        responseType: "json",
        params: {
          key: process.env.REACT_APP_GOOGLE_API_KEY,
          q: userInput
        }
      })
      .then(response => {
        // save array of items in variable
        const options = [...response.data.items];
        
        setSearchOptions(options);
        // clear input field
        setUserInput("");
      })
      .catch(error => {
        console.log(error)
        setUserInput("");
        return (
          <p className="errorMessage">Sorry. There was an error. Please try again.</p>
        )
      })
    }
  }

  // when user selects a title from the options to add to a bookshelf
  const handleBookSelected = (event) => {
    // find the option info that matches the selected id
    const chosenTitle = searchOptions.filter(option => option.id === event.target.value);
    
    // save the selected book to state
    setBookToAdd(chosenTitle);

    // clear the search options
    setSearchOptions([]);

    //show the bookshelf category selection
    setShowBookshelfSelection(true);
  }


  // form submit to select bookshelf category based on user's selection (after a title has been selected)
  const handleBookshelfFormSubmit = (event) => {
    event.preventDefault();
    
    const dbRef = firebase.database().ref();

    // store user input in database if user has selected an option
    if (optionChoice && bookToAdd){
      const bookID = dbRef.push().getKey();
      const addedBook = bookToAdd[0];
    
      const bookInfo = {
        id: addedBook.id,
        title: addedBook.volumeInfo.title,
        authors: addedBook.volumeInfo.authors ? addedBook.volumeInfo.authors : null,
        image: addedBook.volumeInfo.imageLinks ? addedBook.volumeInfo.imageLinks.thumbnail :"No image",
        alt: addedBook.volumeInfo.title,
        category: optionChoice 
      };
  
      // store book info in database
      dbRef.child(bookID).set(bookInfo).then(() => {
        // clear values of state
        setUserInput("");
        setOptionChoice("");
        setBookToAdd({})
        setShowForm(false);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  // when user clicks cancel to close the add book form
  const handleCloseForm = () => {
    // set state to hide form 
    setShowForm(false);
    // clear state for user input and option choice
    setUserInput("");
    setOptionChoice("");
    // clear previous search options 
    setSearchOptions([]);
  }
  

  return(
    <>
    {/* shows either the Add book button or the form to add book to collection */}
    {
      showForm
      ?
      <Card className="addBookForm">
        <form action="submit" onSubmit={handleSearchFormSubmit}>
          <label htmlFor="bookTitle">Add a book to your collection</label>
          <input 
            type="text" 
            id="bookTitle" 
            placeholder="Enter book title"
            onChange={handleInputChange}
            value={userInput}
            />
          <Button text="Find book" className="findBookButton" />
        </form>
        <Button text="cancel" className="cancelFindBook" onClick={handleCloseForm}/>
        {/* <SearchBookTitle onChange={handleInputChange} value={userInput} /> */}

        <ul className="titleOptions">
          {/* if there are search options, map through the options and display the info from the API call */}
        {
          searchOptions
          ?
          searchOptions.map(optionItem => {
           
            return(
        
              <li  key={optionItem.id}>
                <DisplayTitleOptions 
                  id={optionItem.id}
                  title={optionItem.volumeInfo.title}
                  authors={optionItem.volumeInfo.authors ? optionItem.volumeInfo.authors : null}
                  image={optionItem.volumeInfo.imageLinks ? optionItem.volumeInfo.imageLinks.thumbnail :"No image"}
                  alt={optionItem.volumeInfo.title}
                />
                <Button className="selectedTitle"  text="Choose Book" value={optionItem.id} onClick={handleBookSelected}/>
              </li>
             
              )
            })
            :null
          }
        </ul>

        {/* if the user has selected a title from the options the form to select a category will be shown */}
        {
          showBookshelfSelection
          ? 
          <form action="submit" onSubmit={handleBookshelfFormSubmit}>

            <label htmlFor="readStatus">Choose a bookshelf</label>
            <Select name="readStatus" id="readStatus" onChange={handleOptionChange} />
            <Button text="Add to bookshelf" className="addBookButton" />

            <Button text="cancel" onClick={() => setShowForm(false)} className="cancelButton"/>
          </form>
          :null
        }

      </Card>

      :  <Button text="Add a book" onClick={() => setShowForm(true)} className="stickyButton"/>
    }
    </>
  )
}

export default AddBookForm;