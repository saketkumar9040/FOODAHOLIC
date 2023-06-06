import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { colors } from "../globals/style";
import { firebase } from "../firebase/FirebaseConfig";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";

import {launchCameraAsync, useCameraPermissions, PermissionStatus, launchImageLibraryAsync,MediaTypeOptions} from 'expo-image-picker'

const UserProfileScreen = ({ navigation }) => {
  NavigationBar.setBackgroundColorAsync("#ff4242");

  const [userLoggedUid, setUserLoggedUid] = useState(null);
  const [userData, setUserData] = useState(null);

  const [image,setImage] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [edit, setEdit] = useState(false);

console.log(name)


  const [cameraPermissionInformation, requestPermission]=useCameraPermissions();

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

  const handleName = () => {
    console.log("have to change name ");
  };
  const handleAddress = () => {
    console.log("have to change address");
  };
  
  const handlePic = async() => {

    async function verifyPermission(){
      if (cameraPermissionInformation.status===PermissionStatus.UNDETERMINED){
          const permissionResponse=await requestPermission();
  
          return permissionResponse.granted;
      }
      if (cameraPermissionInformation.status===PermissionStatus.DENIED){
          alert(
              'Insufficient permission!, You need to grant camera access to use this app'
          );
          return false
      }
      return true;
  }

  const hasPermission=await verifyPermission()
  if (!hasPermission){
      return;
  }
    
    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);xz

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  
  console.log(image)
  return (
    <View style={styles.userProfileContainer}>
      <TouchableOpacity
        style={styles.navContainer}
        onPress={() => navigation.navigate("homeScreen")}
      >
        <View style={styles.navBtn}>
          <FontAwesome name="arrow-left" size={28} color="white" />
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
      <ScrollView style={{backgroundColor:colors.bgColor,width:"100%",height:"100%"}}>
        <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
       { 
           edit === false ?
            <View style={styles.inputContainer}>
            <Text style={styles.input}>{userData?.name}</Text>
            <TouchableOpacity>
              <Feather
                name="edit"
                size={24}
                color="black"
                onPress={() =>{ 
                  setEdit(true)
                }
              }
              />
            </TouchableOpacity>
          </View>:
           <View style={styles.inputContainer}>
           <TextInput style={styles.input} placeholder={userData?.name}  onChangeText={setName} value={name}/>
           <TouchableOpacity>
              <Feather
                name="save"
                size={24}
                color="red"
                onPress={() =>{ 
                  setEdit(true)
                  handleName()
                }
              }
              />
            </TouchableOpacity>
           
         </View>
         
      }
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
            onPress={() => handleAddress()}
          />
        </TouchableOpacity>
      </View>
      </View>
      </ScrollView>
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
    marginBottom:20,
    fontSize: 18,
    fontWeight: 600,
    backgroundColor:colors.color1,
    elevation:10,
    borderRadius:40,
    padding:5,
    paddingHorizontal:15,
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
    alignItems:"center",
    justifyContent:"center"
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    fontStyle: "italic",
    fontWeight: 500,
    width: "80%",
  },
  navBtn:{
    backgroundColor:colors.bgColor,
    width:50,
    height:60,
    alignItems:"center",
    justifyContent:'center',
    elevation:10,
    borderTopRightRadius:20,
    borderBottomRightRadius:20,  
  }
});
