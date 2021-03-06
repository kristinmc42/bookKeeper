// app component has header, Routes and footer

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Typewriter from "typewriter-effect";
import ScrollToTop from "react-scroll-to-top";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import "./App.scss";
import AddBookForm from "./components/AddBookForm/AddBookForm";
import DeleteBookForm from "./components/DeleteBookForm/DeleteBookForm";
import Home from "./components/Home/Home";
import MoreInfo from "./components/MoreInfo/MoreInfo";
import MoveBookForm from "./components/MoveBookForm/MoveBookForm";



function App() {
  return (
    <>
    <Router>
      <div className="pageContainer">
        <header>
          <div className="wrapper">
            <h1>Book Keeper</h1>
            <Typewriter 
              onInit={(typewriter) => {
                typewriter.typeString("Keep track of books you have read").pauseFor(1000).deleteAll().typeString("are currently reading").pauseFor(1000).deleteAll().typeString("or want to read").pauseFor(1500).deleteAll().start()
              }}
            />
          </div>
        </header>


        <main>
        <Routes>
          <Route  path="/" element={<Home />} />
          <Route  path="/addBook" element={<AddBookForm />} />
          <Route  path="/moreInfo/:id" element={<MoreInfo />}/>
          <Route  path="/moveBook/:id" element={<MoveBookForm />} />
          <Route  path="/deleteBook/:id" element={<DeleteBookForm />} />
        </Routes>
        {/* scroll to top button */}
        <ScrollToTop smooth component={<><FontAwesomeIcon icon={faAngleUp} /><p>TOP</p></>}  />
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
