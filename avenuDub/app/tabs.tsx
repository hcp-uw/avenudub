import React, { useState } from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from './Home';
import Business from './Business';
import Reports from './Reports';
import UserContext from '@/components/user-context';

const Tab = createBottomTabNavigator();

function Tabs() {
  const [user, setUser] = useState({ username: "", email: "", loggedIn: false });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Tab.Navigator >
        <Tab.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Tab.Screen name="Businesses" component={Business} options={{headerShown: false}}/>
        <Tab.Screen name = "Crimes" component={Reports} options={{headerShown: false}}/>
      </Tab.Navigator>
    </UserContext.Provider>
  );
}

export default Tabs;