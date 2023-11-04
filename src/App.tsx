import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Board } from "./pages/Board/Board";

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
