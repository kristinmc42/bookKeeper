import React from "react";
import "./App.scss";
import Home from "./components/Home/Home";



function App() {
  return (
    <>
      <div className="pageContainer">
        <header>
          <h1>Book Keeper</h1>
        </header>

        <main>
          <Home />   
        </main>

        <footer>
          <p>Designed by Kristin McCollum</p>
        </footer>
      </div>
    </>
  );
}

export default App;
