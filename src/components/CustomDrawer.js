import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import { Image } from "react-native";
import { firebase } from "../firebase/FirebaseConfig";
import { useEffect } from "react";
import { useState } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const CustomDrawer = (props) => {
  const [userData, setUserData] = useState("");
  const [userLoggedUid, setUserLoggedUid] = useState(null);

  console.log(userData);
  const checkLogin = async () => {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserLoggedUid(user.uid);
      } else {
        return;
      }
    });
  };

  const getUserData = async () => {
    const docRef = firebase
      .firestore()
      .collection("UserData")
      .where("uid", "==", userLoggedUid);
    const doc = await docRef.get();
    if (!doc.empty) {
      doc.forEach((doc) => {
        setUserData(doc.data());
      });
    } else {
      return;
    }
  };

  useEffect(() => {
    checkLogin();
    getUserData();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#ff4242" }}>
      <View style={styles.userDetailsContainer}>
        <Image style={styles.image} source={{ uri: userData.avatar }} />
      <Text style={styles.name}>{userData?.name?.toUpperCase()}</Text>
      </View>
      <DrawerContentScrollView {...props} contentContainerStyle={{}}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={{paddingTop:20,borderTopWidth:2,borderTopColor:"#fff"}}>
        <TouchableOpacity style={{flexDirection:"row",alignItems:"center",paddingLeft:20,paddingVertical:5,}}>
        <Ionicons name="ios-share-social-sharp" size={26} color="#fff" />
         <Text style={{fontSize:16,color:"#fff",marginLeft:20,fontWeight:800}}>SHARE WITH FRIEND'S</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection:"row",alignItems:"center",paddingLeft:20,paddingVertical:5}}>
        <FontAwesome name="power-off" size={26} color="#fff" />
         <Text style={{fontSize:16,color:"#fff",marginLeft:25,fontWeight:800}}>LOGOUT</Text>
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
    paddingTop:20,
    backgroundColor:'#fff',

  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "cover",
    borderRadius:100,
  },
  name: {
    fontSize: 22,
    color: "#ff4242",
    alignSelf: "center",
    paddingTop: 10,
    fontWeight: 900,
  },
});
