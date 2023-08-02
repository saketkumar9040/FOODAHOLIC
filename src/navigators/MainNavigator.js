import { Alert, StyleSheet } from "react-native";
import "expo-dev-client";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserProfileScreen from "../screens/UserProfileScreen.js";
import ProductScreen from "../screens/ProductScreen.js";
import CartScreen from "../screens/CartScreen.js";
import PlaceOrderScreen from "../screens/PlaceOrderScreen.js";
import TrackOrderScreen from "../screens/TrackOrderScreen.js";
import SuccessfulOrderScreen from "../screens/SuccessfulOrderScreen.js";
import SearchScreen from "../screens/SearchScreen.js";
import { Provider, useSelector } from "react-redux";
import CustomDrawer from "../components/CustomDrawer.js";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import * as Updates from "expo-updates";
import { useState, useEffect } from "react";
import UpdatingScreen from "../screens/UpdatingScreen.js";
import { DrawerNavigator } from "./DrawerNavigator.js";
import AuthNavigator from "./AuthNavigator.js";
import AppNavigator from "./AppNavigator.js";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  // CHECKING FOR UPDATES AS APP STARTS ====================================================>
  const [isUpdating, setIsUpdating] = useState(false);

  const checkForUpdates = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        setIsUpdating(true);
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
        setIsUpdating(false);
        Alert.alert("App updated Successfully🤩,Thank You for your patience🙏");
      }
    } catch (error) {
      if (
        error.message ===
        "You cannot check for updates in development mode. To test manual updates, publish your project using `expo publish` and open the published version in this development client."
      ) {
        console.log(error.message);
        return;
      }
      if (
        error.message ===
        "You cannot check for updates in development mode. To test manual updates, make a release build with `npm run ios --configuration Release` or `npm run android --variant Release`."
      ) {
        console.log(error.message);
        return;
      } else {
        Alert.alert("Expo updates error: " + error.message);
        console.log(error.message);
      }
    }
  };
  // CHECKING FOR UPDATES ENDS ================================================================>

  useEffect(() => {
    checkForUpdates();
  }, []);

  const isAuthenticated = useSelector((state) => state.auth.userData !== null);
  // console.log(isAuthenticated);

  return (
    <>
      {isUpdating ? (
        <UpdatingScreen />
      ) : (
        <NavigationContainer>
          {isAuthenticated === false ? <AuthNavigator /> : <AppNavigator />}
        </NavigationContainer>
      )}
    </>
  );
};

export default MainNavigator;
