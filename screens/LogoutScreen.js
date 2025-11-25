// screens/LogoutScreen.js
import { useContext, useCallback } from "react";
import { Alert } from "react-native";
import { logout as firebaseLogout } from "../api/emailAuth";
import { AuthContext } from "../store/auth-context";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import ScreenBackground from "../components/ui/ScreenBackground";

export default function LogoutScreen() {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      Alert.alert(
        "Logout",
        "Are you sure you want to logout?",
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => navigation.goBack(),
          },
          {
            text: "Yes",
            style: "destructive",
            onPress: async () => {
              await firebaseLogout();
              authCtx.logout();
            },
          },
        ],
        { cancelable: false }
      );
    }, [navigation, authCtx])
  );

  return <ScreenBackground />;
}
