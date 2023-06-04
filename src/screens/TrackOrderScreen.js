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
    const orderRef = firebase
      .firestore()
      .collection("UserOrders")
      .where("orderuseruid", "==", firebase.auth().currentUser.uid);

    orderRef.onSnapshot((snapshot) =>
      setOrders(snapshot.docs.map((doc) => doc.data()))
    );
  };

  useEffect(() => {
    getOrders();
  }, []);

  // console.log(orders);

  const convertDate = (date) => {
    let newDate = new Date(date.seconds * 1000);
    return newDate.toDateString();
  };

  const cancelOrder = () => {};

  return (
    <>
      <StatusBar style="light" backgroundColor="#ff4242" />
      <View style={styles.container}>
        <HomeHeadNav navigation={navigation} />
        <ScrollView style={styles.containerIn}>
          <View style={styles.headContainer}>
          <Text style={styles.head}>
            TRACK-ORDERS
            <MaterialIcons name="delivery-dining" size={40} color="white" />
          </Text>
          </View>
          {orders
            .sort((a, b) => {
              b.orderdate.seconds - a.orderdate.seconds;
            })
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
                    <Text style={styles.orderText3}>
                      Thank You for Ordering With Us ☺
                    </Text>
                  ) : null}
                  {item.orderstatus == "cancelled" ? (
                    <Text style={styles.orderText3}>
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
    marginTop: 10,
    flex: 1,
    backgroundColor: colors.bgColor,
    width: "100%",
    height: "100%",
    marginBottom: 100,
  },
  headContainer:{
    flex:1,
    flexDirection:"row",
    alignItems:"center",
    
  },
  head: {
    fontSize: 25,
    color: colors.color1,
    textAlign: "center",
    marginVertical: 20,
  },
});
