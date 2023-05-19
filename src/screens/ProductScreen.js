import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { colors, navBtn, navBtnin, nonVeg, veg } from '../globals/style';
import { AntDesign } from '@expo/vector-icons';

const ProductScreen = ({navigation,route}) => {
    const data = route.params;
    console.log(data)
    if(route.params === undefined){
        navigation.navigate("homeScreen")
    }
  return (
    <ScrollView style={{backgroundColor:colors.color1}}>
           <View
        style={styles.navContainer}
       
      > 
      <TouchableOpacity  onPress={() => navigation.navigate("homeScreen")}>
        <View style={navBtn}>
          <AntDesign name="back" size={24} color="black" style={navBtnin} />
        </View>
      </TouchableOpacity>
      </View>
      <View style={styles.Productcontainer}>
       <View style={styles.imageContainer}>
         <Image
           source={{
            uri:data.foodImageUrl
           }}
           style={styles.cardImage}
         />
       </View>
      </View>
      <View style={styles.s2}>
        <View style={styles.s2in}>
             <Text style={styles.head1}>{data.foodName.toUpperCase()}</Text>
             <Text style={styles.head2}>₹ {data.price}/-</Text>
        </View>
      </View>
      <View style={styles.s3}>
         <Text style={styles.head3}>About Food</Text>
         <Text style={styles.head4}>{data.description}</Text>
           <View style={styles.s3in}>
            {
              data.foodType==="veg" ?
              <Text style={veg}></Text> :
              <Text style={nonVeg}></Text>
            }
            <Text style={styles.head5}>{data.foodType}</Text>
           </View>
      </View>
      <View style={styles.buttonContainer}>
         <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Add to Cart</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Buy Now</Text>
         </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default ProductScreen;

const styles = StyleSheet.create({
    navContainer: {
        flexDirection: "row",
        width: "100%",
        height:"8%",
        marginTop:2,
        marginLeft:5,
        alignItems: "center",
        marginBottom:10,
        backgroundColor:colors.color1
      },
      Productcontainer:{
        flex:1,
        backgroundColor:colors.color1
      },
      imageContainer:{
        width:"100%",
        height:250,
        // marginTop:5,
        backgroundcolor:colors.color1,
        alignItems:"center",
        justifyContent:"center"
      },
      cardImage:{
        width:"100%",
        height:"100%"
      },
      s2:{
        width:"100%",
        paddingHorizontal:20,
        paddingVertical:7,
      },
      s2in:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom:5,
      },
      head1:{
        fontSize:25,
        fontWeight:600,
        color:colors.bgColor,
        width:200,
        marginRight:10,

      },
      head2:{
        fontSize:40,
        fontWeight:700,
        color:"#00b200"
      },
      s3:{
        marginHorizontal:15,
        backgroundColor:colors.bgColor,
        padding:20,
        borderRadius:20,
      },
      head3:{
        fontSize:25,
        fontWeight:400,
        color:colors.color1
      },
      head4:{
        marginVertical:10,
        fontSize:18,
        fontWeight:400,
        color:colors.color1
      },
      s3in:{
         backgroundColor:colors.color1,
         padding:10,
         borderRadius:10,
         width:"50%",
         flexDirection:"row",
         justifyContent:"center",
         alignItems:"center",
      },
      head5:{
        color:colors.text3,
        fontSize:23,
        fontWeight:500,
        marginLeft:10,
      },
      buttonContainer:{
        flexDirection:"row",
        width:"100%",
        alignItems:"center",
        justifyContent:"center",
        marginVertical:20,

      },
      button : {
        width:"40%",
        height : 50, 
        marginHorizontal:15,
        backgroundColor : "#ff4242",
        borderRadius : 10,
        alignItems :"center",
        justifyContent: "center",
        elevation :5,
    },
      buttonText:{
        color:colors.color1,
        fontSize:20,
        fontWeight:500,
      },
})