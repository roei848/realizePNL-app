import { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ReportsProvider from "./store/report-context";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { Colors } from "./constants/style";

import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import HomeScreen from "./screens/HomeScreen";
import HistoryScreen from "./screens/HistoryScreen";
import LogoutScreen from "./screens/LogoutScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignUpScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <ReportsProvider>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,

          tabBarStyle: {
            backgroundColor: "rgba(0,0,0,0.7)",
            borderTopColor: Colors.primary500, // gold
            borderTopWidth: 1.5,
            height: 65,
          },

          tabBarActiveTintColor: Colors.primary500, // gold
          tabBarInactiveTintColor: Colors.gray,

          tabBarLabelStyle: {
            fontSize: 13,
            fontWeight: "600",
          },

          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Home") iconName = "home";
            if (route.name === "History") iconName = "list";
            if (route.name === "Logout") iconName = "log-out-outline";

            return <Ionicons name={iconName} size={22} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="History" component={HistoryScreen} />
        <Tab.Screen
          name="Logout"
          component={LogoutScreen}
          options={{ tabBarLabel: "Logout" }}
        />
      </Tab.Navigator>
    </ReportsProvider>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </>
  );
}
