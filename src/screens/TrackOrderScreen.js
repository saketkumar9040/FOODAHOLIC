import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { colors } from "../globals/style";
import BottomNav from "../components/BottomNav";
import HomeHeadNav from "../components/HomeHeadNav";
import { firebase } from "../firebase/FirebaseConfig";

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

    console.log(orders)

  return (
    <>
      <HomeHeadNav navigation={navigation} />
      <View style={styles.container}>
        <ScrollView style={styles.containerIn}>
           {
            orders.sort((a,b)=>{
                b.orderDate - a.orderDate
            }).map((item,index)=>{
                return(
                    <View style={styles.orderCard} key={index}>
                        <Text style={styles.orderIndex}>{index + 1}</Text>
                        <Text>order id : {item.orderid}</Text>
                    </View>
                )
            })
           }
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
  },
});
