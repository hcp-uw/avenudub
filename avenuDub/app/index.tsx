import {Text,Button,View, StyleSheet} from "react-native";
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

const Tab = createBottomTabNavigator();

export default function App(){
  const [user, setUser] = useState({ username: "", email: "", loggedIn: false });
  return(
    <UserContext.Provider value={{ user, setUser }}>
      <Tab.Navigator 
        screenOptions={{
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
        <HomeStack.Navigator>
          <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false}}/>
          <HomeStack.Screen name="Settings" component={adminlogin} options={{ headerShown: false }} />
          <HomeStack.Screen name="Reports" component={Report} options={{ headerShown: false }}/>
        </HomeStack.Navigator>
      );
    }

function SettingsScreen(){
  return(
    <View>
      <Text>Settings! Lame but it exists</Text>
    </View>
  )
}

function ReportsScreen(){
  return(
    <View>
      <Text>For now you will have to rely on word of mouth. Sorry</Text>
    </View>
  );
}

function HomeScreen(){
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return(
    <View style = {styles.container}>
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Settings')}
      />
      <Button
        title="Go to Reports"
        onPress={() => navigation.navigate('Reports')}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Align children horizontally
    justifyContent: 'space-around', // Evenly space buttons 
    alignItems: 'center',
    color: colors.primary
  },
});
function BusinessScreen() {
  return(
    <View>
      <Text>Welcome to Businesses!</Text>
    </View>
  );
}

function SafetyScreen() {
  return(
    <View>
      <Text>Nothing yet. The world is currently a safe place.</Text>
    </View>
  );
}