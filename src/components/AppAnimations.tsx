import React, { useRef, useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import { styled } from "nativewind";
interface AppAnimation {
  File: any;
}
function AppAnimations({ File, ...rest }: AppAnimation) {
  const animation = useRef<LottieView>(null);
  return (
    <LottieView
      autoPlay
      {...rest}
      ref={animation}
      // Find more Lottie files at https://lottiefiles.com/featured
      source={File}
      {...rest}
    />
  );
}

const AppAnimation = styled(AppAnimations);

export { AppAnimation };
