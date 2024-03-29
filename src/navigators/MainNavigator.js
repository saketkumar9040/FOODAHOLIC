import { Alert, } from "react-native";
import "expo-dev-client";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import * as Updates from "expo-updates";
import { useState, useEffect } from "react";
import UpdatingScreen from "../screens/UpdatingScreen.js";
import AuthNavigator from "./AuthNavigator.js";
import AppNavigator from "./AppNavigator.js";


const Stack = createNativeStackNavigator();

const MainNavigator = () => {

  
  const [isUpdating, setIsUpdating] = useState(false);
  


  // CHECKING FOR UPDATES AS APP STARTS ====================================================>
  
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
        // Alert.alert("Expo updates error: " + error.message);
        console.log(error.message);
      }
    }
  };
  checkForUpdates();

  // CHECKING FOR UPDATES ENDS ================================================================>

  const isAuthenticated = useSelector((state) => state.auth.userData !== null);
  // console.log(isAuthenticated);

  return (
        <NavigationContainer>
          {isUpdating && <UpdatingScreen/>}
          {!isUpdating && !isAuthenticated  && <AuthNavigator /> }
          {!isUpdating && isAuthenticated &&  <AppNavigator />}
        </NavigationContainer>
  
  );
};

export default MainNavigator;
