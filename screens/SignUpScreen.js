import { useState } from "react";
import { Alert } from "react-native";

import AuthContent from "../components/auth/AuthContent.js";
import LoadingOverlay from "../components/ui/LandingOverlay.js";
import ScreenBackground from "../components/ui/ScreenBackground.js";
import { createUser } from "../api/emailAuth.js";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const signupHandler = async (credentials) => {
    try {
      setIsAuthenticating(true);

      // Create user in Firebase Auth (SDK).
      // Firebase returns a UserCredential object: { user, providerId, ... }.
      await createUser(credentials.email, credentials.password);

    } catch (error) {
      console.error("Signup error:", error);
      Alert.alert("Signup Failed", "Please check your details or try again later.");
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Create an account..." />;
  }

  return (
    <ScreenBackground>
      <AuthContent onAuthenticate={signupHandler} />
    </ScreenBackground>
  );
}

export default SignupScreen;
