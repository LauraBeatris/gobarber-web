import styled from "styled-components";
import media from "styled-media-query";

const ToastsContainer = styled.div`
  position: absolute;
  overflow: hidden;
  top: 20px;
  right: 20px;
  z-index: ${({ theme }) => theme.zIndexes.toasts};

  ${media.lessThan("medium")`
    left: 20px;
  `}
`;

export default ToastsContainer;
