import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Share,
} from "react-native";
import React from "react";
import { firebase } from "../firebase/FirebaseConfig";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { autoLogin } from "../../store/authSlice";

const CustomDrawer = (props) => {
  const storedUserData = useSelector((state) => state.auth.userData);
  // console.log(storedUserData)

  const dispatch = useDispatch();

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(async () => {
        await dispatch(
          autoLogin({ email: null, password: null, userData: null })
        );
        alert("Logout successfully");
        // navigation.navigate("loginScreen",{isLoggedIn:false});
      })
      .catch((error) => {
        alert("system Error");
        console.log(error);
      });
  };

  const shareAppHandler = async () => {
    try {
      const result = await Share.share({
        message:
          `Install FOODAHOLIC APP to feed your HUNGER😋 
           https://drive.google.com/uc?export=download&id=1Ahmp711jiQe-O5P1MQr9vz3xka7lfeWI`
    });
      console.log(result)
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        return;
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#ff4242" }}>
      <View style={styles.userDetailsContainer}>
        <Image style={styles.image} source={{ uri: storedUserData?.avatar }} />
        <Text style={styles.name}>{storedUserData?.name?.toUpperCase()}</Text>
      </View>
      <DrawerContentScrollView {...props} contentContainerStyle={{}}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View
        style={{
          paddingVertical: 10,
          borderTopWidth: 2,
          borderTopColor: "#fff",
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: 20,
            paddingVertical: 7,
          }}
          onPress={() => shareAppHandler()}
        >
          <Ionicons name="ios-share-social-sharp" size={26} color="#fff" />
          <Text
            style={{
              fontSize: 16,
              color: "#fff",
              marginLeft: 20,
              fontWeight: 800,
            }}
          >
            SHARE WITH FRIEND'S
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: 20,
            paddingVertical: 7,
            paddingBottom: 10,
          }}
          onPress={() => handleLogout()}
        >
          <FontAwesome name="power-off" size={26} color="#fff" />
          <Text
            style={{
              fontSize: 16,
              color: "#fff",
              marginLeft: 25,
              fontWeight: 800,
            }}
          >
            LOGOUT
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff4242",
  },
  userDetailsContainer: {
    alignItems: "center",
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "cover",
    borderRadius: 100,
  },
  name: {
    fontSize: 22,
    color: "#ff4242",
    alignSelf: "center",
    paddingTop: 10,
    fontWeight: 900,
  },
});
