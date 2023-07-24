import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, Image, TouchableOpacity, } from "react-native";
import React, { useEffect, useState } from "react";
import * as NavigationBar from "expo-navigation-bar";
import logo from "../../assets/logo.png";
import { colors, hr80 } from "../globals/style.js";

import { firebase } from "../firebase/FirebaseConfig";

const WelcomeScreen = ({ navigation }) => {

  NavigationBar.setBackgroundColorAsync("#ff4242");

  const [userLogged,setUserLogged] = useState(null);

  useEffect(() => {
     const checkLogin = async() => {
       await firebase.auth().onAuthStateChanged((user)=>{
          if(user){
            // console.log(user)
            setUserLogged(user);
          }
          else{
            setUserLogged(null);
            console.log("No user is Logged In !!!!")
          }
        })
     }
     checkLogin();
  }, []);

  const handleLogout = () => {
     firebase.auth().signOut()
     .then(()=>{
      setUserLogged(null);
      console.log("Logged Out Successfully")
     })
     .catch((error)=>{
      console.log(error.message)
     })
  };
// console.log(JSON.stringify(userLogged));
  return (
    <View style={styles.welcomeScreenContainer} >
      
      <Text style={{ fontSize: 20, color: colors.color1 }}>Welcome </Text>
      <Text style={{ fontSize: 20, color: colors.color1 }}>to</Text>
      <Text style={styles.title}>FOODAHOLIC</Text>
      {userLogged !== null && <View ><Text style={styles.loggedName}>{userLogged.email}</Text></View>}
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logoImage} />
      </View>
      <View style={hr80} />
      <Text style={styles.text}>
        If your HUNGER is making you a MONSTER. order now from FOODAHOLIC and
        kill the MONSTER
      </Text>
      <View style={hr80} />
    { userLogged ===null ?
      <View style={styles.buttonContainer}>
      <TouchableOpacity>
        <Text
          style={styles.button}
          onPress={() => navigation.navigate("signUpScreen")}
        >
          Sign Up
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("loginScreen")}>
        <Text style={styles.button}>Log In</Text>
      </TouchableOpacity>
    </View>
  :
  <View style={styles.buttonContainer}>
  <TouchableOpacity onPress={() => navigation.navigate("homeScreen")}>
    <Text style={styles.button}>Go to Home</Text>
  </TouchableOpacity>
  <TouchableOpacity>
    <Text
      style={styles.button}
      onPress={() => handleLogout()}
    >
      Log Out
    </Text>
  </TouchableOpacity>
</View>
  }   
      <StatusBar style="light" />
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  welcomeScreenContainer: {
    flex: 1,
    backgroundColor: "#ff4242",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    height: "30%",
    width: "95%",
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: {
    width: "70%",
    height: "100%",
  },
  title: {
    fontSize: 35,
    color: colors.color1,
    textAlign: "center",
    marginVertical: 10,
    fontWeight: "700",
  },
  text: {
    fontSize: 13,
    fontWeight: 700,
    width: "80%",
    color: colors.color1,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignContent: "space-between",
  },
  button: {
    fontSize: 17,
    color: colors.text1,
    marginVertical: 20,
    marginHorizontal: 10,
    fontWeight: 800,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 45,
    elevation: 15,
  },
  loggedName:{
    color:colors.color1,
    fontSize:25,
    fontWeight:600,

  }
});
