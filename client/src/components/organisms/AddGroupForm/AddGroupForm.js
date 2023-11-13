import React, { useState } from 'react'
import { Headline, Form, InputBox, GroupName, Button, MyLabel } from './AddGroupForm.style';
import { Checkbox } from '@mui/material';
import { AvatarUploader } from '../../molecules/AvatarUploader/AvatarUploader';

export const AddGroupForm = () => {

  const [formData, setFormData] = useState({
    groupName: '',
    isMember: false,
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try{
      const response = await fetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if(response.ok) console.log('Dane wysłane pomyślnie');
      else console.error('Błąd podczas wysyłania danych');

    } catch(error){
      console.error('Wystąpił błąd', error);
    }
  };

  return (
    <>
        <Form onSubmit={handleSubmit}>
            <Headline>Add new group</Headline>
            <AvatarUploader/>
            <InputBox>
                <GroupName type="text" name='groupName' placeholder='GroupName' onChange={handleChange} required/>
            </InputBox>
            <MyLabel control={<Checkbox name='isMember' onChange={handleChange}/>} label="I'm member of this group" />
            <Button type="submit">Add</Button>
        </Form>
    </>
  )
}