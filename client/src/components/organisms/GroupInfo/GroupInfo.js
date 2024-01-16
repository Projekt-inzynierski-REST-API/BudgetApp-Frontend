import React from "react";
import { GroupInfoDiv, InfoBox, Header, Icon, InfoRow, Data } from "./GroupInfo.style";

export const GroupInfo = ({ data, membersAmount, budget, userBudget }) => {
    // Tworzymy obiekt Date na podstawie ciągu znaków
    const dateObject = new Date(data.created_date);

    // Pobieramy rok, miesiąc i dzień z obiektu Date
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Dodajemy 1, ponieważ miesiące są numerowane od 0
    const day = dateObject.getDate().toString().padStart(2, '0');
  
    // Tworzymy docelową datę w formacie "rok-miesiąc-dzień"
    const formattedDate = `${year}-${month}-${day}`;
  return (
    <GroupInfoDiv>
      <InfoBox>
        <Header>Total Members</Header>
        <InfoRow>
          <Icon src="/images/groupdetails/group1.png" alt="totalUsersIcon" />
          <Data>{membersAmount}</Data>
        </InfoRow>
      </InfoBox>
      <InfoBox>
        <Header>Your Total Budget</Header>
        <InfoRow>
          <Icon src="/images/groupdetails/wallet.png" alt="totalUserBudgetIcon" />
          <Data>{userBudget}$</Data>
        </InfoRow>
      </InfoBox>
      <InfoBox>
        <Header>Group Budget</Header>
        <InfoRow>
          <Icon src="/images/groupdetails/money-bag.png" alt="totalBudgetIcon" />
          <Data>{budget}$</Data>
        </InfoRow>
      </InfoBox>
      <InfoBox>
      <Header>Created Date</Header>
        <InfoRow>
          <Icon src="/images/groupdetails/calendar.png" alt="CalendarIcon" />
          <Data>{formattedDate}</Data>
        </InfoRow>
      </InfoBox>
    </GroupInfoDiv>
  );
};
