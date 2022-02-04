import Button from "../Button/Button";


function SearchBookTitle({ onChange , value }) {
  return (
    <form action="submit">
      <label htmlFor="bookTitle">Add a book to your collection</label>
      <input 
        type="text" 
        id="bookTitle" 
        placeholder="Enter book title"
        onChange={onChange}
        value={value}
        />
      <Button text="Find book" className="findBookButton" />
    </form>
  )
}


export default SearchBookTitle;