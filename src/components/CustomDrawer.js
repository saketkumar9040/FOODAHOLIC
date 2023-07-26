import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import { Image } from "react-native";
import { firebase } from "../firebase/FirebaseConfig";
import { useEffect } from "react";
import { useState } from "react";

const CustomDrawer = ({ props }) => {

   const[userData,setUserData] = useState("");
   const [userLoggedUid, setUserLoggedUid] = useState(null);

   console.log(userData)
   const checkLogin = async () => {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserLoggedUid(user.uid);
      } else {
        return;
      }
    });
  };

  const getUserData = async () => {
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
     return;
    }
  };

  useEffect(() => {
    checkLogin()
    getUserData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Image />
    </ScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff4242",
  },
});
