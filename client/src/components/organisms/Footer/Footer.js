import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        padding: "20px",
        backgroundColor: "black",
        color: "white",
        textAlign: "center",
      }}
    >
      <Typography variant="body2">
        © 2024 Autorzy Strony: Dawid Kogut, Kamil Proszek, Miłosz Mazur
      </Typography>
    </Box>
  );
};

export default Footer;
