import {Text,Button,View, StyleSheet,ImageBackground,SafeAreaView} from "react-native";
import {ParamListBase, useNavigation} from '@react-navigation/native';
import { NavigationContainer } 
         from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { Button } from '@react-navigation/elements';
import { TouchableOpacity } from 'react-native';
import Business from "../app/tabs/business_screens/business_page";
import Settings from "../app/tabs/home_screens/settings";
import Report from "../app/tabs/home_screens/report";
import Safety from "../app/tabs/reports_screens/safety";
import BusinessInfoScreen from "./pages/businessinfo";
import Register from "../app/tabs/home_screens/register" // REMOVE WHEN NAVIGATION IS FIGURED OUT
import Adminlogin from "../app/tabs/home_screens/adminlogin"; // REMOVE WHEN NAVIGATION IS FIGURED OUT
import UserContext from "@/components/user-context";
import { useState } from "react";
//import IonIcon from '@reacticons/ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const businesses = [
  { id: "1", name: "Business A", distance: "2 miles", address: "123 Main St", image: "https://as2.ftcdn.net/v2/jpg/01/32/39/21/1000_F_132392106_ZnNsHtzvnxRHxtYwjRTmJKT7CZfOjoN9.jpg",
    foodType:"Asian-American", priceRange:"$",discounts:["nope", "still nope"]
  },
  { id: "2", name: "Business B", distance: "5 miles", address: "456 Elm St", image: "https://via.placeholder.com/150",
    foodType:"Italian", priceRange:"$$",discounts: ["nope", "still nope"]
  },
  { id: "3", name: "Business C", distance: "3 miles", address: "789 Oak St", image: "https://via.placeholder.com/150",
    foodType:"Gross", priceRange:"$$$",discounts: ["N/A", "N/A"]
  },
  { id: "4", name: "Business D", distance: "4 miles", address: "101 Pine St", image: "https://via.placeholder.com/150",
    foodType:"Mexican", priceRange:"$$",discounts: ["Maybe, if you ask nicely", "Nope"]
  },
  { id: "5", name: "Business E", distance: "10 miles", address: "a place", image: "https://via.placeholder.com/150",
    foodType:"Greek", priceRange:"$",discounts:["N/A", "N/A"]
  }
];

const crimes= [
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

export default function App(){
  const [user, setUser] = useState({ username: "", email: "", loggedIn: false });
  return(
    <UserContext.Provider value={{ user, setUser }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor:'#5e30b3',
        },
      }} 
    >
        <Tab.Screen name="Home" component={HomeStackScreen} options={{ headerShown: false }}/>
        <Tab.Screen name="Businesses" component={BusinessesStackScreen} options={{ headerShown: false }}/>
        <Tab.Screen 
        name="Safety" 
        component={() => <Safety data={crimes} />} 
        options={{ headerShown: false }}/>
      </Tab.Navigator>
    </UserContext.Provider>
  );

} 

const HomeStack = createNativeStackNavigator();
const BusinessesStack = createNativeStackNavigator();
    function HomeStackScreen() {
      return (
        <HomeStack.Navigator
        screenOptions={{ headerShown: false }}>
          <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false}}/>
          <HomeStack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
          <HomeStack.Screen name="Reports" component={Report} options={{ headerShown: false }}/>
        </HomeStack.Navigator>
      );
    }
    
    function BusinessesStackScreen(){
      return(
        <BusinessesStack.Navigator
        screenOptions={{headerShown:false}}>
          <BusinessesStack.Screen 
            name="Businesses" 
            component={() => <Business data={businesses} />} 
            options={{headerShown: false}}
          />
          <BusinessesStack.Screen name="BusinessesInfo" component={BusinessInfoScreen} options={{headerShown:false}}/>
        </BusinessesStack.Navigator>
      )
    }

function HomeScreen(){
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return(
   /* <ImageBackground
      source={require("../assets/images/seattle-2084690_1920.jpg")} // Local image
      style={styles.background}
      resizeMode="cover"
    >
      */
    <View style = {styles.container}>
    <SafeAreaView style={styles.textBlock}>
      <Text style = {styles.text}>Welcome Back! Let's discover something new.</Text>
    </SafeAreaView>
      <View style = {styles.buttonContainer}>
      <TouchableOpacity
        //title="Go to Settings"
        style = {styles.button} 
        onPress={() => navigation.navigate('Settings')}
      >
        <Ionicons name="settings-outline" color="black" size={40}/>
      </TouchableOpacity>
      <TouchableOpacity
        //title="Go to Reports"
        onPress={() => navigation.navigate('Reports')}
        style = {styles.button}
      > 
       <Ionicons name="checkmark-circle-outline" color="black" size={40}/>
      </TouchableOpacity>
      </View>
    </View>
    //</ImageBackground>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor:'#f2e8dc',
    flexDirection: 'column', // Align children horizontally
    justifyContent: 'space-around', // Evenly space buttons 
    alignItems: 'center',
    flex:1,
  },
  button: {
    //backgroundColor: "#5529e2",
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
  },
  background: {
    flex: 1, // Takes full screen
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  text:{
    color:"black",
    fontSize:30,
    fontWeight:"bold",
    alignItems:"center",
    flexWrap: "wrap",
    padding: 10,
  },
  textBlock:{
    backgroundColor:"white",
    padding: 20,
    borderRadius: 55,
    width: "50%",
    height: "25%",
    margin: 20,
    //flexGrow:1,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  buttonContainer:{
    flexDirection: 'row',
    margin: 10,
    backgroundColor:'#f2e8dc',
  }
});
