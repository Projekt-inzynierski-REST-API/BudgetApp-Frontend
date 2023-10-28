import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`


html{
    box-sizing: border-box;
}

*,*::after,*::before{
    box-sizing: inherit;
}

body {
  background-color: #eeeeee;
  margin: 0;
  padding: 0;
}

`;

export { GlobalStyle };
