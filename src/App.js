import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import AddBookForm from "./components/AddBookForm/AddBookForm";
import DeleteTitle from "./components/DeleteTitle/DeleteTitle";
import Home from "./components/Home/Home";
import MoveBookForm from "./components/MoveBookForm/MoveBookForm";



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
          <Route  path="/" element={<Home />} />
          <Route  path="/addBook" element={<AddBookForm />} />
       
          <Route  path="/deleteBook" element={<DeleteTitle />} />
          <Route  path="/moveBook/:id" element={<MoveBookForm />} />
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
