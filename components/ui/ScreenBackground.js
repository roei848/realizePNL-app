import React from "react";
import { ImageBackground, StyleSheet } from "react-native";

const pokerBackground = require("../../assets/poker-table-green.jpg");
// adjust the path depending on where ScreenBackground.js lives

function ScreenBackground({ children }) {
  return (
    <ImageBackground
      source={pokerBackground}
      resizeMode="cover"
      style={styles.background}
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default ScreenBackground;
