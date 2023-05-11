import { StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import HomeHeadNav from "../components/HomeHeadNav";
import Categories from "../components/Categories";
import OfferSliders from "../components/OfferSliders";
import * as NavigationBar from "expo-navigation-bar";
import { colors } from "../globals/style";
import { FontAwesome5 } from "@expo/vector-icons";

const HomeScreen = () => {
  NavigationBar.setBackgroundColorAsync("#ff4242");
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#ff4242"
        translucent={false}
      />
      <HomeHeadNav />
      <View style={styles.searchContainer}> 
        <FontAwesome5 name="search" size={24} color="white" />
        <TextInput style={styles.searchText} placeholder="Search your's favourite food" placeholderTextColor={colors.color1}/>
      </View>
      <Categories />
      <OfferSliders />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: colors.bgColor,
    alignItems:"center",
  },
  searchContainer:{
    flexDirection:"row",
    width:"95%",
    margin:10,
    padding:7,
    paddingLeft:15,
    alignItems:"center",
    borderWidth:3,
    borderRadius:20,
    borderColor:colors.color1,
  },
  searchText:{
    marginLeft:20,
    width:"80%",
    color:colors.color1,  
  }
});
