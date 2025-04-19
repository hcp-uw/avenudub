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
//import Settings from "/Users/samanthaautrey/Documents/GitHub/avenudub/avenuDub/app/pages/settings";
import Report from "../home_screens/report";
import Register from "../home_screens/register" // REMOVE WHEN NAVIGATION IS FIGURED OUT
import adminlogin from "../home_screens/adminlogin"; // REMOVE WHEN NAVIGATION IS FIGURED OUT
import UserContext from "@/components/user-context";
import { useState } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import SearchBarComponent from "../../../components/searchbar" 

const data= [
  { id: "1", name:"Attempted Robbery", description: "Armed Suspect attempted to hijack the dorm", 
    location:"Oak Hall", address: "123 Main St"},
  { id: "2", name: "Sexual Assault", description: "Attempted rape in front of the library", 
    location: "Odegaard Library", address: "456 Elm St"},
  { id: "3", name: "Shoplifting", description: "Female Suspect tried to steal an orange", 
    location: "District Market - Alder", address: "789 Oak St"},
  { id: "4", name: "Tresspassing", description: "Someone tried to get into a place they don't belong", 
    location: "Elm Hall", address: "101 Pine St"},
  { id: "5", name: "Bike Theft", description: "Someone was very determined to not walk home. Must have had sore legs after the gym.", 
    location: "IMA", address: "a place"}
];

const Safety: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredInput, setFilteredInput] = useState(data);

  useEffect(() => {
    setFilteredInput(data);
  }, [data]);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  return (
    <View style={styles.container}>
      {/*Buttons on the side*/}
      <View style={styles.floatingButton}>
        <TouchableOpacity
          //title="Go to Settings"
          style = {styles.button} 
          onPress={() => navigation.navigate('Home', {screen: 'Settings'})}
        >
          <Ionicons name="settings-outline" color="white" size={40}/>
        </TouchableOpacity>

        <SearchBarComponent 
        data={filteredInput}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setFilteredInput={setFilteredInput}
        />

        <TouchableOpacity
          //title="Go to Reports"
          onPress={() => navigation.navigate('Home',{screen: 'Reports'})}
          style = {styles.button}
        > 
        <Ionicons name="checkmark-circle-outline" color="white" size={40}/>
        </TouchableOpacity>
      </View>
      <FlatList
        data = {filteredInput}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Ionicons name="alert-circle-outline" color="red" size={30}/>
            <Text style={styles.crimeText}>{item.name}</Text>
            <Text style={styles.crimeSubText}>{item.description}</Text>
            <Text style={styles.crimeText}>{item.location}</Text>
            <Text style={styles.crimeSubText}>{item.address}</Text>
          </View>
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
  crimeText: {
    paddingTop: 5,
    fontSize: 20
  },
  crimeSubText:{

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
    
    //left: 450,
    //flexDirection:'row',
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
  },
})
export default Safety
