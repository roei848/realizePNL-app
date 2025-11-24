import { LinearGradient } from "expo-linear-gradient";

function ScreenBackground({ children }) {
  return (
    <LinearGradient
      colors={['#b2d8ff', '#ffffff']}
      style={{ flex: 1 }}
    >
      {children}
    </LinearGradient>
  );
}

export default ScreenBackground;