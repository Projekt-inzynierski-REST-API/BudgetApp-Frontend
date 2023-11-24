import styled from "styled-components";

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
  @media (max-width: 450px) {
    font-size: 24px; // Dostosuj rozmiar czcionki dla ekranów o szerokości 450px i mniejszej
  }
`;

const GroupName = styled.input`
  width: 100%;
  height: 40px;
  text-align: center;
  background: rgba(255, 255, 255, 0.15);
  outline: none;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 40px;
  font-size: 16px;
  color: #fff;
  @media (max-width: 1020px) {
    width: 75%;
    align-self: center;
  }

  &::placeholder {
    color: #fff;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 45px;
  background-color: #fff;
  border: none;
  outline: none;
  border-radius: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 16px;
  color: #333;
  font-weight: 600;
  @media (max-width: 1020px) {
    width: 75%;
    align-self: center;
  }
`;

export { Headline, Form, GroupName, Button };
