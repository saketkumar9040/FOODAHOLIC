import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

const NoInternetScreen = () => {
  return (
    <View style={styles.container}>
        <MaterialCommunityIcons name="wifi-off" size={130} color="#fff" />
      <Text style={styles.text}>NO INTERNET CONNECTION</Text>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>RETRY</Text>
      </TouchableOpacity>
    </View>
  )
}

export default NoInternetScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#ff4242",
        alignItems:"center",
        justifyContent:'center'
    },
    text:{
        fontSize:20,
        fontWeight:700,
        color:"#fff",
        marginVertical:20,
    },
    buttonContainer:{
        backgroundColor:"#fff",
        marginVertical:20,

    },
    buttonText:{
        fontSize:22,
        fontWeight:800,
        letterSpacing:2,
        color:"#ff4242",
        paddingHorizontal:30,
    }
})