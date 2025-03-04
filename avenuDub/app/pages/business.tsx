import BackButton from '@/components/BackButton'
import React from 'react'
import {Text,Button,View, StyleSheet,ImageBackground,SafeAreaView,ScrollView,FlatList,Image} from "react-native";
import {ParamListBase, useNavigation} from '@react-navigation/native';
import { NavigationContainer } 
         from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { Button } from '@react-navigation/elements';
import { TouchableOpacity } from 'react-native';
import Settings from "/Users/samanthaautrey/Documents/GitHub/avenudub/avenuDub/app/pages/settings";
import Report from "/Users/samanthaautrey/Documents/GitHub/avenudub/avenuDub/app/pages/report";
import Register from "/Users/samanthaautrey/Documents/GitHub/avenudub/avenuDub/app/pages/register" // REMOVE WHEN NAVIGATION IS FIGURED OUT
import adminlogin from "/Users/samanthaautrey/Documents/GitHub/avenudub/avenuDub/app/pages/adminlogin"; // REMOVE WHEN NAVIGATION IS FIGURED OUT
import UserContext from "@/components/user-context";
import { useState } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';

const businesses = [
  { id: "1", name: "Business A", distance: "2 miles", address: "123 Main St", image: "https://via.placeholder.com/150" },
  { id: "2", name: "Business B", distance: "5 miles", address: "456 Elm St", image: "https://via.placeholder.com/150" },
  { id: "3", name: "Business C", distance: "3 miles", address: "789 Oak St", image: "https://via.placeholder.com/150" },
  { id: "4", name: "Business D", distance: "4 miles", address: "101 Pine St", image: "https://via.placeholder.com/150" },
  { id: "5", name: "Business E", distance: "10 miles", address: "a place", image: "https://via.placeholder.com/150"}
];

function Business() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  return (
    <View style={styles.container}>
      {/*Buttons on the side*/}
      <View style={styles.floatingButtons}>
      <TouchableOpacity
        style = {styles.button} 
        onPress={() => navigation.navigate('Settings')}
      >
        <Ionicons name="settings-outline" color="black" size={40}/>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Reports')}
        style = {styles.button}
      > 
       <Ionicons name="checkmark-circle-outline" color="black" size={40}/>
      </TouchableOpacity>
      </View>
      <ScrollView>
      <FlatList
        data = {businesses}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.businessText}>{item.name} ({item.distance})</Text>
            <Text style={styles.businessSubText}>{item.address}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      
      </ScrollView>
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
    marginHorizontal: 0,
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
  },
  floatingButtons:{
    position: 'absolute',
    zIndex: 10,
    top: 100,
    left: 20,
    flexDirection:'column',
  },
  button:{
    backgroundColor: "white",
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