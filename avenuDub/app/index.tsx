import React from "react";
import {Text,Button,View, StyleSheet,ImageBackground,SafeAreaView, ScrollView} from "react-native";
import {ParamListBase, useNavigation} from '@react-navigation/native';
import { NavigationContainer } 
         from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { Button } from '@react-navigation/elements';
import { TouchableOpacity } from 'react-native';
import Business from "./pages/business";
import Settings from "./pages/settings";
import Report from "./pages/report";
import Safety from "./pages/safety";
import BusinessInfoScreen from "./pages/businessinfo";
import Register from "./pages/register" // REMOVE WHEN NAVIGATION IS FIGURED OUT
import Adminlogin from "./pages/adminlogin"; // REMOVE WHEN NAVIGATION IS FIGURED OUT
import UserContext from "@/components/user-context";
import { useEffect, useState } from "react";
//import IonIcon from '@reacticons/ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapView, { Marker } from "react-native-maps";
import { geocodeAddress } from "./pages/maps"; // Import the geocodeAddress function

const Tab = createBottomTabNavigator();

const businesses = [
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

const crimes= [
  { id: "1", name:"Attempted Robbery", description: "Armed Suspect attempted to hijack the dorm", 
    location:"Oak Hall", address: "4295 Little Canoe Channel NE, Seattle, WA 98195"},
  { id: "2", name: "Sexual Assault", description: "Attempted rape in front of the library", 
    location: "Odegaard Library", address: "4060 George Washington Lane Northeast, Seattle, WA 98195"},
  { id: "3", name: "Shoplifting", description: "Female Suspect tried to steal an orange", 
    location: "District Market - Alder", address: "University of Washington, Alder Hall, 1315 NE Campus Pkwy, Seattle, WA 98105"},
  { id: "4", name: "Tresspassing", description: "Someone tried to get into a place they don't belong", 
    location: "Elm Hall", address: "1218 NE Campus Pkwy, Seattle, WA 98195"},
  { id: "5", name: "Bike Theft", description: "Someone was very determined to not walk home. Must have had sore legs after the gym.", 
    location: "IMA", address: "3924 Montlake Blvd NE, Seattle, WA 98195"},
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
  const [coords, setCoords] = useState<{latitude: number; longitude: number }[]>([]);

    useEffect(() => {
      const fetchCoordinates = async () => {
        const locations = await Promise.all(crimes.map((crime: {address: string}) => geocodeAddress(crime.address)));
        const validLocations = locations.filter((loc): loc is { latitude: number; longitude: number } => loc !== null);
        console.log(validLocations);
     setCoords(validLocations);
      };
      fetchCoordinates();
    }, [crimes]);

  return(
   /* <ImageBackground
      source={require("../assets/images/seattle-2084690_1920.jpg")} // Local image
      style={styles.background}
      resizeMode="cover"
    >
      */
    <View style = {styles.container}>
    <SafeAreaView style={styles.textBlock}>
      <Text style = {styles.text}>Welcome Back!</Text>
    </SafeAreaView>
    <View style={styles.mapContainer}>
        <Text style={styles.subtext}>Here's what you've missed:</Text>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: coords[0]?.latitude | 47.6564842,
                longitude: coords[0]?.longitude | -122.3129439,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }}
              >
                {coords.map((coord, index) => (
                  console.log(coord),
                  <Marker
                  key={index}
                  //coordinate={{latitude: coord.latitude, longitude: coord.longitude}}
                  coordinate={coord}
                  title={`Crime ${index + 1}`}
                  description={`Description of crime ${index + 1}`}
                  />
                ))
              }
            </MapView>
        </View>
      <View style = {styles.buttonContainer}>
      <TouchableOpacity
        //title="Go to Settings"
        style = {styles.settingsbutton} 
        onPress={() => navigation.navigate('Settings')}
      >
        <Ionicons name="settings-outline" color="black" size={40}/>
      </TouchableOpacity>
      <TouchableOpacity
        //title="Go to Reports"
        onPress={() => navigation.navigate('Reports')}
        style = {styles.reportsbutton}
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
    textAlign: 'center',
    //padding: 
    alignItems: 'center',
    flex:1,
  },
 /* button: {
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
  */
  settingsbutton:{
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
    zIndex: 4,
  },
  reportsbutton:{
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
    zIndex: 4,
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
    padding: 10,
    borderRadius: 55,
    width: "75%",
    height: "15%",
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
    zIndex: 4,
    justifyContent: 'space-between',
  },
  subtext:{
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10,
},
mapContainer:{
  width: "95%",
  height: "50%",
  borderRadius: 50,
  margin: 20,
  backgroundColor: "white",

},
map:{
 flex:1,
}
});
