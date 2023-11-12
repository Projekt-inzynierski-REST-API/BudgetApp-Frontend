import styled from "styled-components"
import Select from '@mui/material/Select';

const Headline = styled.h1`
    font-size: 36px;
    text-align: center;
`;
const Form = styled.form`

`;

const SelectBox = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 10px;
    margin: 30px 0 70px 0;
`;

const SelectGroupName = styled(Select)`
    &&{
        width: 100%;
        border: 2px solid rgba(255,255,255,.2);
        border-radius: 40px;
        font-size: 16px;
        color: #fff;
        padding: 20px 25px 20px 20px;
    }
`;

const SelectGroupOption = styled.option`
    background: transparent;
    outline: none;
    font-size: 16px;
    color: #fff;
`;

const Button = styled.button`
    width:100%;
    height:45px;
    background-color: #fff;
    border: none;
    outline: none;
    border-radius: 40px;
    box-shadow: 0 0 10px rgba(0,0,0,.1);
    cursor: pointer;
    font-size: 16px;
    color: #333;
    font-weight: 600;
`;

export {Headline, Form, SelectBox, SelectGroupName, SelectGroupOption, Button};

