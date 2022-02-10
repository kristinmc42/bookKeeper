import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import AddBookForm from "./components/AddBookForm/AddBookForm";
import ChooseBookshelf from "./components/ChooseBookshelf/ChooseBookshelf";
import DeleteTitle from "./components/DeleteTitle/DeleteTitle";
import Home from "./components/Home/Home";
import MoveTitle from "./components/MoveTitle/MoveTitle";



function App() {
  return (
    <>
    <Router>
      <div className="pageContainer">
        <header>
          <h1>Book Keeper</h1>
        </header>

        <main>
          {/* <Home />    */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/addBook" element={<AddBookForm />} />
          <Route exact path="/addBook/chooseBookshelf" element={<ChooseBookshelf />} />
          <Route exact path="/deleteBook" element={<DeleteTitle />} />
          <Route exact path="/moveBook" element={<MoveTitle />} />
          <Route>{"404"}</Route>
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
