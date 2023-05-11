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
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { StatusBar } from "expo-status-bar";
import  vehicleImage from "../../assets/vehicleImage.png"

const LoginScreen = ({navigation}) => {

    NavigationBar.setBackgroundColorAsync("#ff4242");

  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.loginContainer}>
       <View style={styles.imageContainer}>
        <Image source={vehicleImage} style={styles.vehicleImage}/>
      </View>
      <View style={styles.inputContainer}>
        <Feather
          name="user"
          size={24}
          color={emailFocus === true ? colors.text1 : colors.text2}
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          keyboardType="email-address"
          onFocus={() => {
            setEmailFocus(true);
            setPasswordFocus(false);
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
            setPasswordFocus(true);
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
      <TouchableOpacity style={{width:"50%",marginTop:7}} onPress={()=>navigation.navigate("homeScreen")}>
        <Text style={styles.button}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity>
      <Text style={styles.forgot}>Forget Password ?</Text>
      </TouchableOpacity>
      <Text style={styles.or}>OR</Text>
      <Text style={styles.GFtext}>Sign In With</Text>
      <View style={styles.socialIconContainer}>
        <TouchableOpacity>
        <Ionicons name="logo-google" size={45} color={colors.color1}/>
        </TouchableOpacity>
        <TouchableOpacity>
        <FontAwesome name="facebook-square" size={45} color={colors.color1}/>
        </TouchableOpacity>
      </View>
      <View style={hr80}></View>
      <View style={styles.signUpContainer}> 
      <Text style={styles.signUpText}>Don't have an account ?</Text>
      <TouchableOpacity style={styles.signUpBox}>
        <Text style={styles.signUpLink} onPress={()=>navigation.navigate("signUpScreen")}>SIGN UP</Text>
      </TouchableOpacity>
      </View>
      
     
      <StatusBar style="light" />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#ff4242",
    alignItems: "center"
  },
  imageContainer: {
    height: "30%",
    width: "80%",
    marginTop:33,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    position: 'relative',
    
  },
  vehicleImage:{
    width: "100%",
    height: "100%",
    backgroundColor:"#ff4242",
    resizeMode:"contain"
  },
  head1: {
    fontSize: titles.title1,
    color: colors.color1,
    textAlign: "center",
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
    marginVertical:10,
    textAlign:"center",
    color: colors.text1,
    marginHorizontal: 10,
    fontWeight: 600,
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 5,
    paddingHorizontal: 26
  },
  forgot:{
    color:colors.color1,
    fontSize:18,
    marginTop:10,
    marginBottom:10,
    fontWeight:300,
  },
  or:{
    color:colors.color1,
    marginTop:3,
    marginBottom:10,
    fontWeight:800
  },
  GFtext:{
    color:colors.color1,
    fontSize:14,
    marginBottom:10,
    fontWeight:300,
  },
  socialIconContainer:{
    flexDirection:"row",
    width:"26%",
    height:"6%",
    justifyContent:"space-between",
  },
  signUpContainer:{
    alignItems:"center",
    justifyContent:"center"
  },
  signUpText:{
    color:colors.color1
  },
  signUpBox:{
    width:140,
    height:40,
    margin:15,
    borderColor:colors.color1,
    alignItems:"center",
    justifyContent:"center",
    borderWidth:2,
    borderRadius:40
  },
  signUpLink:{
    color:colors.color1,
    fontSize:18,
    fontWeight:700
  }
});
