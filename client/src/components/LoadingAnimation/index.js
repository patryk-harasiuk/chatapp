import React from "react";
import { AnimationContainer, AnimationDot } from "./LoadingAnimationStyles";

const LoadingAnimation = () => {
  return (
    <AnimationContainer>
      <AnimationDot></AnimationDot>
      <AnimationDot></AnimationDot>
      <AnimationDot></AnimationDot>
    </AnimationContainer>
  );
};

export default LoadingAnimation;
