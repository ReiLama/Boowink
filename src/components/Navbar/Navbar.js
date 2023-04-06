import "../CSS/main.css";
import BasicSelect from "./BasicSelect/BasicSelect";
import SearchIcon from "@mui/icons-material/Search";

import * as React from "react";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";

const Navbar = () => {
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  return (
    <header>
      <h3 className="logo">BooWink</h3>
      <nav>
        <BasicSelect />
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
      {/* <div class="search-container"> */}
      {/* <input type="text" placeholder="Search..." />
        <button>
          <SearchIcon />
        </button> */}
      <Box sx={{ my: 2 }}>
        <Search className="search-mui">
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </Box>
      {/* </div> */}

      <nav>
        <a href="/#">HOME</a>
        <a href="/#">MY TRIPS</a>
        <a href="/#">SUPPORT</a>
        <a href="/#">SIGN IN</a>
        <button className="nav-btn nav-close-btn"></button>
      </nav>
      <button className="nav-btn"></button>
    </header>
  );
};

export default Navbar;
