import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListItemIcon from "@mui/material/ListItemIcon";

function SimpleAppBarWithMenu() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  const toggleDrawer = (open, pageAddress) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
    if (pageAddress != null) navigate(pageAddress);
  };

  return (
    <>
      <AppBar
        position="static"
        style={{
          width: "30%",
          background: "none",
          boxShadow: "none",
          marginTop: 8,
        }}
      >
        <Toolbar>
          <Button onClick={toggleDrawer(true)}>
            <MenuIcon
              sx={{
                fontSize: 30,
                color: "darkblue",
                "&:hover": {
                  color: "gray",
                },
              }}
            />
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <>
          <IconButton onClick={toggleDrawer(false)}>
            <CloseIcon
              sx={{
                fontSize: 30,
                color: "darkblue",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            />
          </IconButton>
        </>
        <List style={{ width: "50vh" }}>
          <ListItem button onClick={toggleDrawer(false, "/HomePage")}>
            <ListItemText primary="Overview" />
          </ListItem>

          <ListItem button onClick={toggleDrawer(false)}>
            <ListItemText primary="Transactions" />
          </ListItem>

          <ListItem button onClick={toggleDrawer(false, "/GroupsPage")}>
            <ListItemText primary="Groups " />
          </ListItem>
          <ListItem button onClick={toggleDrawer(false, "/TransactionsPage")}>
            <ListItemText primary="Transactions " />
          </ListItem>
          <ListItem button onClick={toggleDrawer(false, "/ReportsPage")}>
            <ListItemText primary="Reports" />
          </ListItem>
          <ListItem button onClick={toggleDrawer(false, "/BudgetsPage")}>
            <ListItemText primary="Budgets" />
          </ListItem>

          <ListItem button onClick={handleLogout}>
            {" "}
            {/* Dodaj funkcję obsługującą wylogowanie */}
            <ListItemText primary="Logout" />
            <ListItemIcon>
              <ExitToAppIcon /> {/* Dodaj ikonę wylogowania */}
            </ListItemIcon>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default SimpleAppBarWithMenu;
