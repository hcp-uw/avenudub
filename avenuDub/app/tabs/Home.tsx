import React from 'react'
import { View, Text } from 'react-native'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Settings from '@/app/tabs/home_screens/settings';
import HomeScreen from './home_screens/homepage';
import Report from './home_screens/report';

const Stack = createNativeStackNavigator()

function Home() {
  return (
    <Stack.Navigator>
      <Stack.Screen name = "HomePage" component={HomeScreen} options={{headerShown: false}}/>
      <Stack.Screen name = "Settings" component={Settings} options={{headerShown: false}}/>
      <Stack.Screen name = "Reports" component={Report} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

export default Home