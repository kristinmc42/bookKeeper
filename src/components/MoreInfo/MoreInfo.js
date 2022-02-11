import Button from "../Button/Button";
import Card from "../Card/Card";
import { useState } from "react";
import "./MoreInfo.scss";

function MoreInfo({ book }) {
  // init state for showing more info
  const [ showMoreInfo, setShowMoreInfo ] = useState(false);

  // console.log(book.bookInfo);
  // when user clicks on more info button
  const handleShowMoreInfo = () => {
    setShowMoreInfo(true);
  }

  // when user closes the More info card
  const handleCloseCard = () => {
    setShowMoreInfo(false);
  }

  return(
    <>
    {
      showMoreInfo
      ? <Card className="moreInfo">
          <img src={book.bookInfo.image} alt={book.bookInfo.alt} />
          <h2>{book.bookInfo.title}</h2>
          {
            book.bookInfo.authors
            ? book.bookInfo.authors.map(author => {
              return(
                <h3 key={book.bookInfo.id + author}>By: {author}</h3>
              )
            })
           : null
          }
          { book.bookInfo.genres
            ?book.bookInfo.genres.map(genre => {
              return(
                <h4 key={book.bookInfo.id + genre}>Genre: {genre}</h4>
              )
            })
            :null
          }
          <h4>Page count: {book.bookInfo.pageCount ?book.bookInfo.pageCount :null}</h4>
          <p>Description: {book.bookInfo.description ?book.bookInfo.description :null}</p>
          <Button text="close" className="close" onClick={handleCloseCard} />
      </Card>
      
      : <Button text="more info" className="moreInfoButton" onClick={handleShowMoreInfo}/>
    }
    </>
  )
}

export default MoreInfo;