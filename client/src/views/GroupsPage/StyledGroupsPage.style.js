import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const StyledPage = styled.div`
  flex: 1; /* Zajmij całą dostępną przestrzeń */
  background: url('images/backgrounds/background.jpg') center/cover no-repeat;
  /* background: linear-gradient(to bottom, #add8e6, #d8bfd8); */
  display: flex;

  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  @media (max-width: 1020px) {
    flex-direction: column;
    align-content: center;
    align-items: normal;
  }
`;

// Create Group

const CreateGroupColumn = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;

  margin-top: 80px;
  @media (max-width: 1020px) {
    margin: 80px 0 100px 0;
  }
`;

const CreateGroupContaier = styled.div`
  width: 40%;
  height: 50vh;
  background: rgba(0, 0, 0, 0.15);
  border: 2px solid rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(20px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  color: #272540;
  text-shadow: 2px 1px 4px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  padding: 30px 40px;
  @media (max-width: 1020px) {
    width: 70%;
    padding: 30px 0;
  }
  @media (max-width: 960px) {
    width: 85%;
    padding: 30px 0;
  }
`;

// Your

const YourGroupsColumn = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  margin: 80px 0 80px 0;
  @media (max-width: 1020px) {
    margin: 0px 0 80px 0;
  }
`;

const YourGroupsContaier = styled.div`
  width: 70%;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.15);
  border: 2px solid rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(20px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  color: #272540;
  text-shadow: 2px 1px 4px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  padding: 30px 0px;
  @media (max-width: 1020px) {
    width: 70%;
  }
  @media (max-width: 960px) {
    width: 85%;
  }
`;

export {
  PageContainer,
  StyledPage,
  CreateGroupContaier,
  YourGroupsContaier,
  YourGroupsColumn,
  CreateGroupColumn,
};
