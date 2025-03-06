import BackButton from '@/components/BackButton'
import React from 'react'
import {Text,Button,View, StyleSheet,ImageBackground,SafeAreaView,ScrollView,FlatList,Image,ImageSourcePropType} from "react-native";
import {ParamListBase, RouteProp, useNavigation} from '@react-navigation/native';
import { NavigationContainer } 
         from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { Button } from '@react-navigation/elements';
import { TouchableOpacity } from 'react-native';
import Settings from "./settings";
import Report from "./report";
import Register from "./register" // REMOVE WHEN NAVIGATION IS FIGURED OUT
import adminlogin from "./adminlogin"; // REMOVE WHEN NAVIGATION IS FIGURED OUT
import UserContext from "@/components/user-context";
import { useState } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchBarComponent from "./searchbar"
//import FadeImage from '@/components/FadeImage';
import { useRoute } from '@react-navigation/native';

type BusinessInfoParams = {
   business:{
    id: string;
    name: string;
    distance: string;
    address: string;
    image: string;
    foodType: string;
    priceRange: string;
    discounts: string;
   }
};

const BusinessesInfoScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const route = useRoute<RouteProp<{ BusinessesInfo: BusinessInfoParams }, 'BusinessesInfo'>>();
    const {business} = route.params;
    const {id, name, distance, address, image, foodType, priceRange, discounts} = business;
    return(
        <View style = {styles.container}>
            <BackButton/>
            <ScrollView>
            <Image source={{uri:image}} style={styles.image}/>
            <Text style={styles.headers}>{name}</Text>
            <Text style={styles.text}>{address}</Text>
            <Text style={styles.text}>{foodType}</Text>
            {priceRange === "$" && (
                <View style = {styles.priceRange}>
                   <Text style = {styles.priceText}>$</Text>
                </View>
            )}
            {priceRange === "$$" && (
                <View style = {styles.priceRange}>
                    <Text style = {styles.priceText}>$$</Text>
                </View>
            )}
            {priceRange === "$$$" && (
                <View style = {styles.priceRange}>
                    <Text style = {styles.priceText}>$$$</Text>
                </View>
            )}
            </ScrollView>
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
      backgroundColor: '#f2e8dc',
      flex: 1,
      justifyContent: 'space-between',
    //marginHorizontal: 0,
      padding: 50,
      alignItems: 'center',
    },
    image:{
        width:400,
        height:400,
        borderRadius:50,
        borderColor: 'black',
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 3,
        alignItems: 'center',
    },
    headers:{
        fontSize: 30,
        fontWeight: 'bold',
        alignItems: 'center',
    },
    text:{
        fontSize: 20,
        alignItems: 'center',
    },
    priceRange:{
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center',
    },
    priceText:{
        color:'#42f560',
        fontWeight:'bold',
        fontSize: 40,
    }
}
)

export default BusinessesInfoScreen;