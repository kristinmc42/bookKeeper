
import Card from "../Card/Card";
import { useState, useEffect } from "react";
import { Link,  useParams } from "react-router-dom";
import firebase from "../../firebase";
import "./MoreInfo.scss";

function MoreInfo() {
  // init state for bookInfo
  const [ bookInfo, setBookInfo ] = useState({});

  // init use params
  const { id } = useParams();

  // get info from database on rendering
  useEffect(() => {
    // get item from the database using the book id
    const dbItem = firebase.database().ref(id);
  
    // get the book information and save in state
    dbItem.get().then((snapshot) => {
      if (snapshot.exists()){
        const book = snapshot.val();
        setBookInfo(book);
        console.log(book);
      }
    }).catch((error) => {
      console.log(error);
    })
  }, [id])

  return(
    <>
  
     <Card className="moreInfo">
      < div className="moreInfoContainer">
          {
          bookInfo
          ?<>
            <img src={bookInfo.image} alt={bookInfo.alt} />

            <h2>{bookInfo.title}</h2>

            {/* display authors */}
            {
              bookInfo.authors && bookInfo.authors.length > 0
              // if there is only one author
              ? bookInfo.authors.length === 1
                ?  bookInfo.authors.map(author => {
                  return(
                    <h3 key={id + author}>By: {author}</h3>
                  )
                })
                // if there is more than one author
                : <>
                  <h3>By: <span></span>
                  {
                    bookInfo.authors.map((author, index) => {
                      return(
                        <>
                        {author}
                        {
                          //  prints a comma after the author unless it is the last one in the array
                        index < bookInfo.authors.length -1
                        ?<span>, </span>
                        
                        :null
                        }
                       </>
                      )
                    })
                  }
                  </h3>
                </>
              // if no authors
              :null
              }

            {/* display genres */}
            { bookInfo.genres
              ?bookInfo.genres.map(genre => {
                return(
                  <h4 key={bookInfo.id + genre}>Genre: {genre}</h4>
                )
              })
              :null
            }

            <h4>Page count: {bookInfo.pageCount ?bookInfo.pageCount :"not availible"}</h4>

            <p><span className="bold">Description:</span> {bookInfo.description ?bookInfo.description :"not availible"}</p> 
          </>
          :null
          }

        <Link className="cancel" to="/">Close</Link>
        </div>
      </Card>
    </>
  )
}

export default MoreInfo;