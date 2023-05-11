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
import { titles, colors, hr80 } from "../globals/style";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import foodImage from "../../assets/foodImage.png";

const SignUpScreen = ({ navigation }) => {
  NavigationBar.setBackgroundColorAsync("#ff4242");

  const [emailFocus, setEmailFocus] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [reEnterpasswordFocus, setReEnterPasswordFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.loginContainer}>
      <View style={styles.imageContainer}>
        <Image source={foodImage} style={styles.foodImage} />
      </View>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons
          name="email"
          size={24}
          color={emailFocus === true ? colors.text1 : colors.text2}
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          keyboardType="email-address"
          onFocus={() => {
            setEmailFocus(true);
            setPhoneFocus(false);
            setPasswordFocus(false);
            setReEnterPasswordFocus(false);
            setShowPassword(false);
          }}
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
            setEmailFocus(false);
            setPhoneFocus(true);
            setPasswordFocus(false);
            setReEnterPasswordFocus(false);
            setShowPassword(false);
          }}
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
            setEmailFocus(false);
            setPhoneFocus(false);
            setPasswordFocus(true);
            setReEnterPasswordFocus(false);
            setShowPassword(false);
          }}
          secureTextEntry={showPassword === false ? true : false}
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
            setEmailFocus(false);
            setPhoneFocus(false);
            setPasswordFocus(false);
            setReEnterPasswordFocus(true);
            setShowPassword(false);
          }}
          secureTextEntry={showPassword === false ? true : false}
        />
        <Feather
          name={showPassword === false ? "eye-off" : "eye"}
          size={24}
          color={reEnterpasswordFocus === true ? colors.text1 : colors.text2}
          onPress={() => setShowPassword(!showPassword)}
        />
      </View>
      <TouchableOpacity style={{ width: "50%", marginTop: 7 }}>
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
  imageContainer: {
    height: "30%",
    width: "80%",
    marginTop: 33,
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
});
