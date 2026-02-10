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
import Settings from "../profile_screens/settings";
import Report from "../home_screens/report";
import Register from "../profile_screens/register" // REMOVE WHEN NAVIGATION IS FIGURED OUT
import adminlogin from "../profile_screens/adminlogin"; // REMOVE WHEN NAVIGATION IS FIGURED OUT
import UserContext from "@/components/user-context";
import { useState } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchBarComponent from "../../components/searchbar";
import { themeStore } from '@/stores/theme-store';
import { observer } from 'mobx-react-lite';
import { places } from '../routes';

type Business = {
  id: string;
  name: string;
  distance: string;
  address: string;
  image: string;
  foodType: string;
  priceRange: string;
  discounts: string[];
  hours: string[];
}

const Business = observer(() => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredInput, setFilteredInput] = useState<Business[]>([]);
  const { theme } = themeStore;

  useEffect(() => {
    places().then(items => {
      if (Array.isArray(items)) setFilteredInput(items)
    }).catch(err => console.error(err))
  }, [])
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  
  
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
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
        data={filteredInput}
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
})
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
    flexDirection: 'column',
    padding: 50,
    backgroundColor: 'white',
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
    shadowOpacity: 0.6,
    shadowRadius: 3,
    margin: 15,
    borderWidth: 1,
    borderRadius: 30,
  },
  floatingButton:{
    position: 'static',
    paddingTop:10, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    textAlign: 'center',
    //marginTop: 50,
    paddingHorizontal: 20, 
    backgroundColor:'transparent',
    zIndex: 1,

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
