import styled from "styled-components"

const Headline = styled.h1`
    font-size: 36px;
    text-align: center;
`;

const RowsContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 16px;
`;

const AvatarContainer = styled.div`
    margin-right: 16px;
`;

const GroupName = styled.div`
    font-size: 15px;
    font-weight: bold;
    margin-right: 16px;
`;

const RemoveFromGroup = styled.div`
`;

export { Headline, RowsContainer, Row, AvatarContainer, GroupName, RemoveFromGroup }