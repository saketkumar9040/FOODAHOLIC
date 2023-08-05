import MainNavigator from "./src/navigators/MainNavigator";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import "react-native-gesture-handler";
import NetInfo from "@react-native-community/netinfo"
import { useEffect, useState } from "react";
import NoInternetScreen from "./src/screens/NoInternetScreen";

export default function App() {
  const [networkStatus,setNetworkStatus]= useState(false)

    // CHECKING INTERNET CONNECTIVITY START ===================================>

    const unsubscribe = () => NetInfo.addEventListener(state => {
      setNetworkStatus(state.isConnected)
      // console.log("Connection type", state.type);
      // console.log("Is connected?", state.isConnected);
    });
    useEffect(()=>{
      unsubscribe();
    },[])
  return (
    <Provider store={store}>
      {!networkStatus ? <NoInternetScreen /> : <MainNavigator />}
    </Provider>
  );
}
