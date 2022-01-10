import { useState, useEffect } from "react";

function DisplayBooks({ allBooks }){
  const [ readBooks, setReadBooks ] = useState([]);
  const [ booksToRead, setBooksToRead ] = useState([]);
  const [ booksCurrentlyReading, setBooksCurrentlyReading ] = useState ([]);

  useEffect(() => {
    console.log(allBooks)
      allBooks.forEach((book) => {
        console.log(book, book.bookInfo.category)
        if (book.bookInfo.category === "read"){
          setReadBooks(...readBooks, book);
          console.log(readBooks)
        }else if (book.bookInfo.category === "toRead"){
          console.log("inside toRead else if")
          setBooksToRead(...booksToRead, book);
          console.log(booksToRead)
        }else if (book.bookInfo.category === "currentlyReading"){
          setBooksCurrentlyReading(...booksCurrentlyReading, book);
          console.log(booksCurrentlyReading)
        }
      })
  }, [])

  return(
    <>
      <h2>My Books</h2>
      <h3>Read</h3>
      <ul>
        {
          readBooks
          ? readBooks.map((readBook) => {
            return(
              <li key={readBook.bookID}>
                <p>{readBook.bookInfo.title}</p>
              </li>
            )
          })
          : null
        }
      </ul>
      <h3>Currently Reading</h3>
      <ul>
        {
          booksCurrentlyReading
          ? booksCurrentlyReading.map((currentBook) => {
            return(
              <li key={currentBook.bookID}>
                <p>{currentBook.bookInfo.title}</p>
              </li>
            )
          })
          : null
        }
      </ul>
      <h3>To Read</h3>
      <ul>
        {
          booksToRead
          ? booksToRead.map((toReadBook) => {
            return(
              <li key={toReadBook.bookID}>
                <p>{toReadBook.bookInfo.title}</p>
              </li>
            )
          })
          : null
        }
      </ul>
    </>
  )
}

export default DisplayBooks;