import styled from "styled-components"

const Headline = styled.h1`
    font-size: 36px;
    text-align: center;
`;

const RowsContainer = styled.div`
    flex:1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const Row = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 8px 0px;

    &:hover {
    background-color: #2980b9;
  }

`;

const AvatarContainer = styled.div`
`;

const GroupName = styled.div`
    font-size: 16px;
    font-weight: bold;
`;

const RemoveFromGroup = styled.div`
`;

export { Headline, RowsContainer, Row, AvatarContainer, GroupName, RemoveFromGroup }