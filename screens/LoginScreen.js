import { useState, useContext } from "react";
import { Alert, Text, View, StyleSheet } from "react-native";

import AuthContent from "../components/auth/AuthContent";
import LoadingOverlay from "../components/ui/LandingOverlay";
import ScreenBackground from "../components/ui/ScreenBackground";
import { login } from "../api/emailAuth";
import { AuthContext } from "../store/auth-context";
import { Colors } from "../constants/style";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    try {
      setIsAuthenticating(true);

      const user = await login(email, password);
      const token = await user.getIdToken();

      authCtx.authenticate(token);
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Login Failed", "Please check your credentials or try again later.");
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Enter the system..." />;
  }

  return (
    <ScreenBackground>
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome Back</Text>

        {/* AuthContent renders the form */}
        <AuthContent isLogin onAuthenticate={loginHandler} />
      </View>
    </ScreenBackground>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    padding: 24,
    paddingTop: 80,
    alignItems: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    color: Colors.primary100,
    textShadowColor: Colors.black,
    textShadowRadius: 6,
  },
});
