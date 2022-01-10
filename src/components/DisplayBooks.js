import { useState, useEffect } from "react";

function DisplayBooks({ allBooks }){
  const [ readBooks, setReadBooks ] = useState([]);
  const [ booksToRead, setBooksToRead ] = useState([]);
  const [ booksCurrentlyReading, setBooksCurrentlyReading ] = useState ([]);

  useEffect(() => {
    console.log(allBooks)
    setReadBooks([]);
    setBooksToRead([]);
    setBooksCurrentlyReading([]);
    const newToReadArray = [];
    const newReadArray = [];
    const newCurrentlyReadingArray = [];


      allBooks.forEach((book) => {
        console.log(book, book.bookInfo.category)
        if (book.bookInfo.category === "read"){
          // const newReadArray = [...readBooks, book]
          newReadArray.push(book);
          setReadBooks(newReadArray);
          console.log(newReadArray)
        }else if (book.bookInfo.category === "toRead"){
          // const newToReadArray = [...booksToRead, book];
          newToReadArray.push(book)
          setBooksToRead(newToReadArray);
          console.log(newToReadArray)
        }else if (book.bookInfo.category === "currentlyReading"){
          // const newCurrentlyReadingArray = [...booksCurrentlyReading, book];
          newCurrentlyReadingArray.push(book);
          setBooksCurrentlyReading(newCurrentlyReadingArray);
          console.log(newCurrentlyReadingArray)
        }
      })
  }, [allBooks])

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
            console.log(currentBook)
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
            console.log(toReadBook);
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