import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../globals/style";
import { StatusBar } from "react-native";

const HomeHeadNav = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <FontAwesome
          name="th-list"
          size={30}
          color="white"
          style={styles.myIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.middleContainer}>
          <Text style={styles.myText}>FOODAHOLIC</Text>
          <Ionicons
            name="fast-food-outline"
            size={35}
            color="white"
            style={styles.myIcon}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <FontAwesome5
          name="user-circle"
          size={30}
          color="white"
          style={styles.myIcon}
          onPress={() => navigation.navigate("userProfileScreen")}
        />
      </TouchableOpacity>
      <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#ff4242"
          translucent={false}
        />
    </View>
  );
};

export default HomeHeadNav;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
    backgroundColor: colors.bgColor,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
    // borderBottomWidth: 5,
    // borderColor: colors.color1,
    paddingTop:40,
  },
  middleContainer: {
    flexDirection: "row",
    // width: "55%",
    // marginLeft: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  myText: {
    color: colors.color1,
    fontSize: 20,
    marginRight: 8,
    fontWeight: 800,
  },
});
