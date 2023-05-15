import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Swiper from "react-native-swiper/src";
import { colors } from "../globals/style";
import { AntDesign } from '@expo/vector-icons';

const carouselImages = [
  {
    id: 1,
    image: "../../assets/offerImage1.jpg",
  },
  {
    id: 2,
    image: "../../assets/offerImage2.jpg",
  },
  {
    id: 3,
    image: "../../assets/offerImage3.jpg",
  },
];

const OfferSliders = () => {
  return (
    <View>
      <View style={styles.offerSlides}>
        <Swiper  dotColor={colors.text2} activeDotColor="white" autoplay={true} autoplayTimeout={7} showsButtons={true} nextButton={<View style={styles.button}><AntDesign name="caretright" size={24} color={colors.bgColor} /></View>} prevButton={<View  style={styles.button}><AntDesign name="caretleft" size={24} color={colors.bgColor}/></View>}> 
          <View style={styles.slide}>
            <Image source={require("../../assets/offerImage1.jpg")} style={styles.image}/>
          </View>
          <View style={styles.slide}>
            <Image source={require("../../assets/offerImage2.jpg")} style={styles.image}/>
          </View>
          <View style={styles.slide}>
            <Image source={require("../../assets/offerImage3.jpg")} style={styles.image}/>
          </View>
        </Swiper>
      </View>
    </View>
  );
};

export default OfferSliders;

const styles = StyleSheet.create({
  offerSlides: {
    width: "100%",
    height: 200,
    marginTop: 2,
    backgroundColor:colors.bgColor,
    alignItems: "center",
    justifyContent: "center",
  
  },
  slide: {
    width: "100%",
    height: 200,
    padding:8,
    justifyContent:"center",
    alignItems:"center",
  
    
  },
  image:{
    width:"100%",
    height:"100%",
    borderWidth:10,
    borderRadius:20,
 
  },
  button:{
    backgroundColor:colors.color1,
    padding:4,
    margin:6,
    borderRadius:40
  }
});
