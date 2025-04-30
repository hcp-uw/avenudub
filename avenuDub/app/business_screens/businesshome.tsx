import BackButton from '@/components/BackButton'
import React, { useEffect } from 'react'
import {Text,Button,View, StyleSheet,ImageBackground,SafeAreaView,ScrollView,FlatList,Image} from "react-native";
import {ParamListBase, useNavigation} from '@react-navigation/native';
import { NavigationContainer } 
         from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { Button } from '@react-navigation/elements';
import { TouchableOpacity } from 'react-native';
import Settings from "../home_screens/settings";
import Report from "../home_screens/report";
import Register from "../home_screens/register" // REMOVE WHEN NAVIGATION IS FIGURED OUT
import adminlogin from "../home_screens/adminlogin"; // REMOVE WHEN NAVIGATION IS FIGURED OUT
import UserContext from "@/components/user-context";
import { useState } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchBarComponent from "../../components/searchbar";
//import FadeImage from '@/components/FadeImage';

const data = [
  { id: "1", name: "Business A", distance: "2 miles", address: "2321 West Bridge Ave", image: "https://as2.ftcdn.net/v2/jpg/01/32/39/21/1000_F_132392106_ZnNsHtzvnxRHxtYwjRTmJKT7CZfOjoN9.jpg",
    foodType:"Asian-American", priceRange:"$",discounts:["nope", "still nope"], hours:["Monday: 10am - 8pm", "Tuesday: 10am - 8pm", "Wednesday: 10am - 8pm", "Thursday: 10am - 8pm", "Friday: 10am - 8pm", "Saturday: Closed", "Sunday: Closed"] //Starts on Monday
  },
  { id: "2", name: "Business B", distance: "5 miles", address: "456 Elm St", image: "https://via.placeholder.com/150",
    foodType:"Italian", priceRange:"$$",discounts: ["nope", "still nope"], hours:["Monday: 10am - 8pm", "Tuesday: 10am - 8pm", "Wednesday: 10am - 8pm", "Thursday: 10am - 8pm", "Friday: 10am - 8pm", "Saturday: Closed", "Sunday: Closed"]
  },
  { id: "3", name: "Business C", distance: "3 miles", address: "789 Oak St", image: "https://via.placeholder.com/150",
    foodType:"Gross", priceRange:"$$$",discounts: ["N/A", "N/A"], hours:["Monday: 10am - 8pm", "Tuesday: 10am - 8pm", "Wednesday: 10am - 8pm", "Thursday: 10am - 8pm", "Friday: 10am - 8pm", "Saturday: Closed", "Sunday: Closed"]
  },
  { id: "4", name: "Business D", distance: "4 miles", address: "101 Pine St", image: "https://via.placeholder.com/150",
    foodType:"Mexican", priceRange:"$$",discounts: ["Maybe, if you ask nicely", "Nope"], hours:["Monday: 10am - 8pm", "Tuesday: 10am - 8pm", "Wednesday: 10am - 8pm", "Thursday: 10am - 8pm", "Friday: 10am - 8pm", "Saturday: Closed", "Sunday: Closed"]
  },
  { id: "5", name: "Business E", distance: "10 miles", address: "a place", image: "https://via.placeholder.com/150",
    foodType:"Greek", priceRange:"$",discounts:["N/A", "N/A"], hours:["Monday: 10am - 8pm", "Tuesday: 10am - 8pm", "Wednesday: 10am - 8pm", "Thursday: 10am - 8pm", "Friday: 10am - 8pm", "Saturday: Closed", "Sunday: Closed"]
  }
];

function Business() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredInput, setFilteredInput] = useState(data);

  useEffect(() => {
    setFilteredInput(data);
  },[data]);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  
  return (
    <View style={styles.container}>
      {/*Buttons on the side*/}
      <View style={styles.floatingButton}>
        <TouchableOpacity
          //title="Go to Settings"
          style = {styles.button} 
          onPress={() => navigation.navigate('Home', { screen: 'Settings' })}
        >
          <Ionicons name="settings-outline" color="white" size={40}/>
        </TouchableOpacity>

        <SearchBarComponent 
        data={data}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setFilteredInput={setFilteredInput}
        />

        <TouchableOpacity
          //title="Go to Reports"
          onPress={() => navigation.navigate('Home',{screen:'Reports'})}
          style = {styles.button}
        > 
        <Ionicons name="checkmark-circle-outline" color="white" size={40}/>
        </TouchableOpacity>
      </View>
      <FlatList
        data = {filteredInput}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity 
          style={styles.card}
          onPress={()=> navigation.navigate('BusinessesInfo', {business: item})}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.businessText}>{item.name} ({item.distance})</Text>
            <Text style={styles.businessSubText}>{item.address}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  header: {
    fontSize: 50,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    //marginHorizontal: 0,
    padding: 50,
    backgroundColor: '#f2e8dc',
  },
  businessText: {
    paddingTop: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  businessSubText: {
    paddingTop: 5,
    fontSize:15,
    fontWeight: "bold",
  },
  image:{
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  card:{
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: 'space-between',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    margin: 15,
    borderRadius: 30,
  },
  floatingButton:{
    position: 'sticky',
    paddingTop:0, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    backgroundColor:'transparent',
    zIndex: 3,
    top: 0,
    //left: 100,
    //right: 100,
  },
  button:{
    backgroundColor: "#5e30b3",
    alignItems: 'center',
    borderRadius: 55,
    justifyContent: 'space-around',
    flexDirection:'row',
    padding: 15,
    margin: 10,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 3,


  }
})

export default Business
