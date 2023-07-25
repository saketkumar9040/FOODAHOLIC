import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../globals/style";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

const Categories = ({navigation}) => {

  const searchFoodCategory = (searchText) => {
     navigation.navigate("searchScreen",{searchText})
  }

  return (
    <View style={styles.container}>
      <Text style={styles.head}>{"Categories"+" >>>"}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity style={styles.card} onPress={()=>searchFoodCategory("starters")}>
          <MaterialCommunityIcons name="food-apple" size={35} color="white" />
          <Text style={styles.foodText}>starters</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={()=>searchFoodCategory("breakfast")}>
          <MaterialCommunityIcons name="food-variant" size={35} color="white" />
          <Text style={styles.foodText}>Breakfast</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={()=>searchFoodCategory("lunch")}>
          <MaterialIcons name="lunch-dining" size={35} color="white" />
          <Text style={styles.foodText}>Lunch</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={()=>searchFoodCategory("dinner")}>
          <MaterialIcons name="dinner-dining" size={35} color="white" />
          <Text style={styles.foodText}>Dinner</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={()=>searchFoodCategory("liquid")}>
          <FontAwesome5 name="glass-cheers" size={35} color="white" />
          <Text style={styles.foodText}>Liquid</Text>
        </TouchableOpacity>
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
