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
import { useState , useEffect} from "react";
import UpdatingScreen from "../screens/UpdatingScreen.js";
import { DrawerNavigator } from "./DrawerNavigator.js";
import AuthNavigator from "./AuthNavigator.js";

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
        Alert.alert(
          "App updated Successfully🤩,Thank You for your patience🙏"
        );
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
        <UpdatingScreen/>
      ) : (
        <NavigationContainer>
            {isAuthenticated === false ? (
                <AuthNavigator/>
            ) : (
              <Stack.Navigator>
            
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
              </Stack.Navigator>
            )}
        
        </NavigationContainer>
      )}
    </>
  );
};

export default MainNavigator;
