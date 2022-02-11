// this component takes user input to add a book to their collection
// the input is stored in state
// sends the input to the Google Books API which returns 10 titles with that keyword in the title
// the options are stored in state
// when there are options, a list of the options is displayed
// the title, author and image of the 10 options are displayed for the user with another component DisplayTitleOptions as well as a button to select the title
// when the user selects one of the options another form is shown through conditional rendering
// this form let's the user select the bookshelf from a dropdown where they would like to store the selected title
// the selected option is stored in state
// when the form is submitted, the book info is stored in the firebase realtime database
// in the handle submit, the navigation is changed to Home and the user is returned to their book list


import firebase from "../../firebase.js";
import "./AddBookForm.scss";
import Button from "../Button/Button.js";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../Card/Card.js";
import Select from "../Select/Select.js";
import axios from "axios";
import DisplayTitleOptions from "../DisplayTitleOptions/DisplayTitleOptions";




function AddBookForm () {
  // set state for user input
  const [ userInput, setUserInput ] = useState("");
  const [ optionChoice, setOptionChoice ] = useState("");
  // state for search options returned from API
  const [ searchOptions, setSearchOptions ] = useState([]);
  // state for title to add to bookshelf
  const [ bookToAdd, setBookToAdd ] = useState({});
  // state to show form for selecting bookshelf
  const [ showBookshelfSelection, setShowBookshelfSelection ] = useState(false);

  // init history
  let navigate = useNavigate();

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
    console.log("book was selected. bookshelf option should be shown")
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
      console.log(addedBook)
      const bookInfo = {
        id: addedBook.id,
        title: addedBook.volumeInfo.title,
        authors: addedBook.volumeInfo.authors ? addedBook.volumeInfo.authors : null,
        image: addedBook.volumeInfo.imageLinks ? addedBook.volumeInfo.imageLinks.thumbnail :null,
        alt: addedBook.volumeInfo.title,
        genres: addedBook.volumeInfo.categories ? addedBook.volumeInfo.categories :null,
        pageCount: addedBook.volumeInfo.pageCount ?addedBook.volumeInfo.pageCount :null,
        description: addedBook.volumeInfo.description ? addedBook.volumeInfo.description :null,
        category: optionChoice 
      };
  
      // store book info in database
      dbRef.child(bookID).set(bookInfo).then(() => {
        // clear values of state
        setUserInput("");
        setOptionChoice("");
        setBookToAdd({})

        // route back to Home
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }



  return(
    <>
      {
        showBookshelfSelection
        ? <Card className="chooseBookshelf">
          <form action="submit" onSubmit={handleBookshelfFormSubmit}>

            <label htmlFor="readStatus">Choose a bookshelf</label>
            <Select name="readStatus" id="readStatus" onChange={handleOptionChange} />
            <Button text="Add to bookshelf" className="addBookButton" />

            <Link className="cancel" to="/">Cancel</Link>
           </form>
        </Card>

      :<Card className="addBookForm">
        <form action="submit" onSubmit={handleSearchFormSubmit}>
          <label htmlFor="bookTitle">Add a book to your collection</label>
          <input 
            type="text" 
            id="bookTitle" 
            placeholder="Enter book title"
            aria-label="Enter book title"
            onChange={handleInputChange}
            value={userInput}
            />
          <Button text="Find book" className="findBookButton" />
          <Link className="cancel" to="/">Cancel</Link>
        </form>
  

        <ul>
          {/* if there are search options, map through the options and display the info from the API call */}
        {
          searchOptions
          
          ? <Card className="titleOptions">
              {
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
              }
            </Card>
          :null
          }
        </ul>
      </Card>
      }

    </>
  )
}

export default AddBookForm;