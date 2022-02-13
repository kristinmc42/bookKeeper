// this component takes an array of books as a prop
// each book in the array is sorted by category and put in a new array based on the category
// these new arrays are set in state
// each are mapped through to display an image of each title according to their categories
// links are displayed for each title for more info, to move or to delete the title


import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./DisplayBooks.scss";

function DisplayBooks({ allBooks }){
  // initialize state
  const [ readBooks, setReadBooks ] = useState([]);
  const [ booksToRead, setBooksToRead ] = useState([]);
  const [ booksCurrentlyReading, setBooksCurrentlyReading ] = useState ([]);

  useEffect(() => {
    // initialize arrays for storing books to put into state
    const newToReadArray = [];
    const newReadArray = [];
    const newCurrentlyReadingArray = [];

    // clear state
    setReadBooks([]);
    setBooksToRead([]);
    setBooksCurrentlyReading([]);

   
    // go through array of books whenever there is a change in props and sort each book by category
    allBooks.forEach((book) => {
      // console.log(book)
      if (book.bookInfo.category === "read"){
        newReadArray.push(book);
        setReadBooks(newReadArray);
        
      }else if (book.bookInfo.category === "toRead"){
        newToReadArray.push(book)
        setBooksToRead(newToReadArray);
        
      }else if (book.bookInfo.category === "currentlyReading"){
        newCurrentlyReadingArray.push(book);
        setBooksCurrentlyReading(newCurrentlyReadingArray);
      }
    })
  }, [allBooks]);


  return(
    <>
      <h2>My Books</h2>
      <ul className="bookshelf">
        <li>
          <h3>Read</h3>
          <ul className="bookshelfRead">
            {
              readBooks
              ? readBooks.map((readBook) => {
                return(
                  <li key={readBook.bookID}>
                    <img src={readBook.bookInfo.image} alt={readBook.bookInfo.title} />

                    <div className="bookButtons">
                      <Link className="link" to={`/moreInfo/${readBook.bookID}`}>More Info</Link>
                      <Link className="link" to={`/moveBook/${readBook.bookID}`}>Move</Link>
                      <Link className="link" to={`/deleteBook/${readBook.bookID}`}>Delete</Link>
                    </div>
                  </li>
                )
              })
              : null
            }
          </ul>
        </li>
        <li>
          <h3>Currently Reading</h3>
          <ul className="bookshelfCurrentlyReading">
            {
              booksCurrentlyReading
              ? booksCurrentlyReading.map((currentBook) => {
                return(
                  <li key={currentBook.bookID}>
                    <img src={currentBook.bookInfo.image} alt={currentBook.bookInfo.title} />

                    <div className="bookButtons">
                      <Link className="link" to={`/moreInfo/${currentBook.bookID}`}>More Info</Link>
                      <Link className="link" to={`/moveBook/${currentBook.bookID}`}>Move</Link>
                      <Link className="link" to={`/deleteBook/${currentBook.bookID}`}>Delete</Link>
                    </div>
                  </li>
                )
              })
              : null
            }
          </ul>
        </li>
        <li>
          <h3>To Read</h3>
          <ul className="bookshelfToRead">
            {
              booksToRead
              ? booksToRead.map((toReadBook) => {
                return(
                  <li key={toReadBook.bookID}>
                    <img src={toReadBook.bookInfo.image} alt={toReadBook.bookInfo.title} />

                    <div className="bookButtons">
                      <Link className="link" to={`/moreInfo/${toReadBook.bookID}`}>More info</Link>
                      <Link className="link" to={`/moveBook/${toReadBook.bookID}`}>Move</Link>
                      <Link className="link" to={`/deleteBook/${toReadBook.bookID}`}>Delete</Link>
                    </div>
                  </li>
                )
              })
              : null
            }
          </ul>
        </li>
      </ul>
     
    </>
  )
}

export default DisplayBooks;