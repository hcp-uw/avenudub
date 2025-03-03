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
import colors from "../assets/colors"
import Report from "./pages/report";
import Safety from "./pages/safety";
import Register from "./pages/register" // REMOVE WHEN NAVIGATION IS FIGURED OUT
import adminlogin from "./pages/adminlogin"; // REMOVE WHEN NAVIGATION IS FIGURED OUT
import UserContext from "@/components/user-context";
import { useState } from "react";
import IonIcon from '@reacticons/ionicons';

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
          <HomeStack.Screen name="Settings" component={adminlogin} options={{ headerShown: false }} />
          <HomeStack.Screen name="Reports" component={Report} options={{ headerShown: false }}/>
        </HomeStack.Navigator>
      );
    }

function HomeScreen(){
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return(
    <ImageBackground
      source={require("../assets/images/seattle-2084690_1920.jpg")} // Local image
      style={styles.background}
      resizeMode="cover"
    >
    <View style = {styles.container}>
    <SafeAreaView style={styles.textBlock}>
      <Text style = {styles.text}>Welcome Back! Let's discover something new.</Text>
    </SafeAreaView>
      <TouchableOpacity
        //title="Go to Settings"
        style = {styles.button} 
        onPress={() => navigation.navigate('Settings')}
      >
        <IonIcon name="settings-outline" color="white" size="large"/>
      </TouchableOpacity>
      <TouchableOpacity
        //title="Go to Reports"
        onPress={() => navigation.navigate('Reports')}
        style = {styles.button}
      > 
       <IonIcon name="checkmark-circle-outline" color="white" size="large"/>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column', // Align children horizontally
    justifyContent: 'space-around', // Evenly space buttons 
    alignItems: 'center',
  },
  button: {
    //backgroundColor: "#5529e2",
    backgroundColor: "white",
    alignItems: 'center',
    borderRadius: 55,
    justifyContent: 'space-around',
    flexDirection:'row',
    padding: 15
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
    fontSize:20,
    fontWeight:"bold",
  },
  textBlock:{
    backgroundColor:"white",
    padding: 50,
    borderRadius: 55,
  }
});