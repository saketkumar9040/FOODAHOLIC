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
      <Text style={styles.head}>Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.card}>
          <FontAwesome5 name="hamburger" size={45} color="white" />
          <Text style={styles.foodText}>Burger</Text>
        </View>
        <View style={styles.card}>
          <FontAwesome5 name="pizza-slice" size={45} color="white" />
          <Text style={styles.foodText}>Pizza</Text>
        </View>
        <View style={styles.card}>
          <MaterialCommunityIcons name="noodles" size={45} color="white" />
          <Text style={styles.foodText}>Noodles</Text>
        </View>
        <View style={styles.card}>
          <MaterialIcons name="emoji-food-beverage" size={45} color="white" />
          <Text style={styles.foodText}>Beverage</Text>
        </View>
        <View style={styles.card}>
          <MaterialCommunityIcons name="food-turkey" size={45} color="white" />
          <Text style={styles.foodText}>Chicken</Text>
        </View>
        <View style={styles.card}>
          <MaterialIcons name="icecream" size={45} color="white" />
          <Text style={styles.foodText}>Icecream</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: "95%",
    borderRadius: 10,
    alignItems: "center",
  },
  head: {
    color: colors.color1,
    fontSize: 20,
    fontWeight: 400,
    padding: 5,
    marginBottom: 18,
    borderBottomColor: colors.color1,
    borderBottomWidth: 2,
    borderTopColor:colors.color1,
    borderTopWidth:2,
  },
  card:{
    margin:10,
    alignItems:"center",
    justifyContent:"center"
  },
  foodText: {
    color: colors.color1,
    fontWeight:600,
  },

});
