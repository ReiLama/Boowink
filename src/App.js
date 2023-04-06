import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Card from "./components/Featured_content/Featured";
import Tab from "./components/Tab/Tab";
import Login from "./components/Login/Login";
import Support from "./components/Support/Support";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Tab />
      <Card />
      <Login />
      <Footer />
      <Support/>
    </div>
  );
}

export default App;
