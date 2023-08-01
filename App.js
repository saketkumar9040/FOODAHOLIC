import { Alert, StyleSheet } from "react-native";
import MainNavigator from "./src/navigators/MainNavigator";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import { useEffect } from "react";
import * as Updates from "expo-updates";
import "react-native-gesture-handler";
import { useState } from "react";
import { ActivityIndicator } from "react-native";
import { View } from "react-native";
import { Text } from "react-native";

export default function App() {
  // CHECKING FOR UPDATES AS APP STARTS
  const [isUpdating, setIsUpdating] = useState(false);

  const checkForUpdates = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        setIsUpdating(true);
        await Updates.fetchUpdateAsync();
        Alert.alert(
          "Foodaholic got updates🤗! please wait while app is updating..."
        );
        await Updates.reloadAsync().then(() => {
          Alert.alert(
            "App updated Successfully🤩,Thank You for your patience🙏"
          );
          setIsUpdating(false);
        });
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
  useEffect(() => {
    checkForUpdates();
  }, []);

  return (
    <>
      {isUpdating ? (
        <View
          style={{
            flex: 1,
            backgroundColor: "#ff4242",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size={150} color="#fff" />
          <Text style={{fontSize:17,fontWeight:700,color:"#fff",marginTop:60,}}>PLEASE WAIT WHILE APP IS UPDATING...</Text>
        </View>
      ) : (
        <Provider store={store}>
          <MainNavigator />
        </Provider>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff4242",
    alignItems: "center",
    justifyContent: "center",
  },
});
