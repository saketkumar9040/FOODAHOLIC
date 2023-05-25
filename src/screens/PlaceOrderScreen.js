import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../globals/style";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { firebase } from "../firebase/FirebaseConfig";

const PlaceOrderScreen = ({ navigation, route }) => {
  // console.log(route.params.cartData)

  let { cartData, totalPrice } = route.params;

  const [totalCost, setTotalCost] = useState("0");
  const [orderData, setOrderData] = useState([]);

  const [userLoggedUid, setUserLoggedUid] = useState(null);
  const [userData, setUserData] = useState(null);

  ///////////////////////   CART  -  DATA  ///////////////////////////

  useEffect(() => {
    setOrderData(cartData);
    setTotalCost(totalPrice);
  }, [cartData, totalPrice]);

  /////////////////////////    USER - DATA   ///////////////////

  useEffect(() => {
    const checkLogin = async () => {
      await firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setUserLoggedUid(user.uid);
        } else {
          setUserLoggedUid(null);
        }
      });
    };
    checkLogin();
  }, []);

  // console.log(userLoggedUid);

  useEffect(() => {
    const getUserData = (async () => {
      const docRef = firebase
        .firestore()
        .collection("UserData")
        .where("uid", "==", userLoggedUid);
      const doc = await docRef.get();
      if (!doc.empty) {
        doc.forEach((doc) => {
          setUserData(doc.data());
        });
      } else {
        console.log("no User Profile found");
      }
    })();
  }, [userLoggedUid]);

  // console.log(userData);

  const payNow = () => {
    alert("payment successful");
    return;
  };

  return (
    <View style={styles.placeOrderContainer}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          position: "relative",
          top: 0,
        }}
      >
        <View style={styles.navBtn}>
          <TouchableOpacity onPress={() => navigation.navigate("cartScreen")}>
            <FontAwesome name="arrow-left" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.containerTop}>
          <Text style={styles.cartText}>Order summary</Text>
          <MaterialCommunityIcons
            name="cart-variant"
            size={60}
            color="#0096FF"
          />
        </View>
      </View>
      <View style={styles.container1}>
        <View style={styles.arrow}>
          <MaterialCommunityIcons
            name="chevron-up"
            size={35}
            color={colors.bgColor}
          />
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={styles.cartList}
          data={orderData.cart}
          renderItem={({ item }) => {
            return (
              <View style={styles.rowOut}>
                <View style={styles.row}>
                  <Image
                    source={{ uri: item.data.foodImageUrl }}
                    style={styles.cartImage}
                  />
                  <View style={styles.rowLeft}>
                    <Text style={styles.quantity}>{item.foodQuantity}</Text>
                    <Text style={styles.title}>{item.data.foodName}</Text>
                    <Text style={styles.price1}>₹{item.data.price}/each</Text>
                  </View>
                  <View style={styles.rowRight}>
                    <Text style={styles.itemPrice}>
                      ₹{parseInt(item.foodQuantity) * parseInt(item.data.price)}
                      /-
                    </Text>
                  </View>
                </View>
                {item.addOnQuantity > 0 && (
                  <View style={styles.row}>
                    <Image style={styles.cartImage} />
                    <View style={styles.rowLeft}>
                      <Text style={styles.quantity}>{item.addOnQuantity}</Text>
                      <Text style={styles.title}>{item.data.foodAddOn}</Text>
                      <Text style={styles.price1}>
                        ₹{item.data.foodAddOnPrice}/each
                      </Text>
                    </View>
                    <View style={styles.rowRight}>
                      <Text style={styles.itemPrice}>
                        ₹
                        {parseInt(item.addOnQuantity) *
                          parseInt(item.data.foodAddOnPrice)}
                        /-
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            );
          }}
        ></FlatList>
        <View style={styles.arrow}>
          <MaterialCommunityIcons
            name="chevron-down"
            size={35}
            color={colors.bgColor}
          />
        </View>
      </View>
      <View style={styles.addressContainer}>
        <Text style={styles.deliveryAddressText}>Your Delivery Address</Text>
        <View style={styles.addressTextContainer}>
          <Text style={styles.addressText}>Name :</Text>
          <Text style={styles.addressText}>{userData?.name}</Text>
        </View>
        <View style={styles.addressTextContainer}>
          <Text style={styles.addressText}>Address :</Text>
          <Text style={styles.addressText}>{userData?.address}</Text>
        </View>
        <View style={styles.addressTextContainer}>
          <Text style={styles.addressText}>Phone :</Text>
          <Text style={styles.addressText}>{userData?.phone}</Text>
        </View>
      </View>
      <View style={styles.finalPriceContainer}>
        <View style={styles.finalPriceText}>
          <Text style={styles.orderTotalText}>Order Total</Text>
          <Text style={styles.itemPrice}>₹{totalCost}/-</Text>
        </View>
        <TouchableOpacity
          style={styles.button1}
          onPress={() => payNow()}
        >
          <Text style={styles.buttonText}>PAY</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PlaceOrderScreen;

const styles = StyleSheet.create({
  placeOrderContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: colors.color1,
    paddingTop: 10,
  },
  navBtn: {
    backgroundColor: colors.bgColor,
    width: 50,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  containerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  cartText: {
    width: "70%",
    fontSize: 30,
    fontWeight: 600,
    color: colors.bgColor,
    textAlign: "center",
  },
  container1: {
    width: "95%",
    marginTop: 10,
    padding: 2,
    elevation: -10,
    // backgroundColor: "cornsilk",
    borderRadius: 20,
    borderWidth: 5,
    borderColor: colors.bgColor,
  },
  cartList: {
    width: "100%",
    height: "30%",
  },
  cartImage: {
    width: 70,
    height: 70,
    borderRadius: 15,
    marginRight: 10,
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    justifyContent: "space-between",
  },
  rowOut: {
    flexDirection: "column",
    margin: 10,
    elevation: 10,
    backgroundColor: colors.bgColor,
    padding: 10,
    borderRadius: 18,
  },
  rowLeft: {
    alignItems: "center",
    justifyContent: "center",
  },
  // rowRight:{
  //   flexDirection:"row"
  // },
  quantity: {
    width: 40,
    height: 30,
    backgroundColor: colors.color1,
    borderRadius: 10,
    textAlign: "center",
    textAlignVertical: "center",
    marginRight: 10,
    marginHorizontal: 10,
    marginTop: 10,
    color: colors.bgColor,
    fontSize: 17,
    fontWeight: 500,
  },
  title: {
    width: "60%",
    fontSize: 19,
    fontWeight: 800,
    color: colors.color1,
    textAlign: "center",
    textAlignVertical: "center",
  },
  price1: {
    fontSize: 18,
    fontWeight: 500,
    color: colors.price,
    padding: 4,
    borderRadius: 10,
    backgroundColor: colors.color1,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 700,
    padding: 6,
    backgroundColor: colors.color1,
    color: colors.price,
    borderRadius: 40,
  },
  finalPriceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "95%",
    margin: 10,
    elevation: 10,
    backgroundColor: colors.bgColor,
    padding: 10,
    paddingLeft: 20,
    borderRadius: 18,
    position: "absolute",
    bottom: 0,
  },
  finalPriceText: {
    flexDirection: "column",
    alignItems: "center",
  },
  button1: {
    width: "50%",
    height: 50,
    backgroundColor: colors.color1,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  orderTotalText: {
    fontSize: 20,
    fontWeight: 800,
    color: colors.color1,
    textAlign: "center",
  },
  buttonText: {
    color: colors.bgColor,
    paddingHorizontal: 10,
    fontSize: 25,
    fontWeight: 900,
  },
  arrow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  addressContainer: {
    width: "95%",
    margin: 10,
    elevation: 10,
    backgroundColor: colors.bgColor,
    padding: 10,
    paddingLeft: 20,
    borderRadius: 18,
  },
  addressTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  addressText: {
    width:"50%",
    fontSize: 20,
    color: colors.color1,
    fontWeight: 600,
    marginHorizontal: 20,
    marginVertical: 5,
  },
  deliveryAddressText: {
    fontSize: 20,
    color: colors.bgColor,
    fontWeight: 800,
    borderRadius: 20,
    padding: 3,
    paddingHorizontal: 20,
    textAlign: "center",
    backgroundColor: colors.color1,
  },
  addressField: {
    width: 100,
    fontSize: 20,
    color: colors.bgColor,
    fontWeight: 600,
    // marginHorizontal:20,
    backgroundColor: colors.color1,
    marginVertical: 5,
    borderRadius: 20,
    padding: 3,
    paddingHorizontal: 20,
  },
});
