import React from 'react'
import { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { Headline, Form, SelectBox, SelectGroupName, Button } from './JoinGroupForm.style';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

// dostosowywanie wyglądu menu, które się otwiera po kliknięciu w pole wyboru. Ustawia maksymalną wysokość menu i jego szerokość.
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


export const JoinGroupForm = ({data}) => {

  // z przekazanego obiektu tworze jednowymiarowa tablice nazw grup
  const names = data.groups.map(group => group.groupName);
  
    // w tablicy yoursGroup przechowuje zaznaczone w select grupy
    const [yourGroups, setYourGroups] = useState([]);

    // funkcja wywoływana gdy zaznaczymy/odznaczymy coś w select
    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setYourGroups(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };

  return (
    <>
        <Form action="#">
            <Headline>Join to group</Headline>
            <SelectBox>
                <SelectGroupName
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={yourGroups}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    >
                        {names.map((name) => (
                            <MenuItem key={name} value={name}>
                                <Checkbox checked={yourGroups.indexOf(name) > -1} />
                                <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                </SelectGroupName>
            </SelectBox>
            <Button type="submit">Join/Unjoin</Button>
        </Form>
    </>
  )
}