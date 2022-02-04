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
    })
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


  // form submit to select bookshelf
  const handleBookshelfFormSubmit = (event) => {
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
        {/* <SearchBookTitle onChange={handleInputChange} value={userInput} /> */}

        <ul className="titleOptions">
        {
          searchOptions
          ?
          searchOptions.map(optionItem => {
            return(
        
              <li  key={optionItem.id}>
                <DisplayTitleOptions 
                  id={optionItem.id}
                  title={optionItem.volumeInfo.title}
                  authors={optionItem.volumeInfo.authors}
                  image={optionItem.volumeInfo.imageLinks.thumbnail}
                  alt={optionItem.volumeInfo.title}
                />
                <Button className="selectedTitle"  text="Choose Book" value={optionItem.id} onClick={handleBookSelected}/>
              </li>
             
              )
            })
            :null
          }
        </ul>

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