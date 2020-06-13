import styled, { keyframes, css } from 'styled-components';
import { rgba, lighten } from 'polished';

interface RippleButtonProps {
  className?: string;
}

const rippleAnimation = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.5) translate(-50%, -50%);
  }

  35% {
    opacity: 1;
  }

  70% {
    opacity: 0;
  }

  100% {
    transform: scale(2.25) translate(-50%, -50%);
  }
`;

const rippleAnimationDuration = '1.15s';

const RippleButton = styled.button<RippleButtonProps>`
  position: relative;
  overflow: hidden;
  white-space: nowrap;

  & .ripple {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.2);
    opacity: 0;
    pointer-events: 0;
    transform-origin: 0% 0%;
    animation-timing-function: infinite;
    animation: ${rippleAnimation} ${rippleAnimationDuration};
  }

  .ripple-center {
    width: 75%;
    height: 75%;
    border-radius: 50%;

    ${({ theme }) =>
      css`
        background: ${rgba(theme.colors.orange, 0.25)};
        box-shadow: inset -5px -5px 10px ${lighten(0.8, theme.colors.orange)},
          inset 5px 5px 10px rgba(255, 255, 255, 0.025);
      `}
  }

  .ripple-image {
    width: 100px;
    height: 100px;
    pointer-events: none;
    transform-origin: 0% 0%;
    animation-timing-function: infinite;
    animation: ${rippleAnimation} ${rippleAnimationDuration};
  }
`;

const removeRippleEffect = (
  rippleButton: HTMLElement,
  rippleDomElement: HTMLSpanElement,
) => (): void => {
  rippleButton.removeChild(rippleDomElement);
};

const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
  const node = event.target as HTMLElement;
  const rect = node.getBoundingClientRect();
  const { clientX } = event;
  const { clientY } = event;
  const clientXInButton = clientX - rect.x;
  const clientYInButton = clientY - rect.y;

  const rippleButton = document.getElementById('ripple-button');
  const rippleDomElement = document.createElement('span');
  rippleDomElement.className = 'ripple';

  rippleDomElement.style.position = 'absolute';
  rippleDomElement.style.transform = 'scale(1) translate(-50%, -50%)';
  rippleDomElement.style.top = `${clientYInButton}px`;
  rippleDomElement.style.left = `${clientXInButton}px`;
  rippleDomElement.style.position = 'absolute';
  rippleDomElement.style.transform = 'scale(1) translate(-50%, -50%)';
  rippleDomElement.style.top = `${clientYInButton}px`;
  rippleDomElement.style.left = `${clientXInButton}px`;

  if (rippleButton) {
    rippleButton.appendChild(rippleDomElement);

    rippleDomElement.addEventListener(
      'webkitAnimationEnd',
      removeRippleEffect(rippleButton, rippleDomElement),
    );
    rippleDomElement.addEventListener(
      'animationend',
      removeRippleEffect(rippleButton, rippleDomElement),
    );
  }
};

export { RippleButton as default, handleClick };
