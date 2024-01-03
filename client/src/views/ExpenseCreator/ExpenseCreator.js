import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import NavigationBar from "../../components/organisms/NavigationBar/NavigationBar";
import { SimpleBackdrop } from "../../components/molecules/SimpleBackdrop/SimpleBackdrop";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Select,
  InputLabel,
  InputAdornment,
  TextField,
  OutlinedInput,
  ListItemText,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Switch
} from "@mui/material";
import {
  StyledPage,
  Expense,
  CalendarEvent,
  HeaderContainer,
  FirstHeader,
  Form,
  FormRow,
  AddExpenseButton,
  MyLocalizationProvider,
  Column,
  ButtonContainer,
  HelperText
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
  // state do sprawdzenia czy button add group został już klikniety
  const [hasBeenClicked, setHasBeenClicked] = useState(false);
  const [categoriesObject, setCategoriesObject] = useState(false);
  const [allGroups, setAllGroups] = useState(false);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [isValidAmount, setIsValidAmout] = useState(true);
  const [expenseCategoryId, setExpenseCategoryId] = useState("");
  const [expenseGroupId, setExpenseGroupId] = useState("");
  const [expenseParticipantsIds, setExpenseParticipantsIds] = useState([]);
  const [eventStartDate, setEventStartDate] = useState("");
  const [isSetStartDate, setIsSetStartDate] = useState(false);
  const [isSetEndDate, setIsSetEndDate] = useState(false);
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [addAsEvent, setAddAsEvent] = useState(false);

  const handleChangeName = (event) => setExpenseName(event.target.value);
  const handleChangeAmount = (event) => {
    const newAmount = event.target.value;
    // Sprawdź, czy wartość jest liczbą lub pusty string
    if((!isNaN(parseFloat(newAmount)) && isFinite(newAmount)) || (newAmount === "")) setIsValidAmout(true);
    else setIsValidAmout(false);
    setExpenseAmount(event.target.value);
  };
  const handleChangeCategory = (event) =>
    setExpenseCategoryId(event.target.value); // ustawiam id wybranej kategorii
  const handleChangeGroup = (event) => setExpenseGroupId(event.target.value); // ustawiam id wybranej grupy
  const handleChangeLocation = (event) => setEventLocation(event.target.value);
  const handleChangeDescription = (event) =>
    setEventDescription(event.target.value);
  const handleStartDate = (event) => {
    setIsSetStartDate(true);
    const formattedDate = format(event.$d, "yyyy-MM-dd'T'HH:mm:ss.SSSX");
    setEventStartDate(formattedDate);
  };
  const handleEndDate = (event) => {
    setIsSetEndDate(true);
    const formattedDate = format(event.$d, "yyyy-MM-dd'T'HH:mm:ss.SSSX");
    setEventEndDate(formattedDate);
  };
  const handleSwitch = (event) => setAddAsEvent(!addAsEvent);

  const handleChangeParticipants = (event) =>
    setExpenseParticipantsIds(
      typeof event.target.value === "string"
        ? event.target.value.split(",")
        : event.target.value
    );

  const handleUnauthorized = () => {
    alert("Twoja sesja wygasła, zaloguj się ponownie.");
    navigate("/");
  };
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
          handleUnauthorized();
          return;
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
          handleUnauthorized();
          return;
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
    let canAddExpense = false;
    if(addAsEvent){
      if(isSetStartDate && isSetEndDate) canAddExpense = true;
      else canAddExpense = false;
    }else canAddExpense = true;
    // jeśli amount jest liczbą i zmienna canAddExpense jest na true
    if (isValidAmount && canAddExpense) {
      try {
        const credential = localStorage.getItem("token");
        const accessToken = localStorage.getItem("access_token");

        const response = await fetch("http://localhost:1900/api/expense", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${credential}`,
            "Content-Type": "application/json",
            "Access-Token": accessToken,
          },
          body: JSON.stringify({
            name: expenseName,
            amount: expenseAmount,
            category_id: expenseCategoryId,
            group_id: expenseGroupId,
            participants_ids: expenseParticipantsIds,
            event_start_date: eventStartDate,
            event_end_date: eventEndDate,
            event_description: eventDescription,
            event_location: eventLocation,
            add_to_calendar: addAsEvent,
          }),
        });


      if (!response.status === 201) {
        if (response.status === 401) {
          handleUnauthorized();
          return;
        } else {
          console.error(`Błąd HTTP: ${response.status}`);
          return;
        }
        // Przekieruj użytkownika
        console.log(`dodano wydatek`);
        const data = await response.json();
        navigate("/Expenses");
      } catch (error) {
        console.error("Wystąpił błąd podczas pobierania danych:", error);
      }
    }
      setHasBeenClicked(false);
  };

  const handleClick = (event) => {
    event.preventDefault(); // Zapobiegnij domyślnemu zachowaniu formularza (przeładowaniu strony)
    if (!hasBeenClicked) {
      setHasBeenClicked(true);
      addExpense();
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
        </HeaderContainer>
        <Form onSubmit={handleClick}>
          <FormRow>
            <Expense>
              <Column>
                <InputLabel>Expense Name</InputLabel>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  onChange={handleChangeName}
                  required
                  sx={{
                    "& .MuiInputBase-input": {
                      backgroundColor: "transparent",
                      // Dodatkowe stylizacje, jeśli są potrzebne
                    },
                    "& .MuiInputBase-input:focus": {
                      backgroundColor: "transparent",
                      // Dodatkowe stylizacje dla fokusu, jeśli są potrzebne
                    },
                    "& .MuiInputBase-input:-webkit-autofill": {
                      transition: "background-color 5000s ease-in-out 0s", // Wydłuża czas animacji autofill
                    },
                  }}
                />
                <InputLabel htmlFor="outlined-adornment-amount">
                  Amount
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  onChange={handleChangeAmount}
                  required
                  sx={{
                    "& .MuiInputBase-input": {
                      backgroundColor: "transparent",
                      // Dodatkowe stylizacje, jeśli są potrzebne
                    },
                    "& .MuiInputBase-input:focus": {
                      backgroundColor: "transparent",
                      // Dodatkowe stylizacje dla fokusu, jeśli są potrzebne
                    },
                    "& .MuiInputBase-input:-webkit-autofill": {
                      transition: "background-color 5000s ease-in-out 0s", // Wydłuża czas animacji autofill
                    },
                  }}
                />
                {!isValidAmount && <HelperText>You must enter a number!</HelperText>}
                <InputLabel>Group</InputLabel>
                <Select label="group" onChange={handleChangeGroup} required>
                  {allGroups.map((group) => (
                    <MenuItem key={group.group_id} value={group.group_id}>
                      {group.group_name}
                    </MenuItem>
                  ))}
                </Select>

                <InputLabel>Category</InputLabel>
                <Select
                  label="category"
                  onChange={handleChangeCategory}
                  required
                >
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
                  required
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
              </Column>
            </Expense>
            <CalendarEvent>
              <Column>
                {addAsEvent ? (
                  <MyLocalizationProvider dateAdapter={AdapterDayjs}>
                    <InputLabel>Event's start date</InputLabel>
                    <DateTimePicker
                      value={eventStartDate}
                      onChange={(newValue) => handleStartDate(newValue)}
                    />
                    {!isSetStartDate && <HelperText>You must choose event's start date!</HelperText>}
                    <InputLabel>Event's end date</InputLabel>
                    <DateTimePicker
                      value={eventEndDate}
                      onChange={(newValue) => handleEndDate(newValue)}
                    />
                    {!isSetEndDate && <HelperText>You must choose event's end date!</HelperText>}
                    <InputLabel>Event location</InputLabel>
                    <TextField
                      variant="outlined"
                      onChange={handleChangeLocation}
                      required
                      sx={{
                        "& .MuiInputBase-input": {
                          backgroundColor: "transparent",
                          // Dodatkowe stylizacje, jeśli są potrzebne
                        },
                        "& .MuiInputBase-input:focus": {
                          backgroundColor: "transparent",
                          // Dodatkowe stylizacje dla fokusu, jeśli są potrzebne
                        },
                        "& .MuiInputBase-input:-webkit-autofill": {
                          transition: "background-color 5000s ease-in-out 0s", // Wydłuża czas animacji autofill
                        },
                      }}
                    />
                    <InputLabel>Description</InputLabel>
                    <TextField
                      variant="outlined"
                      onChange={handleChangeDescription}
                      multiline
                      rows={4}
                      required
                    />
                  </MyLocalizationProvider>
                ) : (
                  ""
                )}
              </Column>
            </CalendarEvent>
          </FormRow>
          <FormRow>
            <ButtonContainer>
              <Column>
                <FormControlLabel
                  disabled={!(expenseParticipantsIds.length > 0)}
                  control={
                    <Switch
                      onChange={handleSwitch}
                      value={addAsEvent}
                      color="primary"
                    />
                  }
                  label="Add as event to Google Calendar"
                  labelPlacement="start"
                />
                <AddExpenseButton
                  variant="contained"
                  color="success"
                  type="submit"
                >
                  Add expense
                </AddExpenseButton>
              </Column>
            </ButtonContainer>
            <ButtonContainer></ButtonContainer>
          </FormRow>
        </Form>
      </StyledPage>
    </>
  );
};
