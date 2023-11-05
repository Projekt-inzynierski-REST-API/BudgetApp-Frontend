import React from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar() {
  return (
    <TextField
      variant="outlined"
      placeholder="Search transaction..."
      InputProps={{
        startAdornment: <SearchIcon style={{ color: "gray" }} />,
      }}
      style={{ width: "350px", margin: "10px" }}
    />
  );
}

export default SearchBar;
