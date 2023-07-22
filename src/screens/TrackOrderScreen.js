import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { colors } from "../globals/style";
import BottomNav from "../components/BottomNav";
import HomeHeadNav from "../components/HomeHeadNav";
import { firebase } from "../firebase/FirebaseConfig";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";

const TrackOrderScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const orderRef = await firebase
      .firestore()
      .collection("UserOrders")
      .where("orderuseruid", "==", firebase.auth().currentUser.uid);

    await orderRef.onSnapshot((snapshot) =>
      setOrders(snapshot.docs.map((doc) => doc.data()))
    );
  };

  useEffect(() => {
    getOrders();
  }, []);

  // console.log(JSON.stringify(orders[0].orderstatus));

  const convertDate = (date) => {
    let newDate = new Date(date.seconds * 1000);
    return newDate.toDateString();
  };

  const cancelOrder = (item) => {
    const ordersRef = firebase
      .firestore()
      .collection("UserOrders")
      .doc(item.orderid)
      .update({
        orderstatus:"cancelled"
      });
      getOrders();
  };

  return (
    <>
      <StatusBar style="light" backgroundColor="#ff4242" />
      <View style={styles.container}>
        <HomeHeadNav navigation={navigation} />
        <View style={styles.headContainer}>
          <Text style={styles.head}>TRACK-ORDERS</Text>
          <MaterialIcons name="delivery-dining" size={45} color="#ff4242" />
        </View>
        <ScrollView style={styles.containerIn}>
          {orders.reverse()
            .map((item, index) => {
              return (
                <View style={styles.orderCard} key={index}>
                  <Text style={styles.orderIndex}>{index + 1}</Text>
                  <Text style={styles.orderText}>
                    order id : {item.orderid}
                  </Text>
                  <Text style={styles.orderText}>
                    order date : {convertDate(item.orderdate)}
                  </Text>
                  {item.orderstatus == "ontheway" && (
                    <Text style={styles.orderOtw}>
                      Your Order Is On The Way
                    </Text>
                  )}
                  {item.orderstatus == "delivered" && (
                    <Text style={styles.orderDelivered}>
                      Your Order was successfully Delivered
                    </Text>
                  )}
                  {item.orderstatus == "cancelled" && (
                    <Text style={styles.orderCancelled}>
                      Your Order was cancelled
                    </Text>
                  )}
                  {item.orderstatus == "pending" && (
                    <Text style={styles.orderPending}>
                      Your Order Is Pending
                    </Text>
                  )}
                  <View style={styles.row1}>
                    <Text style={styles.orderText1}>
                      Delivery Agent Name & Contact
                    </Text>
                    {item.deliveryboyname ? (
                      <Text style={styles.orderText3}>
                        {item.deliveryboyname} : {item.deliveryboyphone}
                      </Text>
                    ) : (
                      <Text style={styles.orderText2}>Not Assigned</Text>
                    )}
                  </View>
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={styles.cartList}
                    data={item.orderdata}
                    renderItem={({ item }) => {
                      // console.log(item)
                      return (
                        <View style={styles.rowOut}>
                          <View style={styles.row}>
                            <Image
                              source={{ uri: item?.data?.foodImageUrl }}
                              style={styles.cartImage}
                            />
                            <View style={styles.rowLeft}>
                              <Text style={styles.quantity}>
                                {item.foodQuantity}
                              </Text>
                              <Text style={styles.title}>
                                {item.data.foodName}
                              </Text>
                              <Text style={styles.price1}>
                                ₹{item.data.price}/each
                              </Text>
                            </View>
                            <View style={styles.rowRight}>
                              <Text style={styles.itemPrice}>
                                ₹
                                {parseInt(item.foodQuantity) *
                                  parseInt(item.data.price)}
                                /-
                              </Text>
                            </View>
                          </View>
                          {item.addOnQuantity > 0 && (
                            <View style={styles.row}>
                              <Image style={styles.cartImage} />
                              <View style={styles.rowLeft}>
                                <Text style={styles.quantity}>
                                  {item.addOnQuantity}
                                </Text>
                                <Text style={styles.title}>
                                  {item.data.foodAddOn}
                                </Text>
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
                  />
                  <Text style={styles.total}>Total : ₹{item.ordercost}</Text>
                  {item.orderstatus == "delivered" ? (
                    <Text style={styles.orderTextThankYou}>
                      Thank You for Ordering With Us ☺
                    </Text>
                  ) : null}
                  {item.orderstatus == "cancelled" ? (
                    <Text style={styles.orderTextSorry}>
                      Sorry for the Inconvenience caused 😔
                    </Text>
                  ) : null}
                  {item.orderstatus !== "cancelled" &&
                  item.orderstatus !== "delivered" ? (
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={() => {
                        cancelOrder(item);
                      }}
                    >
                      <Text style={styles.cancelButtonText}>Cancel Order</Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
              );
            })}
        </ScrollView>
      </View>
      <BottomNav navigation={navigation} />
    </>
  );
};

export default TrackOrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
    width: "100%",
    height: "100%",
    paddingTop: 45,
    // paddingBottom:80,
  },
  containerIn: {
    // marginTop: 20,
    flex: 1,
    backgroundColor: colors.color1,
    width: "100%",
    height: "100%",
    alignSelf: "center",
    marginBottom: 50,
    // padding: 5,
  },
  orderCard: {
    borderRadius: 50,
    borderWidth: 5,
    borderColor: colors.bgColor,
    padding: 20,
    margin: 10,
  },
  orderIndex: {
    fontSize: 30,
    fontWeight: 900,
    alignSelf: "center",
    textAlign:"center",
    // borderRadius:80,
    borderWidth:5,
    borderColor:colors.bgColor,
    paddingHorizontal:10,
    marginTop:-24,
    borderBottomLeftRadius:25,
    borderBottomRightRadius:25,
  },
  headContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "8%",
    width: "100%",
    backgroundColor:colors.color1,
    // elevation:10,
    // backgroundColor:"blue"
    borderWidth:10,
   
    borderColor:"#ff4242"
  },
  head: {
    fontSize: 25,
    color: colors.bgColor,
    marginRight: 10,
    fontWeight:700,
  },
  cartImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginTop: 7,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    justifyContent: "space-between",
  },
  rowOut: {
    flexDirection: "column",
    margin: 5,
    elevation: 10,
    backgroundColor: colors.color1,
    padding: 3,
    borderRadius: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  rowLeft: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
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
    color: colors.bgColor,
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
  row1: {
    flexDirection: "column",
    margin: 10,
    elevation: 10,
    backgroundColor: colors.color1,
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  // totalPrice:{
  //   fontSize:20,
  //   marginRight:10,
  // },
  total: {
    fontSize: 23,
    fontWeight: 800,
    color: colors.price,
    alignSelf:"flex-end",
    marginVertical: 10,
    backgroundColor:colors.color1,
    padding:5,
    elevation:10,
    borderRadius:40,
  },
  orderText3: {
    fontSize: 17,
    fontWeight: 600,
    alignSelf: "center",
    color: colors.price,
  },
  orderText2: {
    fontSize: 17,
    fontWeight: 600,
    alignSelf: "center",
    color: "red",
  },
  orderText1: {
    fontSize: 15,
    fontWeight: 500,
    // borderRadius:30,
  },
  orderText: {
    backgroundColor: colors.color1,
    alignSelf: "center",
    padding: 5,
    margin:7,
    color: colors.price,
    fontSize: 16,
    fontWeight: 700,
    elevation:10,
    borderRadius:50,
  },
  orderTextThankYou: {
    fontSize: 22,
    fontWeight: 600,
    color: colors.price,
    alignSelf: "center",
    textAlign: "center",
  },
  orderTextSorry: {
    fontSize: 22,
    fontWeight: 600,
    color: "orange",
    alignSelf: "center",
    textAlign: "center",
    padding: 5,
  },
  cancelButton: {
    backgroundColor: colors.bgColor,
    padding: 10,
    borderRadius: 15,
    marginVertical: 10,
    alignSelf: "center",
    elevation:10,
  },
  cancelButtonText: {
    fontSize: 20,
    color: colors.color1,
    textAlign: "center",
    fontWeight: 700,
  },
  orderOtw: {
    fontSize: 18,
    backgroundColor: "orange",
    textAlign: "center",
    fontWeight: 700,
    color: colors.color1,
    borderRadius: 30,
    
  },
  orderDelivered: {
    fontSize: 18,
    backgroundColor: colors.price,
    textAlign: "center",
    fontWeight: 700,
    color: colors.color1,
    borderRadius: 30,
    padding: 5,
  },
  orderCancelled: {
    fontSize: 18,
    fontWeight: 900,
    backgroundColor: "red",
    textAlign: "center",
    fontWeight: 700,
    color: colors.color1,
    borderRadius: 30,
    padding: 5,
  },
  orderPending: {
    fontSize: 18,
    fontWeight: 900,
    backgroundColor: "#FFEA00",
    textAlign: "center",
    color: colors.color1,
    borderRadius: 30,
    padding: 5,
  },
});
