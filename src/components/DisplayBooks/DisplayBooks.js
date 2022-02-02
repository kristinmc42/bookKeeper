import { useState, useEffect } from "react";
import DeleteTitle from "../DeleteTitle/DeleteTitle";
import MoveTitle from "../MoveTitle/MoveTitle";
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

    console.log(readBooks, booksToRead, booksCurrentlyReading)
    // go through array of books whenever there is a change in props and sort each book by category
    allBooks.forEach((book) => {
      console.log("Displaying books")
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
                    <p>{readBook.bookInfo.title}</p>
                    <div className="bookButtons">
                      <DeleteTitle id={readBook.bookID}/>
                      <MoveTitle id={readBook.bookID} title={readBook.bookInfo.title}/>
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
                    <p>{currentBook.bookInfo.title}</p>
                    <div className="bookButtons">
                      <DeleteTitle id={currentBook.bookID}/>
                      <MoveTitle id={currentBook.bookID} title={currentBook.bookInfo.title}/>
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
                    <p>{toReadBook.bookInfo.title}</p>
                    <div className="bookButtons">
                      <DeleteTitle id={toReadBook.bookID}/>
                      <MoveTitle id={toReadBook.bookID} title={toReadBook.bookInfo.title}/>
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