import styled from "styled-components"

const Form = styled.form`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Headline = styled.h1`
    font-size: 36px;
    text-align: center;
    @media (max-width: 1250px) {
    font-size: 28px; // Dostosuj rozmiar czcionki dla ekranów o szerokości 1250px i mniejszej
  }
`;

const GroupName = styled.input`
    width: 100%;
    height: 40px;
    text-align: center;
    background: transparent;
    outline: none;
    border: 2px solid rgba(255,255,255,.2);
    border-radius: 40px;
    font-size: 16px;
    color: #fff;

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

export {Headline, Form, GroupName, Button};

