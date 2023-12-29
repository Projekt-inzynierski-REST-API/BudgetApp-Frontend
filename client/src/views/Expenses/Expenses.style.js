import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;

  margin: 3% 20%;

  justify-content: space-between; /* Ustawia elementy na krańcach kontenera */
  align-items: center; /* Centralizuje elementy w pionie */

  @media (max-width: 768px) {
    flex-direction: column; /* Zmiana układu na "elementy pod sobą" */
    align-items: flex-start; /* Ustawia elementy od lewej strony */
    margin: 3% 5%; /* Nowe marginesy dostosowane do węższego ekranu */
  }
`;

export { Wrapper };
