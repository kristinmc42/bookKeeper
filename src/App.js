// app component has header, Routes and footer

import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.scss";
import AddBookForm from "./components/AddBookForm/AddBookForm";
import DeleteBookForm from "./components/DeleteBookForm/DeleteBookForm";
import Home from "./components/Home/Home";
import MoreInfo from "./components/MoreInfo/MoreInfo";
import MoveBookForm from "./components/MoveBookForm/MoveBookForm";
import ScrollToTop from "react-scroll-to-top";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";



function App() {
  return (
    <>
    <Router>
      <div className="pageContainer">
        <ScrollToTop smooth component={<><FontAwesomeIcon icon={faAngleUp} /><p>TOP</p></>} style={{left: "-75%", background:"lightgrey", border: "2px solid grey"}}/>
        <header>
          <div className="wrapper">
            <h1>Book Keeper</h1>
            <p>Keep track of the books you have read, are currently reading, as well as your wishlist of books you want to read. </p>
            <Link className="link addBook" to="/addBook">Add a book</Link>
          </div>
        </header>

        <main>
        <Routes>
          <Route  path="/" element={<Home />} />
          <Route  path="/addBook" element={<AddBookForm />} />
          <Route path="/moreInfo/:id" element={<MoreInfo />}/>
          <Route  path="/moveBook/:id" element={<MoveBookForm />} />
          <Route  path="/deleteBook/:id" element={<DeleteBookForm />} />
        </Routes>
        </main>

        <footer>
          <p>Designed by Kristin McCollum</p>
        </footer>
      </div>
    </Router>
    </>
  );
}

export default App;
