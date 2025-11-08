import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { View, Text } from 'react-native'
import UserProfile from './profile_screens/userprofile'
import Settings from './profile_screens/settings'
import Favorites from './profile_screens/favorites'
import ForgotPW from './profile_screens/forgotPW'
import Register from './profile_screens/register'

const Stack = createNativeStackNavigator()

function Profile() {
  return (
    <Stack.Navigator>
      <Stack.Screen name = "Home" component={UserProfile} options={{headerShown: false}}/>
      <Stack.Screen name = "Settings" component={Settings} options={{headerShown: false}}/>
      <Stack.Screen name = "Favorites" component={Favorites} options={{headerShown: false}}/>
      <Stack.Screen name = "forgot pw" component={ForgotPW} options={{headerShown: false}}/>
      <Stack.Screen name = "Register" component={Register} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

export default Profile