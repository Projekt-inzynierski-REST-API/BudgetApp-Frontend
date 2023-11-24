import styled from "styled-components";

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

const RowsContainer = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0px;
  color: #fffff0;
  text-shadow: none;
  transition: background-color 0.3s ease; // Płynne przejścia podczas najechania kursorem
  @media (max-width: 370px) {
    flex-wrap: wrap;
  }
  &:hover {
    background-color: rgba(3, 20, 46, 0.6);
  }
`;

const AvatarContainer = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  max-width: 100px; // Dostosuj szerokość maksymalną według potrzeb responsywności
  margin-right: 10px; // Dodaj odstęp między elementami
`;

const GroupName = styled.div`
  flex: 3;
  display: flex;
  justify-content: left;
  font-size: 20px;
  font-weight: bold;
  @media (max-width: 1300px) {
    font-size: 18px; // Dostosuj rozmiar czcionki dla ekranów o szerokości 1300px i mniejszej
  }
  @media (max-width: 700px) {
    font-size: 16px; // Dostosuj rozmiar czcionki dla ekranów o szerokości 1300px i mniejszej
  }
  @media (max-width: 450px) {
    font-size: 14px; // Dostosuj rozmiar czcionki dla ekranów o szerokości 1300px i mniejszej
  }
`;

const RemoveFromGroup = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

export {
  Headline,
  RowsContainer,
  Row,
  AvatarContainer,
  GroupName,
  RemoveFromGroup,
};
