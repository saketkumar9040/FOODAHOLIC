import { StyleSheet } from "react-native";
import MainNavigator from "./src/navigators/MainNavigator";
import { store } from "./store/store.js";
import { Provider } from "react-redux";

export default function App() {
  // CHECKING FOR UPDATES AS APP STARTS
  //  useEffect(()=>{
  //   const checkForUpdates = async() => {
  //     try {
  //       const update = await Updates.checkForUpdateAsync()
  //       if (update.isAvailable) {
  //         await Updates.fetchUpdateAsync()
  //         Alert.alert("Foodaholic got updates🤗! please wait while app is updating...")
  //         await Updates.reloadAsync().then(()=>{
  //           Alert.alert("App updated Successfully🤩,Thank You for your patience🙏")
  //         })
  //       }
  //     } catch (e) {
  //         console.log(e)
  //     }
  //   };
  //   checkForUpdates();
  //  },[]);

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
