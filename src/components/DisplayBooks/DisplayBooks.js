// this component takes an array of books as a prop
// each book in the array is sorted by category and put in a new array based on the category
// these new arrays are set in state
// each are mapped through to display an image of each title according to their categories
// links are displayed for each title for more info, to move or to delete the title


import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./DisplayBooks.scss";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faCompress } from "@fortawesome/free-solid-svg-icons";

function DisplayBooks({ allBooks }){
  // initialize state for arrays of books by category
  const [ readBooks, setReadBooks ] = useState([]);
  const [ booksToRead, setBooksToRead ] = useState([]);
  const [ booksCurrentlyReading, setBooksCurrentlyReading ] = useState ([]);
  // initialize state for showing or hiding bookshelves for each category
  const [ showRead, setShowRead ] = useState(false);
  const [ showCurrentlyReading, setShowCurrentlyReading ] = useState(false);
  const [ showToRead, setShowToRead ] = useState(false);

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
    <div className="bookshelfContainer">
      <h2>My Books</h2>
      <ul className="bookshelf">
        <li>
          <div className="bookshelfTitle">
            <h3>Read</h3>
            {/* displays number of titles */}
            <div className="bookshelfDetails">
              {
                readBooks && <h4>{readBooks.length} titles</h4>
              }
              {/* expand or minimize bookshelves */}
              <Button 
                className="expand"
                onClick={() => {showRead ?setShowRead(false) :setShowRead(true)}} 
                text={showRead 
                    ? <>< span className="srOnly">Expand read bookshelf</span><FontAwesomeIcon icon={faCompress} /></> 
                    : <><span className="srOnly">Minimize read bookshelf</span><FontAwesomeIcon icon={faExpand} /></>}/>
            </div>
          </div>
          {
            showRead
            
            ?<ul className="bookshelf read">
              {
                readBooks
                ? readBooks.map((readBook) => {
                  return(
                    <li key={readBook.bookID}>
                      <img src={readBook.bookInfo.image} alt={readBook.bookInfo.title} />
                      <p className="title">{readBook.bookInfo.title}</p>
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
            : null
          }
        </li>
        <li>
          <div className="bookshelfTitle">
            <h3>Currently Reading</h3>
            <div className="bookshelfDetails">
              {/* displays number of titles */}
              {
                booksCurrentlyReading && <h4>{booksCurrentlyReading.length} titles</h4>
              }
              {/* expand or minimize bookshelves */}
                <Button 
                  className="expand" 
                  onClick={() => {showCurrentlyReading ? setShowCurrentlyReading(false) : setShowCurrentlyReading(true)}} 
                  text={showCurrentlyReading
                    ? <>< span className="srOnly">Expand currently reading bookshelf</span><FontAwesomeIcon icon={faCompress} /></> 
                    : <><span className="srOnly">Minimize currently reading bookshelf</span><FontAwesomeIcon icon={faExpand} /></>} 
                  />
            </div>
          </div>
          {
            showCurrentlyReading

             ? <ul className="bookshelf currentlyReading">
                {
                  booksCurrentlyReading
                  ? booksCurrentlyReading.map((currentBook) => {
                    return(
                      <li key={currentBook.bookID}>
                        <img src={currentBook.bookInfo.image} alt={currentBook.bookInfo.title} />
                        <p className="title">{currentBook.bookInfo.title}</p>
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
              : null
          }
        </li>
        <li>
          <div className="bookshelfTitle">
            <h3>To Read</h3>
            <div className="bookshelfDetails">
              {/* displays number of titles */}
              {
                booksToRead && <h4>{booksToRead.length} titles</h4>
              }
              {/* expand or minimize bookshelves */}
              <Button 
                className="expand" 
                onClick={() => {showToRead ?setShowToRead(false) :setShowToRead(true)}} 
                text={showToRead 
                  ? <>< span className="srOnly">Expand to read bookshelf</span><FontAwesomeIcon icon={faCompress} /></> 
                  : <><span className="srOnly">Minimize to read bookshelf</span><FontAwesomeIcon icon={faExpand} /></>} 
              />
            </div>
          </div>
          {
            showToRead
              ? <ul className="bookshelf toRead">
                  {
                    booksToRead
                    ? booksToRead.map((toReadBook) => {
                      return(
                        <li key={toReadBook.bookID}>
                          <img src={toReadBook.bookInfo.image} alt={toReadBook.bookInfo.title} />
                          <p className="title">{toReadBook.bookInfo.title}</p>
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
              : null
          }
        </li>
      </ul>
     
    </div>
  )
}

export default DisplayBooks;