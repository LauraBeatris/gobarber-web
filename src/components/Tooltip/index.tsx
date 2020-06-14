import React from "react";

import { Container, Content } from "./styles";

interface TooltipProps {
  title: string;
  className?: string;
  icon: React.ComponentType;
}

const Tooltip: React.FC<TooltipProps> = ({ title, className, icon: Icon }) => (
  <Container className={className}>
    <Content>{title}</Content>

    <Icon />
  </Container>
);

export default Tooltip;
