import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../globals/style";
import { FontAwesome5 } from "@expo/vector-icons";
import { TextInput } from "react-native";
import { firebase } from "../firebase/FirebaseConfig.js";
import BottomNav from "../components/BottomNav";
import searchBackground from "../../assets/searchScreenBackground.png"
import { StatusBar } from "react-native";

const SearchScreen = ({ navigation, route }) => {

  const [foodData, setFoodData] = useState([]);
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState(route?.params?.searchText);

  const foodRef = firebase.firestore().collection("foodData");

  useEffect(() => {
    foodRef.onSnapshot((snapshot) => {
      setFoodData(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#ff4242"
          translucent={false}
        />
      <View style={styles.searchContainer}>
        <FontAwesome5 name="search" size={24} color="white" />
        <TextInput
          style={styles.searchText}
          placeholder={searchText?searchText:"Search your's favourite food"}
          placeholderTextColor={colors.color1}
          onChangeText={(text) => {
            setSearch(text);
          }}
          onFocus={() => setSearchText("")}
        />
      </View>
      { !search && !searchText && (
        <Image
        source={searchBackground}
        style={styles.screenBackground} 
        />
      )}
      {search != "" && !searchText && (
        <View style={styles.searchResultContainer}>
          <FlatList
            style={styles.searchResultInner}
            data={foodData}
            renderItem={({ item }) => {
              if (item.foodName.toLowerCase().includes(search.toLowerCase())) {
                // console.log(item);
                return (
                  <TouchableOpacity
                    style={styles.searchResult}
                    onPress={() =>
                      navigation.navigate("productScreen", { ...item })
                    }
                  >
                    {/* <AntDesign name="arrowright" size={24} color="white" /> */}
                    <Image
                      source={{ uri: item.foodImageUrl }}
                      style={styles.searchResultImage}
                    />
                    <View>
                      <Text style={styles.searchResultText}>
                        {item.foodName}
                      </Text>
                      <Text style={styles.searchResultPlace}>
                        {item.restaurantAddressStreet}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }
            }}
          />
        </View>
      )}
      {searchText && (
        <View style={styles.searchResultContainer}>
          <FlatList
            style={styles.searchResultInner}
            data={foodData}
            renderItem={({ item }) => {
              if (item.mealType.includes(searchText)) {
                // console.log(item);
                return (
                  <TouchableOpacity
                    style={styles.searchResult}
                    onPress={() =>
                      navigation.navigate("productScreen", { ...item })
                    }
                  >
                    {/* <AntDesign name="arrowright" size={24} color="white" /> */}
                    <Image
                      source={{ uri: item.foodImageUrl }}
                      style={styles.searchResultImage}
                    />
                    <View>
                      <Text style={styles.searchResultText}>
                        {item.foodName}
                      </Text>
                      <Text style={styles.searchResultPlace}>
                        {item.restaurantAddressStreet}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }
            }}
          />
        </View>
      )}
      <BottomNav navigation={navigation} />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: colors.bgColor,
    paddingTop: 10,
    // marginBottom: 35,
  },
  screenBackground:{
    width:"100%",
    height:"100%",
    resizeMode:"cover"
  },
  searchContainer: {
    flexDirection: "row",
    width: "95%",
    margin: 8,
    padding: 7,
    paddingLeft: 15,
    // alignItems: "center",
    borderWidth: 3,
    borderRadius: 20,
    borderColor: colors.color1,
  },
  searchText: {
    marginLeft: 20,
    width: "80%",
    color: colors.color1,
    fontSize:20,
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
    fontWeight: 500,
    color: colors.color1,
  },
  searchResultPlace: {
    marginLeft: 20,
    fontSize: 12,
    color: colors.color1,
  },
  searchResultImage: {
    marginLeft: 15,
    height: 70,
    width: 70,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: colors.color1,
  },
});
