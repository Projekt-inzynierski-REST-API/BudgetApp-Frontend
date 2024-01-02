 import styled from "styled-components";

const GroupInfoDiv = styled.div`
  min-height: 15vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  padding: 30px 40px;
  @media (max-width: 750px) {
    flex-direction: column;
    margin-top:20px;
    padding: 0;
    row-gap: 20px;
}
`;

const InfoBox = styled.div`
  flex-basis: 30%;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  
  background: rgba(0, 0, 0, 0.15);
  border: 2px solid rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(20px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  color: #fff;
  border-radius: 10px;
  @media (max-width: 750px) {
    padding: 0;
  }
`;

const Header = styled.h2`
  flex: 1;
  font-size: 32px;
  margin: 0px;
  padding: 10px 0;
  text-align: center;
  color: #FFF6F2;
  /* color: #151333; */
  cursor: default;
  @media (max-width: 1020px) {
    font-size: 25px;
  }
  @media (max-width: 750px) {
    font-size: 32px;
  }
`;

const InfoRow = styled.div`
  flex: 2;
  display: flex;
  padding: 10px 0;
  flex-direction: row;
  justify-content: center;
  color: #151333;
  cursor: default;
`;

const Icon = styled.img`
  width: 25%;
`;

const Data = styled.div`
  font-size: 30px;
  padding-left: 5px;
  align-self: end;
  @media (max-width: 1020px) {
    font-size: 20px;
  }
  @media (max-width: 750px) {
    font-size: 30px;
  }
`;

export {
  GroupInfoDiv,
  InfoBox,
  Header,
  InfoRow,
  Icon,
  Data,
};
