import styled from "styled-components";
import media from "styled-media-query";

export const BusinessClosedContainer = styled.div`
  width: 50%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;

  h1 {
    color: ${({ theme }) => theme.colors.white};
    text-align: center;
  }

  button {
    color: ${({ theme }) => theme.colors.gray};
    border: 0;
    display: flex;
    background: none;
    margin-top: 10px;
    align-items: center;
    transition: transform .5s;

    &:hover {
      transform: translateX(10px);
    }

    svg {
      margin-left: 5px;
      font-size: 20px;
    }
  }

  ${media.lessThan("large")`
    width: 100%;
  `}
`;
