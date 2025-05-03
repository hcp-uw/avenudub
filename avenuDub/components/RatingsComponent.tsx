import {Text,Button,View, StyleSheet,ImageBackground,SafeAreaView} from "react-native";
import {ParamListBase, useNavigation} from '@react-navigation/native';
import { NavigationContainer } 
         from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { Button } from '@react-navigation/elements';
import { TouchableOpacity } from 'react-native';
import UserContext from "@/components/user-context";
import { useState } from "react";
//import IonIcon from '@reacticons/ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from "react";

const RatingsComponent: React.FC<{
}> = () => {

    const stars = [1, 2, 3, 4, 5];
    const filledStars: number[] = [];
    const [filled, setFilled] = useState(filledStars);
    const [rating, setRating] = useState(0);

    const handleRating = (item: number) =>{
        if(item == 1){
            setRating(0);
        }
        else{
            setRating(item);
        }
    }
    const componentArray = stars.map(item => (
        <View key={item}>
          <TouchableOpacity onPress={() => handleRating(item)}>
                <Ionicons name="star" size={30} color= {item <= rating? "#5e30b3" : "black"}/>
        </TouchableOpacity>
        </View>
      ));
    return(
        <>
        <View style={styles.container}>
        <Text style={styles.subtext}>
            Rating:
        </Text>
        <View style={styles.stars}>
        {componentArray}
        </View>
        <Text style={styles.average}>Average Rating:</Text>
        <Text style={styles.info}> 4.5/5</Text>
        <Text style = {styles.info}> 1000 Ratings</Text>
        </View>
        </>

    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        textAlign: 'center',
        alignItems: 'center',
        padding: 20,
        borderRadius: 50,
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
    },
    stars:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginLeft: 20,
        marginRight: 20,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
    },
    subtext:{
        fontSize: 20,
        color: "black",
        fontWeight: "bold",
    },
    average:{
        fontSize: 15,
        color: "black",
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 10,
    },
    info:{
        fontSize:20,
        fontWeight:"bold",
        color: "#5e30b3",
        marginTop:10,

    }
})
export default RatingsComponent;