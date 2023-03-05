import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Card from "./components/Featured_content/Featured";
import Tab from "./components/Tab/Tab";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Tab />
      <Card />
      <Footer />
    </div>
  );
}

export default App;
