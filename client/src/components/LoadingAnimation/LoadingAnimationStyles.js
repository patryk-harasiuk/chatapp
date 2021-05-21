import styled, { keyframes } from "styled-components";

export const AnimationContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: royalblue;
`;

const jump = keyframes`
    0% { transform: translateY(0) }
    50% { transform: translateY(-10px) }
`;

export const AnimationDot = styled.div`
  background-color: #fff;
  border-radius: 50%;
  margin: 2px;
  height: 10px;
  width: 10px;
  animation: ${jump} 0.5s ease-out infinite;

  :nth-of-type(2) {
    animation-delay: 0.1s;
  }

  :nth-of-type(3) {
    animation-delay: 0.2s;
  }
`;
