import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Support from "./components/Support/Support";
import BodyContainer from "./components/BodyContainer/BodyContainer";
import List from "./components/List.js/list";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Login/Signup";
import Footer from "./components/Footer/Footer";


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<BodyContainer />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/Signup" element={<Signup />}></Route>
          <Route path="/Support" element={<Support />}></Route>
          <Route path="/list" element={<List />}></Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
