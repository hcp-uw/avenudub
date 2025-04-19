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
// import Settings from "../../app/tabs/home_screens/settings";
// import Report from "../../app/tabs/home_screens/report";
// import Register from "./register" // REMOVE WHEN NAVIGATION IS FIGURED OUT
// import adminlogin from "../../app/tabs/home_screens/adminlogin"; // REMOVE WHEN NAVIGATION IS FIGURED OUT
import UserContext from "@/components/user-context";
import { useState } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchBarComponent from '@/components/searchbar';
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
    discounts: [];
   }
};

const BusinessesInfoScreen = () => {
    // const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const route = useRoute<RouteProp<{ BusinessesInfo: BusinessInfoParams }, 'BusinessesInfo'>>();
    const {business} = route.params;
    const {id, name, distance, address, image, foodType, priceRange, discounts} = business;
    return(
        <>
        <View style={styles.back}>
            <BackButton />
        </View>
        <View style={styles.container}>
            <ScrollView>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: image }} style={styles.image} />
                        <Text style={styles.headers}>{name}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.categoryContainer}>
                            <Text style={styles.subtext}>Category:</Text>
                            <Text style={{fontSize: 20}}>{foodType}</Text>
                        </View>
                        {priceRange === "$" && (
                            <View style={styles.priceRange}>
                                <Text style={styles.subtext}>Price Range:</Text>
                                <Text style={styles.priceText}>$</Text>
                            </View>
                        )}
                        {priceRange === "$$" && (
                            <View style={styles.priceRange}>
                                <Text style={styles.subtext}>Price Range:</Text>
                                <Text style={styles.priceText}>$$</Text>
                            </View>
                        )}
                        {priceRange === "$$$" && (
                            <View style={styles.priceRange}>
                                <Text style={styles.text}>Price Range:</Text>
                                <Text style={styles.priceText}>$$$</Text>
                            </View>
                        )}
                    </View>
                    <View style={styles.addresses}>
                        <Text style={styles.text}>{address}</Text>
                        <TouchableOpacity style={styles.addressButton}>
                            <Text style={styles.addressText}>Take me there!</Text>
                        </TouchableOpacity>
                        <Text style={styles.subtext}>
                            Discounts Available:
                        </Text>
                        <FlatList
                                data = {discounts}
                                numColumns={1}
                                renderItem={({ item }) => (
                                    <Text>{item}</Text>
                                )}
                                keyExtractor={(item) => item}
                                />
                    </View>
                </ScrollView>
            </View></>
    )

}

const styles = StyleSheet.create({
    container:{
      backgroundColor: '#f2e8dc',
      flex: 1,
      padding: 30,
      alignItems: 'center',
      width: '100%',
      height:'100%',
    },
    image:{
        width:300,
        height:300,
        borderRadius:50,
        borderColor: 'black',
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 3,
        alignItems: 'center',
        margin: 20,
    },
    imageContainer:{
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 50,
        margin: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    infoContainer:{
        backgroundColor: 'white',
        padding: 40,
        borderRadius: 50,
        margin: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        
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
        flexDirection:'column',
        justifyContent: 'center',
        alignItems:'center',

    },
    categoryContainer:{
        flexDirection:'column',
        justifyContent: 'center',
        alignItems:'center',
        margin: 20,
    },
    priceText:{
        color:'#42f560',
        fontWeight:'bold',
        fontSize: 40,
    },
    back:{
        zIndex: 1,
    },
    addresses:{
        backgroundColor: 'white',
        padding: 40,
        borderRadius: 50,
        margin: 20,
        flexDirection:'column',
        justifyContent: 'center',
        textAlign:'center',
        alignContent:'center',

    },
    addressButton:{
        backgroundColor:"#5e30b3",
        borderRadius: 50,
        margin: 20,
        padding: 20,
        width: '50%',
        alignContent:'center',
    },
    addressText:{
        color:'white',
        fontSize:15,
    },
    subtext:{
        fontSize: 20,
        fontWeight: 'bold',
    }

}
)

export default BusinessesInfoScreen;