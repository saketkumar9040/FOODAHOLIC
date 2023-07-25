import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../globals/style";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";

const BottomNav = ({navigation}) => {

  return (
    <View style={styles.bottomNavContainer}>
      <TouchableOpacity  style={styles.icon}>
        <FontAwesome5 name="home" size={30} color="white" onPress={()=>navigation.navigate("homeScreen")} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.searchIcon}>
        <FontAwesome name="search" size={30} color={colors.bgColor} onPress={()=>navigation.navigate("searchScreen")} />
      </TouchableOpacity>
      <TouchableOpacity  style={styles.icon}>
        <FontAwesome5 name="shopping-cart" size={30} color="white" onPress={()=>navigation.navigate("cartScreen")}/>
      </TouchableOpacity>
      <TouchableOpacity  style={styles.icon}>
        <FontAwesome5 name="map-marked-alt" size={30} color="white" onPress={()=>navigation.navigate("trackOrderScreen")}/>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  bottomNavContainer: {
    width: "100%",
    // height: "5%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingTop:2,
    // marginTop:20,
    backgroundColor: colors.bgColor,
    position:"absolute",
    bottom:0,
    // borderTopColor:colors.color1,
    // borderTopWidth:0.5,
  },
  searchIcon:{
    alignItems:"center",
    justifyContent:"center",
    position:"relative",
    top:-20,
    backgroundColor:colors.color1,
    width:60,
    height:60,
    alignSelf:"center",
    borderRadius:60,
    color:colors.bgColor,
    elevation:10,
  },
  icon:{
    borderRadius:60,
    elevation:10,
  }
});
