import React, { useState } from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from './index';
import Business from './Business';
import Safety from './Safety';
import UserContext from '@/components/user-context';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

function Tabs() {
  const [user, setUser] = useState({ username: "", email: "", userId: 0, favorites: [], loggedIn: false });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Tab.Navigator 
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor:'#5e30b3',
      },
    }} >
        <Tab.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Tab.Screen name="Businesses" component={Business} options={{headerShown: false}}/>
        <Tab.Screen name = "Safety" component={Safety} options={{headerShown: false}}/>
        <Tab.Screen name = "Profile" component={Profile} options={{headerShown: false}}/>
      </Tab.Navigator>
    </UserContext.Provider>
  );
}

export default Tabs;