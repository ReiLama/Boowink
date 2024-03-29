import React from 'react';
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Support from "./components/Support/Support";
import BodyContainer from "./components/BodyContainer/BodyContainer";
import HotelDetails from "./components/HotelDetails/HotelDetails";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Login/Signup";
import Footer from "./components/Footer/Footer";
import InsideRoom from "./components/InsideRoom/InsideRoom";
import Forgot from "./components/Login/Forgot";
import ResPass from "./components/Login/ResPass";
import UserProfile from "./components/UserProfile/UserProfile";


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<BodyContainer />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/Signup" element={<Signup />}></Route>
          <Route path="/Forgot" element={<Forgot />}></Route>
          <Route path="/ResPass" element={<ResPass />}></Route>
          <Route path="/Support" element={<Support />}></Route>
          <Route path="/hotel-details" element={<HotelDetails />}>
          <Route path="/hotel-details/:id" element={<HotelDetails />}></Route>
          </Route>
          <Route path="/user-profile" element={<UserProfile />}></Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
