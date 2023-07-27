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
import { useDispatch, useSelector } from "react-redux";
import { autoLogin } from "../../store/authSlice";

const CustomDrawer = (props) => {

  const storedUserData = useSelector(state=>state.auth.userData);
  // console.log(storedUserData)

   const dispatch = useDispatch();

  // const [userData, setUserData] = useState("");
  // const [userLoggedUid, setUserLoggedUid] = useState(null);

  // console.log(userData);
  // const checkLogin = async () => {
  //   await firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       setUserLoggedUid(user.uid);
  //     } else {
  //       setUserLoggedUid(null);
  //     }
  //   });
  // };

  // const getUserData = async () => {
  //   const docRef = firebase
  //     .firestore()
  //     .collection("UserData")
  //     .where("uid", "==", userLoggedUid);
  //   const doc = await docRef.get();
  //   if (!doc.empty) {
  //     doc.forEach((doc) => {
  //       setUserData(doc.data());
  //     });
  //   } else {
  //     return;
  //   }
  // };

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(async() => {
        await dispatch(autoLogin({email:null,password:null,userData:null}))
        alert("Logout successfully");
        // navigation.navigate("loginScreen",{isLoggedIn:false});
      })
      .catch((error) => {
        alert("system Error");
        console.log(error);
      });
  };

  // useEffect(() => {
  //   checkLogin();
  //   getUserData();
  // }, [userLoggedUid]);

  return (
    <View style={{ flex: 1, backgroundColor: "#ff4242" }}>
      <View style={styles.userDetailsContainer}>
        <Image style={styles.image} source={{ uri: storedUserData.avatar }} />
      <Text style={styles.name}>{storedUserData?.name?.toUpperCase()}</Text>
      </View>
      <DrawerContentScrollView {...props} contentContainerStyle={{}}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={{paddingTop:10,borderTopWidth:2,borderTopColor:"#fff"}}>
        <TouchableOpacity style={{flexDirection:"row",alignItems:"center",paddingLeft:20,paddingVertical:7,}}>
        <Ionicons name="ios-share-social-sharp" size={26} color="#fff" />
         <Text style={{fontSize:16,color:"#fff",marginLeft:20,fontWeight:800}}>SHARE WITH FRIEND'S</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection:"row",alignItems:"center",paddingLeft:20,paddingVertical:7,paddingBottom:10,}} onPress={()=>handleLogout()}>
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
