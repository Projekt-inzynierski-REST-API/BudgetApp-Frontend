import styled from "styled-components"
import FormControlLabel from '@mui/material/FormControlLabel';

const Headline = styled.h1`
    font-size: 36px;
    text-align: center;
`;
const Form = styled.form`
`;

const InputBox = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 10px;
    margin: 30px 0 40px 0;
`;

const GroupName = styled.input`
    width: 100%;
    background: transparent;
    outline: none;
    border: 2px solid rgba(255,255,255,.2);
    border-radius: 40px;
    font-size: 16px;
    color: #fff;
    padding: 20px 45px 20px 20px;

    &::placeholder {
        color: #fff; 
    }
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

const MyLabel = styled(FormControlLabel)`
&&{
    margin: 0 0 0px 0px;
}
`;

export {Headline, Form, InputBox, GroupName, Button, MyLabel};

