import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../globals/style";

const HomeHeadNav = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FontAwesome
        name="th-list"
        size={30}
        color="white"
        style={styles.myIcon}
      />
      <View style={styles.middleContainer}>
        <Text style={styles.myText}>FOODAHOLIC</Text>
        <Ionicons
          name="fast-food-outline"
          size={35}
          color="white"
          style={styles.myIcon}
        />
      </View>
      <FontAwesome5
        name="user-circle"
        size={30}
        color="white"
        style={styles.myIcon}
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
  },
  middleContainer: {
    flexDirection: "row",
    width: "55%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  myText: {
    color: colors.color1,
    fontSize: 20,
    fontWeight:800,
  },
});
