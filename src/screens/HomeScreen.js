import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";

import HomeHeadNav from "../components/HomeHeadNav";
import Categories from "../components/Categories";
import OfferSliders from "../components/OfferSliders";
import * as NavigationBar from "expo-navigation-bar";
import { colors } from "../globals/style";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { firebase } from "../firebase/FirebaseConfig.js";
import CardSlider from "../components/CardSlider";

const HomeScreen = () => {
  NavigationBar.setBackgroundColorAsync("#ff4242");

  const [foodData, setFoodData] = useState([]);
  const [vegData, setVegData] = useState([]);
  const [nonVegData, setNonVegData] = useState([]);

  const foodRef = firebase.firestore().collection("foodData");

  useEffect(() => {
    foodRef.onSnapshot((snapshot) => {
      setFoodData(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  useEffect(() => {
    setVegData(foodData.filter((item) => item.foodType === "veg"));
    setNonVegData(foodData.filter((item) => item.foodType === "non-veg"));
  }, [foodData]);

  const [search, setSearch] = useState("");

  return (
    <ScrollView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#ff4242"
        translucent={false}
      />
      <HomeHeadNav />
      <View style={styles.searchContainer}>
        <FontAwesome5 name="search" size={24} color="white" />
        <TextInput
          style={styles.searchText}
          placeholder="Search your's favourite food"
          placeholderTextColor={colors.color1}
          onChangeText={(text) => {
            setSearch(text);
          }}
        />
      </View>
      {search != "" && (
        <View style={styles.searchResultContainer}>
          <FlatList
            style={styles.searchResultInner}
            data={foodData}
            renderItem={({ item }) => {
              if (item.foodName.toLowerCase().includes(search.toLowerCase())) {
                return (
                  <View style={styles.searchResult}>
                    {/* <AntDesign name="arrowright" size={24} color="white" /> */}
                    <Image
                      source={{ uri: item.foodImageUrl }}
                      style={styles.searchResultImage}
                    />
                    <View>
                    <Text style={styles.searchResultText}>{item.foodName}</Text>
                    <Text style={styles.searchResultPlace}>{item.restaurantAddressStreet}</Text>
                    </View>
                  </View>
                );
              }
            }}
          />
        </View>
      )}
      <Categories />
      <OfferSliders />
      <CardSlider title={"Today's Special"} data={foodData} />
      <CardSlider title={"Non Veg Lover's"} data={nonVegData} />
      <CardSlider title={"Veg Hunger"} data={vegData} />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
    // alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    width: "95%",
    margin: 8,
    padding: 7,
    paddingLeft: 15,
    alignItems: "center",
    borderWidth: 3,
    borderRadius: 20,
    borderColor: colors.color1,
  },
  searchText: {
    marginLeft: 20,
    width: "80%",
    color: colors.color1,
  },
  searchResultContainer: {
    width: "100%",
    margin: 8,
    backgroundColor: colors.bgColor,
  },
  searchResultInner: {
    width: "100%",
  },
  searchResult: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  searchResultText: {
    marginLeft: 20,
    fontSize: 18,
    fontWeight:500,
    color: colors.color1,
  },
  searchResultPlace:{
    marginLeft: 20,
    fontSize: 12,
    color:colors.color1,
  },
  searchResultImage: {
    marginLeft: 15,
    height: 55,
    width: 55,
    borderRadius:10,
    borderWidth:3,
    borderColor:colors.color1,
  },
});
