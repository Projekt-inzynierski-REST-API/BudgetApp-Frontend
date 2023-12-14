import HomePage from "../views/HomePage/HomePage";
import LoginPage from "../views/LoginPage/LoginPage";
import { GroupsPage } from "./GroupsPage/GroupsPage";
import { GroupDetails } from "./GroupDetails/GroupDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "../assets/styles/GlobalStyle";
import { ExpenseCreator } from "./ExpenseCreator/ExpenseCreator";
function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/GroupsPage" element={<GroupsPage />} />
          <Route path="/GroupDetails" element={<GroupDetails />} />
          <Route path="/ExpenseCreator" element={<ExpenseCreator />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
