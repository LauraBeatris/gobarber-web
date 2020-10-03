import styled from "styled-components";
import media from "styled-media-query";

export const HeaderContainer = styled.header`
  width: 100%;
  padding: 32px;
  z-index: ${({ theme }) => theme.zIndexes.header};
  position: fixed;
  background-color: ${({ theme }) => theme.colors.blackMedium};
`;

export const HeaderContent = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.lengths.contentMaxWidth}px;
  align-items: center;

  > button {
    border: 0;
    margin-left: auto;
    background: none;

    svg {
      color: ${({ theme }) => theme.colors.gray};
    }
  }

  > img {
    height: 100px;
    margin-right: 5%;

    ${media.lessThan("small")`
      display: none;
    `}
  }
`;

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 55px;
    height: 55px;
    margin-right: 15px;
    border-radius: 50%;
  }

  > div {
    display: flex;
    line-height: 24px;
    flex-direction: column;

    span, strong {
      font-weight: 400;
    }

    span {
      color: ${({ theme }) => theme.colors.gray};
    }

    strong {
      color: ${({ theme }) => theme.colors.orange};

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;
