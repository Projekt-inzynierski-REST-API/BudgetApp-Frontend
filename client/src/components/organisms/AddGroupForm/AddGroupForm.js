import React, { useState } from "react";
import { Headline, Form, GroupName, Button } from "./AddGroupForm.style";
import { AvatarUploader } from "../../molecules/AvatarUploader/AvatarUploader";

export const AddGroupForm = ({ getAllGroups }) => {
  const [formData, setFormData] = useState({
    groupName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData.groupName);
    try {
      const credential = localStorage.getItem("token");
      const response = await fetch("http://localhost:1900/api/group", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${credential}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: formData.groupName }),
      });

      if (!response.status === 200) {
        if (response.status === 401) {
          console.error("Błąd uwierzytelnienia: Sprawdź poprawność tokena.");
        } else {
          console.error(`Błąd HTTP: ${response.status}`);
        }
        return;
      }
      const newGroup = await response.json();
      console.log(`dodano grupe: ${newGroup.name} o id: ${newGroup.id}`);
      // getAllGroups(); // wywołuje funkcje do pobierania wszystkich grup przekazana jako prop z GroupsPage
    } catch (error) {
      console.error("Wystąpił błąd podczas pobierania danych:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Headline>Add new group</Headline>
      <AvatarUploader />
      <GroupName
        type="text"
        name="groupName"
        placeholder="GroupName"
        onChange={handleChange}
        required
      />
      <Button type="submit">Add</Button>
    </Form>
  );
};
