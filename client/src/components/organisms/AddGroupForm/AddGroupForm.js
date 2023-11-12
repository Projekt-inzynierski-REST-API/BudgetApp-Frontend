import React from 'react'
import { Headline, Form, InputBox, GroupName, Button } from './AddGroupForm.style';

export const AddGroupForm = () => {
  return (
    <>
        <Form action="#">
            <Headline>Add new group</Headline>
            <InputBox>
                <GroupName type="text" placeholder='GroupName' required/>
            </InputBox>
            <Button type="submit">Add</Button>
        </Form>
    </>
  )
}