import styled, { css } from "styled-components";
import { shade, rgba } from "polished";
import media from "styled-media-query";

import { NotificationsButtonProps } from "./types";

export const NotificationsButton = styled.button<NotificationsButtonProps>`
  width: 3rem;
  border: unset;
  display: flex;
  padding: 5px;
  position: relative;
  border-radius: 5px;
  align-items: center;
  justify-content: center;

  ${({ theme, showBadge, showNotifications }) => css`
    background: ${theme.colors.blackMedium};

    &:hover {
      background: ${shade(0.5, theme.colors.blackMedium)};
    }

    ${showNotifications && media.greaterThan("medium")`
        &::before {
        content: "";
        top: 110%;
        left: 50%;
        position: absolute;
        transform: translateX(-50%);
        width: 0px;
        height: 0px;
        border-style: solid;
        border-width: 0px 7.5px 8px;
        border-color: transparent transparent ${shade(0.2, theme.colors.blackMedium)};
        z-index: 1;
      `}
      }



    ${showBadge && css`
      &::after {
        top: 4px;
        right: 12px;
        content: "";
        width: 8px;
        height: 8px;
        position: absolute;
        border-radius: 50%;
        background-color: ${theme.colors.orange}
      }
    `}

    svg {
      color: ${theme.colors.gray};
      position: relative;
      font-size: 25px;
    }
  `};
`;

export const NotificationsContainer = styled.div`
  display: flex;
  position: relative;
  margin-left: auto;
  margin-right: 15px;
  flex-direction: column;

  ${media.lessThan("medium")`
    position: unset;
  `}
`;

export const NotificationsList = styled.ul`
  top: 130%;
  right: 5%;
  width: 25rem;
  margin: 0 auto;
  height: 10rem;
  padding: 10px;
  display: flex;
  position: absolute;
  min-height: 400px;
  overflow-y: scroll;
  box-shadow: -2px 2px 24px -8px rgba(0, 0, 0, .5);
  border-radius: 5px;
  flex-direction: column;

  ${media.lessThan("medium")`
    width: 100%;
    right: 0;
    left: 0;
    top: 100%;
  `}

  ${({ theme }) => css`
    background: ${shade(0.2, theme.colors.blackMedium)};

    scrollbar-width: 12px;
    scrollbar-color: ${theme.colors.orange} ${theme.colors.blackMedium};

    &::-webkit-scrollbar-track,
    &::-webkit-scrollbar-thumb {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }

    &::-webkit-scrollbar-track,
    &::-webkit-scrollbar {
      background-color: ${shade(0.2, theme.colors.blackMedium)};
    }

    &::-webkit-scrollback {
      width: 12px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${theme.colors.orange};
    }

    header {
      width: 100%;
      display: flex;
      align-items: center;
      padding-bottom: 10px;
      border-bottom: 2px solid ${theme.colors.blackMedium};
      justify-content: space-between;

      p {
        letter-spacing: 0.5px;
        font-weight: 600;
        color: ${theme.colors.white};
      }

      > div {
        display: flex;
        align-items: center;
      }

      button {
        border: none;
        display: flex;
        font-size: 12px;
        background: none;
        align-items: center;
      }

      button:first-of-type {
        color: ${theme.colors.orange};
        font-weight: 600;
        text-transform: uppercase;
      }

      button:last-of-type {
        color: ${theme.colors.white};
        font-size: 14px;
        margin-left: 8px;
      }

      ~ div:last-of-type {
        width: 4em !important;
        height: 4em !important;
        margin: auto !important;
      }
    }

    button {
      background: ${theme.colors.orange};
      border-radius: 5px;
      margin-top: auto;
      font-weight: 600;
      padding: 5px 0;
      border: none;
      color: ${theme.colors.white};
    }
  `}

  > h4 {
    margin: auto;
  }
`;

export const NotificationListItem = styled.li`
  width: 100%;
  display: flex;
  padding: 8px;
  margin: 10px 0;
  border-radius: 5px;
  flex-direction: column;
  justify-content: space-between;

  span {
    max-width: 80%;
    font-size: 14px;
  }

  ${({ theme }) => css`
    background: ${rgba(theme.colors.shape, 0.3)};

    small {
      margin-top: 5px;
      color: ${theme.colors.gray};
    }
  `}
`;
