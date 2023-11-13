import styled from "styled-components";

const StyledPage = styled.div`
  width: 100%;
  height: 90.4vh;
  background: linear-gradient(to bottom, #add8e6, #d8bfd8);
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: center;
`;

// Create Group

const CreateGroupSection = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
`;

const CreateGroupContaier = styled.div`
    align-self: center;
    width: 50%;
    height: 55vh;
    background: transparent;
    border: 2px solid rgba(0,0,0,.2);
    backdrop-filter: blur(20px);
    box-shadow: 0 0 10px rgba(0,0,0,.2);
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
    border: 2px solid rgba(0,0,0,.2);
    backdrop-filter: blur(20px);
    box-shadow: 0 0 10px rgba(0,0,0,.2);
    color: #fff;
    border-radius: 10px;
    padding: 30px 40px;
`;

// Your Groups

const YourGroupsSection = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
`;

const YourGroupsContaier = styled.div`
    align-self: center;
    width: 50%;
    height: 65vh;
    background: transparent;
    border: 2px solid rgba(0,0,0,.2);
    backdrop-filter: blur(20px);
    box-shadow: 0 0 10px rgba(0,0,0,.2);
    color: #fff;
    border-radius: 10px;
    padding: 30px 40px;;
`;

export { StyledPage, CreateGroupSection, JoinToGroupSection, YourGroupsSection, CreateGroupContaier, JoinToGroupContaier, YourGroupsContaier };
