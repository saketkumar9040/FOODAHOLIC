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
import NoInternetScreen from "../screens/NoInternetScreen.js";
import NetInfo from "@react-native-community/netinfo"

const Stack = createNativeStackNavigator();

const MainNavigator = () => {

  const [networkStatus,setNetworkStatus]= useState(false)
  const [isUpdating, setIsUpdating] = useState(false);
  
  // CHECKING INTERNET CONNECTIVITY START ===================================>

  const unsubscribe = () => NetInfo.addEventListener(state => {
    setNetworkStatus(state.isConnected)
    // console.log("Connection type", state.type);
    // console.log("Is connected?", state.isConnected);
  });
  useEffect(()=>{
    unsubscribe();
  },[])

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
        Alert.alert("Expo updates error: " + error.message);
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
          {!networkStatus && <NoInternetScreen/>}
          {networkStatus && isUpdating && <UpdatingScreen/>}
          {networkStatus &&  !isUpdating && !isAuthenticated  && <AuthNavigator /> }
          {networkStatus &&  !isUpdating && isAuthenticated &&  <AppNavigator />}
        </NavigationContainer>
  
  );
};

export default MainNavigator;
