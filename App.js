import { Alert, StyleSheet } from "react-native";
import MainNavigator from "./src/navigators/MainNavigator";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import { useEffect } from "react";
import * as Updates from "expo-updates";
import 'react-native-gesture-handler';


export default function App() {
  // CHECKING FOR UPDATES AS APP STARTS
   useEffect(()=>{
    const checkForUpdates = async() => {
      try {
        const update = await Updates.checkForUpdateAsync()
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync()
          Alert.alert("Foodaholic got updates🤗! please wait while app is updating...")
          await Updates.reloadAsync().then(()=>{
            Alert.alert("App updated Successfully🤩,Thank You for your patience🙏")
          })
        }
      } catch (error) {
        if(error.message === "You cannot check for updates in development mode. To test manual updates, publish your project using `expo publish` and open the published version in this development client."){
          console.log(error.message);
          return
        }
        if(error.message === "You cannot check for updates in development mode. To test manual updates, make a release build with `npm run ios --configuration Release` or `npm run android --variant Release`."){
          console.log(error.message);
          return
        }else{
          Alert.alert("Expo updates error: "+error.message)
          console.log(error.message) 
        }
      }
    };
    checkForUpdates();
   },[]);

  return (
    <Provider store={store}>
       <MainNavigator/>
    </Provider>
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
