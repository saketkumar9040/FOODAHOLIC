import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./screens/AuthNavigation.js"

const RootNavigation = () => {
  return (
    <NavigationContainer >
      <AuthNavigation />
    </NavigationContainer>
  );
};

export default RootNavigation;