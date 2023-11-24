import styled from "styled-components";

const StyledPage = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(to bottom, #add8e6, #d8bfd8);
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: center;
  @media (max-width: 1020px) {
    flex-direction: column;
  }
`;

// Create Group

const CreateGroupColumn = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
`;

const CreateGroupContaier = styled.div`
  width: 40%;
  height: 50vh;
  background: transparent;
  border: 2px solid rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(20px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  color: #fff;
  border-radius: 10px;
  padding: 30px 40px;
`;

// Join to Group

const JoinToGroupSection = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
`;

const JoinToGroupContaier = styled.div`
  align-self: center;
  width: 50%;
  height: 30vh;
  background: transparent;
  border: 2px solid rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(20px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  color: #fff;
  border-radius: 10px;
  padding: 30px 40px;
`;

// Your

const YourGroupsColumn = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
`;

const YourGroupsContaier = styled.div`
  width: 70%;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  background: transparent;
  border: 2px solid rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(20px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  color: #fff;
  border-radius: 10px;
  padding: 30px 0px;
`;

export {
  StyledPage,
  JoinToGroupSection,
  CreateGroupContaier,
  JoinToGroupContaier,
  YourGroupsContaier,
  YourGroupsColumn,
  CreateGroupColumn,
};
