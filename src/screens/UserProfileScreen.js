import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { colors, navBtn, navBtnin } from "../globals/style";
import { firebase } from "../firebase/FirebaseConfig";
import { AntDesign, Feather } from "@expo/vector-icons";

const UserProfileScreen = ({ navigation }) => {
  NavigationBar.setBackgroundColorAsync("#ff4242");

  const [userLoggedUid, setUserLoggedUid] = useState(null);
  const [userData, setUserData] = useState(null);

  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");

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

  console.log(userData);

  const handleChange = () => {
    console.log("have to change name and address");
  };
  const handlePic = () => {
    console.log("have to implement change pic");
  };

  return (
    <View style={styles.userProfileContainer}>
      <TouchableOpacity
        style={styles.navContainer}
        onPress={() => navigation.navigate("homeScreen")}
      >
        <View style={navBtn}>
          <AntDesign name="back" size={24} color="black" style={navBtnin} />
        </View>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.image}
            source={require("../../assets/avatar.jpg")}
          />
        </View>
        <TouchableOpacity onPress={()=>handlePic()}>
          <Text style={styles.changeAvatar}>Change Pic</Text>
        </TouchableOpacity>
      </View>
      <View style={{backgroundColor:colors.bgColor,width:"100%",height:"100%",alignItems:"center"}}>
      <View style={styles.inputContainer}>
        <Text style={styles.input}>{userData?.name}</Text>
        <TouchableOpacity>
          <Feather
            name="edit"
            size={24}
            color="black"
            onPress={() => handleChange()}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.input}>{userData?.email}</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.input}>{userData?.phone}</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.input}>
          {userData?.address ? userData?.address : "enter your address"}
        </Text>
        <TouchableOpacity>
          <Feather
            name="edit"
            size={24}
            color="black"
            onPress={() => handleChange()}
          />
        </TouchableOpacity>
      </View>
      </View>
      <StatusBar style="dark" />
    </View>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  userProfileContainer: {
    flex: 1,
    backgroundColor: colors.color1,
    alignItems: "center",
  },
  navContainer: {
    flexDirection: "row",
    width: "100%",
    height:"8%",
    marginTop:45,
    marginLeft:5,
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    height: "28%",
    backgroundColor: colors.color1,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarContainer: {
    width: "70%",
    height: "80%",
    borderWidth: 5,
    borderRadius: 40,
    // marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "contain",
  },
  changeAvatar: {
    margin: 10,
    fontSize: 18,
    fontWeight: 600,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 35,
  },
  inputContainer: {
    flexDirection: "row",
    width: "80%",
    marginTop: 25,
    marginVertical: 10,
    backgroundColor: colors.color1,
    borderRadius: 14,
    paddingVertical: 12,
    justifyContent: "center",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    fontStyle: "italic",
    fontWeight: 500,
    width: "80%",
  },
});
