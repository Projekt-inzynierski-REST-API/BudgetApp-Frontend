import React, { useState } from "react";
import { Headline, Form, GroupName, Button } from "./AddGroupForm.style";
import { AvatarUploader } from "../../molecules/AvatarUploader/AvatarUploader";
import { ConfirmAddGroup } from "../ConfirmAddGroup/ConfirmAddGroup";

export const AddGroupForm = ({ getAllGroups }) => {
  const [formData, setFormData] = useState({
    groupName: "",
  });
  const [inputValue, setInputValue] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue(value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsConfirmOpen(true);
    console.log(formData.groupName);
  };

  return (
    <>
      <ConfirmAddGroup isOpen={isConfirmOpen} onClose={setIsConfirmOpen} groupToAdd={formData} getAllGroups={getAllGroups} setInputValue={setInputValue}/>
      <Form onSubmit={handleSubmit}>
        <Headline>Add new group</Headline>
        <AvatarUploader />
        <GroupName
          type="text"
          name="groupName"
          placeholder="GroupName"
          value={inputValue}
          onChange={handleChange}
          required
        />
        <Button type="submit">Add</Button>
      </Form>
    </>
  );
};
