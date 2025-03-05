import {Text,Button,View, StyleSheet,ImageBackground,SafeAreaView} from "react-native";
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
import Register from "./pages/register" // REMOVE WHEN NAVIGATION IS FIGURED OUT
import Adminlogin from "./pages/adminlogin"; // REMOVE WHEN NAVIGATION IS FIGURED OUT
import UserContext from "@/components/user-context";
import { useState } from "react";
//import IonIcon from '@reacticons/ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

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
        <Tab.Screen name="Businesses" component={Business} options={{ headerShown: false }}/>
        <Tab.Screen name="Safety" component={Safety} options={{ headerShown: false }}/>
      </Tab.Navigator>
    </UserContext.Provider>
  );

} 

const HomeStack = createNativeStackNavigator();

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
