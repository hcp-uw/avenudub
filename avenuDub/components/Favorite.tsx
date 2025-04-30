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

const Favorite: React.FC<{
}> = () => {
    
    const [filled, setFilled] = useState(true);

    const handleFavorite = () =>{
        if(filled == true){
            setFilled(false)
        }
        else{
            setFilled(true);
        }
    }
    
    return(
        <TouchableOpacity onPress={() => handleFavorite()}>
            <Ionicons name="star" size={30} color= {filled? "#5e30b3" : "black"}/>
        </TouchableOpacity>

    )
}

export default Favorite;