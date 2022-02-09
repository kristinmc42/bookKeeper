
function DisplayTitleOptions({ id, title, authors, image, alt }) {
 
  return(

    <div className="bookInfo">
      { image 
      ? <img src={image} alt={alt} />
      : null
      }
      <p>{title}</p>
      {
        authors
        ?
        authors.map(author => {
          return(
            
            <p key={id + author}>By: {author}</p>
            )
          })
        :null
        }
    </div>

  )
}


export default DisplayTitleOptions;