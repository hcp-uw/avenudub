import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from './Home';
import Business from './Business';
import Reports from './Reports';

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator >
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}}/>
      <Tab.Screen name="Businesses" component={Business} options={{headerShown: false}}/>
      <Tab.Screen name = "Crimes" component={Reports} options={{headerShown: false}}/>
    </Tab.Navigator>
  );
}

export default Tabs;