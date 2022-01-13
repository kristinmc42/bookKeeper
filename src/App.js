import firebase from "./firebase.js";
import "./App.scss";
import { useState, useEffect } from "react";

// components
import AddBookForm from "./components/AddBookForm/AddBookForm";
import DisplayBooks from "./components/DisplayBooks/DisplayBooks";
import Card from "./components/Card/Card.js";


function App() {
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
  return (
    <>
    <header>
      <h1>Book Keeper</h1>
    </header>
    <main>
      <DisplayBooks allBooks={ books }/>
      <Card className="addBook">
        <AddBookForm />
      </Card>
    </main>
    <footer>
      <p>Designed by Kristin McCollum</p>
    </footer>
    </>
  );
}

export default App;
