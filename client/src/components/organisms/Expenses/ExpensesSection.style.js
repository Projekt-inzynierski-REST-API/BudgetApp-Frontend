import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  & > * {
    flex: 1 0 200px;
    margin: 8px;
    align-self: flex-start;
  }
`;

export { Wrapper };
