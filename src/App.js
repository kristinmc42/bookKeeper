// app component has header, Routes and footer

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import Typewriter from "typewriter-effect";
import AddBookForm from "./components/AddBookForm/AddBookForm";
import DeleteBookForm from "./components/DeleteBookForm/DeleteBookForm";
import Home from "./components/Home/Home";
import MoreInfo from "./components/MoreInfo/MoreInfo";
import MoveBookForm from "./components/MoveBookForm/MoveBookForm";
// import ScrollToTop from "react-scroll-to-top";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleUp } from "@fortawesome/free-solid-svg-icons";



function App() {
  return (
    <>
    <Router>
      <div className="pageContainer">
        {/* <ScrollToTop smooth component={<><FontAwesomeIcon icon={faAngleUp} /><p>TOP</p></>} style={{left: "-75%", background:"white", border: "2px solid grey"}}/> */}
        {/* <ScrollToTop smooth component={<><FontAwesomeIcon icon={faAngleUp} /><p>TOP</p></>} color="#ffffff" style={{left: "-75%"}}/> */}
        <header>
          <div className="wrapper">
            <h1>Book Keeper</h1>
            <Typewriter 
              onInit={(typewriter) => {
                typewriter.typeString("Keep track of the books you have read").pauseFor(2000).deleteAll().typeString("are currently reading").pauseFor(2000).deleteAll().typeString("or want to read").pauseFor(2000).deleteAll().start()
              }}
            />
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
