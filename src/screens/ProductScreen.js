import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { colors, navBtn, navBtnin, nonVeg, veg } from "../globals/style";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { firebase } from "../firebase/FirebaseConfig";
import { StatusBar } from "expo-status-bar";

const ProductScreen = ({ navigation, route }) => {
  const data = route.params;
  // console.log(data);
  if (route.params === undefined) {
    navigation.navigate("homeScreen");
  }

  const [foodQuantity, setFoodQuantity] = useState("1");
  const [addOnQuantity, setAddOnQuantity] = useState("0");

  const [cart,setCart]=useState([]);

  const addToCart = async () => {
    const docRef = await firebase
      .firestore()
      .collection("CartData")
      .doc(firebase.auth().currentUser.uid);

    const data1 = {
      data,
      addOnQuantity: addOnQuantity,
      foodQuantity: foodQuantity,
    };
    // console.log("data1",data1)
    docRef.get().then((doc) => {
      if (doc.exists) {
        docRef.update({
          cart: firebase.firestore.FieldValue.arrayUnion(data1),
        });
        alert("Cart Updated Successfully");
      } else {
        docRef.set({
          cart: [data1],
        });
        alert("Added to cart");
      }
    });
  };

  const incrementQuantity = () => {
    setFoodQuantity((parseInt(foodQuantity) + 1).toString());
  };
  const decrementQuantity = () => {
    if (parseInt(foodQuantity) > 1) {
      setFoodQuantity((parseInt(foodQuantity) - 1).toString());
    }
  };
  const incrementAddOn = () => {
    setAddOnQuantity((parseInt(addOnQuantity) + 1).toString());
  };
  const decrementAddOn = () => {
    if (parseInt(addOnQuantity) > 0) {
      setAddOnQuantity((parseInt(addOnQuantity) - 1).toString());
    }
  };

  const getCartData = async() => {
    const docRef =await firebase
      .firestore()
      .collection("CartData")
      .doc(firebase.auth().currentUser.uid);
    docRef
      .get()
      .then(async (doc) => {
        if (doc.exists) {
          await setCart(doc.data());
          //   console.log(JSON.stringify(doc.data()));
        } else {
          console.log("No Such Document");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      <ScrollView style={styles.Productcontainer}>
        <StatusBar style="dark`" />

        <View style={styles.imageContainer}>
          <View style={navBtn}>
            <TouchableOpacity onPress={() => navigation.navigate("homeScreen")}>
              <FontAwesome
                name="arrow-left"
                size={30}
                color="black"
                style={navBtnin}
              />
            </TouchableOpacity>
          </View>
          <Image
            source={{
              uri: data.foodImageUrl,
            }}
            style={styles.cardImage}
          />
        </View>

        <View style={styles.s2}>
          <View style={styles.s2in}>
            <Text style={styles.head1}>{data.foodName.toUpperCase()}</Text>
            <Text style={styles.head2}>₹ {data.price}/-</Text>
          </View>
        </View>
        <View style={styles.s3}>
          <Text style={styles.head3}>About Food</Text>
          <Text style={styles.head4}>{data.description}</Text>
          <View style={styles.s3in}>
            {data.foodType === "veg" ? (
              <Text style={veg}></Text>
            ) : (
              <Text style={nonVeg}></Text>
            )}
            <Text style={styles.head5}>{data.foodType}</Text>
          </View>
        </View>
        <View style={styles.container2}>
          <Text style={styles.locationText}> Location</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: "70%",
              }}
            >
              <Text style={styles.restaurantNameText}>
                {data.restaurantName.toUpperCase()}{" "}
              </Text>
            </View>
          </View>
          <View style={styles.container2In}>
            <Entypo name="arrow-long-down" size={24} color="white" />
            <Text style={styles.restaurantAddress}>
              {data.restaurantAddressBuilding}{" "}
            </Text>
            <Entypo name="arrow-long-down" size={24} color="white" />
            <Text style={styles.restaurantAddress}>
              {data.restaurantAddressStreet}{" "}
            </Text>
            <Entypo name="arrow-long-down" size={24} color="white" />
            <Text style={styles.restaurantAddress}>
              {data.restaurantAddressCity}{" "}
            </Text>
          </View>
        </View>
      
      </ScrollView>
      <View style={styles.bottomContainer}>
      <View style={styles.quantityAddOnContainer}>
      <View style={styles.container3}>
          <Text style={styles.foodQuantityText}>Quantity</Text>
          <View style={styles.foodQuantityIn}>
            <TouchableOpacity>
              <Text
                style={styles.increment}
                onPress={() => incrementQuantity()}
              >
                +
              </Text>
            </TouchableOpacity>
            <TextInput style={styles.foodQuantityInput} value={foodQuantity} />
            <TouchableOpacity>
              <Text
                style={styles.decrement}
                onPress={() => decrementQuantity()}
              >
                -
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {data.foodAddOnPrice !== "" && (
          <View style={styles.container3}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.foodAddOnText}>{data.foodAddOn}</Text>
              <Text style={styles.addOnPrice}>
                ₹ {data.foodAddOnPrice}/-
              </Text>
            </View>
            <View style={styles.foodQuantityIn}>
              <TouchableOpacity>
                <Text style={styles.increment} onPress={() => incrementAddOn()}>
                  +
                </Text>
              </TouchableOpacity>
              <TextInput
                style={styles.foodQuantityInput}
                value={addOnQuantity}
              />
              <TouchableOpacity>
                <Text style={styles.decrement} onPress={() => decrementAddOn()}>
                  -
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      <View style={styles.container4}>
        <View style={styles.container4In}>
          <Text style={styles.totalPriceText}>Total Price</Text>
          {data.foodAddOnPrice !== "" ? (
            <Text style={styles.text5}> ₹ {((parseInt(data.price) * parseInt(foodQuantity))+(parseInt(data.foodAddOnPrice) * parseInt(addOnQuantity))).toString()}/-</Text>
          ) : (
            <Text style={styles.text5}>
              ₹ {(parseInt(data.price) * parseInt(foodQuantity)).toString()}/-
            </Text>
          )}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => addToCart()}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={async()=>{
             await addToCart().then(()=>{
               navigation.navigate("cartScreen",cart)
             }).catch((error)=>{
              console.log(error.message)
             })
          }}>
          <Text style={styles.buttonText} >Buy Now</Text>
        </TouchableOpacity>
      </View>
      </View>
    </>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  Productcontainer: {
    flex: 1,
    backgroundColor: colors.color1,
    marginBottom: 120,
  },
  imageContainer: {
    marginTop:50,
    width: "100%",
    backgroundcolor: colors.color1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  s2: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 7,
  },
  s2in: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  head1: {
    fontSize: 25,
    fontWeight: 600,
    color: colors.bgColor,
    width: 200,
    marginRight: 10,
  },
  head2: {
    fontSize: 30,
    fontWeight: 700,
    color: "#00b200",
  },
  s3: {
    marginHorizontal: 15,
    backgroundColor: colors.bgColor,
    padding: 10,
    borderRadius: 20,
  },
  head3: {
    fontSize: 25,
    fontWeight: 400,
    color: colors.color1,
  },
  head4: {
    marginVertical: 10,
    fontSize: 18,
    fontWeight: 400,
    color: colors.color1,
  },
  s3in: {
    backgroundColor: colors.color1,
    padding: 10,
    borderRadius: 10,
    width: "50%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  head5: {
    color: colors.text3,
    fontSize: 23,
    fontWeight: 500,
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.color1,
    // position: "absolute",
    // bottom: 0,
  },
  button: {
    width: "40%",
    height: 50,
    marginHorizontal: 15,
    marginVertical: 5,
    backgroundColor: colors.color1,
    borderRadius: 10,
    alignItems: "center",
    borderColor: colors.bgColor,
    borderWidth: 5,
    justifyContent: "center",
  },
  buttonText: {
    color: colors.bgColor,
    fontSize: 20,
    fontWeight: 500,
  },
  container2: {
    width: "90%",
    backgroundColor: colors.bgColor,
    padding: 20,
    borderRadius: 20,
    alignSelf: "center",
    marginVertical: 20,
    marginBottom:140,
  },
  locationText: {
    color: colors.color1,
    fontSize: 25,
    fontWeight: 400,
  },
  restaurantNameText: {
    color: colors.color1,
    fontSize: 23,
    fontWeight: 700,
    marginVertical: 10,
    marginHorizontal: 30,
  },
  container2In: {
    alignItems: "center",
    justifyContent: "center",
  },
  restaurantAddress: {
    color: colors.color1,
    fontSize: 21,
    fontWeight: 400,
    textAlign: "center",
  },
  dash: {
    width: 2,
    height: 25,
    backgroundColor: colors.color1,
  },
  bottomContainer:{
    flex:1,
    width:"100%",
    alignItems:"center",
    backgroundColor:colors.color1,
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
  },
  quantityAddOnContainer:{
    flexDirection:"row",
    width:"100%",
    alignItems:"center",
    backgroundColor:colors.color1,
    justifyContent: "center",

  },
  container3: {
    width: "45%",
    backgroundColor: colors.color1,
    padding: 10,
    borderRadius: 20,
    borderWidth:5,
    borderColor:colors.bgColor,
    alignSelf: "center",
    marginVertical: 10,
    marginHorizontal:5,
  },
  foodQuantityText: {
    color: colors.bgColor,
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 10,
  },
  foodAddOnText:{
    color: colors.bgColor,
    fontSize: 20,
    fontWeight: 700,
    width:"60%",
  },
  addOnPrice: {
    color: "#00b200",
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 10,
  },
  foodQuantityIn: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  increment: {
    width: 40,
    backgroundColor: colors.bgColor,
    borderRadius: 50,
    color: colors.color1,
    fontSize: 30,
    fontWeight: 400,
    textAlign: "center",
  },
  decrement: {
    width: 40,
    backgroundColor: colors.bgColor,
    borderRadius: 50,
    color: colors.color1,
    fontSize: 30,
    fontWeight: 400,
    textAlign: "center",
  },
  foodQuantityInput: {
    width: 50,
    height: 40,
    backgroundColor: colors.color1,
    color: colors.bgColor,
    fontSize: 27,
    textAlign: "center",
  },
  container4: {
    width: "90%",
    backgroundColor: colors.bgColor,
    borderRadius: 10,
    borderColor: colors.bgColor,
    borderWidth: 5,
    marginBottom:7,
  },
  container4In: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    backgroundColor:colors.color1,
    paddingHorizontal: 20,
  },

  totalPriceText: {
    color: colors.bgColor,
    fontSize: 25,
    fontWeight: 500,
  },
  text5: {
    color: "#00b200",
    fontSize: 23,
    fontWeight: 700,
    textAlign: "center",
  },
});
