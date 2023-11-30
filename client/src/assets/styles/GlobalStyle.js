import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300&display=swap');
  @import url("https://fonts.googleapis.com/css2?family=Nunito:wght@200&family=Roboto:wght@100;300&display=swap");

body, html {
  height: 100%;
  margin: 0;
  font-family: 'Roboto';
  overflow-x: hidden;
  h2,h2,h3{
    font-family: "Roboto", sans-serif;
  }

 
  background: linear-gradient(to bottom, #add8e6, #d8bfd8); 

  margin: 0;
  font-family: 'Roboto', sans-serif;
  color: "black";



}

`;

export { GlobalStyle };
