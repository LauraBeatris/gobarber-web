import styled from "styled-components";

export const AppointmentDateContainer = styled.span`
  color: ${({ theme }) => theme.colors.gray};
  display: flex;
  font-size: 20px;
  margin-left: auto;
  align-items: center;

  svg {
    color: ${({ theme }) => theme.colors.orange};
    margin-right: 6px;
  }
`;
