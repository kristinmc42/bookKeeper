
function BookForm () {

  return(
    <form action="">
      <label htmlFor="bookTitle">Add a book</label>
      <input type="text" id="bookTitle" placeholder="Enter a title"/>
      <label htmlFor="readStatus">Choose a bookshelf</label>
      <select name="readStatus" id="readStatus">
        <option value="none">- Select one -</option>
        <option value="read">Read</option>
        <option value="toRead">To Read</option>
        <option value="currentlyReading">Currently Reading</option>
      </select>
    </form>
  )
}

export default BookForm;