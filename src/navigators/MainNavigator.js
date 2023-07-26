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
import SearchScreen from "../screens/SearchScreen.js";
import * as Updates from "expo-updates"; // Updates*
import { useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../components/CustomDrawer.js";
import { FontAwesome5 } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveBackgroundColor: "#fff",
        drawerActiveTintColor: "#ff4242",
        drawerInactiveTintColor: "#fff",
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="HOME"
        component={HomeScreen}
        options={{
          headerShown: false,
          drawerIcon: ({focused}) => (
            <FontAwesome5 name="home" size={24} color={focused?"#ff4242":"#fff"} />
          ),
        }}
      />
      <Drawer.Screen
        name="PROFILE"
        component={UserProfileScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="SEARCH"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="GO TO CART"
        component={CartScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="TRACK ORDER"
        component={TrackOrderScreen}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

const MainNavigator = () => {
  const isAuthenticated = useSelector(
    (state) => state.auth.email !== null && state.auth.password !== null
  );
  // console.log(isAuthenticated);

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ animation: "none" }}
        initialRouteName="welcomeScreen"
      >
        {isAuthenticated === false ? (
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
              component={DrawerNavigator}
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
            <Stack.Screen
              name="searchScreen"
              component={SearchScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
