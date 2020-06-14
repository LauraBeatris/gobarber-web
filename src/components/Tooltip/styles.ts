import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100%;
  position: relative;
  align-items: center;

  svg {
    cursor: pointer;
    height: 20px;
  }

  &:hover {
    span {
      opacity: 1;
      visibility: visible;
    }
  }
`;

export const Content = styled.span`
  background: ${({ theme }) => theme.colors.orange};
  bottom: 50px;
  border-radius: 6px;
  color: #fff;
  opacity: 0;
  padding: 8px;
  position: absolute;
  right: 50%;
  transform: translateX(50%);
  min-width: 100px;
  transition: opacity 200ms;
  visibility: hidden;

  &:before {
    content: '';
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.orange} transparent;
    border-width: 6px 6px 0 6px;
    position: absolute;
    top: 100%;
    right: 50%;
    transform: translateX(50%);
  }
`;
