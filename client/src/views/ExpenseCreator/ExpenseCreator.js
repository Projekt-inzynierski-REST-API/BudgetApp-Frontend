import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../../components/organisms/NavigationBar/NavigationBar";
import { SimpleBackdrop } from "../../components/molecules/SimpleBackdrop/SimpleBackdrop";
import {
  Select,
  InputLabel,
  InputAdornment,
  TextField,
  OutlinedInput,
  ListItemText,
  MenuItem,
  Checkbox
} from "@mui/material";
import {
  StyledPage,
  HeaderContainer,
  FirstHeader,
  SecondHeader,
  FormContainer,
  Form,
  AddExpenseButton
} from "./StyledExpenseCreator.style";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const ExpenseCreator = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [categoriesObject, setCategoriesObject] = useState(false);
  const [allGroups, setAllGroups] = useState(false);
  const [expenseName, setExpenseName] = useState(false);
  const [expenseAmount, setExpenseAmount] = useState(false);
  const [expenseCategoryId, setExpenseCategoryId] = useState(false);
  const [expenseGroupId, setExpenseGroupId] = useState(false);
  const [expenseParticipantsIds, setExpenseParticipantsIds] = useState([]);

  const handleChangeName = (event) => setExpenseName(event.target.value);
  const handleChangeAmount = (event) => setExpenseAmount(event.target.value);
  const handleChangeCategory = (event) =>
    setExpenseCategoryId(event.target.value); // ustawiam id wybranej kategorii
  const handleChangeGroup = (event) => setExpenseGroupId(event.target.value); // ustawiam id wybranej grupy

  const handleChangeParticipants = (event) =>
    setExpenseParticipantsIds(
      typeof event.target.value === "string"
        ? event.target.value.split(",")
        : event.target.value
    );

  //funkcja pobierająca wszystkie kategorie z bazy danych
  const getAllCategories = async () => {
    console.log("pobieranie kategorii");
    try {
      const credential = localStorage.getItem("token");
      const response = await fetch("http://localhost:1900/api/category", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${credential}`,
          "Content-Type": "application/json",
        },
      });

      if (!(response.status === 200)) {
        if (response.status === 401) {
          console.error("Błąd uwierzytelnienia: Sprawdź poprawność tokena.");
        } else {
          console.error(`Błąd HTTP: ${response.status}`);
        }
        return;
      }

      const data = await response.json();
      console.log("categoriesObject:");
      console.log(data);
      setCategoriesObject(data);
    } catch (error) {
      console.error("Wystąpił błąd podczas pobierania danych:", error);
    }
  };

  //funkcja pobierająca wszystkie grupy z bazy danych
  const getAllGroups = async () => {
    console.log("pobieranie grupy funckja");
    try {
      const credential = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:1900/api/dashboard/groups",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${credential}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!(response.status === 200)) {
        if (response.status === 401) {
          console.error("Błąd uwierzytelnienia: Sprawdź poprawność tokena.");
        } else {
          console.error(`Błąd HTTP: ${response.status}`);
        }
        return;
      }

      const data = await response.json();
      setAllGroups(data.groups);
    } catch (error) {
      console.error("Wystąpił błąd podczas pobierania danych:", error);
    }
    console.log("allGroups:");
    console.log(allGroups);
  };

  //funkcja dodająca wydatek do bazy danych
  const addExpense = async () => {
    navigate("/Expenses");
    try {
      const credential = localStorage.getItem("token");

      const response = await fetch("http://localhost:1900/api/expense", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${credential}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: expenseName,
          amount: expenseAmount,
          category_id: expenseCategoryId,
          group_id: expenseGroupId,
          participants_ids: expenseParticipantsIds,
        }),
      });

      if (!response.status === 201) {
        if (response.status === 401) {
          console.error("Błąd uwierzytelnienia: Sprawdź poprawność tokena.");
        } else {
          console.error(`Błąd HTTP: ${response.status}`);
        }
        return;
      }
      // Przekieruj użytkownika
      console.log(`dodano wydatek`);
    } catch (error) {
      console.error("Wystąpił błąd podczas pobierania danych:", error);
    }
  };

  useEffect(() => {
    getAllCategories();
    getAllGroups();
    // eslint-disable-next-line
  }, []);

  if (!categoriesObject || !allGroups) {
    // Jeśli dane nie zostały jeszcze pobrane "Ładowanie..."
    return <SimpleBackdrop isOpen={true} />;
  }
  return (
    <>
      <NavigationBar storedUser={storedUser}></NavigationBar>
      <StyledPage>
        <HeaderContainer>
          <FirstHeader>Expense Creator</FirstHeader>
          <SecondHeader>Add Expense</SecondHeader>
        </HeaderContainer>
        <FormContainer>
          <Form>
            <InputLabel>Expense Name</InputLabel>
            <TextField
              id="outlined-basic"
              variant="outlined"
              onChange={handleChangeName}
              required
            />
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              onChange={handleChangeAmount}
              required
            />
            <InputLabel>Group</InputLabel>
            <Select label="group" onChange={handleChangeGroup}>
              {allGroups.map((group) => (
                <MenuItem key={group.group_id} value={group.group_id}>
                  {group.group_name}
                </MenuItem>
              ))}
            </Select>

            <InputLabel>Category</InputLabel>
            <Select label="category" onChange={handleChangeCategory}>
              {categoriesObject.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>

            <InputLabel>Expense participants</InputLabel>
            <Select
              disabled={!expenseGroupId}
              multiple
              value={expenseParticipantsIds}
              onChange={handleChangeParticipants}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) =>
                selected
                  .map((id) => {
                    const member = allGroups
                      .filter((group) => group.group_id === expenseGroupId)
                      .flatMap((filteredGroup) =>
                        filteredGroup.members.filter((m) => m.id === id)
                      )[0];
                    return member ? `${member.name} ${member.surname}` : "";
                  })
                  .join(", ")
              }
              MenuProps={MenuProps}
            >
              {allGroups
                .filter((group) => group.group_id === expenseGroupId) // tylko członkowie wybranej wczesniej grupy
                .map((filteredGroup) =>
                  filteredGroup.members.map((member) => (
                    <MenuItem key={member.id} value={member.id}>
                      <Checkbox
                        checked={expenseParticipantsIds.includes(member.id)}
                      />
                      <ListItemText
                        primary={`${member.name} ${member.surname}`}
                      />
                    </MenuItem>
                  ))
                )}
            </Select>

            <AddExpenseButton variant="contained" color="success" onClick={addExpense}>
              Add expense
            </AddExpenseButton>
          </Form>
        </FormContainer>
      </StyledPage>
    </>
  );
};
