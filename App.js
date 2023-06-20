import { StyleSheet } from "react-native";
import "expo-dev-client";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./src/screens/WelcomeScreen.js";
import LoginScreen from "./src/screens/LoginScreen.js";
import SignUpScreen from "./src/screens/SignUpScreen.js";
import HomeScreen from "./src/screens/HomeScreen.js";
import UserProfileScreen from "./src/screens/UserProfileScreen.js";
import ProductScreen from "./src/screens/ProductScreen.js";
import CartScreen from "./src/screens/CartScreen.js";
import PlaceOrderScreen from "./src/screens/PlaceOrderScreen.js";
import TrackOrderScreen from "./src/screens/TrackOrderScreen.js";
import SuccessfulOrderScreen from "./src/screens/SuccessfulOrderScreen.js";


export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ animation: "none" }}
        initialRouteName="welcomeScreen"
      >
        <Stack.Screen
          name="welcomeScreen"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="loginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="signUpScreen"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="homeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="userProfileScreen"
          component={UserProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="productScreen"
          component={ProductScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="cartScreen"
          component={CartScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="placeOrderScreen"
          component={PlaceOrderScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="trackOrderScreen"
          component={TrackOrderScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="successfulOrderScreen"
          component={SuccessfulOrderScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff4242",
    alignItems: "center",
    justifyContent: "center",
  },
});
