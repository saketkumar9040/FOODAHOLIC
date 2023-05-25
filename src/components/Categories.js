import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { colors } from "../globals/style";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

const Categories = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.head}>{"Categories"+" >>>"}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.card}>
          <MaterialCommunityIcons name="food-apple" size={35} color="white" />
          <Text style={styles.foodText}>starters</Text>
        </View>
        <View style={styles.card}>
          <MaterialCommunityIcons name="food-variant" size={35} color="white" />
          <Text style={styles.foodText}>Breakfast</Text>
        </View>
        <View style={styles.card}>
          <MaterialIcons name="lunch-dining" size={35} color="white" />
          <Text style={styles.foodText}>Lunch</Text>
        </View>
        <View style={styles.card}>
          <MaterialIcons name="dinner-dining" size={35} color="white" />
          <Text style={styles.foodText}>Dinner</Text>
        </View>
        <View style={styles.card}>
          <FontAwesome5 name="glass-cheers" size={35} color="white" />
          <Text style={styles.foodText}>Liquid</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    marginTop: 6,
    width: "100%",
    // alignItems: "center",
  },
  head: {
    color: colors.color1,
    fontSize: 23,
    fontWeight: 500,
    marginBottom: 10,
    marginLeft:20,
  },
  card:{
    margin:10,
    marginLeft:20,
    alignItems:"center",
    justifyContent:"center"
  },
  foodText: {
    color: colors.color1,
    fontSize:13,
    fontWeight:500,
  },

});
