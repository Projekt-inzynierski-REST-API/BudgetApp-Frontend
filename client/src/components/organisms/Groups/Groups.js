import React, { useState } from "react";
import RecipeReviewCard from "../../molecules/ReviewCard/RecipeReviewCard";
import { Wrapper } from "./Groups.style";

function Groups({ groups }) {
  const [expandedCard, setExpandedCard] = useState(null);

  const handleExpandClick = (index) => {
    setExpandedCard(index === expandedCard ? null : index);
  };

  return (
    <Wrapper>
      {Array.isArray(groups.groups) && groups.groups.length > 0 ? (
        groups.groups.map((group, index) => (
          <RecipeReviewCard
            key={group.group_id}
            group={group}
            expanded={index === expandedCard}
            onExpandClick={() => handleExpandClick(index)}
          ></RecipeReviewCard>
        ))
      ) : (
        <p
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
          }}
        >
          Brak grup do wyświetlenia.
        </p>
      )}
    </Wrapper>
  );
}

export default Groups;
