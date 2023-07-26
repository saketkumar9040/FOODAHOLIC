import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar
} from "react-native";
import React, { useEffect, useState } from "react";
import BottomNav from "../components/BottomNav";
import { colors } from "../globals/style";
import { firebase } from "../firebase/FirebaseConfig";
import { FontAwesome, AntDesign } from "@expo/vector-icons";

const CartScreen = ({ navigation }) => {

  const [cartData, setCartData] = useState(null);
  const [totalPrice, setTotalPrice] = useState("0");
  // const [createOrderData, setCreateOrderData] = useState(null);

  const getCartData = async() => {
    const docRef =await firebase
      .firestore()
      .collection("CartData")
      .doc(firebase.auth().currentUser.uid);
    docRef
      .get()
      .then(async (doc) => {
        if (doc.exists) {
          await setCartData(doc.data());
          //   console.log(JSON.stringify(doc.data()));
        } else {
          console.log("No Such Document");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    setTimeout(()=>{
      getCartData();
    },500)
  }, []);

  useEffect(() => {
    if (cartData !== null) {
      const allfoodPrice = cartData.cart;
      // console.log(allfoodPrice)
      let allItemPrice = 0;
      let allAddOnPrice = 0;
      allfoodPrice.map((item) => {
        allItemPrice =
          allItemPrice +
          parseInt(item.data.price) * parseInt(item.foodQuantity);
        if (parseInt(item.addOnQuantity) > 0) {
          allAddOnPrice =
            allAddOnPrice +
            parseInt(item.data.foodAddOnPrice) * parseInt(item.addOnQuantity);
        }
      });
      setTotalPrice(allItemPrice + allAddOnPrice);
    }
  }, [cartData]);
  // console.log(JSON.stringify(cartData)); 

  const deleteHandler = (item) => {
    const docRef = firebase
      .firestore()
      .collection("CartData")
      .doc(firebase.auth().currentUser.uid);
    docRef.update({
      cart: firebase.firestore.FieldValue.arrayRemove(item),
    });
    getCartData();
  };

  const orderHandler = async() => {

    navigation.navigate("placeOrderScreen", {
      cartData,
      totalPrice,
    });
  };

  return (
    <>
      <SafeAreaView style={styles.cartContainerOut}>
      <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#ff4242"
          translucent={false}
        />
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center", 
            paddingTop:10,
          }}
        >
          <View style={styles.navBtn}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FontAwesome name="arrow-left" size={30} color={colors.bgColor} />
            </TouchableOpacity>
          </View>
          <View style={styles.containerTop}>
            <Text style={styles.cartText}>Your Cart</Text>
            <FontAwesome name="shopping-cart" size={40} color="white" />
          </View>
        </View>
        <View style={styles.container1}>
          {cartData === null || totalPrice =="0" ? (
            <View style={{flex:1,alignItems:"center"}}>
            <Text style={styles.cartText1}> Your Cart Is Empty. Add some food 😋</Text>
            <TouchableOpacity
            style={styles.button1}
            onPress={() => navigation.navigate("homeScreen")}
          >
            <Text style={styles.buttonText}>Go Home</Text>
          </TouchableOpacity>
          </View>
          ) : (
            <>
            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style={styles.cartList}
              data={cartData.cart}
              renderItem={({ item }) => {
                return (
                  <View style={styles.cardData}>
                    <Image
                      source={{ uri: item.data.foodImageUrl }}
                      style={styles.cartImage}
                    />
                    <View style={styles.cardDataIn}>
                      <View style={styles.c1}>
                        <Text style={styles.text1}>
                          {item.foodQuantity}&nbsp;{item.data.foodName}
                        </Text>
                        <Text style={styles.text2}>
                          ₹ {item.data.price}/each
                        </Text>
                      </View>
                      {item.addOnQuantity > 0 && (
                        <View style={styles.c2}>
                          <Text style={styles.text3}>
                            {item.addOnQuantity}&nbsp;{item.data.foodAddOn}
                          </Text>
                          <Text style={styles.text3}>
                            ₹ {item.data.foodAddOnPrice}/each
                          </Text>
                        </View>
                      )}

                      <TouchableOpacity
                        style={styles.c3}
                        onPress={() => deleteHandler(item)}
                      >
                        <Text style={styles.text1}>Delete</Text>
                        <AntDesign
                          name="delete"
                          size={26}
                          color="red"
                          style={styles.deleteButton}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            ></FlatList>
          
          <View style={styles.checkoutButtons}>
            <View style={styles.totalPriceContainer}>
              <Text style={styles.totalText1}>Total</Text>
              <Text style={styles.totalText2}>₹{totalPrice}/-</Text>
            </View>
            <TouchableOpacity
              style={styles.button1}
              onPress={() => orderHandler()}
            >
              <Text style={styles.buttonText}>Place Order</Text>
            </TouchableOpacity>
          </View>
          </>)}
        </View>
      </SafeAreaView>
      <BottomNav navigation={navigation} />
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  cartContainerOut: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.bgColor,
  },
  navBtn: {
    backgroundColor: colors.color1,
    width: 50,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  container1: {
    flex: 1,
    width: "100%",
  },
  containerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 70,
  },
  cartText: {
    // width: "70%",
    fontSize: 26,
    fontWeight: 500,
    color: colors.color1,
    textAlign: "center",
  },
  cartText1: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: 700,
    marginVertical: 20,
    elevation: 10,
    backgroundColor: colors.color1,
    width: "90%",
    height: "50%",
    alignSelf: "center",
    paddingVertical: "25%",
    borderRadius: 10,
    color: colors.bgColor,
  },
  cartList: {
    width: "100%",
    marginTop: 20,
  },
  cardData: {
    flexDirection: "row",
    backgroundColor: colors.color1,
    marginVertical: 5,
    borderRadius: 10,
    width: "95%",
    alignSelf: "center",
    elevation: 10,
    alignItems: "center",
    padding: 5,
  },
  cartImage: {
    width: "45%",
    height: "95%",
    borderRadius: 10,
  },
  cardDataIn: {
    flexDirection: "column",
    margin: 5,
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  c1: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 5,
  },
  c2: {
    backgroundColor: colors.bgColor,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    flexDirection: "row",
  },
  text1: {
    fontSize: 16,
    color: colors.bgColor,
    width: "50%",
    fontWeight: "bold",
  },
  text2: {
    fontSize: 16,
    color: "#00b200",
    // width:"40%",
    fontWeight: 600,
  },
  text3: {
    fontSize: 16,
    width: "40%",
    color: colors.color1,
  },
  deleteButton: {
    color: colors.bgColor,
  },
  c3: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    borderRadius: 10,
    borderColor: colors.bgColor,
    borderWidth: 4,
    marginVertical: 10,
    padding: 5,
  },
  checkoutButtons: {
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
    flexDirection: "row",
    marginBottom: 80,
    marginHorizontal: 20,
  },
  button1: {
    width: "45%",
    height: 50,
    backgroundColor: colors.color1,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  buttonText: {
    color: colors.bgColor,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 20,
    fontWeight: 700,
  },
  totalPriceContainer: {
    width: "45%",
    flexDirection: "row",
    alignItems: "center",
  },
  totalText1: {
    fontSize: 25,
    color: colors.color1,
    marginHorizontal: 5,
    fontWeight: 600,
  },
  totalText2: {
    fontSize: 22,
    color: "#00b200",
    fontWeight: 800,
    padding: 6,
    backgroundColor: colors.color1,
    borderRadius: 20,
  },
});
