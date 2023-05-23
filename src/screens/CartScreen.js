import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import BottomNav from "../components/BottomNav";
import { colors } from "../globals/style";
import { firebase } from "../firebase/FirebaseConfig";
import { FontAwesome ,AntDesign } from "@expo/vector-icons";

const CartScreen = ({ navigation }) => {
  const [cartData, setCartData] = useState(null);
  const [totalPrice, setTotalPrice] = useState("0");

  const getCartData = async () => {
    const docRef = await firebase
      .firestore()
      .collection("CartData")
      .doc(firebase.auth().currentUser.uid);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setCartData(doc.data());
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
    getCartData();
  }, []);

  // console.log(JSON.stringify(cartData));

  return (
    <>
      <View style={styles.cartContainerOut}>
        <View style={styles.navBtn}>
          <TouchableOpacity onPress={() => navigation.navigate("homeScreen")}>
            <FontAwesome
              name="arrow-left"
              size={30}
              color="black"
              style={styles.navBtnin}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.container1}>
          <View style={styles.container1In}>
            <Text style={styles.cartText}>Your Cart</Text>
            <FontAwesome name="shopping-cart" size={40} color="white" />
          </View>
          {cartData === null ? (
            <Text style={styles.cartText1}> Your Cart Is Empty😓.</Text>
          ) : (
            <FlatList
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
                      <View style={styles.c3}>
                        <Text style={styles.text1}>Delete</Text>
                        <AntDesign name="delete" size={26} color="red" style={styles.deleteButton}/>
                      </View>
                    </View>
                  </View>
                );
              }}
            ></FlatList>
          )}
        </View>
      </View>
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
    backgroundColor: "white",
    width: 50,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
    top: 20,
  },
  navBtnin: {
    color: "#ff4242",
  },
  container1: {
    flex: 1,
    width: "100%",
  },
  container1In: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cartText: {
    fontSize: 30,
    fontWeight: 600,
    color: colors.color1,
    marginRight: 10,
  },
  cartText1: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: 300,
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
  cardDataIn:{
    flexDirection:"column",
    margin:5,
    width:"50%",
    alignItems:"center",
    justifyContent:"center",
  },
  c1:{
    flexDirection:"row",
    justifyContent:"space-between",
    width:"100%",
    padding:5,
  },
  c2:{
    backgroundColor:colors.bgColor,
    borderRadius:10,
    width:"100%",
    alignItems:"center",
    justifyContent:"space-between",
    padding:5,
    flexDirection:'row',
  },
  text1:{
    fontSize:18,
    color:colors.bgColor,
    width:"60%",
    fontWeight:"bold",
  },
  text2:{
    fontSize:16,
    color:"#00b200",
    // width:"40%",
    fontWeight:600,
  },
  text3:{
    fontSize:16,
    width:"40%",
    color:colors.color1,

  },
  deleteButton:{
    color:colors.bgColor
  },
  c3:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    width:"60%",
    borderRadius:10,
    borderColor:colors.bgColor,
    borderWidth:4,
    marginVertical:10,
    padding:5,
  }
});
