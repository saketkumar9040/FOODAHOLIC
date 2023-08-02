import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerNavigator } from "./DrawerNavigator";
import UserProfileScreen from "../screens/UserProfileScreen";
import ProductScreen from "../screens/ProductScreen";
import CartScreen from "../screens/CartScreen";
import PlaceOrderScreen from "../screens/PlaceOrderScreen";
import TrackOrderScreen from "../screens/TrackOrderScreen";
import SuccessfulOrderScreen from "../screens/SuccessfulOrderScreen";
import SearchScreen from "../screens/SearchScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
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
  );
};

export default AppNavigator;
