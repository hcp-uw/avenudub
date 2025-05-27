import React from 'react'
import { View, Text } from 'react-native'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Settings from '@/app/home_screens/settings';
import HomeScreen from './home_screens/homepage';
import Report from './home_screens/report';
import Register from './home_screens/register';
import Adminlogin from './home_screens/adminlogin';
import GenLogin from './home_screens/genlogin';

const Stack = createNativeStackNavigator()

function Home() {
  return (
    <Stack.Navigator>
      <Stack.Screen name = "HomePage" component={HomeScreen} options={{headerShown: false}}/>
      <Stack.Screen name = "Settings" component={Settings} options={{headerShown: false}}/>
      <Stack.Screen name = "Reports" component={Report} options={{headerShown: false}}/>
      <Stack.Screen name = "Register" component={Register} options={{headerShown: false}}/>
      <Stack.Screen name = "Admin Login" component={Adminlogin} options={{headerShown: false}}/>
      <Stack.Screen name = "Gen Login" component={GenLogin} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

export default Home