import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, Image, TouchableOpacity, } from "react-native";
import React, { useEffect, useState } from "react";
import * as NavigationBar from "expo-navigation-bar";
import logo from "../../assets/congrats.png";
import { colors, hr80 } from "../globals/style.js";
import { FontAwesome5 } from '@expo/vector-icons';


const SuccessfulOrderScreen = ({ navigation }) => {

  NavigationBar.setBackgroundColorAsync("#ff4242");


  return (
    <View style={styles.container} >
      
      <Text style={styles.title}>Congratulations🎉</Text>
      <Text style={styles.title1}>Order     placed Successfully</Text>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logoImage} />
      </View>


      <View style={styles.buttonContainer}>
      <TouchableOpacity>
        <Text
          style={styles.button}
          onPress={() => navigation.navigate("homeScreen")}
        >
          Go Home <FontAwesome5 name="home" size={24} color="#ff4242" />
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("trackOrderScreen")}>
        <Text style={styles.button}>Track Orders  <FontAwesome5 name="map-marker-alt" size={24} color="#ff4242" /></Text>
      </TouchableOpacity>
    </View>

  
      <StatusBar style="light" />
    </View>
  );
};

export default SuccessfulOrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff4242",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    height: "30%",
    width: "100%",
    padding:30,
    resizeMode:"contain",
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 35,
    color: colors.color1,
    alignSelf:"center",
    // textAlign: "center",
    marginVertical: 10,
    fontWeight: "700",
  },
  title1: {
    width:"60%",
    flexDirection:"column",
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
    alignItems:"center",
    justifyContent:"center",
  },
  button: {
    fontSize: 17,
    color: colors.text1,
    marginVertical: 20,
    marginHorizontal: 10,
    fontWeight: 800,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 5,
    paddingHorizontal:15,
    elevation: 15,
  },
});
