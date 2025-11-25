import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import ScreenBackground from "./ScreenBackground";
import { Colors } from "../../constants/style";

function LoadingOverlay({ message }) {
  return (
    <ScreenBackground>
      <View style={styles.rootContainer}>
        <Text style={styles.message}>{message}</Text>
        <ActivityIndicator size="large" />
      </View>
    </ScreenBackground>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  message: {
    fontSize: 16,
    marginBottom: 12,
    color: Colors.primary100,
  },
});
