import { useState, useContext } from "react";
import { Alert } from "react-native";

import AuthContent from "../components/auth/AuthContent";
import LoadingOverlay from "../components/ui/LandingOverlay";
import ScreenBackground from "../components/ui/ScreenBackground";
import { login } from "../api/emailAuth";
import { AuthContext } from "../store/auth-context";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    try {
      setIsAuthenticating(true);

      // Login using Firebase Auth SDK
      const user = await login(email, password);

      // Get the ID token
      const token = await user.getIdToken();

      // Pass token to your AuthContext
      authCtx.authenticate(token);
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert(
        "Login Failed", 
        "Please check your credentials or try again later."
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="נכנס למערכת..." />;
  }

  return (
    <ScreenBackground>
      <AuthContent isLogin onAuthenticate={loginHandler} />
    </ScreenBackground>
  );
}

export default LoginScreen;
