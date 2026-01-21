import React, { useState } from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from './index';
import Business from './Business';
import Safety from './Safety';
import UserContext from '@/components/user-context';
import Profile from './Profile';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function Tabs() {
  const [user, setUser] = useState({ username: "", email: "", userId: 0, favorites: [], loggedIn: false });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Tab.Navigator 
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#fff',
        tabBarStyle: {
          backgroundColor:'#5e30b3',
          paddingTop: 6,
          paddingBottom: 6,
          justifyContent: 'center',
      },
    }} >
      {/* TODO? Maybe have some indicator of what tab we're on. should be obvious already lol, but good practice for ui design */}
        <Tab.Screen name="Home" component={Home} options={{
            headerShown: false, 
            tabBarLabel: "", 
            tabBarIcon: ({color, size}) => <Ionicons name="home-sharp" size={30} color="#fff"/>
            }}/>
        <Tab.Screen name="Businesses" component={Business} options={{
            headerShown: false, 
            tabBarLabel: "", 
            tabBarIcon: ({color, size}) => <Ionicons name="briefcase" size={30} color="#fff"/>
            }}/>
        <Tab.Screen name = "Safety" component={Safety} options={{
            headerShown: false,
            tabBarLabel: "",
            tabBarIcon: ({color, size}) => <Ionicons name="warning-outline" size={30} color="#fff"/>
            }}/>
        <Tab.Screen name = "Profile" component={Profile} options={{
            headerShown: false,
            tabBarLabel: "",
            tabBarIcon: ({color, size}) =>  <Ionicons name="settings-sharp" size={30} color="#fff"/>
            }}/>
      </Tab.Navigator>
    </UserContext.Provider>
  );
}

export default Tabs;