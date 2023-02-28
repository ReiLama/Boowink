import "../CSS/main.css";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = () => {
  return (
    <header>
      <h3 className="logo">BooWink</h3>
      <nav>
        <p className="more-travel">MORE TRAVEL</p>
      </nav>

      {/* <form className="search-form" action="">
        <input
          type="search"
          placeholder="Search..."
          className="search-input"
        ></input>

        <button type="submit" className="search-button">
          <SearchIcon />
        </button>
      </form> */}
      <div class="search-container">
        <input type="text" placeholder="Search..." />
        <button>
          <SearchIcon />
        </button>
      </div>

      <nav>
        <a href="/#">HOME</a>
        <a href="/#">TRIPS</a>
        <a href="/#">SUPPORT</a>
        <a href="/#">SIGN IN</a>
        <button className="nav-btn nav-close-btn"></button>
      </nav>
      <button className="nav-btn"></button>
    </header>
  );
};

export default Navbar;
