import HomePage from "../views/HomePage/HomePage";
import LoginPage from "../views/LoginPage/LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "../assets/styles/GlobalStyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/HomePage" element={<HomePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
