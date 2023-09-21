import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { Board } from "./pages/Board/Board";
// import { StandartPage } from "./pages/StandartPage";

function App() {
  const standartPage =
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={standartPage}></Route>
        <Route path="/board" element={<Board />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
