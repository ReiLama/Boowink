import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import BodyContainer from "./components/BodyContainer/BodyContainer";
import List from "./components/List.js/list";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<BodyContainer />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/list" element={<List />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
