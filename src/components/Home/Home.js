import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";
import DisplayBooks from "../DisplayBooks/DisplayBooks.js";
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
          // console.log(data[property])
          newState.push({
            bookInfo: data[property],
            bookID: property
          });
        }
        setBooks(newState);
      });
    }, []);

  return(
    <div className="wrapper">
      <Link className="link" to="/addBook">Add a book</Link>
      <DisplayBooks allBooks={ books }/>
    </div>
  )
}

export default Home;