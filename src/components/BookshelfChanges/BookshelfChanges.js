import React from "react";
import Button from "../Button/Button";

function BookshelfChanges() {
  return(
    <>
      <ul className="bookshelfChanges">
        <li><Button text="Add book"/></li>
        <li><Button text="Move book"/></li>
        <li><Button text="Delete book"/></li>
      </ul>
    </>
  )
}

export default BookshelfChanges;