import {Text,Button,View, StyleSheet,ImageBackground,SafeAreaView, FlatList, TextInput} from "react-native";
import {ParamListBase, useNavigation} from '@react-navigation/native';
import { NavigationContainer } 
         from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { Button } from '@react-navigation/elements';
import { TouchableOpacity } from 'react-native';
import UserContext from "@/components/user-context";
import { SetStateAction, useState, useEffect} from "react";
//import IonIcon from '@reacticons/ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchBar from 'react-native-search-bar'
import React from "react";

/* Later we will want to fix this so that it actually enforces the structure of the array,
right now it just accepts any type array, which is not great practice but I just wanted it to work 
for now.
*/

const SearchBarComponent: React.FC<{ 
    data: any[] 
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    setFilteredInput: React.Dispatch<React.SetStateAction<any[]>>;
    searchQuery: string;
}>= ({data, setSearchQuery, setFilteredInput, searchQuery}) =>{ 
    /*const [searchQuery, setSearchQuery] = useState('')
    const [filteredInput, setFilteredInput] = useState(data)

    useEffect(() => {
        setFilteredInput(data);
    },[data]);
*/
    const handleSearch = (text: string) => {
        setSearchQuery(text);
        const filtered = data.filter((item: { name: string; }) => item.name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredInput(filtered);
    }

    return(
        <View style={styles.container}>
            <TextInput
                style = {styles.searchInput}
                placeholder = "Search for anything"
                onChangeText = {handleSearch}
                value = {searchQuery}
            />
            
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: 20,
        borderRadius: 50,
        backgroundColor: '#5e30b3',
        justifyContent: 'center',
        alignContent: 'center',
        width: "50%",
        //left: 325,
       // marginBottom: 30,
        //marginTop: 0,
    },
    searchInput:{
        height: 30,
        marginBottom: 10,
        fontSize: 25,
        color: "white",
        alignContent: 'center',
        justifyContent: 'center',
        
    }
})

export default SearchBarComponent