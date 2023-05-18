import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import * as NavigationBar from "expo-navigation-bar";
import { colors, hr80 } from "../globals/style";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import foodImage from "../../assets/foodImage.png";

import { firebase } from "../firebase/FirebaseConfig";

const SignUpScreen = ({ navigation }) => {
  NavigationBar.setBackgroundColorAsync("#ff4242");

  const [nameFocus, setNameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [reEnterpasswordFocus, setReEnterPasswordFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  //  TAKING FORM DATA
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");

  //   ERROR & SUCCESS MESSAGE
  const [customError, setCustomError] = useState("");
  const [successmsg, setSuccessmsg] = useState(null);

  const handleSignUp = () => {
    if (!name) {
      setCustomError("Name cannot be Empty");
      return;
    }
    if (!email) {
      setCustomError("Email cannot be Empty");
      return;
    }
    if (phone.length != 10) {
      setCustomError("Phone number should be 10 digit");
      return;
    }
    if (!password) {
      setCustomError("Password cannot be Empty");
      return;
    }
    if (password !== reEnterPassword) {
      setCustomError("password and Re-Enter Password must be same");
      return ;
    }

    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async (userCredentials) => {
          // console.log(userCredentials)
         if(userCredentials?.user?.uid){
          const userRef = firebase.firestore().collection("UserData");
          await userRef
            .add({
              name:name,
              email: email,
              phone: phone,
              password: password,
              uid: userCredentials?.user?.uid,
            })
            .then(() => {
              console.log("Data added to firestore");
              // console.log("User created successfully", userCredentials.user.uid);
              console.log("User created successfully");
              setSuccessmsg("User created successfully")
            })
            .catch((error) => {
              console.log("firestore error", error.message);
            });
         }
        })
        .catch((error) => {
          // Alert.alert("ERROR",error.message);
          console.log("sign up firebase error", error.message);
          if (
            error.message ==
            "Firebase: The email address is already in use by another account. (auth/email-already-in-use)."
          ) {
            setCustomError("Email already exists");
          } else if (
            error.message ==
            "Firebase: The email address is badly formatted. (auth/invalid-email)."
          ) {
            setCustomError("Invalid Email");
          } else if (
            error.message ==
            "Firebase: Password should be at least 6 characters (auth/weak-password)."
          ) {
            setCustomError("Password should be at least 6 characters");
          } else {
            setCustomError(error.message);
          }
        });
    } catch (error) {
      console.log("sign up system error", error.message);
    }
  };

  return (
   <View style={styles.loginContainer}>
    {successmsg === null ?
       <View style={styles.loginContainer}>
      <View style={styles.imageContainer}>
        <Image source={foodImage} style={styles.foodImage} />
      </View>
        {customError !== "" &&<Text style={styles.errorMsg}>{customError}</Text>}
      <View style={styles.inputContainer}>
        <AntDesign
          name="user"
          size={24}
          color={nameFocus === true ? colors.text1 : colors.text2}
        />
        <TextInput
          style={styles.input}
          placeholder="name"
          onFocus={() => {
            setNameFocus(true);
            setEmailFocus(false);
            setPhoneFocus(false);
            setPasswordFocus(false);
            setReEnterPasswordFocus(false);
            setShowPassword(false);
            setCustomError("");
          }}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons
          name="email-outline"
          size={24}
          color={emailFocus === true ? colors.text1 : colors.text2}
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          keyboardType="email-address"
          onFocus={() => {
            setNameFocus(false);
            setEmailFocus(true);
            setPhoneFocus(false);
            setPasswordFocus(false);
            setReEnterPasswordFocus(false);
            setShowPassword(false);
            setCustomError("")
          }}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Feather
          name="phone"
          size={24}
          color={phoneFocus === true ? colors.text1 : colors.text2}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          keyboardType="number-pad"
          onFocus={() => {
            setNameFocus(false);
            setEmailFocus(false);
            setPhoneFocus(true);
            setPasswordFocus(false);
            setReEnterPasswordFocus(false);
            setShowPassword(false);
            setCustomError("")
          }}
          onChangeText={(text) => setPhone(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Feather
          name="lock"
          size={24}
          color={passwordFocus === true ? colors.text1 : colors.text2}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onFocus={() => {
            setNameFocus(false);
            setEmailFocus(false);
            setPhoneFocus(false);
            setPasswordFocus(true);
            setReEnterPasswordFocus(false);
            setShowPassword(false);
            setCustomError("")
          }}
          secureTextEntry={showPassword === false ? true : false}
          onChangeText={(text) => setPassword(text)}
        />
        <Feather
          name={showPassword === false ? "eye-off" : "eye"}
          size={24}
          color={passwordFocus === true ? colors.text1 : colors.text2}
          onPress={() => setShowPassword(!showPassword)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Feather
          name="lock"
          size={24}
          color={reEnterpasswordFocus === true ? colors.text1 : colors.text2}
        />
        <TextInput
          style={styles.input}
          placeholder="Re-Enter Password"
          onFocus={() => {
            setNameFocus(false);
            setEmailFocus(false);
            setPhoneFocus(false);
            setPasswordFocus(false);
            setReEnterPasswordFocus(true);
            setShowPassword(false);
            setCustomError("")
          }}
          onChangeText={(text) => setReEnterPassword(text)}
          secureTextEntry={showPassword === false ? true : false}
        />
        <Feather
          name={showPassword === false ? "eye-off" : "eye"}
          size={24}
          color={reEnterpasswordFocus === true ? colors.text1 : colors.text2}
          onPress={() => setShowPassword(!showPassword)}
        />
      </View>
      <TouchableOpacity
        style={{ width: "50%", marginTop: 7 }}
        onPress={() => handleSignUp()}
      >
        <Text style={styles.button}>SIGN UP</Text>
      </TouchableOpacity>

      <View style={hr80}></View>
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Already have an account ?</Text>
        <TouchableOpacity style={styles.signUpBox}>
          <Text
            style={styles.signUpLink}
            onPress={() => navigation.navigate("loginScreen")}
          >
            LOGIN
          </Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="light" />
    </View>
   :
   <View style={styles.loginContainer1}>
      <View style={styles.imageContainer}>
        <Image source={foodImage} style={styles.foodImage} />
      </View>
    <Text style={styles.successMessage}>{successmsg}</Text>
    <TouchableOpacity
        style={{ width: "50%", marginTop: 7 }}
        onPress={() => navigation.navigate("loginScreen")}
      >
        <Text style={styles.button}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ width: "50%", marginTop: 7 }}
        onPress={() => setSuccessmsg(null)}
      >
        <Text style={styles.button}>Go Back</Text>
      </TouchableOpacity>
   </View>
   }
   </View >
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#ff4242",
    alignItems: "center",
  },
  loginContainer1: {
    flex: 1,
    width: "100%",
    backgroundColor: "#ff4242",
    alignItems: "center",
    marginTop:60,
  },
  imageContainer: {
    height: "30%",
    width: "80%",
    marginTop:40,
    alignItems: "center",
    justifyContent: "center",
  },
  foodImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ff4242",
    resizeMode: "contain",
  },
  inputContainer: {
    flexDirection: "row",
    width: "80%",
    marginVertical: 5,
    backgroundColor: colors.color1,
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  input: {
    fontSize: 15,
    marginLeft: 10,
    width: "80%",
  },
  button: {
    fontSize: 17,
    textAlign: "center",
    color: colors.text1,
    marginHorizontal: 10,
    marginVertical: 10,
    fontWeight: 600,
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 5,
    paddingHorizontal: 26,
  },
  signUpContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  signUpText: {
    color: colors.color1,
  },
  signUpBox: {
    width: 140,
    height: 40,
    margin: 15,
    borderColor: colors.color1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 40,
  },
  signUpLink: {
    color: colors.color1,
    fontSize: 18,
    fontWeight: 700,
  },
  errorMsg:{
    color:colors.bgColor,
    backgroundColor:colors.color1,
    fontSize:20,
    textAlign:"center",
    marginBottom:10,
    borderRadius:20,
    padding:15,
    fontWeight:800,
  },
  successMessage:{
    color:colors.color1,
    fontSize:25,
    fontWeight:800,
    marginBottom:20,
  }

});
