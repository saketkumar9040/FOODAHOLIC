import React from "react";
import { createNativeStackNavigator  } from "@react-navigation/native-stack";
import WelcomeScreen from "./WelcomeScreen";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen"
import HomeScreen from "./HomeScreen";

const Stack = createNativeStackNavigator();

const authNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{animation:"none"}} initialRouteName="welcomeScreen">
      <Stack.Screen name="welcomeScreen" component={WelcomeScreen} options={{headerShown:false}}/>
      <Stack.Screen name="loginScreen" component={LoginScreen} options={{headerShown:false}}/>
      <Stack.Screen name="signUpScreen" component={SignUpScreen} options={{headerShown:false}}/>
      <Stack.Screen name="homeScreen" component={HomeScreen} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
};

export default authNavigation;
