import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import FlatButton from "../ui/FlatButton";
import AuthForm from "./AuthForm";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../constants/style";

function AuthContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    confirmEmail: false,
    password: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {
    navigation.replace(isLogin ? "Signup" : "Login");
  }

  function submitHandler(credentials) {
    const { email, confirmEmail, password, confirmPassword } = credentials;

    const emailValid = email.includes("@");
    const passwordValid = password.length > 6;
    const emailMatch = email === confirmEmail;
    const passMatch = password === confirmPassword;

    if (
      !emailValid ||
      !passwordValid ||
      (!isLogin && (!emailMatch || !passMatch))
    ) {
      setCredentialsInvalid({
        email: !emailValid,
        confirmEmail: !emailValid || !emailMatch,
        password: !passwordValid,
        confirmPassword: !passwordValid || !passMatch,
      });
      return;
    }

    onAuthenticate(credentials);
  }

  return (
    <View style={styles.screenContainer}>
      <View style={styles.card}>
        <Text style={styles.title}>{isLogin ? "Login" : "Create Account"}</Text>

        <AuthForm
          isLogin={isLogin}
          onSubmit={submitHandler}
          credentialsInvalid={credentialsInvalid}
        />

        <FlatButton
          onPress={switchAuthModeHandler}
          textStyle={styles.switchButton}
        >
          {isLogin
            ? "Don't have an account? Sign up"
            : "Already have an account? Login"}
        </FlatButton>
      </View>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  card: {
    backgroundColor: "rgba(0, 0, 0, 0.55)", // dark casino glass
    padding: 28,
    borderRadius: 20,

    borderWidth: 2,
    borderColor: Colors.primary500, // gold border

    shadowColor: "#000",
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 12,
  },

  title: {
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 28,
    textAlign: "center",

    color: Colors.primary100, // soft gold
    textShadowColor: "#000",
    textShadowRadius: 6,
  },

  switchButton: {
    marginTop: 18,
    color: Colors.primary500, // casino gold
    textAlign: "center",
    fontSize: 17,
    fontWeight: "600",
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowRadius: 3,
  },
});
