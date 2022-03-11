// this component displays book information according to the props it receives


function DisplayTitleOptions({ id, title, authors, image, alt }) {
 
  return(

    <div className="bookInfo">
      { image 
      ? <img src={image} alt={alt} />
      : null
      }
      <p>{title}</p>
      {
        authors && authors.length > 0
        // if there is only one author
        ? authors.length === 1
          ?  authors.map(author => {
            return(
              <p key={id + author}>By: {author}</p>
            )
          })
          // if there is more than one author
          : <>
            <p>By: <span></span>
            {
              authors.map((author, index) => {
                return(
                  <span key={index + author}>
                  {author}
                  {
                    //  prints a comma after the author unless it is the last one in the array
                  index < authors.length -1
                  ?<span>, </span>
                  
                  :null
                  
                  }
                  </span>
                )
              })
            }
            </p>
          </>

        // if no authors
        :null
        }
    </div>

  )
}


export default DisplayTitleOptions;