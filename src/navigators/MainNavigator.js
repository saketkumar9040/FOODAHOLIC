import { Alert, StyleSheet } from "react-native";
import "expo-dev-client";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen.js";
import LoginScreen from "../screens/LoginScreen.js";
import SignUpScreen from "../screens/SignUpScreen.js";
import HomeScreen from "../screens/HomeScreen.js";
import UserProfileScreen from "../screens/UserProfileScreen.js";
import ProductScreen from "../screens/ProductScreen.js";
import CartScreen from "../screens/CartScreen.js";
import PlaceOrderScreen from "../screens/PlaceOrderScreen.js";
import TrackOrderScreen from "../screens/TrackOrderScreen.js";
import SuccessfulOrderScreen from "../screens/SuccessfulOrderScreen.js";

import * as Updates from "expo-updates"; // Updates*
import { useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";

const MainNavigator = () => {
  const isAuthenticated = useSelector(
    (state) => state.auth.email !== null && state.auth.password !== null
  );
  console.log(isAuthenticated);

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ animation: "none" }}
        initialRouteName="welcomeScreen"
      >
        {
        isAuthenticated === false ? (
          <>
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
          </>
        ) : (
          <>
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
