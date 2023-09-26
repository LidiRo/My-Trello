import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Board } from "./pages/Board/Board";
import { Home } from "./pages/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/board/:board_id" element={<Board />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
