import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Card from "./components/Featured_content/Featured";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Card/>
      <Footer />
    </div>
  );
}

export default App;
