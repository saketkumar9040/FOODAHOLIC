import { FlatList, StyleSheet, Text, View, Image,TouchableOpacity } from "react-native";
import React from "react";
import {colors, nonVeg, veg } from "../globals/style";

const CardSlider = ({ title,data,navigation }) => {

  const openProductPage=(item)=>{
    // console.log(item)
    navigation.navigate("productScreen",item)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.cardOuterHead}>{title + " >>>"}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.cardsout}
        data={data}
        renderItem={({ item }) => (
        <TouchableOpacity key={item.index} onPress={()=>openProductPage(item)}>
            <View style={styles.card}>
            <View style={styles.s1}>
              <Image
                source={{ uri: item.foodImageUrl }}
                style={styles.cardImage}
              />
            </View>
            <View style={styles.s2}>
              <Text style={styles.cardName}>{item.foodName}</Text>
              <View style={styles.s2Inner}>
                <Text style={styles.cardPrice}>Rs.{item.price}/-</Text>
                { item.foodType ==="veg" ? <Text style={veg}></Text> : <Text style={nonVeg}></Text>}
              </View>
            </View>
            <View style={styles.s3}>
                <Text style={styles.buyButton}>
                   Buy
                </Text>
            </View>
          </View>
        </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CardSlider;

const styles = StyleSheet.create({
    container:{
        marginVertical:5,
        alignItems:"center",
        justifyContent:"center"

    },
    cardOuterHead:{
        color:colors.color1,
        width:'90%',
        fontSize:22,
        fontWeight:400,
        // borderRadius:10,
        marginHorizontal:10,
    },
    cardsout:{
        width:"100%"
    },
    card:{
        width:300,
        height:300,
        padding:7,
        margin:10,
        borderRadius:10,
        borderWidth:3,
        borderColor:colors.text2,
        backgroundColor:colors.color1
    },
    cardImage:{
        width:"100%",
        height:200,
        borderRadius:10,
        marginBottom:10,
    },
    s2:{
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center",  
    },
    cardName:{
        fontSize:16,
        fontWeight:500,
        color:colors.text3,
        marginHorizontal:5,
        width:150,
    },
    cardPrice:{
        fontSize:15,
        fontWeight:500,
        color:colors.text1,
        marginRight:10,
    },
    s2Inner:{
        flexDirection:"row",
        alignItems:"center",
        marginHorizontal:5,
    },
    s3:{
        alignItems:"center",
        position:"absolute",
        bottom:1,
        width:"100%"
    },
    buyButton:{
        backgroundColor:colors.bgColor,
        color:colors.color1,
        margin:5,
        paddingHorizontal:10,
        paddingVertical:5,
        fontSize:15,
        fontWeight:600,
        width:"90%",
        textAlign:"center",
        borderRadius:40,
    }
});
