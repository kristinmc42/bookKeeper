import React from "react";
import { useState, useEffect } from "react";
import firebase from "../../firebase";
import DisplayBooks from "../DisplayBooks/DisplayBooks.js";
import AddBookForm from "../AddBookForm/AddBookForm";
import "./Home.scss";


function Home() {
  // init state for array of books
  const [ books, setBooks ] = useState([]);

    useEffect(() => {
      // reference the databse
      const dbRef = firebase.database().ref();
      
      //add event listener to watch for changes to the database
      dbRef.on("value", (response) => {
        // store new state in a variable
        const newState = [];
    
        // store response in a varaiable
        const data = response.val();

        // get values from data object
        for (let property in data){
          newState.push({
            bookInfo: data[property],
            bookID: property
          });
        }
        setBooks(newState);
        console.log(newState)
      });
    }, []);

  return(
    <div className="wrapper">
      <AddBookForm />
      <DisplayBooks allBooks={ books }/>
    </div>
  )
}

export default Home;