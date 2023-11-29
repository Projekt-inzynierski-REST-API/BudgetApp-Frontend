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
      {Array.isArray(groups.groups) ? (
        groups.groups.map((group, index) => (
          <RecipeReviewCard
            key={group.groupId}
            group={group}
            expanded={index === expandedCard}
            onExpandClick={() => handleExpandClick(index)}
          ></RecipeReviewCard>
        ))
      ) : (
        <p>Brak danych grup</p>
      )}
    </Wrapper>
  );
}

export default Groups;
