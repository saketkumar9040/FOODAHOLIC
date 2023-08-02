import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import SearchScreen from "../screens/SearchScreen";
import CartScreen from "../screens/CartScreen";
import TrackOrderScreen from "../screens/TrackOrderScreen";
import CustomDrawer from "../components/CustomDrawer";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
    return (
      <Drawer.Navigator
        screenOptions={{
          drawerActiveBackgroundColor: "#fff",
          drawerActiveTintColor: "#ff4242",
          drawerInactiveTintColor: "#fff",
          drawerLabelStyle: {
            fontSize: 16,
            fontWeight: 800,
            marginLeft: -15,
          },
        }}
        drawerContent={(props) => <CustomDrawer {...props} />}
      >
        <Drawer.Screen
          name="HOME"
          component={HomeScreen}
          options={{
            headerShown: false,
            drawerIcon: ({ focused }) => (
              <FontAwesome5
                name="home"
                size={24}
                color={focused ? "#ff4242" : "#fff"}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="PROFILE"
          component={UserProfileScreen}
          options={{
            headerShown: false,
            drawerIcon: ({ focused }) => (
              <FontAwesome5
                name="user-alt"
                size={24}
                color={focused ? "#ff4242" : "#fff"}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="SEARCH"
          component={SearchScreen}
          options={{
            headerShown: false,
            drawerIcon: ({ focused }) => (
              <FontAwesome
                name="search"
                size={24}
                color={focused ? "#ff4242" : "#fff"}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="GO TO CART"
          component={CartScreen}
          options={{
            headerShown: false,
            drawerIcon: ({ focused }) => (
              <FontAwesome
                name="shopping-cart"
                size={24}
                color={focused ? "#ff4242" : "#fff"}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="TRACK ORDER"
          component={TrackOrderScreen}
          options={{
            headerShown: false,
            drawerIcon: ({ focused }) => (
              <FontAwesome5
                name="map-marked-alt"
                size={24}
                color={focused ? "#ff4242" : "#fff"}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    );
  };