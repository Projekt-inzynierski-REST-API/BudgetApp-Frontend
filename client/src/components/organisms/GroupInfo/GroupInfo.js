import React from "react";
import { BasicInfoRow } from "./GroupInfo.style";

export const GroupInfo = ({data}) => {
  return (
    <>
      <BasicInfoRow>
        <span style={{ fontWeight: 600 }}>Group name: </span>
        {data.group_name}
      </BasicInfoRow>
      <BasicInfoRow>
        <span style={{ fontWeight: 600 }}>Created date: </span>
        {data.created_date}
      </BasicInfoRow>
      <BasicInfoRow>
        <span style={{ fontWeight: 600 }}>Group budget: </span>
        {data.group_budget}
      </BasicInfoRow>
    </>
  );
};
