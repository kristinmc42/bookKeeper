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


import "./AddBookForm.scss";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import firebase from "../../firebase.js";
import Button from "../Button/Button.js";
import Cancel from "../Cancel/Cancel.js";
import Card from "../Card/Card.js";
import DisplayTitleOptions from "../DisplayTitleOptions/DisplayTitleOptions";
import ErrorMessage from "../ErrorMessage/ErrorMessage.js";
import Select from "../Select/Select.js";



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
  // init state for error found
  const [ errorFound, setErrorFound ] = useState(false);

  // init history
  let navigate = useNavigate();

  // init ref 
  const titleRef = useRef(null);

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
    // clear error message
    setErrorFound(false);

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
        const returnedData = response.data;

        // check that there is information in the array
        if (returnedData.totalItems > 0){
          const options = [...returnedData.items]
          setSearchOptions(options);
        }else {
          // if there is an error (no info) with the data returned from the API
           setErrorFound(true);
        }
        
        // clear input field
        setUserInput("");
      })
      .catch(error => {
        console.log(error)
        setUserInput("");
        setErrorFound(true);
      })
    }
  }

  // scrolls to title selections after API results displayed
  useEffect(() => {
    if(searchOptions.length > 0){
     titleRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [searchOptions])
  


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
        setBookToAdd({});
        setSearchOptions([]);

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
      {/* displays if error in API call */}
      {
        errorFound
        ? <ErrorMessage />
        : null
      }

      {
        // conditionally renders the form to select a bookshelf once the user has selected a book from the options
        showBookshelfSelection
        ? <Card className="chooseBookshelf">
          <form action="submit" onSubmit={handleBookshelfFormSubmit}>

            <label htmlFor="readStatus">Choose a bookshelf</label>
            <Select name="readStatus" id="readStatus" onChange={handleOptionChange} />
            <Button text="Add to bookshelf" className="addBookButton" />

            <Cancel />
           </form>
        </Card>

      // by default on initial rendering, shows the form to get user input which will be sent to the API 
      :<>
        <Card className="addBookForm">
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
            <Cancel />
          </form>
        </Card>
  

        {/* if there are search options, map through the options and display the info from the API call */}
        {
          searchOptions.length > 0
          ? <Card className="titleOptions" >
              <ul className="titleOptions" ref={titleRef}>
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
              </ul>
            </Card>
          :null
        
        }
      </>
      }
    </>
  )
}

export default AddBookForm;