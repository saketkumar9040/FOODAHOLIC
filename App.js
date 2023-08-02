import MainNavigator from "./src/navigators/MainNavigator";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import "react-native-gesture-handler";


export default function App() {

  return (
        <Provider store={store}>
          <MainNavigator />
        </Provider>
  )
}

